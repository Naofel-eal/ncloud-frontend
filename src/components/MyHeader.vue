<template>
  <div class="header">
    <div class="invisible"></div>
    <div class="titleLogo">
      <img class="logo" src='@/assets/img/logo.png'>
      <h2>Home</h2>
    </div>
    <div class="logoutDiv" @click="logOut" ><img class="logOut" src="@/assets/img/logout.svg"></div>
  </div>
</template>

<script>
export default {
    name: 'MyHeader',
    methods: {
      logOut(){
        sessionStorage.setItem('isLogged', false);
        sessionStorage.setItem('tokken', null);
        this.$router.push('/');
      }
    }
}
</script>

<style scoped>
.header
{
    top:0;
    left:0;
    width: 100%;
    height: 10%;
    margin: 0;
    padding: 0 1rem;
    background-color: #1d1e26;
    display: flex;
    justify-content: space-between;
    border-bottom: 10px solid;
    border-image-slice: 1;
    border-width: 5px;
    border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
}
.logo
{
  max-height: 90%;
  margin-right: 10px;
}
h2
{
  font-family: 'Lato', Verdana, Geneva, Tahoma, sans-serif;
  margin: 0 0;
  text-align: center;
  color: white;
  font-size: 3rem;
}
.titleLogo
{
  display: flex;
  justify-content: center;
  place-items: center;
}

.logOut, .invisible
{
  height: 50%;
  margin: none;
  filter: invert(100%);
}
.logOut
{
  cursor: pointer;
}
.logoutDiv {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>