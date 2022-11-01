<template>
  <div class="appDiv">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.appDiv
{
  max-width: 100vw;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
