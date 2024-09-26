
<template>
        <div class="background">
    <div id="i9x1">
    <h1>Login or Sign into your account with your Google profile.</h1>
    </div>
    <div class="main__container">
      <div class="wrapper">
        <div class="form-wrapper sign-in">
        <div class="start">
          <div class="google-btn google-bk" @click="googleLogin()">
            <div class="google-icon-wrapper">
              <img class="google-icon" src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" />
            </div>
            <p class="btn-text"><b>Sign in with Google</b></p>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userAuth } from './js/firebase.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
} from 'firebase/auth';
import swal from 'sweetalert';

export default {
  name: 'AuthPage',
  /** 
   * This is a test
  */
  methods: {
        // callActive method to switch to signup or signin form
        callActive() {
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
                    }).catch(() => {
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
                    localStorage.setItem('user', JSON.stringify(result.user))
                    localStorage.setItem('oauth', credential.accessToken)
                    const token = credential.accessToken;
                    // The signed-in user info.
                    // const user = result.user;
                    // IdP data available using getAdditionalUserInfo(result)
                    // ...
                    this.callVerify(token)
                }).catch((error) => {
                    // Handle Errors here.
                    // const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    // const email = error.customData.email;
                    // The AuthCredential type that was used.
                    // const credential = authProvider.credentialFromError(error);
                    // ...
                    swal("Oops!", `Login error: ${errorMessage}`, "error");
                });
        },
        // Google Authentication
        googleLogin() {
            const provider = new GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/drive.appdata')
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
                    document.cookie = `pepputoken=${providerToken}; max-age=3300`
                    resolve();
                } else {
                    reject();
                }
            })
            storecookie
                .then(() => {
                    this.$router.push({ name: "Dashboard" });
                }).catch((error) => {
                    swal("Oops!", `Login verification error: ${error}`, "error");
                })
        }
    }
}
</script>