import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import swal from "sweetalert";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "../chunks/chunk-cc2b3d55.js";
const firebaseConfig = {
  apiKey: "AIzaSyAWrBKDkv0jb7vs9PXmg1APQN53xR3aSL0",
  authDomain: "peppubuild-vue.firebaseapp.com",
  projectId: "peppubuild-vue",
  storageBucket: "peppubuild-vue.appspot.com",
  messagingSenderId: "566741135380",
  appId: "1:566741135380:web:b452a6a2da8dd554d93701",
  measurementId: "G-X3E83PW40N"
};
initializeApp(firebaseConfig);
const userAuth = getAuth();
const _imports_0 = "/assets/static/github.f1d4a57c.svg";
const index_page_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  name: "Auth",
  data() {
    return {
      email: "",
      password: "",
      lemail: "",
      lpassword: "",
      fname: ""
    };
  },
  methods: {
    // callActive method to switch to signup or signin form
    callActive() {
      const wrapper = document.querySelector(".wrapper");
      wrapper.classList.toggle("active");
    },
    // createuser method to create new user with email and password.
    createUser() {
      createUserWithEmailAndPassword(userAuth, this.email, this.password).then((userCredential) => {
        const user = userCredential.user;
        this.callVerify(user.accessToken);
        updateProfile(userAuth.currentUser, {
          displayName: this.fname
          // photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
        }).catch((error) => {
        });
      }).catch((error) => {
        const errorMessage = error.message;
        swal("Oops!", `Registration error: ${errorMessage}`, "error");
      });
    },
    // logUser method to sign in already registered user with email and password.
    logUser() {
      signInWithEmailAndPassword(userAuth, this.lemail, this.lpassword).then((userCredential) => {
        const user = userCredential.user;
        this.callVerify(user.accessToken);
      }).catch((error) => {
        const errorMessage = error.message;
        swal("Oops!", `Login error: ${errorMessage}`, "error");
      });
    },
    // providerLogin to perform authentication with Github and Google
    providerLogin(authProvider, provider) {
      signInWithPopup(userAuth, provider).then((result) => {
        const credential = authProvider.credentialFromResult(result);
        const token = credential.accessToken;
        result.user;
        this.callVerify(token);
      }).catch((error) => {
        error.code;
        const errorMessage = error.message;
        authProvider.credentialFromError(error);
        swal("Oops!", `Login error: ${errorMessage}`, "error");
      });
    },
    // Google Authentication
    googleLogin() {
      const provider = new GoogleAuthProvider();
      this.providerLogin(GoogleAuthProvider, provider);
    },
    // Github Authentication
    githubLogin() {
      const provider = new GithubAuthProvider();
      this.providerLogin(GithubAuthProvider, provider);
    },
    callVerify(token) {
      fetch(`http://localhost:${"1404"}/login`, {
        method: "POST",
        // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
      }).then((response) => {
        window.location.href = "/";
      }).catch((error) => {
        swal("Oops!", `Login verification error: ${error}`, "error");
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "background" }, _attrs))}><div class="main__container"><div class="wrapper"><div class="form-wrapper sign-in"><form id="sign-in-form" action=""><h2>Login</h2><div class="input-group"><input id="username-login" type="email" required${ssrRenderAttr("value", $data.lemail)}><label for="">Email</label></div><div class="input-group"><input id="password-login" type="password" required${ssrRenderAttr("value", $data.lpassword)}><label for="">Password</label></div><div class="remember"><label><input type="checkbox"> Remember me</label></div><button type="reset" class="mybtn">Login</button><div class="signup-link"><p> Don&#39;t have an account? <a href="#" class="signUpBtn-link">Sign Up</a></p></div></form></div><div class="form-wrapper sign-up"><form id="sign-up-form" action=""><h2>Sign Up</h2><div class="input-group"><input id="username" type="text" required${ssrRenderAttr("value", $data.fname)}><label for="">Full Name</label></div><div class="input-group"><input id="password" type="password" required${ssrRenderAttr("value", $data.password)}><label for="">Password</label></div><div class="input-group"><input id="email" type="email" required${ssrRenderAttr("value", $data.email)}><label for="">Email</label></div><div class="remember"><label><input type="checkbox"> I agree to the terms &amp; conditions</label></div><button type="reset" class="mybtn">Sign Up</button><div class="signup-link"><p> Already have an account? <a href="#" class="signInBtn-link">Sign In</a></p></div></form></div></div></div><div id="i9x1">You can also authenticate with providers like Google or Github.</div><div class="start"><div class="google-btn google-bk"><div class="google-icon-wrapper"><img class="google-icon" src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"></div><p class="btn-text"><b>Sign in with Google</b></p></div><div class="google-btn github-bk"><div class="google-icon-wrapper"><img class="google-icon"${ssrRenderAttr("src", _imports_0)}></div><p class="btn-text"><b>Sign in with Github</b></p></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/index.page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index_page = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index_page as default
};
