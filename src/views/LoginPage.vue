<template>
    <div class="loginPageDiv">
        <login-panel></login-panel>
        <my-clouds></my-clouds>
    </div>
</template>

<script>
import LoginPanel from '@/components/LoginPanel.vue'
import MyClouds from '@/components/MyClouds.vue'
export default {
    name: 'LoginPage',
    components: {
        LoginPanel,
        MyClouds
    },
}
</script>

<style scoped>
.loginPageDiv
{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>