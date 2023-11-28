import swal from "sweetalert";
import emailjs from "@emailjs/browser";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "../chunks/chunk-cc2b3d55.js";
const index_page_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  name: "Contact",
  data() {
    return {};
  },
  methods: {
    submitReq() {
      emailjs.sendForm("service_ye8ngya", "template_hjuc4sp", this.$refs.form, "gaqDvZ1uPiEy0Z2CO").then((result) => {
        swal("Success!", "Successfully contacted Peppubooks 👌", "success");
        this.$refs.form.reset();
      }, (error) => {
        swal("Oops!", `${error} An error occurred`, "error");
        this.$refs.form.reset();
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}><div class="row"><h1 class="heading">Contact us</h1></div><div class="row"><h4 style="${ssrRenderStyle({ "text-align": "center" })}" class="heading-two">We&#39;d love to hear from you!</h4></div><form><div class="gjs-row" id="iggo"><div class="gjs-cell"><input type="text" name="from_name" id="icl3" placeholder="Name"></div></div><div class="gjs-row" id="if3b"><div class="gjs-cell" id="i9si"><input type="email" name="email" id="ius3" placeholder="Email"></div><div class="gjs-cell" id="iucq"><input type="number" id="i7cb" placeholder="Phone Number"></div></div><div class="gjs-row" id="i00z"><div class="gjs-cell" id="irns8"><textarea id="it23m" name="message" placeholder="Message"></textarea></div></div><div class="gjs-row" id="i00z"><div class="gjs-cell" id="irns8"><button type="submit" class="submit-btn">Send Message</button></div></div></form></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact/index.page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index_page = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index_page as default
};
