<template>
    <div>
        <img src="./img/notfound.png" class="element"/>
    </div>
    <div class="element text">
        <h6>404: We don't have what you're looking for, Lets take you <router-link to="/dashboard/projects">Home.</router-link></h6>
    </div>
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>