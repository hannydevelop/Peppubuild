import en from './locale/en';

export default (editor, opts = {}) => {
  const commands = editor.Commands;
  const pn = editor.Panels
  let editPanel = null

  const options = {
    ...{
      i18n: {},
      // default options
    }, ...opts
  };

  // Load i18n files
  editor.I18n && editor.I18n.addMessages({
    en,
    ...options.i18n,
  });

  editor.Panels.addButton('options', [
    {
      id: 'bcode',
      className: 'fa fa-terminal',
      active: false,
      command: 'peppu:code'
    }
  ])

  // create sidebar button
  commands.add('peppu:code', {
    run: function (editor) {
      if (editPanel == null) {
        const editMenuDiv = document.createElement('div')
        editMenuDiv.innerHTML = 
          `
          ${htmlContent}
          `
        const panels = pn.getPanel('views-container')
        panels.set('appendContent', editMenuDiv).trigger('change:appendContent')
        editPanel = editMenuDiv

        // Append css styles to html
        const style = document.createElement('style');
        style.innerText = `${cssContent}`;
        document.head.appendChild(style);

        // Append script to html
        const script = document.createElement('script');

        document.head.appendChild(script);
      }
      editPanel.style.display = 'block'
    },
    stop: function (editor) {
      if (editPanel != null) {
        editPanel.style.display = 'none';
      }
    }
  });

  let htmlContent = `
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
  `

  let cssContent = `
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
  `
let jsContent = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
`
};