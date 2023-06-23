import grapesjs from 'grapesjs'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const swv = "sw-visibility";
const expt = "export-template";
const ful = "fullscreen";
const prv = "preview";
const cmdClear = 'canvas-clear';

// we'll charge users to get their project from our database.
let data = await fetch('http://localhost:4000/projects').then(response => { return response.json() })
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
  showOffsets: 1,
  noticeOnUnload: 0,
  container: "#editor",
  storageManager: false,
  fromElement: true,
  allowScripts: true,
  mediaCondition: 'min-width', // default is `max-width`
  pageManager: {},
  deviceManager: {
    devices: [{
      name: 'Mobile',
      width: '320',
      widthMedia: '',
    }, {
      name: 'Desktop',
      width: '',
      widthMedia: '1024',
    },
    {
      name: 'Tablet',
      width: '900',
      widthMedia: '',
    }
    ]
  },
  blockManager: {
    appendTo: "#blocks",
  },
  styleManager: {
    appendTo: '#style-manager-container',
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
    }],
  },
  traitManager: {
    appendTo: '#traits-container',
  },
  layerManager: {
    appendTo: "#layers-container",
  },
});

editor.Panels.getPanels().reset([
  {
    id: 'options',
    el: ".panel__basic-actions",
    buttons: [
      {
        active: true,
        id: swv,
        className: 'fa fa-square-o',
        command: 'core:component-outline',
        context: swv,
        attributes: { title: 'View components' },
      },
      {
        id: prv,
        className: 'fa fa-eye',
        command: prv,
        context: prv,
        attributes: { title: 'Preview' },
      },
      {
        id: ful,
        className: 'fa fa-arrows-alt',
        command: ful,
        context: ful,
        attributes: { title: 'Fullscreen' },
      },
      {
        id: 'undo',
        command: () => editor.runCommand('core:undo'),
        label: `<svg viewBox="0 0 24 24">
<path fill="currentColor" d="M20 13.5C20 17.09 17.09 20 13.5 20H6V18H13.5C16 18 18 16 18 13.5S16 9 13.5 9H7.83L10.91 12.09L9.5 13.5L4 8L9.5 2.5L10.92 3.91L7.83 7H13.5C17.09 7 20 9.91 20 13.5Z" />
</svg>`
      },
      {
        id: 'redo',
        command: () => editor.runCommand('core:redo'),
        label: `<svg viewBox="0 0 24 24">
<path fill="currentColor" d="M10.5 18H18V20H10.5C6.91 20 4 17.09 4 13.5S6.91 7 10.5 7H16.17L13.08 3.91L14.5 2.5L20 8L14.5 13.5L13.09 12.09L16.17 9H10.5C8 9 6 11 6 13.5S8 18 10.5 18Z" />
</svg>`,
      },
      {
        id: expt,
        command: () => editor.runCommand(expt),
        label: `<svg viewBox="0 0 24 24">
<path fill="currentColor" d="M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z" />
</svg>`
      },
      {
        id: cmdClear,
        command: () => editor.runCommand('core:canvas-clear'),
        label: `<svg viewBox="0 0 24 24">
<path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
</svg>`,
      },
    ],
  },
  {
    id: 'panel-devices',
    el: ".panel__devices",
    buttons: [
      {
        id: 'device-desktop',
        label: '<i class="fa fa-laptop"></i>',
        command: 'set-device-desktop',
        active: true,
        togglable: false,
      },
      {
        id: 'device-mobile',
        label: '<i class="fa fa-tablet fa-rotate-270"></i>',
        command: 'set-device-tablet',
        togglable: false,
      },
      {
        id: 'device-tablet',
        label: '<i class="fa fa-tablet"></i>',
        command: 'set-device-mobile',
        togglable: false,
      }
    ]
  }
])

// Device Commands
editor.Commands.add('set-device-desktop', {
  run: editor => editor.setDevice('Desktop')
});
editor.Commands.add('set-device-mobile', {
  run: editor => editor.setDevice('Mobile')
});
editor.Commands.add('set-device-tablet', {
  run: editor => editor.setDevice('Tablet')
});

editor.loadProjectData(data)

// Add Save Button
editor.Panels.addButton('options', [
  {
    id: 'save',
    label: '<i class="fa fa-save"></i>',
    command: saveFile
  }
])

// Add Save Button
editor.Panels.addButton('options', [
  {
    id: 'publish',
    label: '<i class="fa fa-upload"></i>',
    command: publishFile
  }
])

async function saveFile() {
  let projectData = editor.getProjectData();
  // we'll charge users to save their project into our database.
  let data = projectData;
    try {
      const response = await fetch("http://localhost:4000/save", {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
}
async function publishFile() {
  try {
    const response = await fetch("http://localhost:4000/publish", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Success:");
  } catch (error) {
    console.error("Error:", error);
  }
}

const pageManager = editor.Pages;

async function addPage(pageName) {
  pageManager.add({id: pageName});
  await saveFile();
  pageManager.select(pageName);
}

window.addPage = addPage;