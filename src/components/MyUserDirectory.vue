<template>
  <div class="myUsers">
    <action-bar></action-bar>
    <div class="strctureTree">
        <div class="treeItem" @click="this.backToRootFolder()"> / </div>
        <div class="treeItem" 
        v-for="item in treeStructure" :key="item"
        
        ><p> {{item.folder.name}} </p></div>
    </div>
    <div class="filesTree">
        <my-folder 
        v-for="folder in folders" :key="folder" 
        :name="folder.name" :id="folder.id"
        :selected="selectedItemID === 'fo_' + folder.id"
        @click="selectedItemID = folder.id === selectedItemID ? 0 : 'fo_' + folder.id; doubleClickFolder(folder.id, folder.name)"
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
            },
            treeStructure : [],
            rootFolderID : 0,
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
        doubleClickFolder: function(folderID, folderName){
          this.clickData.clicks++ 
          if(this.clickData.clicks === 1) {
            var self = this.clickData
            this.clickData.timer = setTimeout(function() {
              self.clicks = 0
            }, this.clickData.delay);
          } else{
             clearTimeout(this.clickData.timer);  
             this.clickData.clicks = 0;
             this.refresh(folderID);
             this.treeStructure.push({folder : {id : folderID, name : folderName}})
            }        	
        },
        backToRootFolder() {
            this.treeStructure = [];
            this.refresh(this.rootFolderID);
        }
    },
    mounted() {
        Axios.get(API.URL + API.USERS_ROOTFOLDER)
        .then(response => {
            this.rootFolderID = response.data
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
.strctureTree {
    width: 100vw;
    height: 6vh;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    background-color: #1d1e26;
    padding: 0 2rem;
}
.treeItem {
    background: rgba(116, 58, 213, 0.5);
    border-radius: 0.3rem;
    color: white;
    width: fit-content;
    padding: 1rem;
    height: 70%;
    display: flex;
    align-items: center;
    font-family: 'Lato', Verdana, Geneva, Tahoma, sans-serif;
    margin-right: 1rem;
    cursor: pointer;
}
</style>