import Vuex from 'vuex'

export default new Vuex.Store({
    state: {
        parentFolderId : "ressources",
    },
    getters : {
        getCurrentFolder(state) {
            return state.parentFolderId;
        }
    },
    mutations : {
        setCurrentFolder(state, folderId) {
            state.parentFolderId = folderId;
        }
    },
    actions: {},
});
