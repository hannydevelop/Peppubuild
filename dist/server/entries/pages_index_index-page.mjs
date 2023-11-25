import grapesjs from "grapesjs";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc } from "../chunks/chunk-cc2b3d55.js";
const grapes_min = "";
const _sfc_main = {
  name: "Auth",
  data() {
    return {};
  },
  mounted() {
    grapesjs.init({
      container: "#gjs",
      showOffsets: true,
      fromElement: true,
      noticeOnUnload: false,
      pageManager: true,
      styleManager: {
        sectors: [
          {
            name: "General",
            open: false,
            buildProps: ["float", "display", "position", "top", "right", "left", "bottom"]
          },
          {
            name: "Dimension",
            open: false,
            buildProps: ["width", "height", "max-width", "min-height", "margin", "padding"]
          },
          {
            name: "Typography",
            open: false,
            buildProps: ["font-family", "font-size", "font-weight", "letter-spacing", "color", "line-height", "text-align", "text-shadow"]
          },
          {
            name: "Decorations",
            open: false,
            buildProps: ["border-radius-c", "background-color", "border-radius", "border", "box-shadow", "background"]
          },
          {
            name: "Background",
            open: false,
            buildProps: ["background-color", "background"]
          },
          {
            name: "Extra",
            open: false,
            buildProps: ["opacity", "transition", "perspective", "transform"],
            properties: [{
              type: "slider",
              property: "opacity",
              defaults: 1,
              step: 0.01,
              max: 1,
              min: 0
            }]
          },
          {
            name: "Flex",
            open: false,
            properties: [{
              name: "Flex Container",
              property: "display",
              type: "select",
              defaults: "block",
              list: [
                { value: "block", name: "Disable" },
                { value: "flex", name: "Enable" }
              ]
            }, {
              name: "Flex Parent",
              property: "label-parent-flex",
              type: "integer"
            }, {
              name: "Direction",
              property: "flex-direction",
              type: "radio",
              defaults: "row",
              list: [{
                value: "row",
                name: "Row",
                className: "icons-flex icon-dir-row",
                title: "Row"
              }, {
                value: "row-reverse",
                name: "Row reverse",
                className: "icons-flex icon-dir-row-rev",
                title: "Row reverse"
              }, {
                value: "column",
                name: "Column",
                title: "Column",
                className: "icons-flex icon-dir-col"
              }, {
                value: "column-reverse",
                name: "Column reverse",
                title: "Column reverse",
                className: "icons-flex icon-dir-col-rev"
              }]
            }, {
              name: "Justify",
              property: "justify-content",
              type: "radio",
              defaults: "flex-start",
              list: [{
                value: "flex-start",
                className: "icons-flex icon-just-start",
                title: "Start"
              }, {
                value: "flex-end",
                title: "End",
                className: "icons-flex icon-just-end"
              }, {
                value: "space-between",
                title: "Space between",
                className: "icons-flex icon-just-sp-bet"
              }, {
                value: "space-around",
                title: "Space around",
                className: "icons-flex icon-just-sp-ar"
              }, {
                value: "center",
                title: "Center",
                className: "icons-flex icon-just-sp-cent"
              }]
            }, {
              name: "Align",
              property: "align-items",
              type: "radio",
              defaults: "center",
              list: [{
                value: "flex-start",
                title: "Start",
                className: "icons-flex icon-al-start"
              }, {
                value: "flex-end",
                title: "End",
                className: "icons-flex icon-al-end"
              }, {
                value: "stretch",
                title: "Stretch",
                className: "icons-flex icon-al-str"
              }, {
                value: "center",
                title: "Center",
                className: "icons-flex icon-al-center"
              }]
            }, {
              name: "Flex Children",
              property: "label-parent-flex",
              type: "integer"
            }, {
              name: "Order",
              property: "order",
              type: "integer",
              defaults: 0,
              min: 0
            }, {
              name: "Flex",
              property: "flex",
              type: "composite",
              properties: [{
                name: "Grow",
                property: "flex-grow",
                type: "integer",
                defaults: 0,
                min: 0
              }, {
                name: "Shrink",
                property: "flex-shrink",
                type: "integer",
                defaults: 0,
                min: 0
              }, {
                name: "Basis",
                property: "flex-basis",
                type: "integer",
                units: ["px", "%", ""],
                unit: "",
                defaults: "auto"
              }]
            }, {
              name: "Align",
              property: "align-self",
              type: "radio",
              defaults: "auto",
              list: [{
                value: "auto",
                name: "Auto"
              }, {
                value: "flex-start",
                title: "Start",
                className: "icons-flex icon-al-start"
              }, {
                value: "flex-end",
                title: "End",
                className: "icons-flex icon-al-end"
              }, {
                value: "stretch",
                title: "Stretch",
                className: "icons-flex icon-al-str"
              }, {
                value: "center",
                title: "Center",
                className: "icons-flex icon-al-center"
              }]
            }]
          }
        ]
      },
      // Add peppu and other plugins.
      plugins: ["peppu-sidebar", "peppu-panel", "gjs-blocks-basic", "grapesjs-plugin-forms"],
      pluginsOpts: {
        "peppu-sidebar": {
          /* Test here your options  */
        },
        "gjs-blocks-basic": { flexGrid: true }
      }
    });
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ id: "gjs" }, _attrs))}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/index.page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index_page = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index_page as default
};
