import createDirectoryContents  from './utils/directory.js'
import createProject from './utils/project.js'
import { fileURLToPath } from 'url'
import * as path from 'path';

// Get current directory
const CURR_DIR = process.cwd();
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let tartgetPath = path.join(CURR_DIR, 'peppubuild');
let templatePath = path.join(__dirname, 'webpack');
// Call createProject in inquirerPrecss
createProject(tartgetPath)

// Call createDirectoryContents
createDirectoryContents(templatePath, 'peppubuild');