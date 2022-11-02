<template>
  <div class="myUsers">
    <action-bar></action-bar>
    <div class="filesTree">
        <my-file v-for="file in files" :key="file" :name="file.name" :type="file.type"></my-file>
    </div>
  </div>
</template>

<script>
import API from "@/Utils/API.js"
import Axios from '@/services/interceptors.js';
import MyFile from "@/components/MyFile.vue";
import ActionBar from "@/components/ActionBar.vue"

export default {
    components: { MyFile, ActionBar },
    name: 'MyuserDirectory',
    data() {
        return {
            files : []
        }
    },
    mounted() {
        Axios.get(API.URL + API.USERS_FILES)
        .then(response => {
            this.files = response.data;
        })
        .catch( error => {
            console.log("Erreur requete : " + error.response.status);
        })          
    }
}   
</script>

<style>
.myusers {
    display: flex;
    flex-direction: column;
}
h3 {
    color: white;
    text-align: center;
}
.filesTree {
    display: flex;
}
</style>