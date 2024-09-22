<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <SideBar />
      <div class="col py-3">
        <div class="dash-content" id="d-cont">
          <div id="i2sw">Manage your Projects
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
                <h2>Projects</h2>
                <p class="project-deck"> Continue from where you left off. Please note that projects not saved will be
                  lost.</p>
                <div class="card text-center project-deck">
                  <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="true" href="#">Active</a>
                      </li>
                    </ul>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">Create New Project</h5>
                    <p class="card-text">With Peppubuild, you can create a new project from scratch, build with our
                      personalised AI, or build with a template</p>
                    <button type="button" class="action_btn btn btn-success" data-bs-toggle="modal"
                      data-bs-target="#exampleModal">New Project</button>
                  </div>
                </div>
                <div class="row" v-if="projects">
                  <div class="col-sm-6" v-for="project in projects" :key="project.id">
                    <div class="card project-deck">
                      <div class="card-header">
                        Project
                      </div>
                      <div class="card-body">
                        <h2 class="card-title">{{ project.name.split('.').slice(0, -1).join('.') }}</h2>
                        <div class="card-footer">
                          <button @click="deleteProject(project.id)" class="btn btn-danger">Delete</button>
                          <button @click="projectWorkspace(project.id, project.name)"
                            class="btn btn-primary">Continue</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Modal -->

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">New Project</h1>
                  </div>
                  <div class="modal-body">
                    Choose if you'd like to create from an empty workspace or using a template
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="emptyProject()">Empty
                      Workspace</button>
                    <button type="button" class="btn btn-dark" @click="templateProject()">Build with Template</button>
                    <button type="button" class="btn btn-success" @click="aiProject()">Build with AI</button>
                  </div>
                </div>
              </div>
            </div>
          </section-one>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userAuth } from './js/firebase.js';
import Swal from 'sweetalert2'
import SideBar from '../components/SideBar.vue';

const serverUrl = 'https://server.peppubuild.com';
export default {
  name: 'DashboardPage',
  components: { SideBar },

  async mounted() {
    let accessToken = localStorage.getItem('oauth')
    let url = `${serverUrl}/projects/${accessToken}`
    await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((response) => {
        this.projects = response;
      })
    })
  },
  data() {
    return {
      projects: []
    };
  },

  methods: {
    // check state to see if auth changed.
    checkState() {
      return new Promise((resolve, reject) => {
        userAuth.onAuthStateChanged((user) => {
          if (user) {
            user.getIdToken(true).then((accessToken) => {
              resolve(document.cookie = `pepputoken=${accessToken}; max-age=3300`)
            })
          }
          reject
        })
      })
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
    async projectWorkspace(id, name) {
      // get content.
      // set the value of gjsProject.
      await this.checkState();
      Swal.showLoading();
      let url = `${serverUrl}/project/${id}`
      localStorage.setItem('projectId', id);
      localStorage.setItem('projectName', name);
      let accessToken = localStorage.getItem('oauth')
      await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken: accessToken }),
      }).then((res) => {
        res.json().then((response) => {
          let projectString = JSON.stringify(response);
          localStorage.setItem('gjsProject', projectString);
          this.$router.push({ name: "Home" });
        })
      })
    },
    // Delete project
    async deleteProject(id) {
      let accessToken = localStorage.getItem('oauth')
      let url = `${serverUrl}/pdelete/${id}`
      let deleteQuestion = confirm('Do you want to delete this project');
      if (deleteQuestion) {
        await fetch(url, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accessToken: accessToken }),
        }).then((res) => {
          if (res.status == 200) {
            // delete project from array
            // console.log(this.projects)
            let index = this.projects.findIndex(project => project.id === id)
            this.projects.splice(index, 1);
            // alert('Successfully deleted project')                    
          }
        })
      }
    },
    async emptyProject() {
      let name = prompt('What will you like to name your project?');
      if (name) {
        localStorage.setItem('projectName', name);
        let gjsProject = '{}'
        let accessToken = localStorage.getItem('oauth')
        let url = `${serverUrl}/publishfront/${name}`
        Swal.showLoading();
        await fetch(url, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gjsProject: gjsProject, accessToken: accessToken }),
        }).then((res) => {
          res.json().then((response) => {
            if (res.status == 200) {
              Swal.close();
              localStorage.setItem('projectId', response.id);
              this.$router.push({ name: "Home" })
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.error,
                footer: '<a href="https://www.docs.peppubuild.com">Why do I have this issue?</a>'
              });
            }
          })
        })
      }
    },
    templateProject() {
      localStorage.removeItem('gjsProject');
      let name = prompt('What will you like to name your project?');
      if (name) {
        localStorage.setItem('projectName', name);
        // window.location.href = "/";
      }
    },
    aiProject() {

    }
  }
}
</script>