export default (editor, opts = {}) => {
  var defaultType = editor.DomComponents.getType('default');

  var _initToolbar = defaultType.model.prototype.initToolbar;
  const domc = editor.DomComponents;

  domc.addType('html-code', {
    model: defaultType.model.extend({
      initToolbar(args) {
        _initToolbar.apply(this, args);

        var toolbar = this.get("toolbar");
        toolbar.push({
            attributes: { "class": "fa fa-code" },
              command: "open-html-code-editor"
        });
        this.set("toolbar", toolbar);
      }
    }, {
      isComponent: function(el) {
        if (typeof el.hasAttribute == "function" && el.hasAttribute("data-html-code")) {
          return {type: "html-code"};
        }
      }
    }),
    view: defaultType.view
  });
};
