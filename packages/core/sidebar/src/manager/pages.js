import UI from '../utils/ui';
import swal from 'sweetalert';

export default class PagesApp extends UI {
    constructor(editor, opts = {}) {
        super(editor, opts);
        this.addPage = this.addPage.bind(this);
        this.addProject = this.addProject.bind(this);
        this.selectPage = this.selectPage.bind(this);
        this.removePage = this.removePage.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.createPublish = this.createPublish.bind(this);

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
        return this.pm.getSelected().id === page.id;
    }

    selectPage(e) {
        this.pm.select(e.currentTarget.dataset.key);
        this.update();
    }

    removePage(e) {
        if (this.opts.confirmDeletePage()) {
            this.pm.remove(e.currentTarget.dataset.key);
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
        currentPage?.set('name', name);
        this.update()
    }

    addPage() {
        const { pm } = this;
        const { nameText } = this.state
        if (!nameText) return;
        pm.add({
            name: nameText,
            component: ''
        });
        this.update();
    }

    createPublish(value) {
        let name = this.state.projectName;
        fetch(`http://localhost:4000/${value}/${name}`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
        })
    }

    addProject() {
        let name = prompt('What would you like to name this project?');
        localStorage.setItem("projectName", name);
        this.state.projectName = name;
        swal("What type of project will you like to create", {
            buttons: {
                front: {
                    text: "Frontend",
                    value: "publishfront",
                },
                back: {
                    text: "Backend",
                    value: "publishback",
                },
                defeat: {
                    text: "Fullstack",
                    value: "publishfull",
                }
            },
        })
            .then((value) => {
                switch (value) {
                    case "publishfront":
                        try {
                            this.createPublish(value);
                            swal("Successfully!", "Frontend bootstrapped", "success");
                        } catch (error) {
                            swal("Error", "An error occurred", "error");
                        }
                        break;

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

                    default:

                }
            });
        this.update();
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

        return pages.map((page, i) => `<div 
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
        if (!this.state.projectName) {
            return localStorage.getItem("projectName");
        } else {
            return this.state.projectName;
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
            </div>`);
        cont.find('.add-page').on('click', this.addPage);
        cont.find('input').on('change', this.handleNameInput);

        cont.find('.add-project').on('click', this.addProject);

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