<template>
<div>Hii</div>
</template>

<script>
export default {
  name: 'Playground',
  async mounted() {
    // gen package.json()
    const package_json = await fetch('https://raw.githubusercontent.com/hannydevelop/Template/main/node/package.json');
    // Get the Blob data
    const json = await package_json.text()
    console.log(json)
  }
}
</script>