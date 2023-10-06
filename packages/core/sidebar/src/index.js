import { PagesApp, SettingsApp } from './manager';
import commands from './commands';
import en from './locale/en';

export default (editor, opts = {}) => {
    const options = {
        ...{
            // default options
            // Allow migration of projects using deprecated storage prefix
            legacyPrefix: '',
            // Database name
            dbName: 'gjs',

            // Collection name
            objectStoreName: 'projects',

            // Load first template in storage
            loadFirst: true,

            // Confirm delete project
            confirmDeleteProject() {
                return confirm('Are you sure to delete this project')
            },

            // Confirm delete page
            confirmDeletePage() {
                return confirm('Are you sure to delete this page')
            },

            // When template or page is deleted
            onDelete(res) {
                console.log('Deleted:', res)
            },

            // Handle promise from delete
            onDeleteAsync(del) {
                return del;
            },

            i18n: {},
        },
        ...opts,
    };

    editor.I18n.addMessages({
        en,
        ...options.i18n,
    });

    // Init and add dashboard object to editor
    editor.PagesApp = new PagesApp(editor, options);
    editor.SettingsApp = new SettingsApp(editor, options);

    // Load commands
    commands(editor, options);

    const cm = editor.Commands;

    // Load page with index zero
    editor.on('load', async () => {
        let gjsProject = localStorage.getItem('gjsProject');
        let projectName = await editor.PagesApp.getProjectName();
        if (projectName) {
            localStorage.setItem("projectName", projectName)
        }
      if (gjsProject) {
        return;
      } else {
        let data = await editor.PagesApp.getProject();
        localStorage.setItem("gjsProject", JSON.stringify(data));
        location.reload();      }
    });
};