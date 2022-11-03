<template>
  <div class="myFile">
    <div class="file" :class="{selected : selected}">
        <div class="fileBlock">
            <p class="fileType">.{{type}}</p>
        </div>
        <div class="fileName">{{name}}</div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'MyFile',
    props: {
        name: {
            type: String,
            required: true,
        },
        type : {
            type : String,
            required: true,
        },
        selected : {
            type : Boolean,
            required: true,
        }
    }
}
</script>

<style>
.myFile {
    width : fit-content;
    height: fit-content;
    margin-left: 2rem;
    margin-bottom: 2rem;
}
.selected {
    background-color: rgba(255,255,255,0.3);
}
.file {
    height: 200px;
    width: 150px;
    padding: 1rem;
    border: dashed 1px white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.fileBlock {
    width: 100%;
    height: 100%;
    background-image: url('@/assets/img/file.png');
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
}
.fileName{
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
.fileType {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                supported by Chrome, Edge, Opera and Firefox */    
}


</style>