<template>
  <div c-if="User" class="homeContainer">
    <my-header></my-header>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader.vue'

export default {
  name: 'HomePage',
  components: {
    MyHeader
  },
}
</script>

<style>
.homeContainer
{
  width: 100%;
  height: 100%;
}
</style>