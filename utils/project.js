"use strict";
exports.__esModule = true;
exports.createProject = void 0;
var fs = require('fs');

// Create project folder with path
function createProject(projectPath) {
    // Check if project path already exists
    if (fs.existsSync(projectPath)) {
        console.log(`Folder ${projectPath} exists. Delete or use another name.`);
        return false;
    }
    // Create folder if path doesn't exist
    fs.mkdirSync(projectPath);

    return true;
}
exports.createProject = createProject;