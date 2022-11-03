<template>
  <div c-if="User" class="homeContainer">
    <my-header></my-header>
    <my-user-directory></my-user-directory>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader.vue';
import MyUserDirectory from '@/components/MyUserDirectory.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'HomePage',
  components: {
    MyHeader, MyUserDirectory,
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