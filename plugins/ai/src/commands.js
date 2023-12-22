export default (editor, opts = {}) => {
    const cm = editor.Commands;
    cm.add("open-html-code-editor", {
        run: function (editor, sender, data) {
            var component = editor.getSelected();

            var codeViewer = editor.CodeManager.getViewer("CodeMirror").clone();
            codeViewer.set({
                codeName: "htmlmixed",
                theme: "hopscotch",
                readOnly: false
            });

            var modalContent = document.createElement("div");   

            var editorTextArea = document.createElement("textarea");
            // editorTextArea.innerHTML = 'test satu dua tiga';
            var saveButton = document.createElement("button");
            saveButton.innerHTML = "Save";
            saveButton.className = "gjs-btn-prim";
            saveButton.style = "margin-top: 8px;";
            saveButton.onclick = function () {
                component.set("content", "");
                component.components(codeViewer.editor.getValue());
                editor.Modal.close();
            };

            modalContent.appendChild(editorTextArea);
            modalContent.appendChild(saveButton);

            codeViewer.init(editorTextArea);

            var htmlContent = document.createElement("div");
            htmlContent.innerHTML = component.toHTML();
            htmlContent = htmlContent.firstChild.innerHTML;
            codeViewer.setContent(htmlContent);

            editor.Modal
                .setTitle("Edit HTML")
                .setContent(modalContent)
                .open();

            codeViewer.editor.refresh();
        }
    });
}