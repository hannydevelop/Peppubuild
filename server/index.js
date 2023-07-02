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

const adapter = new FileSync('db.json')
const db = low(adapter)

// Declare const for template directory 
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get current directory
const CURR_DIR = process.cwd();

// Add postProcess to inject Grapesjs code
async function postProcess(tempath) {
    let pagesd = await fetch('http://localhost:4000/projects').then(response => { return response.json() })   // this dummy value works now to append one page.
    let editor = grapesjs.init({ headless: true, pageManager: {
        pages: pagesd
    }});
    editor.Pages.getAll().forEach(e => {
        const name = e.id
        const component = e.getMainComponent()
        const html = editor.getHtml({ component });
        const css = editor.getCss({ component });
        let mainPage =  `
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


app.post('/publish', (req, res) => {
    let projectName = 'Vue';
    // let projectName = req.body.projectName;
    let projectType = 'Vue';
    // let projectType = req.body.projectType;
    let tartgetPath = path.join(CURR_DIR, projectName);
    let templatePath = path.join(__dirname, 'templates', projectType);

    // Call createProject in inquirerPrecss
    if (!createProject(tartgetPath)) {
        return;
    }

    // Call createDirectoryContents
    createDirectoryContents(templatePath, projectName);

    postProcess(tartgetPath);
})

app.listen(4000, () => console.log('server started successfully at port : 4000....'));
