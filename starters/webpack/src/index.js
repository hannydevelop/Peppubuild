import grapesjs from 'grapesjs'

let data = await fetch('peppubuild.json').then(response => {return response.json()})
/*
data.pageOne prints
  "assets": "[]",
  "pages": "[]",
  "styles": "[]",
*/
/* 
function component() {
    const element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');  
    return element;
  }
  
  document.body.appendChild(component());
*/

// create a function that returns html and css from editor
// call the above function in generator index.js

var editor = grapesjs.init({
    container : '#gjs',
});

editor.loadProjectData(data.pageOne)