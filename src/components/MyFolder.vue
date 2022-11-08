<template>
    <div class="myFolder" :class="{selected : selected}" >
        <div class="folderLogo"></div>
        <p class="folderName">{{name}}</p>
    </div>
</template>

<script>
export default {
    name: 'MyFolder',
    props : {
        name : {
            type: String,
            required: true,
        },
        id : {
            required: true,
        },
        selected : {
            type : Boolean,
            required: true,
        }
    },
}
</script>

<style>
.myFolder {
    height: 200px;
    width: 150px;
    padding: 1rem;
    border: dashed 1px white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 2rem;
    margin-bottom: 2rem;
    cursor: pointer;
}
.selected {
    background-color: rgba(255,255,255,0.3);
}
.folderLogo {
    width: 100%;
    height: 100%;
    background-image: url('@/assets/img/folder.png');
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
}
.folderName{
    height: 2rem;
    max-width: 95%;
    margin-top: 1rem;
    color: white;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
        line-clamp: 2; 
    -webkit-box-orient: vertical;
    font-size: large;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                supported by Chrome, Edge, Opera and Firefox */    
}
</style>