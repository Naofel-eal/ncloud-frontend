<template>
  <div class="myUsers">
    <action-bar></action-bar>
    <div class="strctureTree">
        <structure-tree-item 
        v-for="item in treeStructure" :key="item"
        :folderID="item.folder.id"
        :folderName="item.folder.name"
        @click="backToFolder(item.folder.id)"
        ></structure-tree-item>
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
import StructureTreeItem from "./StructureTreeItem.vue";

export default {
    components: { MyFile, ActionBar, MyFolder, StructureTreeItem },
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
            if(parentFolderID == -1)
                parentFolderID = this.treeStructure[this.treeStructure.length-1].folder.id;
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
        backToFolder(folderID) {
            const folderIndex = this.getFolderIndex(folderID);
            let index = 0;
            for(const item of this.treeStructure) {
                if(index >= folderIndex)
                    this.treeStructure.splice(index+1, 1);
                index++;
            }
            this.refresh(folderID)
        },
        backToPrecFolder() {
            this.treeStructure.splice(this.treeStructure.length-1, 1);
            this.refresh(this.treeStructure[this.treeStructure.length-1].folder.id);
        },
        getFolderIndex(folderID) {
            let index = 0;
            for(const item of this.treeStructure) {
                if(item.folder.id == folderID)
                    return index;
                index++;
            }
        },
    },
    mounted() {
        Axios.get(API.URL + API.USERS_ROOTFOLDER)
        .then(response => {
            this.rootFolderID = response.data;
            this.treeStructure.push({folder : {id : this.rootFolderID, name : '/'}})
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
    padding: 0 2rem;
    background-color: #4d517142;
}
</style>