import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
const _imports_0 = "/assets/static/space.c15855a6.png";
const _error_page_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  __name: "_error.page",
  __ssrInlineRender: true,
  props: ["is404"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.is404) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}><div class="inside"><h1 class="heading">404</h1><img${ssrRenderAttr("src", _imports_0)}><h1>You&#39;re Lost, let&#39;s get you</h1><button type="button" class="btn btn-success" onclick="location.href=&#39;/&#39;;">Home</button><p>This page could not be found.</p></div></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}><div class="inside"><h1 class="heading">500 Internal Error</h1><img${ssrRenderAttr("src", _imports_0)}><p>Something went wrong.</p><button type="button" class="btn btn-success" onclick="location.href=&#39;/&#39;;">Home</button></div></div>`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("renderer/_error.page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
