<template>
  <div class="actionBar">
    <div class="actionBtnDiv">
        <label class="actionBtn"
        @click="this.$parent.backToPrecFolder();"
        >BACK</label>
    </div>

    <div class="actionBtnDiv">
        <label class="actionBtn"
        @click="this.refreshParent()"
        >REFRESH</label>
    </div>

    <div class="actionBtnDiv">
        <input id="uploadBtn" type="file" name="file" ref="file" multiple="multiple" hidden/>
        <label for="uploadBtn" class="actionBtn">IMPORT FILE</label>
    </div>
    <div class="actionBtnDiv">
        <label class="actionBtn" @click="this.submitFiles();">UPLOAD</label>
    </div>

    <div class="actionBtnDiv">
        <label class="actionBtn">NEW FOLDER</label>
    </div>
  </div>
</template>

<script>
import API from "@/Utils/API.js"
import Axios from '@/services/interceptors.js';

export default {
    name : 'ActionBar',
    data() {
        return {
            
        }
    },
    methods : {
        refreshParent() {
            this.$parent.refresh(-1);
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
        }
    }
}
</script>

<style>
.actionBar {
    width: 100vw;
    height: 8vh;
    padding: 2rem;
    background:  #1d1e26;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.actionBtn {
    width: fit-content;
    background-color: #743ad5;
    color: white;
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
}
.actionBtn:hover {
    opacity: 1;
}

</style>