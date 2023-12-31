export default (editor, opts = {}) => {
    const cm = editor.Commands;
    const mdl = editor.Modal;
    const pfx = editor.getConfig('stylePrefix');
    const mdlClassMd = `${pfx}mdl-dialog-md`;


    cm.add('open-settings', {
        run(editor, sender) {
            const mdlDialog = document.querySelector(`.${pfx}mdl-dialog`);
            mdlDialog.classList.add(mdlClassMd);
            sender?.set && sender.set('active');
            mdl.setTitle(opts.mdlTitle);
            mdl.setContent(editor.SettingsApp.render());
            mdl.open();
            mdl.getModel().once('change:open', () => {
                mdlDialog.classList.remove(mdlClassMd);
            });
        }
    });

    cm.add('peppu:open', {
        run(editor) {
            editor.PagesApp.showPanel();
        },
        stop(editor) {
            editor.PagesApp.hidePanel();
        }
    })

    cm.add('peppu:save', {
        run(editor) {
            editor.PagesApp.saveProject();
        }
    })
    
    /*
    cm.add('peppu:publish', {
        run(editor) {
            editor.PagesApp.createPublish();
        }
    })
    */
}