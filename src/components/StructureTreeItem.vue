<template>
  <div class="structureTreeItem">
    <p>{{folderName}}</p>
  </div>
</template>

<script>
export default {
    name : "StructureTreeItem",
    props: {
        folderName: {
            type : String,
            require : true,
        },
        folderID : {
            type : Number,
            require : true,
        }
    },
    data () {
        return {
            id : this.folderID,
        }
    },
}
</script>

<style>
.structureTreeItem {
    opacity: 0.8;
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
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                supported by Chrome, Edge, Opera and Firefox */
    transition: all 0.1s ease-in;
}
.structureTreeItem:hover {
    opacity: 1;
}
</style>