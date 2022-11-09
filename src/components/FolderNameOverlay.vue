<template>
  <div class="bloc-modale" v-if="revele">
    <div class="overlay" @click="exitOverlay(0)"></div>
    <div class="modale card">
        <div class="btn-modale btn btn-danger" @click="exitOverlay(0)">X</div>
        <h2>Folder name:</h2>
        <form>
            <input v-model="folderName" type="text" placeholder="Enter the folder's name" autofocus>
            <button class="valid" role="button" 
            @click="this.value=this.folderName;this.folderName='';exitOverlay(this.value)">
            Valid</button>
        </form>
    </div>
  </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
export default {
    name:'FolderNameOverlay',
    props: ['revele', 'openOverlay', 'exitOverlay'],
    data () {
        return {
            value : "",
        }
    }
}
</script>
 
<style scoped>
h2 {
    color: white;
    font-family: 'leto';
}
.bloc-modale {
    position:fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.overlay {
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.modale {
    background: #1d1e26;
    color: white;
    padding: 50px;
    position: fixed;
    top: 30%;
    padding: 2rem;
}
.btn-modale {
    position: absolute;
    top: 10px;
    right: 10px;
}
form input {
    border: none;
    padding: 20px;
    font-size: 1.1em;
    border-radius: 5px;
    background-color: rgba(57, 63, 84, 0.8);
    color: #BFD2FF;
    width: 100%;
    height: 30px;
    border: 0;
    transition: all 0.2s ease-in-out;
}
form {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
}
.valid {
    padding: 0 1rem;
    opacity: 0.8;
    margin-left: 1rem;
    background-image: linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%);
    border-radius: 8px;
    border-style: none;
    color: #FFFFFF;
    cursor: pointer;
    flex-shrink: 0;
    font-family: "Inter UI","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
    font-size: 1.3em;
    font-weight: 100;
    height: 40px;
    width: fit-content;
    text-align: center;
    text-shadow: rgba(0, 0, 0, 0.25) 0 3px 8px;
    transition: all .2s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

.valid:hover
{
    opacity: 1;
}
</style>