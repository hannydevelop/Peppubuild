import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';



// TODO: Replace the following with your app's Firebase project configuration 
// See: https://firebase.google.com/docs/web/learn-more#config-object 
const firebaseConfig = {
    apiKey: console.log(process.env.VUE_APP_APIKEY),
    authDomain: process.env.VUE_APP_AUTHDOMAIN,
    projectId: process.env.VUE_APP_PROJECTID,
    storageBucket: process.env.VUE_APP_STORAGEBUCKET,
    messagingSenderId: process.env.VUE_APP_SENDERID,
    appId: process.env.VUE_APP_APPID,
    measurementId: process.env.VUE_APP_MEASUREMENTID
};
// Initialize Firebase
initializeApp(firebaseConfig);
const cpanelSub = {
    cpanelDomain: process.env.VUE_APP_CPANEL_DOMAIN,
    root: 'peppubuild.com',
    cpanelApiKey: process.env.VUE_APP_CPANEL_SECRET_KEY,
    cpanelUsername: process.env.VUE_APP_CPANEL_USER
}
// Initialize Firebase Authentication and get a reference to the service
export const userAuth = getAuth();
export const cpanelSubConfig = cpanelSub;