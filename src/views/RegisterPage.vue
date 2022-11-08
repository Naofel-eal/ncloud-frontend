<template>
    <div class="registerPageDiv">
        <register-panel></register-panel>
        <my-clouds></my-clouds>
    </div>
</template>

<script>
import MyClouds from '@/components/MyClouds.vue'
import RegisterPanel from '@/components/registerPanel.vue';
export default {
    name:'RegisterPage',
    components: {RegisterPanel, MyClouds},
}
</script>

<style scoped>
.registerPageDiv
{
  max-width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>