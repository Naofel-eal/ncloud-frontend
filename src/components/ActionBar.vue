<template>
  <div class="actionBar">
    <div class="actionBtnDiv">
        <label class="actionBtn"
        @click="this.$parent.backToPrecFolder();"
        title="Back to precedent folder"
        ><img class="icon" src="../assets/img/back.svg"></label>
    </div>

    <div class="actionBtnDiv">
        <label class="actionBtn"
        @click="this.refreshParent()"
        title="Refresh"
        ><img class="icon" src="../assets/img/refresh.svg"></label>
    </div>

    <div class="actionBtnDiv">
        <input id="uploadBtn" type="file" name="file" ref="file" multiple="multiple" @change="this.submitFiles();" hidden title="Upload files"/>
        <label for="uploadBtn" class="actionBtn"><img class="icon" src="../assets/img/upload.svg" title="Upload Files"></label>
    </div>

    <div class="actionBtnDiv">
        <label class="actionBtn" @click="reveleOverlay = true" title="New Folder">NEW</label>
    </div>

    <div class="actionBtnDiv">
        <label class="actionBtn" @click="this.delete()"  title="Delete"><img class="icon" src="../assets/img/delete.svg"></label>
    </div>

    <folder-name-overlay 
    @submit-folder-name="createFolder($event)"
    @close="this.reveleOverlay = false"
    v-if="reveleOverlay"
    ></folder-name-overlay>
  </div>
</template>

<script>
import API from "@/Utils/API.js"
import Axios from '@/services/interceptors.js';
import FolderNameOverlay from './FolderNameOverlay.vue';

export default {
    name : 'ActionBar',
    components: { FolderNameOverlay },
    data() {
        return {
            reveleOverlay :false,
        }
    },
    methods : {
        async refreshParent() {
            await this.$parent.refresh(-1);
        },
        async submitFiles() {
            if(this.$refs.file.files.length != 0) {
                const currentFolderID = this.$parent.getCurrentFolderID();
                let formData = new FormData();
                for( var i = 0; i < this.$refs.file.files.length; i++ ) {
                    formData.append('files',this.$refs.file.files[i]);
                }
                formData.append('currentFolderID', currentFolderID)
            
                await Axios.post(API.URL + API.FILE_PUSH,formData, {
                    headers : {
                        'Content-Type': 'multipart/form-data'
                    },
                })
                .catch(error => {
                    console.log("ERROR : " + error);
                });
                this.refreshParent();
            }
        },
        async createFolder(folderName){
            const parentFolderID = await this.$parent.getCurrentFolderID();
            await Axios.post(API.URL + API.FOLDER_CREATE, {parentFolderID: parentFolderID, folderName: folderName}, )
            await this.refreshParent();
            this.reveleOverlay = false; 
        },
        async delete() {
            const filesID = await (this.$parent.getSelectedItems()).files;
            await Axios.post(API.URL + API.FILE_DELETE, {filesID})
            .catch( error => {
                console.log("Error files delete : " + error);
            });

            const foldersID = await (this.$parent.getSelectedItems()).folders;
            await Axios.post(API.URL + API.FOLDER_DELETE, {foldersID})
            .catch( error => {
                console.log("Error files delete : " + error);
            });
            this.refreshParent();
        }
    }
}
</script>

<style scoped>
.actionBar {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 8vh;
    padding: 2rem;
    background: /* #1d1e26*/ none;
    display: flex;
    justify-content: left;
    align-items: center;
}
.actionBtn {
    margin: 0;
    margin-left: 10px;
    height: 40px;
    width: fit-content;
    background-color: #0000003d;
    color: white;
    font-weight: bold;
    padding: 0.5rem;
    font-family: 'Lato', Verdana, Geneva, Tahoma, sans-serif;
    font-size: large;
    border-radius: 0.3rem;
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.2s ease;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                supported by Chrome, Edge, Opera and Firefox */    
    
                                display: flex;
                                justify-content: center;
                                align-items: center;
}
.actionBtn:hover {
    opacity: 1;
}
.icon {
    height: 30px;
    filter: invert(100%);
}
@media (max-width: 916px) {
    .actionBar {
        position: relative;
        width: 100vw;
        height: 8vh;
        padding: 2rem;
        background: /* #1d1e26*/ none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>