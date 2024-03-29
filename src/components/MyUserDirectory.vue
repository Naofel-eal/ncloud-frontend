<template>
  <div class="myUsers">
    <action-bar @refresh="refresh(-1)"></action-bar>
    <div class="strctureTree">
        <structure-tree-item 
        v-for="item in treeStructure" :key="item"
        :folderID="item.folder.id"
        :folderName="item.folder.name"
        @click="backToFolder(item.folder.id)"
        @drop="onDrop($event, item.folder.id)"
        @dragenter.prevent
        @dragover.prevent
        ></structure-tree-item>
    </div>
    <div class="filesTree" @click="this.emptyClick()">
        <my-folder 
        v-for="folder in folders" :key="folder" 
        :name="folder.name" :id="folder.id"
        :selected="isSelectedFolder(folder.id)"
        draggable="true"
        @dragstart="this.startDrag($event, folder, 'folder')"
        @click="selectFolders($event, folder.id); doubleClickFolder(folder.id, folder.name)"
        @drop="onDrop($event, folder.id)"
        @dragenter.prevent
        @dragover.prevent
        ></my-folder>
        
        <my-file
         v-for="file in files" :key="file" 
         :name="file.name" 
         :type="file.type"
         :selected="isSelectedFile(file.id)"
         draggable="true"
         @dragstart="this.startDrag($event, file, 'file')"
         @click="selectFiles($event, file.id)"
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
            clickData : {
                delay : 500,
                clicks : 0,
                folderID : -1,
                timer : null,
            },
            treeStructure : [],
            rootFolderID : 0,
            selectedItems : {
                folders : [],
                files : [],
            },
        }
    },
    methods : {
        refresh(parentFolderID) {
            if(parentFolderID === -1)
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
                console.log("Error files recovery : " + error);
            });
        },
        getFolders(parentFolderID) {
            Axios.get(API.URL + API.USERS_FOLDERS, {params: { parentID : parentFolderID }})
            .then(response => {
                this.folders = response.data;
            })
            .catch( error => {
                console.log("Error folders recovery : " + error);
            });
        },
        getSelectedItems() {
            return this.selectedItems;
        },
        selectFiles(e, fileID) {
            if(this.isSelectedFile(fileID) === false) {
                if(!e.ctrlKey) {
                    this.selectedItems.files = [];
                    this.selectedItems.folders = [];
                }
                this.selectedItems.files.push(fileID)
            }
            else {
                if(!e.ctrlKey) {
                    this.selectedItems.folders = [];
                    this.selectedItems.files = [];
                }
                else {
                    const index = this.selectedItems.files.indexOf(fileID)
                    this.selectedItems.files.splice(index, 1);
                }
            }
        },
        selectFolders(e, folderID) {
            if(this.isSelectedFolder(folderID) === false) {
                if(!e.ctrlKey) {
                    this.selectedItems.folders = [];
                    this.selectedItems.files = [];
                }
                this.selectedItems.folders.push(folderID)
            }
            else {
                if(!e.ctrlKey) {
                    this.selectedItems.folders = [];
                    this.selectedItems.files = [];
                }
                else {
                    const index = this.selectedItems.folders.indexOf(folderID)
                    this.selectedItems.folders.splice(index, 1);
                }
            }
        },
        isSelectedFolder(folderID) {
            for(const item of this.selectedItems.folders) {
                if(item == folderID)
                    return true
            }
            return false
        },
        isSelectedFile(fileID) {
            for(const item of this.selectedItems.files) {
                if(item == fileID)
                    return true
            }
            return false
        },
        emptyClick() {      
            //console.log('click')
        },
        doubleClickFolder: function(folderID, folderName){
          this.clickData.clicks++ 
          if(this.clickData.clicks === 1) {
            var self = this.clickData
            self.folderID = folderID
            this.clickData.timer = setTimeout(function() {
              self.clicks = 0
            }, this.clickData.delay);
          }else{
            if(this.clickData.folderID == folderID) {
                clearTimeout(this.clickData.timer);  
                this.clickData.clicks = 0;
                this.treeStructure.push({folder : {id : folderID, name : folderName}})
                this.refresh(folderID);
                }
            }
        },
        async backToFolder(folderID) {
            const folderIndex = this.getFolderIndex(folderID);

            for(let i = this.treeStructure.length-1 ; i > folderIndex ; i--) {
                this.treeStructure.splice(i, 1);
            }
            //console.log(this.treeStructure);
            this.refresh(folderID)
        },
        backToPrecFolder() {
            if(this.treeStructure.length != 1) 
            {
                this.treeStructure.splice(this.treeStructure.length-1, 1);
                this.refresh(this.treeStructure[this.treeStructure.length-1].folder.id);
            }
        },
        getFolderIndex(folderID) {
            for(let i = 0; i < this.treeStructure.length ; i++) {
                if(this.treeStructure[i].folder.id == folderID)
                    return i;
            }
        },
        getCurrentFolderID() {
            return this.treeStructure[this.treeStructure.length-1].folder.id;
        },
        startDrag(event, item, type) {
            if(type == "folder" && !this.isSelectedFolder(item.id))
                this.selectedItems.folders.push(item.id)
            else if(type == "file" && !this.isSelectedFile(item.id))
                this.selectedItems.files.push(item.id)
            event.dataTransfer.dropEffect = 'move'
            event.dataTransfer.effectAllowed = 'move'
        },
        async onDrop(event, targetFolderID) {
            const selectedFoldersID = this.selectedItems.folders;
            const selectedFilesID = this.selectedItems.files;
            
            await Axios.post(API.URL + API.FOLDERS_AND_FILES_MOVE, {selectedFoldersID, selectedFilesID, targetFolderID})
            .catch( error => {
                console.log("Error moving files : " + error);
            });
            console.log("MOVE OK")
            this.selectedItems.files = []
            this.selectedItems.folders = []

            this.refresh(-1)
        }
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
    },
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
    flex-wrap: wrap;
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