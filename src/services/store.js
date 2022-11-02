import Vuex from 'vuex'

const store = new Vuex.Store({
    state: {
        currentFolder : "",
    },
    mutations : {
        increment (folder) {
            this.currentFolder = folder;
        }
    }
})