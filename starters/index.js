#!/usr/bin/env node
// Import dependencies
import * as fs from 'fs';
import { fileURLToPath } from 'url'
import createDirectoryContents  from './utils/directory.js'
import createProject from './utils/project.js'
import * as path from 'path';
import * as inquirer from 'inquirer';
import { Command } from 'commander';
import grapesjs from 'grapesjs'
import fetch from 'node-fetch';

const program = new Command();

// Declare const for template directory 
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const CHOICES = fs.readdirSync(path.join(__dirname, 'templates'));

const QUESTIONS = [
    {
        name: 'template',
        type: 'list',
        message: 'What project template would you like to generate?',
        choices: CHOICES
    },
    {
        name: 'name',
        type: 'input',
        message: 'Project name:'
    }];

// path to package.json to pick version and other information
const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf8'));

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

program
    .description('CLI to manage Peppubuild visual editor')
    .version(packageJson.version)

program
    .command('publish')
    .description('Publish new repository')
    .action(() => {
        const inquirerPrecss = inquirer.createPromptModule();
        inquirerPrecss(QUESTIONS).then(answers => {
            const projectChoice = answers['template'];
            const projectName = answers['name'];
            const templatePath = path.join(__dirname, 'templates', projectChoice);
            const tartgetPath = path.join(CURR_DIR, projectName);

            // Call createProject in inquirerPrecss
            if (!createProject(tartgetPath)) {
                return;
            }

            // Call createDirectoryContents
            createDirectoryContents(templatePath, projectName);

            postProcess(tartgetPath);
        });
    });

program
    .command('install')
    .description('Install the peppubuild folder')
    .action(() => {
        let tartgetPath = path.join(CURR_DIR, 'peppubuild');
        let templatePath = path.join(__dirname, 'webpack');

        // Call createProject in inquirerPrecss
        if (!createProject(tartgetPath)) {
            return;
        }

        // Call createDirectoryContents
        createDirectoryContents(templatePath, 'peppubuild');
    });

program.parse();
