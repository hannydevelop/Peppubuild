<template>
  <div>
    <div id="navbar" class="sidenav d-flex flex-column overflow-scroll">
      <nav class="navbar navbar-light">
        <div class="container-fluid">
          <img class="navbar-brand mb-0 h3 logo" src="https://www.linkpicture.com/q/IMG_2437-1.png" />
        </div>
      </nav>
      <div class="my-2 d-flex flex-column">
        <button type="button" class="btn btn-outline-secondary btn-sm mb-2 mx-2" @click="addPage()">
          New Page <i class="fa fa-plus"></i>
        </button>
        <div class="pages-sec">Pages</div>
        <button type="button" class="btn btn-outline-secondary btn-sm mb-2 mx-2" v-for="page in pages" :key="page.id"
          :class="{ page: 1, selected: isSelected(page) }" @click="selectPage(page.id)">
          {{ page.get('name') || page.id }} <span v-if="!isSelected(page)" @click="removePage(page.id)"
            class="page-close"><i class="fa fa-trash"></i></span>
        </button>
      </div>
      <div class="">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#block" type="button"
              role="tab" aria-controls="block" aria-selected="true">
              <i class="fa fa-bars"></i>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="trait-tab" data-bs-toggle="tab" data-bs-target="#trait" type="button" role="tab"
              aria-controls="trait" aria-selected="false">
              <i class="fa fa-cog"></i>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="style-tab" data-bs-toggle="tab" data-bs-target="#style" type="button" role="tab"
              aria-controls="style" aria-selected="false">
              <i class="fa fa-paint-brush"></i>
            </button>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane fade show active" id="block" role="tabpanel" aria-labelledby="block-tab">
            <div id="blocks"></div>
          </div>
          <div class="tab-pane fade" id="trait" role="tabpanel" aria-labelledby="trait-tab">
            <div id="layers-container"></div>
          </div>
          <div class="tab-pane fade" id="style" role="tabpanel" aria-labelledby="style-tab">
            <div id="traits-container"></div>
            <div id="style-manager-container"></div>
          </div>
        </div>
      </div>
      <div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" type="button" role="tab"
              aria-selected="true">
              <i class="fa fa-database"></i>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#requests" type="button" role="tab"
              aria-controls="trait" aria-selected="false">
              <i class="fa fa-arrows"></i>
            </button>
          </li>
        </ul>
        <div class="collapse" id="requests">
          <div class="card card-body">
            <button class="btn btn-primary requestbtn" @click="createRequest()">Create Request</button>
            <button class="btn btn-warning requestbtn" @click="updateRequest()">Update Request</button>
            <button class="btn btn-success requestbtn" @click="listRequest()">Requests List</button>
          </div>
        </div>
      </div>
    </div>
    <div class="main-content">
      <nav class="navbar navbar-light">
        <div class="container-fluid">
          <div class="panel__devices"></div>
          <div class="panel__basic-actions"></div>
        </div>
      </nav>
      <div id="editor"></div>
    </div>
  </div>
</template>
  
<style>
.button,
.requestbtn {
  margin: 10px;
  font-size: 12px;
}
.button:hover {
  background-color: #4caf50;
  /* Green */
  border: none;
  color: white;
  padding: 5px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

body {
  margin: 0;
  padding: 0;
}

html {
  overflow: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

::-webkit-scrollbar {
  display: none;
}

.sidenav {
  position: fixed;
  top: 0;
  left: 0;
  width: 20%;
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  background-color: rgba(255, 255, 255, 0.95);
  -webkit-transition: 0.5s;
  transition: 0.5s;
  -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.sidenav .logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}

.sidenav .pages {
  height: 100px;
  overflow: scroll;
  overflow-x: hidden;
}

.main-content {
  position: relative;
  width: 80%;
  left: 20%;
}

.main-content .navbar {
  padding: 0;
}

.main-content .navbar .container-fluid {
  padding: 0;
}

.pages-sec {
  text-align: center;
  margin-top: 2vw;
  margin-bottom: 0.5vw;
}

.nav {
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.gjs-pn-panel {
  position: relative;
}

.gjs-cv-canvas {
  width: 100%;
  height: 100%;
  top: 0;
}

.tab-content {
  display: contents;
}

#block {
  height: 100%;
}

#block #blocks {
  height: 100%;
}

#block #blocks .gjs-blocks-c {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

#block #blocks .gjs-block {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

#block #blocks .gjs-block-label {
  display: none;
}

/* Theming */
.gjs-one-bg {
  background-color: #fff !important;
  ;
}

.gjs-two-color {
  color: #9ca8bb;
}

.gjs-three-bg {
  background-color: #1df205;
  color: white;
}

.gjs-four-color,
.gjs-four-color-h:hover {
  color: #1df205;
}
</style>
  
  
<script>
import grapesjs from 'grapesjs'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

const swv = "sw-visibility";
const expt = "export-template";
const ful = "fullscreen";
const prv = "preview";
const cmdClear = 'canvas-clear';

// we'll charge users to get their project from our database.
export default {
  name: 'Home',
  data: () => ({
    editor: null,
    pages: []
  }),
  computed: {
    pm() {
      return this.editor.Pages;
    }
  },
  async mounted() {
    this.pages = await fetch('http://localhost:4000/projects').then(response => { return response.json() });
    this.editor = grapesjs.init({
      showOffsets: 1,
      noticeOnUnload: 0,
      container: "#editor",
      storageManager: false,
      fromElement: true,
      allowScripts: true,
      mediaCondition: 'min-width', // default is `max-width`
      pageManager: {
        pages: this.pages
      },
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
      plugins: ["gjs-blocks-basic"],
      pluginsOpts: {
        "gjs-blocks-basic": { blocks: "image, video, map, text, link" },
      },
    });

    this.editor.Panels.getPanels().reset([
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
            id: ful,
            className: 'fa fa-arrows-alt',
            command: ful,
            context: ful,
            attributes: { title: 'Fullscreen' },
          },
          {
            id: 'undo',
            command: 'core:undo',
            label: `<svg viewBox="0 0 24 24">
<path fill="currentColor" d="M20 13.5C20 17.09 17.09 20 13.5 20H6V18H13.5C16 18 18 16 18 13.5S16 9 13.5 9H7.83L10.91 12.09L9.5 13.5L4 8L9.5 2.5L10.92 3.91L7.83 7H13.5C17.09 7 20 9.91 20 13.5Z" />
</svg>`
          },
          {
            id: 'redo',
            command: 'core:redo',
            label: `<svg viewBox="0 0 24 24">
<path fill="currentColor" d="M10.5 18H18V20H10.5C6.91 20 4 17.09 4 13.5S6.91 7 10.5 7H16.17L13.08 3.91L14.5 2.5L20 8L14.5 13.5L13.09 12.09L16.17 9H10.5C8 9 6 11 6 13.5S8 18 10.5 18Z" />
</svg>`,
          },
          {
            id: expt,
            command: expt,
            label: `<svg viewBox="0 0 24 24">
<path fill="currentColor" d="M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z" />
</svg>`
          },
          {
            id: cmdClear,
            command: 'core:canvas-clear',
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
    this.editor.Commands.add('set-device-desktop', {
      run: editor => editor.setDevice('Desktop')
    });
    this.editor.Commands.add('set-device-mobile', {
      run: editor => editor.setDevice('Mobile')
    });
    this.editor.Commands.add('set-device-tablet', {
      run: editor => editor.setDevice('Tablet')
    });

    // Add Save Button
    this.editor.Panels.addButton('options', [
      {
        id: 'save',
        label: '<i class="fa fa-save"></i>',
        command: () => this.editor.runCommand(this.saveFile())
      }
    ])
    this.editor.Panels.addButton('options', [{
      id: prv,
      label: '<i class="fa fa-eye"></i>',
      command: () => this.editor.runCommand(this.preview())
    }])

    // Add Save Button
    this.editor.Panels.addButton('options', [
      {
        id: 'publish',
        label: '<i class="fa fa-upload"></i>',
        command: publishFile
      }
    ])


    async function publishFile() {
      // This is the setup button. Users can hit it to bootstrap their
      // Project. A popup to choose frontend, backend or fullstack should be presented.
      // Users can setup frontend only and choose backend et al later.
      let name = prompt('what will you name your project')
      swal("What type of project will you like to create", {
        buttons: {
          front: {
            text: "Frontend",
            value: "front",
          },
          back: {
            text: "Backend",
            value: "back",
          },
          defeat: {
            text: "Fullstack",
            value: "full",
          }
        },
      })
        .then((value) => {
          switch (value) {

            case "front":
              try {
                fetch(`http://localhost:4000/publishfront/${name}`, {
                  method: "POST", // or 'PUT'
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                swal("Successfully!", "Frontend bootstrapped", "success");
              } catch (error) {
                swal("Error", "An error occurred", "error");
              }
              break;

            case "back":
              try {
                fetch(`http://localhost:4000/publishback/${name}`, {
                  method: "POST", // or 'PUT'
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                swal("Successful!", "Backend bootstrapped", "success");
              } catch (error) {
                swal("Error", "An error occurred", "error");
              }
              break;

            case "full":
              try {
                fetch(`http://localhost:4000/publishfull/${name}`, {
                  method: "POST", // or 'PUT'
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                swal("Successful!", "Fullstack bootstrapped", "success");
              } catch (error) {
                swal("Error", "An error occurred", "error");
              }
              break;

            default:

          }
        });

      /* 
      let name = prompt('what will you name your project')

      try {
        await fetch(`http://localhost:4000/publish/${name}`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("Error:", error);
      }
      */
    }

    /* 
    const pageManager = editor.Pages;

    async function addPage(pageName) {
      pageManager.add({ id: pageName });
      await saveFile();
      pageManager.select(pageName);

      // get all pages and store in vue data. this will form an array.
      // we can now do v-for to get all pages.
      // we can now load on select, with the pageManager.select(pageName) when the user clicks on the button.
      pageManager.getAll();
    }
    */
    const { pm } = this;
    this.setPages(pm.getAll());
    this.editor.on('page', () => {
      this.pages = [...pm.getAll()];
    });
  },
  methods: {
    preview() {
      let page_name = this.pm.getSelected().id;
      if (page_name == 'index') {
        let url = `http://localhost:8080/appfront`;
        window.open(url, "_blank");
      } else {
        let url = `http://localhost:8080/appfront/${page_name}.html`;
        window.open(url, "_blank");
      }
    },
    async saveFile() {
      // we'll charge users to save their project into our database.
      let component = this.editor.Pages.getSelected().getMainComponent();
      let styles = this.editor.getStyle();
      try {
        let PageId = this.pm.getSelected().id
        await fetch(`http://localhost:4000/save/${PageId}`, {
          method: "PUT", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ component: component, styles: styles }),
        });

        console.log("Success:");
      } catch (error) {
        console.error("Error:", error);
      }
    },
    setPages(pages) {
      this.pages = [...pages];
    },
    isSelected(page) {
      return this.pm.getSelected().id == page.id;
    },
    selectPage(pageId) {
      return this.pm.select(pageId);
    },
    async removePage(pageId) {
      this.pm.remove(pageId);
      console.log(pageId)
      try {
        await fetch(`http://localhost:4000/delete/${pageId}`, {
          method: "DELETE", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async addPage() {
      const { pm } = this;
      let text = prompt('What would you like to name this page?');
      let pageName = text.replace(/ /g, '');
      pm.add({
        id: pageName,
        component: {},
        styles: []
      });
      try {
        await fetch("http://localhost:4000/add", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: pageName, component: {}, styles: [] })
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  },
};
</script>