import grapesjs from 'grapesjs'

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
    components: '<div class="txt-red">Hello world!</div>',
    style: '.txt-red{color: red}',
});