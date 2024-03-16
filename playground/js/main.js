import { userAuth } from './firebase.js';
import { cpanelSubConfig } from './firebase.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
// Create route components
const Home = {
    template: `
<div id="gjs"></div>
`,
    mounted() {
        // initialize grapesjs
        const editor = grapesjs.init({
            container: '#gjs',
            height: '100vh',
            width: 'auto',
            showOffsets: true,
            fromElement: true,
            StorageManager: true,
            noticeOnUnload: false,
            pageManager: {
                pages: [
                    {
                        id: 'index'
                    }
                ]
            },
            styleManager: {
                sectors: [{
                    name: 'General',
                    open: false,
                    buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom']
                }, {
                    name: 'Dimension',
                    open: false,
                    buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding']
                }, {
                    name: 'Typography',
                    open: false,
                    buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-shadow']
                }, {
                    name: 'Decorations',
                    open: false,
                    buildProps: ['border-radius-c', 'background-color', 'border-radius', 'border', 'box-shadow', 'background'],
                }, {
                    name: 'Background',
                    open: false,
                    buildProps: ['background-color', 'background'],
                }, {
                    name: 'Extra',
                    open: false,
                    buildProps: ['opacity', 'transition', 'perspective', 'transform'],
                    properties: [{
                        type: 'slider',
                        property: 'opacity',
                        defaults: 1,
                        step: 0.01,
                        max: 1,
                        min: 0,
                    }]
                },
                {
                    name: 'Flex',
                    open: false,
                    properties: [{
                        name: 'Flex Container',
                        property: 'display',
                        type: 'select',
                        defaults: 'block',
                        list: [
                            { value: 'block', name: 'Disable' },
                            { value: 'flex', name: 'Enable' }
                        ],
                    }, {
                        name: 'Flex Parent',
                        property: 'label-parent-flex',
                        type: 'integer',
                    }, {
                        name: 'Direction',
                        property: 'flex-direction',
                        type: 'radio',
                        defaults: 'row',
                        list: [{
                            value: 'row',
                            name: 'Row',
                            className: 'icons-flex icon-dir-row',
                            title: 'Row',
                        }, {
                            value: 'row-reverse',
                            name: 'Row reverse',
                            className: 'icons-flex icon-dir-row-rev',
                            title: 'Row reverse',
                        }, {
                            value: 'column',
                            name: 'Column',
                            title: 'Column',
                            className: 'icons-flex icon-dir-col',
                        }, {
                            value: 'column-reverse',
                            name: 'Column reverse',
                            title: 'Column reverse',
                            className: 'icons-flex icon-dir-col-rev',
                        }],
                    }, {
                        name: 'Justify',
                        property: 'justify-content',
                        type: 'radio',
                        defaults: 'flex-start',
                        list: [{
                            value: 'flex-start',
                            className: 'icons-flex icon-just-start',
                            title: 'Start',
                        }, {
                            value: 'flex-end',
                            title: 'End',
                            className: 'icons-flex icon-just-end',
                        }, {
                            value: 'space-between',
                            title: 'Space between',
                            className: 'icons-flex icon-just-sp-bet',
                        }, {
                            value: 'space-around',
                            title: 'Space around',
                            className: 'icons-flex icon-just-sp-ar',
                        }, {
                            value: 'center',
                            title: 'Center',
                            className: 'icons-flex icon-just-sp-cent',
                        }],
                    }, {
                        name: 'Align',
                        property: 'align-items',
                        type: 'radio',
                        defaults: 'center',
                        list: [{
                            value: 'flex-start',
                            title: 'Start',
                            className: 'icons-flex icon-al-start',
                        }, {
                            value: 'flex-end',
                            title: 'End',
                            className: 'icons-flex icon-al-end',
                        }, {
                            value: 'stretch',
                            title: 'Stretch',
                            className: 'icons-flex icon-al-str',
                        }, {
                            value: 'center',
                            title: 'Center',
                            className: 'icons-flex icon-al-center',
                        }],
                    }, {
                        name: 'Flex Children',
                        property: 'label-parent-flex',
                        type: 'integer',
                    }, {
                        name: 'Order',
                        property: 'order',
                        type: 'integer',
                        defaults: 0,
                        min: 0
                    }, {
                        name: 'Flex',
                        property: 'flex',
                        type: 'composite',
                        properties: [{
                            name: 'Grow',
                            property: 'flex-grow',
                            type: 'integer',
                            defaults: 0,
                            min: 0
                        }, {
                            name: 'Shrink',
                            property: 'flex-shrink',
                            type: 'integer',
                            defaults: 0,
                            min: 0
                        }, {
                            name: 'Basis',
                            property: 'flex-basis',
                            type: 'integer',
                            units: ['px', '%', ''],
                            unit: '',
                            defaults: 'auto',
                        }],
                    }, {
                        name: 'Align',
                        property: 'align-self',
                        type: 'radio',
                        defaults: 'auto',
                        list: [{
                            value: 'auto',
                            name: 'Auto',
                        }, {
                            value: 'flex-start',
                            title: 'Start',
                            className: 'icons-flex icon-al-start',
                        }, {
                            value: 'flex-end',
                            title: 'End',
                            className: 'icons-flex icon-al-end',
                        }, {
                            value: 'stretch',
                            title: 'Stretch',
                            className: 'icons-flex icon-al-str',
                        }, {
                            value: 'center',
                            title: 'Center',
                            className: 'icons-flex icon-al-center',
                        }],
                    }]
                }
                ],
            },
            // Add peppu and other plugins.
            plugins: ['peppu-sidebar', 'peppu-bootstrap', 'peppu-panel', "gjs-blocks-basic", "grapesjs-plugin-forms", 'grapesjs-style-bg', 'grapesjs-touch'],
            pluginsOpts: {
                'peppu-sidebar': { /* Test here your options  */ },
                'peppu-bootstrap': {},
                'gjs-blocks-basic': { flexGrid: true },
            },
            canvas: {
                styles: [
                    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                ],
                scripts: [
                    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
                ],
            }
        });
        const mdl = editor.Modal;
        editor.on('load', (some, argument) => {
            mdl.open({
                title: 'Quickstart',
                content: `
                <div class="container" style="background-color: black;">
                  The 'View Code' icon contains the HTML and CSS code added to the editor.<br>
                  To get started, you need to install VSCode and create a HTML/CSS file.<br>
                  In the HTML file, you can start with a scaffold by typing '!' and hitting enter.<br>
                  For bootstrap components, add the Bootstrap CSS and HTML.<br>
      
                  <div class="mb-3">
                      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">"></textarea>
                  </div>
                  Always start with the basic blocks if you're just starting out.<br>
                  Remember that you can change the style of any component in the editor from the style panel.
                </div>`,
            })
        })
        editor.on('block:drag:stop', (component, block) => {
            if (component.attributes.type == 'B-NAVBAR') {
                mdl.open({
                    title: 'This is a Navigation Bar',
                    content: `
                    <div class="container" style="background-color: black;">
                    You just dropped a navigation bar.<br> Navigation bars are usually a list of links, 
                    useful to aid visitors to access information faster.<br> This navigation bar is built with Bootstrap, to create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    For more information, checkout the Bootstap navigation page: 
                    https://getbootstrap.com/docs/5.3/components/navbar
                    </div>
                `,
                })
            }
            else if (component.attributes.type == 'B-ACCORDION') {
                mdl.open({
                    title: 'This is an Accordion',
                    content: `
                    <div class="container" style="background-color: black;">
                    You just dropped an accordion.<br> Accordions are menus that have headers stacked together. They reveal more details when you click on them. This accordion is built with Bootstrap, to create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    For more information, checkout the Bootstap accordion page:
                    https://getbootstrap.com/docs/5.3/components/accordion/
                    </div>
                `,
                })
            } else if (component.attributes.type == 'B-CARD') {
                mdl.open({
                    title: 'This is a Card',
                    content: `
                    <div class="container" style="background-color: black;">
                    You just dropped a card.<br> Cards are containers that group related information in flexible-size containers
                    visually resembling playing cards.<br> This card is built with Bootstrap, to create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    For more information, checkout the Bootstap card page:
                    https://getbootstrap.com/docs/5.3/components/cards
                    </div>
                `,
                })
            } else if (component.attributes.type == 'B-FOOTER') {
                mdl.open({
                    title: 'This is a Footer',
                    content: `
                    <div class="container" style="background-color: black;">
                    You just dropped a footer.<br> Footers are website components that hold important information about
                    your website. They are mostly fixed at the bottom of the website. This footer is built with Bootstrap, to create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    For more information, checkout the Bootstap footer page:
                    https://getbootstrap.com/docs/5.2/examples/footers/
                    </div>
                `,
                })
            } else if (component.attributes.type == 'B-PRICING') {
                mdl.open({
                    title: 'This is a Pricing',
                    content: `
                    <div class="container" style="background-color: black;">
                    You just dropped a pricing component.<br> This component has all the elements you need for creating the different
                    pricing models. If you have used any subscription model for the web and have seen the 
                    pricing page, this is exactly what this component does. This component is built with Bootstrap, to create
                    yours, check the 'View code' component and add the HTML code into your HTML file.:
                    For more information, checkout the Bootstap pricing page:
                    https://getbootstrap.com/docs/5.2/examples/pricing
                    </div>
                `,
                })
            } else if (component.attributes.type == 'B-FEATURES') {
                mdl.open({
                    title: 'This is a Feature',
                    content: `
                    <div class="container" style="background-color: black;">
                    You just dropped a feature component.<br> If you have ever wondered how to show-off the great
                    features of your product, consider using this component.<br> This component is built with Bootstrap, to create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    For more information, checkout the Bootstap features page:
                    https://getbootstrap.com/docs/5.2/examples/features
                    </div>
                `,
                })
            } else if (component.attributes.type == 'B-HERO') {
                mdl.open({
                    title: 'This is Hero',
                    content: `
                    <div class="container" style="background-color: black;">
                    You just dropped a Hero component.<br> This is the first thing the visitor sees when they visit your website.
                    The goal is to capture the attention of the visitor. This Hero is built with Bootstrap, to create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    For more information, checkout the Bootstap hero page:
                    https://getbootstrap.com/docs/5.2/examples/hero/
                    </div>
                `,
                })
            } else if (component.attributes.type == 'B-BUTTON') {
                mdl.open({
                    title: 'This is a Button',
                    content: `
                    <div class="container" style="background-color: black;">
                    You just dropped a button. Buttons are interractive elements that communicate actions that users can take.
                    They mostly perform actions when users click on them. This button is built with Bootstrap, to create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    For more information, checkout the Bootstap button page:
                    
                    </div>
                `,
                })
            } else if (component.attributes.type == 'B-CAROUSEL') {
                mdl.open({
                    title: 'This is an Carousel',
                    content: `
                    <div class="container" style="background-color: black;">
                    You just dropped a carousel.<br> Carousels can also be called slideshows or galleries.
                    They allow you display text, images, and even video in one interractive sliding block. This carousel is built with Bootstrap, to create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    For more information, checkout the Bootstap carousel page:
                    </div>
                `,
                })
            } else if (component.attributes.type == 'column1') {
                mdl.open({
                    title: 'This is column1 type',
                    content: `
                    <div class="container" style="background-color: black;">
                    You just dropped a carousel.<br> Carousels can also be called slideshows or galleries.
                    They allow you display text, images, and even video in one interractive sliding block. This carousel is built with Bootstrap, to create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    For more information, checkout the Bootstap carousel page:
                    </div>
                `,
                })
            }
            else if (component.attributes.name == 'column1') {
                mdl.open({
                    title: 'This is column1 name',
                    content: `
                    <div class="container" style="background-color: black;">
                    You just dropped a carousel.<br> Carousels can also be called slideshows or galleries.
                    They allow you display text, images, and even video in one interractive sliding block. This carousel is built with Bootstrap, to create
                    yours, check the 'View code' component and add the HTML code into your HTML file.
                    For more information, checkout the Bootstap carousel page:
                    </div>
                `,
                })
            }
        });
    }
}
const Dashboard = {
    template: `
        <div class="dash-content" id="d-cont">
            <div id="i2sw">My Dashboard
            </div>
            <section-one>
                <div class="one-container">
                    <div class="one-child">
                        <p class="i0sf">
                            Hi, welcome back!
                        </p>
                        <p class="i0sg">
                            We hope you're having a great day and are
                            ready to dive back and start creating magic.
                        </p>
                    </div>
                </div>
                <div id="inyx">
                    <div class="action_btn">
                        <h2>Unfinished Project</h2>
                        Continue from where you left off. Please note that projects not saved will be lost.
                        <div class="thumb-link">
                            <a target="_blank" href="/">
                                <img src="https://source.unsplash.com/weRQAu9TA-A" alt="Paris" style="width:150px">
                            </a>
                        </div>
                        <div>
                        <button type="button" class="action_btn btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">New Project</button>
                        <div>
                    </div>
                </div>
                <!-- Modal -->
                
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">New Project</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      Choose if you'd like to create from an empty workspace or using a template
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" @click="emptyProject">Empty Workspace</button>
                    </div>
                  </div>
                </div>
              </div>            
            </section-one>
        </div>
    `,
    mounted() {
        const link = document.createElement('meta');
        link.name = 'viewport';
        link.content = 'width=device-width, initial-scale=1.0';
        document.getElementsByTagName('head')[0].appendChild(link);
    },
    data() {
        return {
        };
    },

    methods: {
        createSub(name) {
            const subUrl = `${cpanelSubConfig.cpanelDomain}:2083/cpsess${cpanelSubConfig.cpanelApiKey}/execute/SubDomain/addsubdomain?domain=${name}&rootdomain=${cpanelSubConfig.root}&dir=${name}.${cpanelSubConfig.root}`;
            let data = fetch(subUrl, {
                method: 'GET', headers: {
                    'Authorization': 'cpanel ' + cpanelSubConfig.cpanelUsername + ':' + cpanelSubConfig.cpanelApiKey,
                }
            })
            return data;
        },
        showSide() {
            var x = document.getElementById("dedee");
            var y = document.getElementById("d-cont");
            if (x.style.display === "none") {
                x.style.display = "block";
                y.style.marginLeft = "225px";
            } else {
                x.style.display = "none";
                y.style.width = "100%";
                y.style.marginLeft = "0%";
            }
        },
        emptyProject() {
            let project = localStorage.getItem('gjsProject');
            if (project) {
                alert('You already have a project. Finish your pending project, publish, and use the desktop application')
            } else {
                let name = prompt('What will you like to name your project?');
                if (name) {
                    localStorage.setItem('projectName', name);
                    window.location.href = "/";
                }
            }
        },
        templateProject() {
            localStorage.removeItem('gjsProject');
            let name = prompt('What will you like to name your project?');
            if (name) {
                localStorage.setItem('projectName', name);
                window.location.href = "/";
                console.log(editor)
            }
        }
    }
}
const Auth = {
    template: `
    <div class="background">
    <div class="main__container">
      <div class="wrapper">
        <div class="form-wrapper sign-in">
          <form id="sign-in-form" action="">
            <h2>Login</h2>
            <div class="input-group">
              <input id="username-login" type="email" required v-model="lemail" />
              <label for="">Email</label>
            </div>
            <div class="input-group">
              <input id="password-login" type="password" required v-model="lpassword" />
              <label for="">Password</label>
            </div>
            <button type="reset" class="mybtn" @click="logUser()">Login</button>
            <div class="signup-link">
              <p>
                Don't have an account?
                <button type="reset" class="signUpBtn" @click="callActive()">Sign Up</button>
              </p>
            </div>
          </form>
        </div>

        <div class="form-wrapper sign-up">
          <form id="sign-up-form" action="">
            <h2>Sign Up</h2>
            <div class="input-group">
              <input id="username" type="text" required v-model="fname" />
              <label for="">Full Name</label>
            </div>
            <div class="input-group">
              <input id="password" type="password" required v-model="password" />
              <label for="">Password</label>
            </div>
            <div class="input-group">
              <input id="email" type="email" required v-model="email" />
              <label for="">Email</label>
            </div>
            <button type="reset" class="mybtn" @click="createUser()">Sign Up</button>
            <div class="signup-link">
              <p>
                Already have an account?
                <button type="reset" class="signUpBtn" @click="callActive()">Sign Up</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div id="i9x1">You can also authenticate with providers like Google or Github.</div>
    <div class="start">
      <div class="google-btn google-bk" @click="googleLogin()">
        <div class="google-icon-wrapper">
          <img class="google-icon" src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" />
        </div>
        <p class="btn-text"><b>Sign in with Google</b></p>
      </div>
      <div class="google-btn github-bk" @click="githubLogin()">
        <div class="google-icon-wrapper">
          <img class="google-icon" src="img/github.svg" />
        </div>
        <p class="btn-text"><b>Sign in with Github</b></p>
      </div>
    </div>
  </div>
    `,
    mounted() {
        const link = document.createElement('meta');
        link.name = 'viewport';
        link.content = 'width=device-width, initial-scale=1.0';
        document.getElementsByTagName('head')[0].appendChild(link);
    },
    data() {
        return {
            email: "",
            password: "",
            lemail: "",
            lpassword: "",
            fname: ""
        }
    },
    methods: {
        // callActive method to switch to signup or signin form
        callActive() {
            console.log('we are calling you')
            const wrapper = document.querySelector('.wrapper');
            wrapper.classList.toggle('active');
        },
        // createuser method to create new user with email and password.
        createUser() {
            createUserWithEmailAndPassword(userAuth, this.email, this.password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    this.callVerify(user.accessToken);
                    // Update user profile with full name immediately
                    updateProfile(userAuth.currentUser, {
                        displayName: this.fname,
                        // photoURL: "https://example.com/jane-q-user/profile.jpg"
                    }).then(() => {
                        // Profile updated!
                        // ...
                    }).catch((error) => {
                        // An error occurred
                        // ...
                    });
                })
                // return error as alert
                .catch((error) => {
                    const errorMessage = error.message;
                    swal("Oops!", `Registration error: ${errorMessage}`, "error");
                });
        },
        // logUser method to sign in already registered user with email and password.
        logUser() {
            signInWithEmailAndPassword(userAuth, this.lemail, this.lpassword)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    this.callVerify(user.accessToken)
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    swal("Oops!", `Login error: ${errorMessage}`, "error");
                });
        },
        // providerLogin to perform authentication with Github and Google
        providerLogin(authProvider, provider) {
            signInWithPopup(userAuth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = authProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    // IdP data available using getAdditionalUserInfo(result)
                    // ...
                    this.callVerify(token)
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    // const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = authProvider.credentialFromError(error);
                    // ...
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
            let storecookie = new Promise((resolve, reject) => {
                if (token) {
                    let providerToken = token;
                    // verify token

                    // store token
                    document.cookie = `pepputoken=${providerToken}; maxAge=24 * 60 * 60 * 1000`
                    resolve();
                } else {
                    reject();
                }
            })
            storecookie
                .then((response) => {
                    window.location.href = "/dashboard";
                }).catch((error) => {
                    swal("Oops!", `Login verification error: ${error}`, "error");
                })
        }
    }
}
const Contact = {
    template: `
<div class="container">
        <div class="row">
            <h1 class="heading">Contact us</h1>
        </div>
        <div class="row">
            <h4 style="text-align:center" class="heading-two">We'd love to hear from you!</h4>
        </div>
        <form ref="form" @submit.prevent="submitReq">
            <div class="gjs-row" id="iggo">
                <div class="gjs-cell">
                    <input type="text" name="from_name" id="icl3" placeholder="Name" />
                </div>
            </div>
            <div class="gjs-row" id="if3b">
                <div class="gjs-cell" id="i9si">
                    <input type="email" name="email" id="ius3" placeholder="Email" />
                </div>
                <div class="gjs-cell" id="iucq">
                    <input type="number" id="i7cb" placeholder="Phone Number" />
                </div>
            </div>
            <div class="gjs-row" id="i00z">
                <div class="gjs-cell" id="irns8">
                    <textarea id="it23m" name="message" placeholder="Message"></textarea>
                </div>
            </div>
            <div class="gjs-row" id="i00z">
                <div class="gjs-cell" id="irns8">
                    <button type="submit" class="submit-btn">Send Message</button>
                </div>
            </div>
        </form>
    </div>
`,
    mounted() {
        const link = document.createElement('meta');
        link.name = 'viewport';
        link.content = 'width=device-width, initial-scale=1.0';
        document.getElementsByTagName('head')[0].appendChild(link);
    },
    methods: {
        submitReq() {
            emailjs.sendForm('service_ye8ngya', 'template_hjuc4sp', this.$refs.form, 'gaqDvZ1uPiEy0Z2CO')
                .then((result) => {
                    swal("Success!", "Successfully contacted Peppubooks 👌", "success");
                    this.$refs.form.reset();
                }, (error) => {
                    swal("Oops!", `${error} An error occurred`, "error");
                    this.$refs.form.reset();
                });
        }
    }
}

// function to retrieve specific cookie.
function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let split = el.split('=');
        cookie[split[0].trim()] = split.slice(1).join("=");
    })
    return cookie[name];
}

// Define routes
const routes = [
    { path: '/', component: Home, name: 'Home' },
    { path: '/auth', component: Auth, name: 'Auth' },
    { path: '/contact', component: Contact, name: 'Contact' },
    { path: '/dashboard', component: Dashboard, name: 'Dashboard' },
];


// create the router instance
const router = new VueRouter({
    mode: 'history',
    routes,
})

// guard routes
router.beforeEach(async (to, from, next) => {
    let isAuthenticated = getCookie('pepputoken')
    if (to.name !== 'Auth' && !isAuthenticated) next({ name: 'Auth' })
    else next()
})

// create and mount the vue instance

const app = new Vue({
    router
}).$mount('#app')