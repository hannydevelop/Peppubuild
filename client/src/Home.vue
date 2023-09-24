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
        <div class="pages-sec">Project Name</div>
        <button v-if="projectName" type="button" class="btn btn-outline-secondary btn-sm mb-2 mx-2" @click="addPage()">
          {{ projectName }}
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
            <button class="nav-link active" data-bs-target="#database" data-bs-toggle="tab" type="button" role="tab"
              aria-selected="true">
              <i class="fa fa-database"></i>
            </button>
          </li>
          <li class="nav-item active" role="presentation">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#requests" type="button" role="tab"
              aria-controls="trait" aria-selected="false">
              <i class="fa fa-arrows"></i>
            </button>
          </li>
        </ul>
        <div class="collapse fade show active" id="database">
          <div class="card card-body">
            <form @submit.prevent="addKeys()">
              <input type="Text" class="form-control dbinput" placeholder="Anon key" v-model="dbAnon" />
              <input type="Text" class="form-control dbinput" placeholder="URL" v-model="dbUrl" />
              <button type="submit" class="btn btn-success requestbtn" @click="addKeys()">Add DB Keys</button>
            </form>
          </div>
        </div>
        <div class="collapse" id="requests">
          <div class="card card-body">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary requestbtn" data-bs-toggle="modal"
              data-bs-target="#exampleModal">
              Create New Request
            </button>
            <button class="btn btn-warning requestbtn" @click="updateRequest()">Update Request</button>
            <button class="btn btn-success requestbtn" @click="listRequest()">Requests List</button>
            <button class="btn btn-info requestbtn" @click="getData()">Get Data</button>
          </div>
        </div>
      </div>
    </div>
    <!-- API Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Create New Request</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <div v-if="apiReqUrl" class="alert alert-warning alert-dismissible fade show" role="alert">
              Your API request URL is localhost:3000/{{ title }}/{{ apiReqUrl }}.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createNewReq">
              <div class="form-group col-md-12 input">
                <label for="exampleInputEmail">API name</label>
                <input type="Text" class="form-control" name="exampleInputEmail" id="exampleInputEmail"
                  placeholder="Describe Feature of design" v-model="title" />
              </div>
              <div class="form-group col-md-12 input">
                <label for="exampleInputEmail">Description</label>
                <input type="Text" class="form-control" name="exampleInputEmail" id="exampleInputEmail"
                  placeholder="Describe Feature of design" v-model="description" />
              </div>
              <div class="form-group col-md-12">
                <label for="exampleInputEmail">Request</label>
                <div>
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#body" type="button" role="tab"
                        aria-controls="trait" aria-selected="false">
                        Body
                      </button>
                    </li>
                  </ul>
                  <div class="collapse fade show active" id="body">
                    <div class="card card-body">
                      <div>
                        <div v-for="(field, index) in reqbody" :key="index" class="field-wrapper">
                          <div class="form-check-inline col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                            <input type="Text" class="form-control" name="exampleInputEmail" id="exampleInputEmail"
                              placeholder="Value" v-model="reqbody[index].value" />
                          </div>
                          <button class="btn btn-danger" @click="removeBody(index)">Remove</button>
                        </div>
                        <button class="btn btn-success button" @click="addBody()">Add Field</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label>Create Request</label>
              </div>
              <div class="form-check-inline col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 input">
                <select class="form-select" aria-label="Default select example" v-model="reqType">
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT" selected>PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>
              <div class="form-check-inline col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 input">
                <input type="Text" class="form-control" name="exampleInputEmail" id="exampleInputEmail"
                  placeholder="API Path" v-model="path" />
              </div>
              <label for="accept">
                <input type="checkbox" v-model="accept"> Create all API Routes
              </label>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="createNewReq()">Create</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
    <div class="modal fade" id="connectModal" tabindex="-1" aria-labelledby="connectModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="connectModalLabel">Connect Element to API</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="input">
              <label>Request Type</label>
              <select class="form-select" aria-label="Default select example" v-model="apiReqType">
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT" selected>PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            <div class="input">
              <input type="Text" class="form-control" placeholder="URL" v-model="apiReqUrl" />
            </div>
            <label>Request Body</label>
            <div>
              <div>
                <div v-for="(field, index) in body" :key="index" class="field-wrapper">
                  <div class="form-check-inline col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <input type="Text" class="form-control" name="exampleInputEmail" id="exampleInputEmail"
                      placeholder="Value" v-model="body[index].value" />
                  </div>
                  <button class="btn btn-danger" @click="removeField(index)">Remove</button>
                </div>
                <button class="btn btn-success button" @click="addField()">Add Field</button>
              </div>
              <div class="input">
                <input type="Text" class="form-control" name="exampleInputEmail" id="exampleInputEmail"
                  placeholder="Function Name" v-model="funcName" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="connectAPI()">Connect</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!dbAnon && !dbUrl" class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>No DB Keys Set!</strong> You've not setup your DB keys for Supabase.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <div v-if="!projectName" class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>No Project Yet!</strong> Peppubuild will behave in an unexpected way if you don't create a project.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <div class="modal fade" id="apiModal" tabindex="-1" aria-labelledby="apiModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Request Lists</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <table class="table">
              <thead>
                <tr>
                  <th>POST</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Path</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="postReq in postReq">
                  <td>{{ postReq.name }}</td>
                  <td>{{ postReq.description }}</td>
                  <td>{{ postReq.path }}</td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th>GET</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Path</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="getReq in getReq">
                  <td>{{ getReq.name }}</td>
                  <td>{{ getReq.description }}</td>
                  <td>{{ getReq.path }}</td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th>UPDATE</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Path</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="updateReq in updateReq">
                  <td>{{ updateReq.name }}</td>
                  <td>{{ updateReq.description }}</td>
                  <td>{{ updateReq.path }}</td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th>DELETE</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Path</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="deleteReq in deleteReq">
                  <td>{{ deleteReq.name }}</td>
                  <td>{{ deleteReq.description }}</td>
                  <td>{{ deleteReq.path }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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

.dbinput {
  margin-top: 10px;
  margin-bottom: 10px;
}

.input {
  padding: 10px;
}

.button {
  margin: 10px;
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
import { left } from '@popperjs/core';
import * as bootstrap from 'bootstrap';
import gjsForms from 'grapesjs-plugin-forms'
import grapeNav from 'grapesjs-navbar';
import plugin from 'grapesjs-style-bg';

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
    pages: [],
    title: "",
    description: "",
    reqType: "",
    path: "",
    paramType: "",
    paramName: "",
    accept: "",
    apiReqType: "",
    apiReqUrl: "",
    funcName: "",
    body: [{ value: "" }],
    dbAnon: "",
    dbUrl: "",
    projectName: "",
    reqbody: [{ value: "" }],
    postReq: [],
    getReq: [],
    deleteReq: [],
    updateReq: []
  }),
  computed: {
    pm() {
      return this.editor.Pages;
    }
  },
  async mounted() {
    this.dbAnon = await fetch('http://localhost:4000/dbanon').then(response => { return response.text() });
    this.dbUrl = await fetch('http://localhost:4000/dburl').then(response => { return response.text() });

    this.projectName = await fetch('http://localhost:4000/pname').then(response => { return response.text() });

    this.pages = await fetch('http://localhost:4000/projects').then(response => { return response.json() });

    function myPlugin(editor) {
      var defaultType = editor.DomComponents.getType("default");
      var _initialize = defaultType.model.prototype.initialize;
      defaultType.model.prototype.initialize = function () {
        _initialize.apply(this, arguments);

        this.get("traits").add({
          type: "input",
          label: "Parent",
          name: "v-for"
        });

        this.get("traits").add({
          type: "",
          label: "Model",
          name: "v-model"
        });
      };

      editor.DomComponents.addType("custom-button", {
        extend: "button",
        view: {
          events: {
            dblclick: "handleDblClick"
          },
          handleDblClick() {
            new bootstrap.Modal('#connectModal').show();
          }
        }
      });

      editor.Blocks.add("Button", {
        label: "Custom Button",
        attributes: { class: "fa fa-square" },
        content: {
          type: "custom-button"
        },
        category: 'Extra'
      });
    }

    this.editor = grapesjs.init({
      showOffsets: 1,
      // dragMode: 'absolute',
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
          widthMedia: '',
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
      traitManager: {
        appendTo: '#traits-container',
      },
      layerManager: {
        appendTo: "#layers-container",
      },
      plugins: ["gjs-blocks-basic", gjsForms, myPlugin, grapeNav, plugin],
      pluginsOpts: {
        'gjs-blocks-basic': { flexGrid: true },
        gjsForms: {},
        grapeNav: {}
      },
    });

    this.editor.getModel().set('dmode', 'translate');

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


    let bm = this.editor.BlockManager;

    // Add a block
    bm.add("Button", {
      label: "Custom Button",
      attributes: { class: "fa fa-youtube-play" },
      content: {
        type: "custom-button"
      }
    });

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
    addField() {
      this.body.push({ value: '' }); // add empty value to the body array
    },
    removeField(index) {
      this.body.splice(index, 1); // remove field at the specified index
    },
    addBody() {
      this.reqbody.push({ value: '' }); // add empty value to the body array
    },
    removeBody(index) {
      this.reqbody.splice(index, 1); // remove field at the specified index
    },
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
        let PageId = this.pm.getSelected().id;
        let html = this.editor.Pages.get(PageId).getMainComponent().toHTML();
        await fetch(`http://localhost:4000/save/${PageId}`, {
          method: "PUT", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ component: component, styles: styles, html: html }),
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
    },
    createNewReq() {
      // collect request type.
      // get values and store them as an array.
      // turn reqType to smallerAlphabets
      // add values using forEach or so..
      /*
      `app.{{reqType}}({{path}}, (req, res) => {
          {{values.forEach}}
      })
      `
       */
      let type = this.reqType.toLowerCase();
      let reqPath = this.path;
      if (this.accept == 1) {
        try {
          let data = `${this.title}controller.get('${reqPath}', (req, res) => {
          const { data, error } = supabase
            .from('${this.title}')
            .select().then(data => {
            res.send(data)
          })
        })

        ${this.title}controller.post('${reqPath}', (req, res) => {
          ${this.reqbody.map(function (x) { return `let ${x.value} = req.body.${x.value}` }).join(";")}
          const { data, error } = supabase
            .from('${this.title}')
            .insert({ ${this.reqbody.map((x) => { return `${x.value}:${x.value}` })} }).then(data => {
            res.send(data)
          })
        })

        ${this.title}controller.delete('${reqPath}:id', (req, res) => {
          let id = req.params.id;
          const { data, error } = supabase
            .from('${this.title}')
            .delete()
            .eq('id', id).then(data => {
            res.send(data)
          })
        })

        ${this.title}controller.put('${reqPath}:id', (req, res) => {
          let id = req.params.id;
          ${this.reqbody.map(function (x) { return `let ${x.value} = req.body.${x.value}` }).join(";")}
          const { data, error } = supabase
            .from('${this.title}')
            .update({ ${this.reqbody.map((x) => { return `${x.value}:${x.value}` })} })
            .eq('id', id).then(data => {
            res.send(data)
          })
        })
        `
          fetch(`http://localhost:4000/creapi/${this.title}`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: data })
          });
          fetch(`http://localhost:4000/request/full`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: this.title, description: this.description, path: `http://localhost:4000${reqPath}${this.title}` })
          });
        } catch (error) {
          console.log(`${error}, "An error occurred", "error`);
        }
      } else if (type == 'get') {
        try {
          let data = `
          ${this.title}controller.get('${reqPath}', (req, res) => {
          const { data, error } = supabase
            .from('${this.title}')
            .select().then(data => {
            res.send(data)
          })
        })
        `
          fetch(`http://localhost:4000/creapi/${this.title}`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: data })
          });
          fetch(`http://localhost:4000/request/read`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: this.title, description: this.description, path: `http://localhost:4000${reqPath}${this.title}` })
          });
        } catch (error) {
          console.log(`${error}, "An error occurred", "error`);
        }
      } else if (type == 'post') {
        try {
          let data = `
          ${this.title}controller.post('${reqPath}', (req, res) => {
          ${this.reqbody.map(function (x) { return `let ${x.value} = req.body.${x.value}` }).join(";")}
          const { data, error } = supabase
            .from('${this.title}')
            .insert({ ${this.reqbody.map((x) => { return `${x.value}:${x.value}` })} }).then(data => {
            res.send(data)
          })
        })
        `
          fetch(`http://localhost:4000/creapi/${this.title}`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: data })
          });
          fetch(`http://localhost:4000/request/create`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: this.title, description: this.description, path: `http://localhost:4000${reqPath}${this.title}` })
          });
        } catch (error) {
          console.log(`${error}, "An error occurred", "error`);
        }
      } else if (type == 'put') {
        try {
          let data = `
          ${this.title}controller.put('${reqPath}:id', (req, res) => {
          let id = req.params.id;
          ${this.reqbody.map(function (x) { return `let ${x.value} = req.body.${x.value}` }).join(";")}
          const { data, error } = supabase
            .from('${this.title}')
            .update({ ${this.reqbody.map((x) => { return `${x.value}:${x.value}` })} })
            .eq('id', id).then(data => {
            res.send(data)
          })
        })
        `
          fetch(`http://localhost:4000/creapi/${this.title}`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: data })
          });
          fetch(`http://localhost:4000/request/update`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: this.title, description: this.description, path: `http://localhost:4000${reqPath}${this.title}` })
          });
        } catch (error) {
          console.log(`${error}, "An error occurred", "error`);
        }
      } else if (type == 'delete') {
        try {
          let data = `
          ${this.title}controller.delete('${reqPath}:id', (req, res) => {
          let id = req.params.id;
          const { data, error } = supabase
            .from('${this.title}')
            .delete()
            .eq('id', id).then(data => {
            res.send(data)
          })
        })
        `

          fetch(`http://localhost:4000/creapi/${this.title}`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: data })
          });
          fetch(`http://localhost:4000/request/delete`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: this.title, description: this.description, path: `http://localhost:4000${reqPath}${this.title}` })
          });
        } catch (error) {
          console.log(`${error}, "An error occurred", "error`);
        }
      }
      // `res.status(${this.title})`;

    },
    connectFrontend() {
      new bootstrap.Modal('#connectModal').show();
    },

    connectAPI() {
      /*
      let data = `axios({
        method: '${this.apiReqType}',
        url: '${this.apiReqUrl}',
        headers: {'${this.apiReqHeaders}'},
        data: { ${this.apiReqData} }
      }).then(response => { return response })`
       */
      // add an 'add' button to the key and value input.
      // make values added into an array.
      // now, imbed data into a for loop.

      let data = `
      ${this.funcName} {
        axios({
        method: '${this.apiReqType}',
        url: '${this.apiReqUrl}',
        data: { ${this.body.map((x) => { return `${x.value}:this.${x.value}` })}}
      }).then(response => { return response })
      },
      `
      try {
        fetch(`http://localhost:4000/conapi`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: data, return_data: this.body })
        });
      } catch {
        console.log('An error occurred')
      }
      // add onclick event to button. 
      // randomly choose function name and embed the axios code to the function name.
    },

    addKeys() {
      let anon_key = this.dbAnon;
      let url = this.dbUrl;
      try {
        fetch(`http://localhost:4000/createdb`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ anon_key: anon_key, url: url })
        });
      } catch {
        console.log('an error occurred')
      }
    },
    async listRequest() {
      this.postReq = await fetch('http://localhost:4000/apis/create').then(response => { return response.json() });
      this.getReq = await fetch('http://localhost:4000/apis/read').then(response => { return response.json() });
      this.updateReq = await fetch('http://localhost:4000/apis/update').then(response => { return response.json() });
      this.deleteReq = await fetch('http://localhost:4000/apis/delete').then(response => { return response.json() });

      new bootstrap.Modal('#apiModal').show();

    },
    async getData() {
      let parent = prompt('what is the parent of the data');
      let path = prompt('what is the path of the data');
      if (parent || path !== null) {
        try {
          fetch(`http://localhost:4000/calldata`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ contain: parent, path: path })
          });
        } catch { }
      }
    }
  },
};
</script>