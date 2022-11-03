<template>
  <div class="myUsers">
    <action-bar></action-bar>
    <div class="filesTree">
        <my-folder 
        v-for="folder in folders" :key="folder" 
        :name="folder.name" :id="folder.id"
        :selected="selectedItemID === 'fo_' + folder.id"
        @click="selectedItemID = folder.id === selectedItemID ? 0 : 'fo_' + folder.id; doubleClickFolder($event, folder.id)"
        ></my-folder>
        <my-file
         v-for="file in files" :key="file" 
         :name="file.name" 
         :type="file.type"
         :selected="selectedItemID === 'fi_' + file.id"
         @click="selectedItemID = file.id === selectedItemID ? 0 : 'fi_' + file.id"
         ></my-file>
         
    </div>
  </div>
</template>

<script>
import API from "@/Utils/API.js"
import Axios from '@/services/interceptors.js';
import MyFile from "@/components/MyFile.vue";
import MyFolder from "@/components/MyFolder.vue"
import ActionBar from "@/components/ActionBar.vue"

export default {
    components: { MyFile, ActionBar, MyFolder },
    name: 'MyuserDirectory',
    data() {
        return {
            files : [],
            folders : [],
            selectedItemID: 0,
            clickData : {
                delay : 500,
                clicks : 0,
                timer : null,
            }
        }
    },
    methods : {
        refresh(parentFolderID) {
            this.getFolders(parentFolderID);
            this.getFiles(parentFolderID)
        },
        getFiles(parentFolderID) {
            Axios.get(API.URL + API.USERS_FILES, {params: { parentID : parentFolderID }})
            .then(response => {
                this.files = response.data;
            })
            .catch( error => {
                console.log("Error files recovery : " + error.response.status);
            });
        },
        getFolders(parentFolderID) {
            Axios.get(API.URL + API.USERS_FOLDERS, {params: { parentID : parentFolderID }})
            .then(response => {
                this.folders = response.data;
            })
            .catch( error => {
                console.log("Error folders recovery : " + error.response.status);
            });
        },
        doubleClickFolder: function(event, rootID){
          this.clickData.clicks++ 
          if(this.clickData.clicks === 1) {
            var self = this.clickData
            this.clickData.timer = setTimeout(function() {
              self.clicks = 0
            }, this.clickData.delay);
          } else{
             clearTimeout(this.clickData.timer);  
             this.clickData.clicks = 0;
             this.refresh(rootID);
          }        	
        }      
    },
    mounted() {
        Axios.get(API.URL + API.USERS_ROOTFOLDER)
            .then(response => {
                this.refresh(response.data);
            })
            .catch( error => {
                console.log("Impossible de trouver le dossier root : " + error.response.status);
            });
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