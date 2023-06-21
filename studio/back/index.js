// Import dependencies
import * as fs from 'fs';
import { fileURLToPath } from 'url'
import createDirectoryContents from './utils/directory.js'
import createProject from './utils/project.js'
import * as path from 'path';
import grapesjs from 'grapesjs'
import fetch from 'node-fetch';
import { Low }  from 'lowdb';
import { JSONFile } from 'lowdb/node'
import asyncHandler from 'express-async-handler';
import bodyParser from 'body-parser';
import express from 'express'

const adapter = new JSONFile('./db.json');
const db = new Low(adapter, { posts: [] });
await db.read();

const { posts } = db.data;

// Declare const for template directory 
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get current directory
const CURR_DIR = process.cwd();

// Add postProcess to inject Grapesjs code
async function postProcess(tempath) {
    let dataVal = await fetch('http://localhost:3000/pageOne').then(response => { return response.json() })    // this dummy value works now to append one page.
    let editor = grapesjs.init({ headless: true });
    console.log(dataVal)
    editor.loadData(dataVal)
    let mainPage = `<template>${editor.getHtml()}</template> <style></style>`
    fs.appendFileSync(`${tempath}/src/views/Home.vue`, mainPage, (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    });

    // write import into router's index.js
    var data = fs.readFileSync(`${tempath}/src/router/index.js`).toString().split("\n")
    let name = 'About'
    data.splice(0, 0, `import ${name}` + ` from '../views/${name}'`);
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
        path: '/',
        name: ${name},
        component: ${name}
    },
    `
    data.splice(lineNum, 0, value);
    var text = data.join("\n");

    fs.writeFileSync(`${tempath}/src/router/index.js`, text, function (err) {
        if (err) return err;
    });

    // this will be useful https://stackoverflow.com/questions/23036918/in-node-js-how-to-read-a-file-append-a-string-at-a-specified-line-or-delete-a


    return true;
}

var app = express();

/* CRUD Request for db */
app.use(bodyParser.json());

app.post('/save', asyncHandler(async (req, res) => {
    const data = req.body;
    data.id = String(posts.length + 1)
    //this can be tested with postman
    posts.push(data);
    await db.write();
    res.json(data)
}));

app.get('/db/:id', asyncHandler(async (req, res) => {
    const post = posts.find((p) => p.id === req.params.id)
    res.send(post)
}))

app.post('/publish', (req, res) => {
    let projectName = req.body.projectName;
    let projectType = req.body.projectType;
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
