"use strict";
exports.__esModule = true;
exports.startServer = void 0;

var express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var fs = require('fs');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync.js')
var createProject = require('./utils/project.js')
var path = require('path')
var grapesjs = require('grapesjs')
var replaceInFile= require('replace-in-file')

const CURR_DIR = path.join(process.cwd(), '..');
const adapter = new FileSync(path.join(CURR_DIR, 'db.json'));
const db = low(adapter);

async function startServer() {
  const app = express()

  app.use(express.static(path.join(__dirname, "public")));

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

  app.use(cookieParser())

  // set route for logout
  app.get('/logout', (_req, res) => {
    res.clearCookie('pepputoken')
    res.send('Cookie have been deleted successfully');
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
  async function createBackend(tempath) {
    // gen server folder
    // gen index.js
    fs.mkdirSync(`${tempath}/server`)
    let filePath = `${tempath}/server/.env`

    let anon_key = db.get("db.anon_key").value();
    let url = db.get("db.url").value();
    let data = `
    ANON_KEY =${anon_key}
    URL =${url}
    `
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, data, function (err) {
        if (err) return err;
      });
    }

    // gen package.json()
    const package_json = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/node/package.json');
    // Get the Blob data
    const json = await package_json.text();
    fs.writeFileSync(`${tempath}/server/package.json`, json, function (err) {
      if (err) return err;
    });

    // gen outer package.json()
    const package_json_outer = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/package.json');
    // Get the Blob data
    const json_file = await package_json_outer.text();
    fs.writeFileSync(`${tempath}/package.json`, json_file, function (err) {
      if (err) return err;
    });

    // gen gitignore
    const gitignore_file = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/node/.gitignore');
    // Get the Blob data
    const gitignore = await gitignore_file.text();
    fs.writeFileSync(`${tempath}/server/.gitignore`, gitignore, function (err) {
      if (err) return err;
    });

    // gen index.js
    const index_file = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/node/index.js');
    // Get the Blob data
    const index = await index_file.text();
    fs.writeFileSync(`${tempath}/server/index.js`, index, function (err) {
      if (err) return err;
    });

    // gen index.js
    fs.mkdirSync(`${tempath}/server/controllers`)

    // Gen welcome controller
    let welcome_content = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/node/controllers/welcome.js');
    const welcome = await welcome_content.text();
    fs.writeFileSync(`${tempath}/server/controllers/welcome.js`, welcome, function (err) {
      if (err) return err;
    });

  }

  // Save Frontend changes.
  async function createFrontend(tempath) {
    // create client folder.
    fs.mkdirSync(`${tempath}/client`)
    // gen package.json()
    const package_json = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/webpack/package.json');
    // Get the Blob data
    const json = await package_json.text();
    fs.writeFileSync(`${tempath}/client/package.json`, json, function (err) {
      if (err) return err;
    });

    // gen outer package.json()
    const package_json_outer = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/package.json');
    // Get the Blob data
    const json_file = await package_json_outer.text();
    fs.writeFileSync(`${tempath}/package.json`, json_file, function (err) {
      if (err) return err;
    });

    // gen gitignore
    const gitignore_file = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/webpack/.gitignore');
    // Get the Blob data
    const gitignore = await gitignore_file.text();
    fs.writeFileSync(`${tempath}/client/.gitignore`, gitignore, function (err) {
      if (err) return err;
    });

    // gen index.js
    fs.mkdirSync(`${tempath}/client/css`)
    fs.mkdirSync(`${tempath}/client/js`)

    let index_content = `
    import axios from 'axios';
    
    export default {
        /*Insert Imports Here*/ 

        setup() {
          return { 
            /*Insert Data Here*/
          }
        },
        methods: {
            /*Insert Methods Here*/
        },
        async mounted() {
            /*Insert Mounted Here*/
        }
    }
    `;
    fs.writeFileSync(`${tempath}/client/js/index.js`, index_content, function (err) {
      if (err) return err;
    });

    let pages = db.get("pages").value();
    let editor = grapesjs.init({
      headless: true, pageManager: {
        pages: pages
      }
    });
    // gen html and css files.
    var myCss = ''
    editor.Pages.getAll().forEach(e => {
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
              <link rel="stylesheet" type="text/css" href="./css/style.css">
              <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.0/axios.min.js" integrity="sha512-aoTNnqZcT8B4AmeCFmiSnDlc4Nj/KPaZyB5G7JnOnUEkdNpCZs1LCankiYi01sLTyWy+m2P+W4XM+BuQ3Q4/Dg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
              <script type="module">
                  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

                  import Index from './js/index.js'

                  createApp(Index).mount('#app')
              </script>
          </head>
          <body id="app">
          ${html}
          </body>
        </html>`
      fs.writeFileSync(`${tempath}/client/${name}.html`, htmlContent, function (err) {
        if (err) return err;
      });
      fs.writeFileSync(`${tempath}/client/css/style.css`, myCss += css, function (err) {
        if (err) return err;
      });
    })

    // create ENV
  }

  // get all of the projects from db in gjsProject format.
  app.get('/projects', (req, res) => {
    const projects = db.get("gjsProject.project");
    res.send(projects)
  })

  // save changes to corresponding file on disk
  app.put('/save/:id', (req, res) => {
    let id = req.params.id;
    let gjsP = req.body.gjsProject;
    // console.log(gjsP)
    db.defaults({ gjsProject: {} })
      .write();
    db.set('gjsProject.project', JSON.parse(gjsP)).write();
    // push the changes into webpack project.
    // where tempath is name of project.
    let projectName = db.get("project.name").value();
    let tempath = path.join(CURR_DIR, projectName);
    let filePath = `${tempath}/client/${id}.html`;
    let cssPath = `${tempath}/client/css/style.css`;

    let pages = db.get("pages").value();
    let editor = grapesjs.init({
      headless: true, pageManager: {
        pages: pages
      }
    });

    let htmlContent = `
    <body id="app">
    ${req.body.html}
    `
    let myCss = req.body.css;
    let regex = new RegExp('<body id="app">(.|\n)*?<\/body>')
    const options = {
      files: filePath,
      from: regex,
      to: htmlContent
    };
    if (fs.existsSync(filePath)) {
      replaceInFile(options)
        .then(result => {
          console.log("Replacement results: ", result);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      let content = `
      <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
              <link rel="stylesheet" type="text/css" href="./css/style.css">
              <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.0/axios.min.js" integrity="sha512-aoTNnqZcT8B4AmeCFmiSnDlc4Nj/KPaZyB5G7JnOnUEkdNpCZs1LCankiYi01sLTyWy+m2P+W4XM+BuQ3Q4/Dg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
              <script type="module">
                  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

                  import Index from './js/index.js'

                  createApp(Index).mount('#app')
              </script>
          </head>
          <body id="app">
          ${req.body.html}
          </body>
        </html>
      `
      fs.writeFileSync(filePath, content, function (err) {
        if (err) return err;
      });
    }
    /* 
    fs.writeFileSync(filePath, htmlContent, function (err) {
        if (err) return err;
    });
    */

    fs.writeFileSync(cssPath, myCss, function (err) {
      if (err) return err;
    });
  })

  // create frontend project
  /// TODO: Import the necessary functions here like createFrontend etc.
  app.post('/publishfront/:name', (req, res) => {
    let projectName = req.params.name;
    // let projectName = req.body.projectName;
    // let projectType = req.body.projectType;
    let tartgetPath = path.join(CURR_DIR, projectName);

    // Call createProject in inquirerPrecss
    if (!createProject(tartgetPath)) {
      return;
    }

    db.defaults({ project: {} })
      .write()
    db.set('project.name', projectName).write()

    // Call createDirectoryContents
    // createDirectoryContents(templatePath, projectName);

    createFrontend(tartgetPath);
    // updateScriptfront(projectName);
  })

  // create backend project
  /// TODO: Import the necessary functions here like createBackend etc.
  app.post('/publishback/:name', (req, res) => {
    let projectName = req.params.name;
    // let projectName = req.body.projectName;
    // let projectType = req.body.projectType;
    let tartgetPath = path.join(CURR_DIR, projectName);

    // Call createProject in inquirerPrecss
    if (!createProject(tartgetPath)) {
      return;
    }

    db.defaults({ project: {} })
      .write()
    db.set('project.name', projectName).write()

    // Call createDirectoryContents
    // createDirectoryContents(templatePath, projectName);

    createBackend(tartgetPath);
    // updateScriptserver(projectName);
  })

  // create fullstack project
  app.post('/publishfull/:name', (req, res) => {
    let projectName = req.params.name;
    // store project name to db.
    // let projectName = req.body.projectName;
    // let projectType = req.body.projectType;
    let tartgetPath = path.join(CURR_DIR, projectName);

    // Call createProject in inquirerPrecss
    if (!createProject(tartgetPath)) {
      return;
    }
    db.defaults({ project: {} })
      .write()
    db.set('project.name', projectName).write()
    // Call createDirectoryContents         
    // createDirectoryContents(templatePath, projectName);
    createFrontend(tartgetPath);
    createBackend(tartgetPath);
    // updateScriptfront(projectName);
    // updateScriptserver(projectName);
  })

  // retrieve project name from db
  app.get('/pname', (req, res) => {
    let projectName = db.get("project.name").value();
    res.send(projectName);
  })

  // delete project from db and disk
  app.delete('/pdelete', (req, res) => {
    let projectName = db.get("project.name").value();
    let tartgetPath = path.join(CURR_DIR, projectName);
    fs.rmdirSync(tartgetPath, { recursive: true, force: true });
    db.unset('project.name').write();
  })
  app.delete('/pagedelete/:id', function (req, res) {
    let id = req.params.id;
    let projectName = db.get("project.name").value();
    let tartgetPath = path.join(CURR_DIR, projectName);
    let filePath = `${tartgetPath}/client/${id}.html`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  })

  const port = 3000;
  app.listen(port);
  console.log(`started server in ${port}`)
}

exports.startServer = startServer;