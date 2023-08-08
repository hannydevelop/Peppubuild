// Import dependencies
import * as fs from 'fs';
import { fileURLToPath } from 'url'
import createDirectoryContents from './utils/directory.js'
import createProject from './utils/project.js'
import * as path from 'path';
import grapesjs from 'grapesjs'
import fetch from 'node-fetch';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync.js'
import bodyParser from 'body-parser';
import express from 'express'
import cors from 'cors'
import axios from 'axios';
import PackageJson from '@npmcli/package-json'

const adapter = new FileSync('db.json')
const db = low(adapter)

// Declare const for template directory 
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get current directory
const CURR_DIR = path.join(process.cwd(), '..');
// Bootstrap Frontend Structure.
const pkgJson = await PackageJson.load(`${CURR_DIR}`)

async function updateScriptfront(name) {
    pkgJson.update({
        scripts: {
          ...pkgJson.content.scripts,
          'projectf-start': `cd ${name}/client; webpack-dev-server`,
        }
      })
      
    await pkgJson.save();
}

async function updateScriptserver(name) {
    pkgJson.update({
        scripts: {
          ...pkgJson.content.scripts,
          "projectb-start": `cd ${name}/server; node index.js`,
        }
      })
      
    await pkgJson.save();
}

// Save Frontend changes.
async function createBackend(tempath) {
    // gen server folder
    // gen index.js
    fs.mkdirSync(`${tempath}/server`)

    // gen package.json()
    const package_json = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/node/package.json');
    // Get the Blob data
    const json = await package_json.text()
    fs.writeFileSync(`${tempath}/server/package.json`, json, function (err) {
        if (err) return err;
    });

    // gen outer package.json()
    const package_json_outer = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/package.json');
    // Get the Blob data
    const json_file = await package_json_outer.text()
    fs.writeFileSync(`${tempath}/package.json`, json_file, function (err) {
        if (err) return err;
    });

    // gen gitignore
    const gitignore_file = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/node/.gitignore');
    // Get the Blob data
    const gitignore = await gitignore_file.text()
    fs.writeFileSync(`${tempath}/server/.gitignore`, gitignore, function (err) {
        if (err) return err;
    });

    // gen index.js
    const index_file = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/node/index.js');
    // Get the Blob data
    const index = await index_file.text()
    fs.writeFileSync(`${tempath}/server/index.js`, index, function (err) {
        if (err) return err;
    });

    // gen index.js
    fs.mkdirSync(`${tempath}/server/controllers`)
  
    // Gen welcome controller
    let welcome_content = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/node/controllers/welcome.js');
    const welcome = await welcome_content.text()
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
    const json = await package_json.text()
    fs.writeFileSync(`${tempath}/client/package.json`, json, function (err) {
        if (err) return err;
    });

    // gen outer package.json()
    const package_json_outer = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/package.json');
    // Get the Blob data
    const json_file = await package_json_outer.text()
    fs.writeFileSync(`${tempath}/package.json`, json_file, function (err) {
        if (err) return err;
    });

    // gen webpack config
    const webpack_config = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/webpack/webpack.config.js');
    // Get the Blob data
    const webpack = await webpack_config.text()
    fs.writeFileSync(`${tempath}/client/webpack.config.js`, webpack, function (err) {
        if (err) return err;
    });

    // gen gitignore
    const gitignore_file = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/webpack/.gitignore');
    // Get the Blob data
    const gitignore = await gitignore_file.text()
    fs.writeFileSync(`${tempath}/client/.gitignore`, gitignore, function (err) {
        if (err) return err;
    });

    // gen index.js
    fs.mkdirSync(`${tempath}/client/dist`)
    fs.mkdirSync(`${tempath}/client/dist/css`)
    fs.mkdirSync(`${tempath}/client/src`)
    let index_content = "";
    fs.writeFileSync(`${tempath}/client/src/index.js`, index_content, function (err) {
        if (err) return err;
    });

 
    // gen html and css files.
    let pages = await fetch('http://localhost:4000/projects').then(response => { return response.json() })   // this dummy value works now to append one page.
    let editor = grapesjs.grapesjs.init({
        headless: true, pageManager: {
            pages: pages
        }
    });
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
            </head>
            ${html}
          </html>`
        fs.writeFileSync(`${tempath}/client/dist/${name}.html`, htmlContent, function (err) {
            if (err) return err;
        });
        fs.writeFileSync(`${tempath}/client/dist/css/style.css`, myCss += css, function (err) {
            if (err) return err;
        });
    })
}

// Add postProcess to inject Grapesjs code
async function postProcess(tempath) {
    let pagesd = await fetch('http://localhost:4000/projects').then(response => { return response.json() })   // this dummy value works now to append one page.
    let editor = grapesjs.grapesjs.init({
        headless: true, pageManager: {
            pages: pagesd
        }
    });
    editor.Pages.getAll().forEach(e => {
        const name = e.id
        const component = e.getMainComponent()
        const html = editor.getHtml({ component });
        const css = editor.getCss({ component });
        let mainPage = `
        <template>${html})}</template>
        <script></script>
        <style>${css}</style>
        `
        fs.appendFileSync(`${tempath}/src/views/${name}.vue`, mainPage, (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });

        // write import into router's index.js
        var data = fs.readFileSync(`${tempath}/src/router/index.js`).toString().split("\n")
        data.splice(0, 0, `import ${name}` + ` from '../views/${name}.vue'`);
        var text = data.join("\n");

        fs.writeFileSync(`${tempath}/src/router/index.js`, text, function (err) {
            if (err) return err;
        });

        // write routes into router's index.js
        // make this a function and return line number
        let file = fs.readFileSync(`${tempath}/src/router/index.js`, "utf8");
        let arr = file.split(/\r?\n/);
        let lineNum = 0;
        arr.forEach((line, idx) => {
            if (line.includes("routes: [")) {
                lineNum = idx + 1;
            }
        });
        var data = fs.readFileSync(`${tempath}/src/router/index.js`).toString().split("\n");
        let value =
            `
        {
            path: '/${name}',
            name: ${name},
            component: ${name}
        },
        `
        data.splice(lineNum, 0, value);
        var text = data.join("\n");

        fs.writeFileSync(`${tempath}/src/router/index.js`, text, function (err) {
            if (err) return err;
        });
    })


    return true;
}


var app = express();

/* CRUD Request for db */
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

// Get all pages in an existing project.
app.get('/projects', (req, res) => {
    const projects = db.get("pages").value()
    res.send(projects)
})

// Add a new page to existing project.
app.post('/add', (req, res) => {
    const project = req.body;
    db.get("pages").push(project).write();
    res.json("successfully added page")
})

// Edit a post
app.put('/save/:id', (req, res) => {
    let id = req.params.id;
    db.get("pages").find({ id: id }).assign({ styles: req.body.styles, component: req.body.component }).write();
    res.json("successfully saved project")
})

// Delete a page from an existing project
app.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    db.get("pages").remove({ id: id }).write();
    res.json("successfully deleted project")
})
/* 
// index.js
app.get("/auth", (req, res) => {
    // Store parameters in an object
    const params = {
        scope: "repo",
        client_id: '096081ee1cd4643253a7',
    };

    // Convert parameters to a URL-encoded string
    const urlEncodedParams = new URLSearchParams(params).toString();
    res.redirect(`https://github.com/login/oauth/authorize?${urlEncodedParams}`);
});

// index.js
app.get("/github-callback", async (req, res) => {
    const { code } = req.query;

    const body = {
        client_id: '096081ee1cd4643253a7',
        client_secret: '84626fb811829b95e63680184015668d63e29192',
        code,
    };

    let accessToken;
    const options = { headers: { accept: "application/json" } };

    // let repo_name = prompt('What would you like to name your repository');

    await axios
        .post("https://github.com/login/oauth/access_token", body, options)
        .then((response) => response.data.access_token)
        .then((token) => {
            accessToken = token;
            axios({
                method: 'POST',
                url: 'https://api.github.com/user/repos',
                headers: { 'Authorization': `Bearer ${token}` },
                data: { "name": 'mod' }
            }).then(response => {
                axios({
                    method: 'PUT',
                    url: `https://api.github.com/repos/${response.data.owner.login}/${response.data.name}/contents/`,
                    headers: { 'Authorization': `Bearer ${token}` },
                    data: { "content": 'bXkgbmV3IGZpbGUgY29udGVudHM=', "message": "initial commit" }
                })
                // create url to store username and repo name in db.
            })
        })
        .catch((err) => res.status(500).json({ err: err.message }));
        
});
*/

// publish front
app.post('/publishfront/:name', (req, res) => {
    let projectName = req.params.name;
    // let projectName = req.body.projectName;
    // let projectType = req.body.projectType;
    let tartgetPath = path.join(CURR_DIR, projectName);

    // Call createProject in inquirerPrecss
    if (!createProject(tartgetPath)) {
        return;
    }

    // Call createDirectoryContents
    // createDirectoryContents(templatePath, projectName);

    createFrontend(tartgetPath);
    updateScriptfront(projectName);
})

// publish back
app.post('/publishback/:name', (req, res) => {
    let projectName = req.params.name;
    // let projectName = req.body.projectName;
    // let projectType = req.body.projectType;
    let tartgetPath = path.join(CURR_DIR, projectName);

    // Call createProject in inquirerPrecss
    if (!createProject(tartgetPath)) {
        return;
    }

    // Call createDirectoryContents
    // createDirectoryContents(templatePath, projectName);

    createBackend(tartgetPath);
    updateScriptserver(projectName);
})

// publish full
app.post('/publishfull/:name', (req, res) => {
    let projectName = req.params.name;
    // let projectName = req.body.projectName;
    // let projectType = req.body.projectType;
    let tartgetPath = path.join(CURR_DIR, projectName);

    // Call createProject in inquirerPrecss
    if (!createProject(tartgetPath)) {
        return;
    }

    // Call createDirectoryContents
    // createDirectoryContents(templatePath, projectName);
    createFrontend(tartgetPath);
    createBackend(tartgetPath);
    updateScriptfront(projectName);
    updateScriptserver(projectName);
})

app.get('/test', (req, res) => {
    let name = 'meer'
    pkgJson.update({
        scripts: {
          ...pkgJson.content.scripts,
          'projectf-start': `cd ${name}; webpack-dev-server`,
          "projectb-start": `cd ${name}; node index.js`,
        }
      })
      
    pkgJson.save();
})

/*
// create server api.
// search for api name in controller. If not found, create filename in controller.
// now, initialise supabase and add api into it.
 */

app.listen(4000, () => console.log('server started successfully at port : 4000....'));
