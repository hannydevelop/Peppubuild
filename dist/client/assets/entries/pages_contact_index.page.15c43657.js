import{s}from"../chunks/chunk-93c80111.js";import{_ as i}from"../chunks/chunk-c27b6911.js";import{p as t,q as d,r as a}from"../chunks/chunk-cbe7ef5d.js";const c={name:"Contact",data(){return{}},methods:{submitReq(){emailjs.sendForm("service_6fgtutf","template_6ttzglg",this.$refs.form,"gaqDvZ1uPiEy0Z2CO").then(e=>{s("Success!","Successfully contacted Peppubooks 👌","success")},e=>{s("Oops!",`${e} An error occurred`,"error")})}}},o={class:"container"},r=a('<div class="row"><h1 class="heading">Contact us</h1></div><div class="row"><h4 style="text-align:center;" class="heading-two">We&#39;d love to hear from you!</h4></div><div class="gjs-row" id="iggo"><div class="gjs-cell"><input type="text" id="icl3" placeholder="Name"></div></div><div class="gjs-row" id="if3b"><div class="gjs-cell" id="i9si"><input type="email" id="ius3" placeholder="Email"></div><div class="gjs-cell" id="iucq"><input type="number" id="i7cb" placeholder="Phone Number"></div></div><div class="gjs-row" id="i00z"><div class="gjs-cell" id="irns8"><textarea id="it23m" placeholder="Message"></textarea></div></div><div class="gjs-row" id="i00z"><div class="gjs-cell" id="irns8"><div class="submit-btn">Send Message</div></div></div>',6),l=[r];function n(e,v,p,u,_,g){return t(),d("div",o,l)}const j=i(c,[["render",n]]);export{j as default};
