import UI from '../utils/ui';
import swal from 'sweetalert';

export default class PagesApp extends UI {
    constructor(editor, opts = {}) {
        super(editor, opts);
        this.addPage = this.addPage.bind(this);
        this.addProject = this.addProject.bind(this);
        this.loadProject = this.loadProject.bind(this);
        this.selectPage = this.selectPage.bind(this);
        this.removePage = this.removePage.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.createPublish = this.createPublish.bind(this);
        this.saveProject = this.saveProject.bind(this);
        this.getProject = this.getProject.bind(this);
        this.getProjectName = this.getProjectName.bind(this);
        this.openDelete = this.openDelete.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.deletePage = this.deletePage.bind(this)
        this.readText = this.readText.bind(this)

        /* Set initial app state */
        this.state = {
            editablePageId: '',
            isShowing: true,
            nameText: '',
            pages: [],
            loading: false,
            projectName: ''
        };
    }

    get editableId() {
        return this.state.editablePageId;
    }

    onRender() {
        // this.pm.getMain().id = 'home';
        const { pm, setState, editor } = this;
        setState({
            loading: true
        });
        setState({
            pages: [...pm.getAll()]
        });
        editor.on('page', () => {
            setState({
                pages: [...pm.getAll()]
            })
        });
        setState({
            loading: false
        });
    }

    isSelected(page) {
        const { editor } = this;
        editor.Pages.getAll().forEach(e => {
            const name = e.id
            const component = e.getMainComponent()
            const html = editor.getHtml({ component });
            const css = editor.getCss({ component });
        })
        return this.pm.getSelected().id === page.id;
    }

    selectPage(e) {
        this.pm.select(e.currentTarget.dataset.key);
        this.update();
    }

    removePage(e) {
        if (this.opts.confirmDeletePage()) {
            this.pm.remove(e.currentTarget.dataset.key);
            this.deletePage(e.currentTarget.dataset.key);
            this.update();
        }
    }

    deleteProject() {
        const { editor } = this;
        localStorage.removeItem("projectName");
        try {
            fetch(`${editor.I18n.t('peppu-sidebar.project.url')}/pdelete`, {
                method: "DELETE", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                if (!response.ok) {
                    swal("Error", `Slow internet detected`, "error")
                } else {
                    swal("Successful!", "Deleted Project", "success");
                }
            })
        } catch { swal("Error", "An error occurred", "error") }
    }

    deletePage(id) {
        const { editor } = this;
        try {
            fetch(`${editor.I18n.t('peppu-sidebar.project.url')}/pagedelete/${id}`, {
                method: "DELETE", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                if (!response.ok) {
                    swal("Error", `Slow internet detected`, "error")
                } else {
                    swal("Successful!", "Deleted Page", "success");
                }
            })
        } catch { swal("Error", "An error occurred", "error") }
    }

    openDelete(e) {
        if (this.opts.confirmDeleteProject()) {
            if (this.state.projectName) {
                this.state.projectName = null
                this.deleteProject();
            }
            else if (localStorage.getItem("projectName") != null) {
                this.deleteProject();
            }

            // this.pm.remove(e.currentTarget.dataset.key);
            // call delete in localhost and possibly db
            this.update();
        }
    }

    openEdit(e) {
        const { editor } = this;
        this.setStateSilent({
            editablePageId: e.currentTarget.dataset.key
        });
        editor.Modal.close();
        editor.SettingsApp.setTab('page');
        editor.runCommand('open-settings');
    }

    editPage(id, name) {
        const currentPage = this.pm.get(id);
        currentPage?.set('id', name);
        this.update()
    }

    addPage() {
        const { pm } = this;
        const { nameText } = this.state
        if (!nameText) return;
        pm.add({
            id: nameText,
            component: ''
        });
        this.update();
    }

    createPublish(value) {
        const { editor } = this;
        let name = this.state.projectName;
        let data = fetch(`${editor.I18n.t('peppu-sidebar.project.url')}/${value}/${name}`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
        })
        return data;
    }

    saveProject() {
        const { editor } = this;
        let gjsProject = localStorage.getItem('gjsProject');
        let id = this.pm.getSelected().id;
        let html = editor.Pages.get(id).getMainComponent().toHTML();
        let css = editor.getCss()
        try {
            fetch(`${editor.I18n.t('peppu-sidebar.project.url')}/save/${id}`, {
                method: "PUT", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ gjsProject: gjsProject, html: html, css: css }),
            }).then((response) => {
                if (response.ok) {
                    swal("Successful!", "Saved Project", "success");
                }
            })
        } catch { swal("Error", "An error occurred", "error") }
    }

    async getProject() {
        const { editor } = this;
        let data = await fetch(`${editor.I18n.t('peppu-sidebar.project.url')}/projects`).then(response => { return response.json() });
        return data;
    }

    async getProjectName() {
        const { editor } = this;
        let data = fetch(`${editor.I18n.t('peppu-sidebar.project.url')}/pname`).then(response => { return response.text() });
        return data;
    }

    addProject() {
        swal("What would you like to name this project?", {
            content: "input",
        }).then((name) => {
            localStorage.setItem("projectName", name);
            this.state.projectName = name;
            swal("What type of project will you like to create", {
                buttons: {
                    front: {
                        text: "Frontend",
                        value: "publishfront",
                    },
                    /* 
                    back: {
                        text: "Backend",
                        value: "publishback",
                    },
                    defeat: {
                        text: "Fullstack",
                        value: "publishfull",
                    }
                    */
                },
            })
                .then((value) => {
                    switch (value) {
                        case "publishfront":
                            try {
                                this.createPublish(value).then(async (response) => {
                                    let text = await response.text();
                                    let json = JSON.parse(text);
                                    console.log(json.ok)
                                    if (json.success) {
                                        swal("Successful!", "Created Project", "success");
                                    } else swal("Error", json.error, 'error');
                                })
                            } catch (error) {
                                swal("Error", "An error occurred", 'error');
                            }
                            break;

                        /* 
                        case "publishback":
                            try {
                                this.createPublish(value);
                                swal("Successful!", "Backend bootstrapped", "success");
                            } catch (error) {
                                swal("Error", "An error occurred", error);
                            }
                            break;
    
                        case "publishfull":
                            try {
                                this.createPublish(value);
                                swal("Successful!", "Fullstack bootstrapped", "success");
                            } catch (error) {
                                swal("Error", "An error occurred", "error");
                            }
                            break;
                        */

                        default:

                    }
                });
            this.update();
        });
    }

    loadProject() {
        // allow users choose the folder of choice.
        // look for db.json file in the root of the folder.
        // save the gjsProject in localhost.
        // call reload.
        // reference: index line 72 - 74
    }

    async readText(event) {
        const file = event.target.files.item(0)
        const text = await file.text();
        const { editor } = this;
     
        editor.loadProjectData(JSON.parse(text))
    }

    handleNameInput(e) {
        this.setStateSilent({
            nameText: e.target.value.trim()
        })
    }

    renderPagesList() {
        const { pages, loading } = this.state;
        const { opts, isSelected } = this;

        if (loading) return opts.loader || '<div>Loading pages...</div>';

        return pages.map((page, i) => `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <div 
                data-id="${i}" 
                data-key="${page.get('private') ? '' : (page.id || page.get('name'))}"  
                class="page ${isSelected(page) ? 'selected' : ''}"
            >
                <i class="fa fa-file-o" style="margin:5px;"></i>
                ${page.get('name') || page.id}
                ${isSelected(page) || page.get('internal') ? '' : `<span class="page-close" data-key="${page.id || page.get('name')}">&Cross;</span>`}
                ${page.get('internal') ? '' : `<span class="page-edit" data-key="${page.id || page.get('name')}"><i class="fa fa-pencil"></i></span>`}
            </div>`).join("\n");
    }

    renderProject() {
        if (!this.state.projectName && localStorage.getItem("projectName") != null) {
            return `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <span class="project-text"><i class="fa fa-folder-o" style="margin:5px;"></i>${localStorage.getItem("projectName")}</span>
            <span class="p-delete"><i class="fa fa-trash" style="margin:5px;"></i></span>`
        } else if (this.state.projectName) {
            return `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <span class="project-text"><i class="fa fa-folder-o" style="margin:5px;"></i>${this.state.projectName}</span>
            <span class="p-delete"><i class="fa fa-trash" style="margin:5px;"></i></span>
            `;
        } else {
            return 'No project yet'
        }
        // console.log(localStorage.getItem('projectName'))
        // return localStorage.getItem('projectName');
        // return this.state.projectName
    }

    update() {
        this.$el?.find('.pages').html(this.renderPagesList());
        this.$el?.find('.project').html(this.renderProject());
        this.$el?.find('.page').on('click', this.selectPage);
        this.$el?.find('.page-edit').on('click', this.openEdit);
        this.$el?.find('.page-close').on('click', this.removePage);
        this.$el?.find('.p-delete').on('click', this.openDelete);
    }

    render() {
        const { $, editor } = this;

        // Do stuff on render
        this.onRender();
        this.$el?.remove();

        const cont = $(`<div style="display: ${this.state.isShowing ? 'flex' : 'none'};" class="pages-wrp">
                <div class="pages">
                    ${this.renderPagesList()}
                </div>
                <div  class="flex-row">
                    <input 
                        class="tm-input sm" 
                        type="text" 
                        placeholder="${editor.I18n.t('peppu-sidebar.pages.placeholder')}" 
                    />
                </div>
                <div class="add-page">
                    ${editor.I18n.t('peppu-sidebar.pages.new')}
                </div>
                <div class="project">
                    ${this.renderProject()}
                </div>
                <div class="add-project">
                    ${editor.I18n.t('peppu-sidebar.project.new')}
                </div>
                <div>
                <label for="file-upload" class="tm-input sm">
                    Load Project
                </label>
                    <input type="file" class="load-project" id="file-upload"/>
                </div>
            </div>`);
        cont.find('.add-page').on('click', this.addPage);
        cont.find('input').on('change', this.handleNameInput);

        cont.find('.add-project').on('click', this.addProject);
        cont.find('.load-project').on('change', this.readText);

        this.$el = cont;
        return cont;
    }

    get findPanel() {
        return this.editor.Panels.getPanel('views-container');
    }

    showPanel() {
        this.state.isShowing = true;
        this.findPanel?.set('appendContent', this.render()).trigger('change:appendContent');
        this.update();
    }

    hidePanel() {
        this.state.isShowing = false;
        this.render();
    }

    saveChanges() {
        return this.pm.getSelected().id;
    }
}