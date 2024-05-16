/*Peppubuild uses Firebase for authentication and Google Drive [appDataFolder] to store user information.
  Since we are only accessing [appDataFolder], we can't access the users files in drive, only information we 
  have created. For more information, checkout https://developers.google.com/drive/api/guides/appdata.

  The important routes are as follows:
  1. /publishfront/:name: This route runs the createSub() function which creates a subdomain for the user.
  On successful subdomain creation, the file is then created in Google Drive with createFrontend() 
  and updated with updateDB().
  2. getContent() coupled with tmp will create a temporary directory with temporary files.
  3. /publish: calls ftp with the path of temporary folder.
  4. Login, logout, and cookies manages authentication.
*/
"use strict";
exports.__esModule = true;
exports.startServer = void 0;

// Modules import
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync.js');
var path = require('path');
var grapesjs = require('grapesjs');
var replaceInFile = require('replace-in-file');
var os = require('os');
var fetch = require('node-fetch');
const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');
const tmp = require('tmp');
require('dotenv').config();
const { Readable } = require('stream');

var ftp = require("basic-ftp");
var cors = require('cors')
// ENV constants for Namecheap
const CURR_DIR = os.tmpdir();
const cpanelDomain = process.env.CPANEL_DOMAIN;
const cpanelUsername = process.env.CPANEL_USER;
const root = 'peppubuild.com';
const cpanelApiKey = process.env.CPANEL_SECRET_KEY;

const app = express();
tmp.setGracefulCleanup();

async function startServer() {
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use(cors())
  app.use(express.json({ limit: '50mb' }))
  // parse application/json
  app.use(bodyParser.json())

  app.use(cookieParser())

  function stringToStream(str) {
    return new ReadableStream({
      start(controller) {
        controller.enqueue(str);
        controller.close();
      }
    });
  }

  app.post('/clientdeploy/:pname', (req, res) => {
    let pname = req.params.pname;
    const pages = req.body.pages;
    async function uploadFiles() {
      const client = new ftp.Client();
      const projectname = `${pname}.peppubuild.com`;

      try {
        // Connect to FTP server
        await client.access({
          host: process.env.HOST,
          user: cpanelUsername,
          password: process.env.PASSWORD,
        });

        // Set the remote directory (public_html or another directory)
        await client.cd(projectname);

        // Upload files
        let editor = grapesjs.init({
          headless: true, pageManager: {
            pages: pages.pages
          }
        });
        for (const e of editor.Pages.getAll()) {
          const name = e.id
          const component = e.getMainComponent()
          const html = editor.getHtml({ component });
          const css = editor.getCss({ component });
          let htmlContent = `
            <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Document</title>
                  <link rel="stylesheet" type="text/css" href="./css/${name}.css">
              </head>
              ${html}
            </html>`
          // create directory and add files into directory
          let htmlstreams = Readable.from(htmlContent);
          await client.uploadFrom(htmlstreams, `${name}.html`);
          let cssstreams = Readable.from(css)
          await client.uploadFrom(cssstreams, `${name}.css`);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        // Close the FTP connection
        client.close();
      }
    }

    // Run the function
    uploadFiles();
  })




  // Step 1 - Run Filename by creating subdomain.
  function createSub(name) {
    const apiUrl = `${cpanelDomain}:2083/cpsess${cpanelApiKey}/execute/SubDomain/addsubdomain?domain=${name}&rootdomain=${root}&dir=${name}.${root}`;
    let data = fetch(apiUrl, {
      method: 'GET', headers: {
        'Authorization': 'cpanel ' + cpanelUsername + ':' + cpanelApiKey,
      }
    })
    return data;
  }

  function driveAuth(accessToken) {
    const auth = new OAuth2Client({});
    auth.setCredentials({ access_token: accessToken })
    const service = google.drive({ version: 'v3', auth: auth });
    return service;
  }
  async function listFiles(accessToken) {
    const service = driveAuth(accessToken);
    try {
      const res = await service.files.list({
        spaces: 'appDataFolder',
        fields: 'nextPageToken, files(id, name)',
        pageSize: 100,
      });
      return res.data.files;
    } catch (err) {
      // TODO(developer) - Handle error
      return err;
    }
  }

  // set route for logout
  app.get('/logout', (_req, res) => {
    res.clearCookie('pepputoken')
    res.send(`Cookie have been deleted successfully ${CURR_DIR}`);
  })

  // set route for user login
  app.post('/login', (req, res) => {
    // collect token
    let providerToken = req.body.token;
    // verify token

    // store token
    res.cookie('pepputoken', providerToken, {
      maxAge: 24 * 60 * 60 * 1000, // One day
      // httpOnly: true // Only the server can read the cookie
    })
    // send response
    res.send('Cookie have been saved successfully');
  })

  // set user as token retrieved from login and stored in cookies
  app.use(function (req, _res, next) {
    const token = req.cookies.pepputoken;
    req.user = token
    next()
  })

  // Save Frontend changes.
  async function createFrontend(projectName, accessToken) {
    const service = driveAuth(accessToken);
    const media = {
      mimeType: 'application/json',
      // body: fs.createReadStream(`files/${projectName}.json`),
    };
    const fileMetadata = {
      name: `${projectName}.json`,
      parents: ['appDataFolder'],
    };
    try {
      const file = await service.files.create({
        resource: fileMetadata,
        media: media,
      })
      // console.log(file.data.id)
      return file.data.id;
    } catch (err) {
      // TODO(developer) - Handle error
      return err;
    }
  }

  // update file 
  async function updateDB(project, Id, accessToken) {
    const service = driveAuth(accessToken);
    const media = {
      mimeType: 'application/json',
      body:
        `{
        "gjsProject": {
            "project": ${project}
        }
    }`
    };
    try {
      service.files.update({
        fileId: Id,
        // resource: fileMetadatad,
        media: media,
      });
    } catch (err) {
      // TODO(developer) - Handle error
      return err;
    }
  }

  async function getContent(Id, accessToken) {
    const service = driveAuth(accessToken);
    try {
      const file = await service.files.get({
        fileId: Id,
        alt: 'media',
      });
      let data = JSON.stringify(file.data);
      let finaldata = JSON.parse(data)
      return finaldata.gjsProject.project;
    } catch (err) {
      // TODO(developer) - Handle error
      return err;
    }
  }

  async function deleteContent(Id, accessToken) {
    const service = driveAuth(accessToken);
    try {
      await service.files.delete({
        fileId: Id,
      });
    } catch (err) {
      // TODO(developer) - Handle error
      return err;
    }
  }

  // get project from db in gjsProject format.
  app.post('/project/:id', (req, res) => {
    let Id = req.params.id;
    let accessToken = req.body.accessToken;
    getContent(Id, accessToken).then((response) => {
      res.send(response)
    })
  })

  // get all of the projects from db in gjsProject format.
  app.post('/pdelete/:id', (req, res) => {
    let Id = req.params.id;
    let accessToken = req.body.accessToken;
    deleteContent(Id, accessToken).then(() => {
      res.send('Deleted successfully')
    })
  })

  // get all of the projects from db in gjsProject format.
  app.get('/projects/:token', (req, res) => {
    let accessToken = req.params.token;
    listFiles(accessToken).then((response) => {
      res.send(response)
    })
  })

  // save changes to corresponding file on disk
  app.put('/save/:id', (req, res) => {
    let id = req.params.id;
    let accessToken = req.body.accessToken;
    let gjsProject = req.body.gjsProject;
    updateDB(gjsProject, id, accessToken).then(res.send({ success: 'Project saved successfully!' }));
  })

  app.post('/publishcontent', (req, res) => {

  })

  // create frontend project
  /// TODO: Import the necessary functions here like createFrontend etc.
  app.post('/publishfront/:name', (req, res) => {
    let projectName = req.params.name;
    // let projectName = req.body.projectName;
    // let projectType = req.body.projectType;
    // let tartgetPath = path.join(CURR_DIR, projectName);

    let gjsProject = req.body.gjsProject;
    let accessToken = req.body.accessToken;
    createSub(projectName).then(async (response) => {
      let text = await response.text();
      let json = JSON.parse(text);
      if (response.ok) {
        if (json.errors == null) {
          // Step 2 - Create file in drive
          createFrontend(projectName, accessToken).then((id) => {
            // Step 3 - Update with empty project
            updateDB(gjsProject, id, accessToken);
            res.send({ id: id });
          });
          // Step 4 - Add file name and project data to localstorage.
        } else {
          res.status(500).send({ error: json.errors[0] });
        }
      } else {
        res.status(500).send({ error: 'Network error' });
      }
    })
  })

  const port = 1404;
  app.listen(port);
  console.log(`started server in ${port}`)
}
startServer()