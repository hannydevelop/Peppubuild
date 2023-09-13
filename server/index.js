// Import dependencies
import * as fs from 'fs';
import { fileURLToPath } from 'url'
import createProject from './utils/project.js'
import * as path from 'path';
import grapesjs from 'grapesjs'
import fetch from 'node-fetch';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync.js'
import bodyParser from 'body-parser';
import express from 'express'
import cors from 'cors'
import PackageJson from '@npmcli/package-json'
import replaceInFile from 'replace-in-file';

const adapter = new FileSync('db.json')
const db = low(adapter)

// Declare const for template directory 
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get current directory
const CURR_DIR = path.join(process.cwd(), '..');
// Bootstrap Frontend Structure.
const pkgJson = await PackageJson.load(`${CURR_DIR}`);



async function updateScriptfront(name) {
    pkgJson.update({
        scripts: {
            ...pkgJson.content.scripts,
            'projectf-start': `cd ${name}/client; npx serve`,
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
    // const package_json = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/node/package.json');
    // Get the Blob data
    // const json = await package_json.text();
    const json = fs.readFileSync(`${CURR_DIR}/server/template/node/package.json`, "utf-8");
    fs.writeFileSync(`${tempath}/server/package.json`, json, function (err) {
        if (err) return err;
    });

    // gen outer package.json()
    // const package_json_outer = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/package.json');
    // Get the Blob data
    const json_file = fs.readFileSync(`${CURR_DIR}/server/template/package.json`, "utf-8");
    fs.writeFileSync(`${tempath}/package.json`, json_file, function (err) {
        if (err) return err;
    });

    // gen gitignore
    // const gitignore_file = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/node/.gitignore');
    // Get the Blob data
    const gitignore = fs.readFileSync(`${CURR_DIR}/server/template/node/.gitignore`, "utf-8");
    fs.writeFileSync(`${tempath}/server/.gitignore`, gitignore, function (err) {
        if (err) return err;
    });

    // gen index.js
    // const index_file = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/node/index.js');
    // Get the Blob data
    const index = fs.readFileSync(`${CURR_DIR}/server/template/node/index.js`, "utf-8");
    fs.writeFileSync(`${tempath}/server/index.js`, index, function (err) {
        if (err) return err;
    });

    // gen index.js
    fs.mkdirSync(`${tempath}/server/controllers`)

    // Gen welcome controller
    // let welcome_content = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/node/controllers/welcome.js');
    const welcome = fs.readFileSync(`${CURR_DIR}/server/template/node/controllers/welcome.js`, "utf-8");
    fs.writeFileSync(`${tempath}/server/controllers/welcome.js`, welcome, function (err) {
        if (err) return err;
    });

}

// Save Frontend changes.
async function createFrontend(tempath) {
    // create client folder.
    fs.mkdirSync(`${tempath}/client`)
    // gen package.json()
    // const package_json = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/webpack/package.json');
    // Get the Blob data
    const json = fs.readFileSync(`${CURR_DIR}/server/template/webpack/package.json`, "utf-8");

    fs.writeFileSync(`${tempath}/client/package.json`, json, function (err) {
        if (err) return err;
    });

    // gen outer package.json()
    // const package_json_outer = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/package.json');
    // Get the Blob data
    const json_file = fs.readFileSync(`${CURR_DIR}/server/template/package.json`, "utf-8");
    fs.writeFileSync(`${tempath}/package.json`, json_file, function (err) {
        if (err) return err;
    });

    // gen gitignore
    // const gitignore_file = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/webpack/.gitignore');
    // Get the Blob data
    const gitignore = fs.readFileSync(`${CURR_DIR}/server/template/webpack/.gitignore`, "utf-8");
    fs.writeFileSync(`${tempath}/client/.gitignore`, gitignore, function (err) {
        if (err) return err;
    });

    // gen index.js
    fs.mkdirSync(`${tempath}/client/css`)
    fs.mkdirSync(`${tempath}/client/js`)

    let index_content = `

    export default {
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
    let editor = grapesjs.grapesjs.init({
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
            <body>
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

var app = express();

/* CRUD Request for db */
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors({ origin: "*" }));

// Get all pages in an existing project.
app.get('/projects', (req, res) => {
    const projects = db.get("pages").value();
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
    res.json("successfully saved project");
    // push the changes into webpack project.
    // where tempath is name of project.
    let projectName = db.get("project.name").value();
    let tempath = path.join(CURR_DIR, projectName);
    let filePath = `${tempath}/client/${id}.html`;
    let cssPath = `${tempath}/client/css/style.css`;

    let pages = db.get("pages").value();
    let editor = grapesjs.grapesjs.init({
        headless: true, pageManager: {
            pages: pages
        }
    });

    let htmlContent = `
    <body id="app">
    ${editor.Pages.get(id).getMainComponent().toHTML()}
    </body>
    `
    let myCss = editor.getCss();
    let regex = new RegExp('<body>(.|\n)*?<\/body>')
    const options = {
        files: filePath,
        from: regex,
        to: htmlContent
    };

    replaceInFile(options)
        .then(result => {
            console.log("Replacement results: ", result);
        })
        .catch(error => {
            console.log(error);
        });
    /* 
    fs.writeFileSync(filePath, htmlContent, function (err) {
        if (err) return err;
    });
    */

    fs.writeFileSync(cssPath, myCss, function (err) {
        if (err) return err;
    });
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

    db.defaults({ project: {} })
        .write()
    db.set('project.name', projectName).write()

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

    db.defaults({ project: {} })
        .write()
    db.set('project.name', projectName).write()

    // Call createDirectoryContents
    // createDirectoryContents(templatePath, projectName);

    createBackend(tartgetPath);
    updateScriptserver(projectName);
})

// publish full
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
    updateScriptfront(projectName);
    updateScriptserver(projectName);
})


/*
// create server api.
// search for api name in controller. If not found, create filename in controller.
// now, initialise supabase and add api into it.
 */

app.post('/creapi/:apiname', (req, res) => {
    // get project name
    let projectName = db.get("project.name").value();

    // get server targetpath
    // get controller folder-file path.
    let controllerFile = req.params.apiname;
    let apiPath = path.join(CURR_DIR, projectName, 'server', 'controllers', `${controllerFile}.js`);
    if (fs.existsSync(apiPath)) {
        fs.appendFileSync(apiPath, req.body.data, function (err) {
            if (err) return err;
        });
    } else {
        let createPath = fs.createWriteStream(apiPath);
        let controllerData = `
        const express = require('express');

        var supabaseClient = require('@supabase/supabase-js')
        require('dotenv').config()

        // Create a single supabase client for interacting with your database
        const supabase = supabaseClient.createClient(process.env.URL, process.env.ANON_KEY)

        //set variable users as expressRouter
        var ${controllerFile}controller = express.Router();
    
        ${req.body.data}

        module.exports = ${controllerFile}controller;
        `

        createPath.write(controllerData, function (err) {
            if (err) return err;
        })
        // write into file.
        // createPath.write(text)
        // write into index.js   
    }

    // go to index.js file and add path to the controller file.
    let indexPath = path.join(CURR_DIR, projectName, 'server', 'index.js');
    var data = fs.readFileSync(indexPath).toString().split("\n");
    data.splice(0, 0, `const ${controllerFile}controller = require('./controllers/${controllerFile}');`);
    var text = data.join("\n");
    fs.writeFileSync(indexPath, text, function (err) {
        if (err) return err;
    })
    let indexText = `
    app.use('/${controllerFile}', ${controllerFile}controller);
    `
    fs.appendFileSync(indexPath, indexText, function (err) {
        if (err) return err;
    });

})

app.post('/conapi', (req, res) => {
    let projectName = db.get("project.name").value();
    let tempath = path.join(CURR_DIR, projectName);
    let jsPath = `${tempath}/client/js/index.js`;

    let method_dummy = `/*Insert Methods Here*/`;
    let method_data = `
    /*Insert Methods Here*/
    ${req.body.data}`;
    const options = {
        files: jsPath,
        from: [method_dummy],
        to: [method_data]
    };

    replaceInFile(options)
        .then(result => {
            console.log("Replacement results: ", result);
        })
        .catch(error => {
            console.log(error);
        });
    fs.appendFileSync(jsPath, req.body.data, function (err) {
        if (err) return err;
    });
})

app.post('/createdb', (req, res) => {
    let anon_key = req.body.anon_key;
    let url = req.body.url;
    db.defaults({ db: {} })
        .write()
    db.set('db.anon_key', anon_key).write();
    db.set('db.url', url).write();
})

app.get('/dbanon', (req, res) => {
    let anon_key = db.get("db.anon_key").value();
    res.send(anon_key);
})

app.get('/dburl', (req, res) => {
    let url = db.get("db.url").value();
    res.send(url);
})

app.get('/pname', (req, res) => {
    let projectName = db.get("project.name").value();
    res.send(projectName);
})

app.post('/request/:type', (req, res) => {
    let reqType = req.params.type;
    db.defaults({ get: [], post: [], delete: [], update: [] })
        .write();
    if (reqType == 'full') {
        db.get('get').push(
            {
                "name": req.body.name,
                "description": req.body.description,
                "path": req.body.path,
                // "reqBody": req.body.reqbody
            }).write();
        db.get('post').push(
            {
                "name": req.body.name,
                "description": req.body.description,
                "path": req.body.path,
                // "reqBody": req.body.reqbody
            }).write();
        db.get('delete').push(
            {
                "name": req.body.name,
                "description": req.body.description,
                "path": req.body.path,
                // "reqBody": req.body.reqbody
            }).write();
        db.get('update').push(
            {
                "name": req.body.name,
                "description": req.body.description,
                "path": req.body.path,
                // "reqBody": req.body.reqbody
            }).write();
    } else if (reqType == 'create') {
        db.get('post').push(
            {
                "name": req.body.name,
                "description": req.body.description,
                "path": req.body.path,
                // "reqBody": req.body.reqbody
            }).write();
    } else if (reqType == 'read') {
        db.get('get').push(
            {
                "name": req.body.name,
                "description": req.body.description,
                "path": req.body.path,
                // "reqBody": req.body.reqbody
            }).write();
    } else if (reqType == 'update') {
        db.get('update').push(
            {
                "name": req.body.name,
                "description": req.body.description,
                "path": req.body.path,
                // "reqBody": req.body.reqbody
            }).write();
    } else if (reqType == 'delete') {
        db.get('delete').push(
            {
                "name": req.body.name,
                "description": req.body.description,
                "path": req.body.path,
                // "reqBody": req.body.reqbody
            }).write();
    }
})

app.get('/apis/:type', (req, res) => {
    let reqType = req.params.type;
    if (reqType == 'create') {
        let data = db.get("get").value();
        res.send(data)
    } else if (reqType == 'read') {
        let data = db.get("post").value();
        res.send(data)
    } else if (reqType == 'update') {
        let data = db.get("update").value();
        res.send(data)
    } else if (reqType == 'delete') {
        let data = db.get("delete").value();
        res.send(data)
    }
})

app.post('/calldata', (req, res) => {
    // get file path;
    let projectName = db.get("project.name").value();
    let tempath = path.join(CURR_DIR, projectName);
    let filePath = `${tempath}/client/js/index.js`;
    // add data fetch to onmount (i.e this.data = fetch())
    let mounted_dummy = '/*Insert Mounted Here*/'
    let return_dummy = '/*Insert Data Here*/'
    //
    let mounted_data = `
    /*Insert Mounted Here*/
    let this.${req.body.parent} = await fetch(``${req.body.path}``).then(response => { return response.json() });
    `
    let return_data = `
    /*Insert Data Here*/
    ${res.body.parent}: []
    `

    const options = {
        files: filePath,
        from: [mounted_dummy, return_dummy],
        to: [mounted_data, return_data]
    };

    replaceInFile(options)
        .then(result => {
            console.log("Replacement results: ", result);
        })
        .catch(error => {
            console.log(error);
        });
    // add data to return (i.e data = [])
})

app.listen(4000, () => console.log('server started successfully at port : 4000....'));
