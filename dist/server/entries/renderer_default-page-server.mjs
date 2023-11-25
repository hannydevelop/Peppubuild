var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
import { renderToString as renderToString$1 } from "@vue/server-renderer";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr/server";
import { inject, useSSRContext, mergeProps, unref, createSSRApp, h } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "../chunks/chunk-cc2b3d55.js";
const logoUrl = "/assets/static/logo.06a96a65.svg";
const key = Symbol();
function usePageContext() {
  const pageContext = inject(key);
  return pageContext;
}
function setPageContext(app, pageContext) {
  app.provide(key, pageContext);
}
const Link_vue_vue_type_style_index_0_scoped_64d1d781_lang = "";
const _sfc_main$1 = {
  __name: "Link",
  __ssrInlineRender: true,
  setup(__props) {
    const pageContext = usePageContext();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        class: { active: unref(pageContext).urlPathname === _ctx.$attrs.href }
      }, _attrs))} data-v-64d1d781>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</a>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("renderer/Link.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const bootstrap_min = "";
const PageShell_vue_vue_type_style_index_0_lang = "";
const PageShell_vue_vue_type_style_index_1_scoped_b52275be_lang = "";
const _sfc_main = {
  __name: "PageShell",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))} data-v-b52275be><nav class="navbar navbar-expand-lg bg-body-tertiary" data-v-b52275be><div class="container-fluid" data-v-b52275be><div class="container" data-v-b52275be><a class="navbar-brand" href="/" data-v-b52275be><img${ssrRenderAttr("src", logoUrl)} alt="Bootstrap" width="30" height="24" data-v-b52275be> Peppubuild </a></div><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" data-v-b52275be><span class="navbar-toggler-icon" data-v-b52275be></span></button><div class="collapse navbar-collapse" id="navbarSupportedContent" data-v-b52275be><ul class="navbar-nav me-auto mb-2 mb-lg-0" data-v-b52275be><li class="nav-item" data-v-b52275be><a class="nav-link" href="/auth" data-v-b52275be>Login</a></li><li class="nav-item dropdown" data-v-b52275be><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-v-b52275be> Pages </a><ul class="dropdown-menu" data-v-b52275be><li data-v-b52275be><a class="dropdown-item" href="/dashboard" data-v-b52275be>Dashboard</a></li><li data-v-b52275be><a class="dropdown-item" href="https://docs.peppubuild.com" data-v-b52275be>Documentation</a></li><li data-v-b52275be><a class="dropdown-item" href="/contact" data-v-b52275be>Contact</a></li><li data-v-b52275be><hr class="dropdown-divider" data-v-b52275be></li><li data-v-b52275be><a class="dropdown-item" href="#" data-v-b52275be>Logout</a></li></ul></li></ul><form class="d-flex" role="search" data-v-b52275be><input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" data-v-b52275be><button class="btn btn-outline-success" type="submit" data-v-b52275be>Search</button></form></div></div></nav><div class="content" data-v-b52275be>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("renderer/PageShell.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PageShell = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b52275be"]]);
function createApp(Page, pageProps, pageContext) {
  const PageWithLayout = {
    render() {
      return h(
        PageShell,
        {},
        {
          default() {
            return h(Page, pageProps || {});
          }
        }
      );
    }
  };
  const app = createSSRApp(PageWithLayout);
  setPageContext(app, pageContext);
  return app;
}
const passToClient = ["pageProps", "urlPathname"];
async function render(pageContext) {
  const { Page, pageProps } = pageContext;
  if (!Page)
    throw new Error("My render() hook expects pageContext.Page to be defined");
  const app = createApp(Page, pageProps, pageContext);
  const appHtml = await renderToString(app);
  const { documentProps } = pageContext.exports;
  const title = documentProps && documentProps.title || "Peppubuild-admin";
  const desc = documentProps && documentProps.description || "Admin for Peppubuild";
  const documentHtml = escapeInject(_a || (_a = __template(['<!DOCTYPE html>\n    <html lang="en">\n      <head>\n        <meta charset="UTF-8" />\n        <link rel="icon" href="', '" />\n        <link rel="stylesheet" href="https://unpkg.com/peppu-sidebar/dist/peppu-sidebar.min.css">\n        <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n        <meta name="description" content="', '" />\n        <title>', '</title>\n      </head>\n      <body>\n        <div id="app">', '</div>\n        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"><\/script>\n        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"><\/script>\n        <script src="https://unpkg.com/peppu-panel"><\/script>\n        <script src="https://unpkg.com/peppu-sidebar/dist/peppu-sidebar.min.js"><\/script>\n        <script src="https://unpkg.com/grapesjs-blocks-basic"><\/script>\n        <script src="https://unpkg.com/grapesjs-plugin-forms"><\/script>\n      </body>\n    </html>'])), logoUrl, desc, title, dangerouslySkipEscape(appHtml));
  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    }
  };
}
async function renderToString(app) {
  let err;
  app.config.errorHandler = (err_) => {
    err = err_;
  };
  const appHtml = await renderToString$1(app);
  if (err)
    throw err;
  return appHtml;
}
export {
  passToClient,
  render
};
