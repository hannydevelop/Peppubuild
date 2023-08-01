<template>
    <div class="">
        <form @submit.prevent="sendFile">
            <div class="form-group col-md-12">
                <label for="exampleInputEmail">API name</label>
                <input type="Text" class="form-control" name="exampleInputEmail" id="exampleInputEmail"
                    placeholder="Describe Feature of design" v-model="title" />
            </div>
            <div class="form-group col-md-12">
                <label for="exampleInputEmail">Description</label>
                <input type="Text" class="form-control" name="exampleInputEmail" id="exampleInputEmail"
                    placeholder="Describe Feature of design" v-model="title" />
            </div>
            <div class="form-group col-md-12">
                <label for="exampleInputEmail">Params</label>
            </div>
            <div class="form-group col-md-12">
                <label for="exampleInputEmail">Response</label>
            </div>
            <div class="form-check-inline col-md-1">
                <select class="form-select" aria-label="Default select example">
                    <option value="GET">GET</option>
                    <option value="POST">One</option>
                    <option value="PUT">Two</option>
                    <option value="DELETE">Three</option>
                </select>
            </div>
            <div class="form-check-inline col-md-6">
                <input type="Text" class="form-control" name="exampleInputEmail" id="exampleInputEmail"
                    placeholder="API Path" v-model="title" />
            </div>
            <div class="form-check-inline col-md-4">
                <button type="button" class="btn btn-primary">Create</button>
            </div>
        </form>
    </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
    name: 'Newreq',
}
</script>