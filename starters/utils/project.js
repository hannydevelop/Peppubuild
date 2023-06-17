import * as fs from 'fs';
import chalk from 'chalk';

// Create project folder with path
export default function createProject(projectPath) {
    // Check if project path already exists
    if (fs.existsSync(projectPath)) {
        console.log(chalk.red(`Folder ${projectPath} exists. Delete or use another name.`));
        return false;
    }
    // Create folder if path doesn't exist
    fs.mkdirSync(projectPath);

    return true;
}