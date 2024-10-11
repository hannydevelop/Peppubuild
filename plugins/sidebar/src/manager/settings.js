import UI from '../utils/ui';

export default class SettingsApp extends UI {
    constructor(editor, opts = {}) {
        super(editor, opts);
        this.handleSave = this.handleSave.bind(this);
        this.handleThumbnail = this.handleThumbnail.bind(this);
        this.handleThumbnailInput = this.handleThumbnailInput.bind(this);

        /* Set initial app state */
        this.state = {
            tab: 'page',
            loading: false
        };
    }

    setTab(tab) {
        this.state.tab = tab;
    }

    update() {
        const { $el } = this;
        $el?.find('#settings').html(this.renderSettings());
        $el?.find('#generate').on('click', this.handleThumbnail);
        $el?.find('input#thumbnail').on('change', this.handleThumbnailInput);
    }

    onRender() {
        const { setState } = this;
        setState({
            loading: true
        });
        //? Setup code here 
        setState({
            loading: false
        });
    }

    renameProject(fileName, newName) {
        let data = fetch(`${editor.I18n.t('peppu-sidebar.project.url')}/prename/${fileName}/${newName}`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
        })
        return data;
    }

    handleSave(e) {
        const { $el, editor } = this;
        const { tab } = this.state;
        const id = editor.PagesApp.editableId;
        const name = $el?.find('input.name').val().trim();
        id && editor.PagesApp.editPage(id, name);
        editor.Modal.close();
        this.renameProject(id, name);
    }

    handleThumbnail(e) {
        const { editor, $el, opts } = this;
        editor.runCommand('take-screenshot', {
            clb(dataUrl) {
                $el?.find('img').attr('src', dataUrl);
                opts.onThumbnail(dataUrl, $el?.find('input.thumbnail'));
            }
        })
    }

    handleThumbnailInput(e) {
        this.$el?.find('img').attr('src', e.target.value.trim());
    }

    renderSettings() {
        const { tab, loading } = this.state;
        const { opts, pfx, pm, editor } = this;

        if (loading) return opts.loader || '<div>Loading settings...</div>';

        const page = pm.get(editor.PagesApp.editableId);
            const value = page?.get('name') || page?.id || '';
            return `<label for="name">
                    ${editor.I18n.t('peppu-sidebar.settings.labels.name')}
                </label>
                <div class="flex-row">
                    <input 
                        class="name tm-input" 
                        value="${value}" 
                        placeholder="${editor.I18n.t('peppu-sidebar.settings.placeholders.name')}"/>
                </div>`
    }

    render() {
        const { $, editor } = this;

        // Do stuff on render
        this.onRender();
        this.$el?.remove();

        const cont = $(`<div class="app">
                <div id="settings">
                    ${this.renderSettings()}
                </div>
                <div class="flex-row">
                    <button id="save" class="primary-button">
                        ${editor.I18n.t('peppu-sidebar.settings.save')}
                    </button>
                </div>
            </div>`);
        cont.find('#save').on('click', this.handleSave);
        cont.find('#generate').on('click', this.handleThumbnail);
        cont.find('input#thumbnail').on('change', this.handleThumbnailInput);

        this.$el = cont;
        return cont;
    }
}