<template>
    <div class="">
        <form @submit.prevent="createNewReq">
            <div class="form-group col-md-12">
                <label for="exampleInputEmail">API name</label>
                <input type="Text" class="form-control" name="exampleInputEmail" id="exampleInputEmail"
                    placeholder="Describe Feature of design" v-model="title" />
            </div>
            <div class="form-group col-md-12">
                <label for="exampleInputEmail">Description</label>
                <input type="Text" class="form-control" name="exampleInputEmail" id="exampleInputEmail"
                    placeholder="Describe Feature of design" v-model="description" />
            </div>
            <div class="form-group col-md-12">
                <label for="exampleInputEmail">Request</label>
                <div>
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" data-bs-target="#params" id="home-tab" data-bs-toggle="tab"
                                type="button" role="tab" aria-selected="true">
                                Params
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#body" type="button" role="tab"
                                aria-controls="trait" aria-selected="false">
                                Body
                            </button>
                        </li>
                    </ul>
                    <div class="collapse fade" id="body">
                        <div class="card card-body">
                            <button class="btn btn-primary requestbtn" @click="createRequest()">Create Request</button>
                        </div>
                    </div>
                    <div class="collapse fade show active" id="params">
                        <div class="form-check-inline col-md-2">
                            <select class="form-select" aria-label="Default select example" v-model="reqType">
                                <option value="GET">Parameter Type</option>
                                <option value="GET">String</option>
                                <option value="POST">Integer</option>
                            </select>
                        </div>
                        <div class="form-check-inline col-md-5">
                            <input type="Text" class="form-control" name="exampleInputEmail" id="exampleInputEmail"
                                placeholder="Parameter Name" v-model="path" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group col-md-12">
                <label for="exampleInputEmail">Response</label>
                <div>
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" data-bs-target="#status" data-bs-toggle="tab" type="button"
                                role="tab" aria-selected="true">
                                Status
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#send" type="button" role="tab"
                                aria-controls="trait" aria-selected="false">
                                Send
                            </button>
                        </li>
                    </ul>
                    <div class="collapse fade" id="send">
                        <div class="card card-body">
                            <button class="btn btn-primary requestbtn" @click="createRequest()">Create Request</button>
                        </div>
                    </div>
                    <div class="collapse fade show active" id="status">
                        <div class="card card-body">
                            <button class="btn btn-secondary requestbtn" @click="createRequest()">Create Request</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-check-inline col-md-2">
                <select class="form-select" aria-label="Default select example" v-model="reqType">
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
            </div>
            <div class="form-check-inline col-md-5">
                <input type="Text" class="form-control" name="exampleInputEmail" id="exampleInputEmail"
                    placeholder="API Path" v-model="path" />
            </div>
            <div class="form-check-inline col-md-4">
                <button type="button" class="btn btn-primary" @click="createNewReq()">Create</button>
            </div>
        </form>
    </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
    name: 'Newreq',
    data() {
        return {
            title: "",
            description: "",
            reqType: "",
            path: ""
        }
    },

    methods: {
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
            let finalValue =
                `app.${type}(${reqPath}, (req, res) => {
                {{values.forEach}}
            })
            `
            alert(finalValue)
        }
    }
}
</script>