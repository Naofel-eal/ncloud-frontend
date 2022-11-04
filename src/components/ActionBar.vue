<template>
  <div class="actionBar">
    <div class="actionBtnDiv">
        <label class="actionBtn"
        @click="this.$parent.backToPrecFolder();"
        >BACK</label>
    </div>

    <div class="actionBtnDiv">
        <label class="actionBtn"
        @click="this.$parent.refresh(-1);"
        >REFRESH</label>
    </div>

    <div class="actionBtnDiv">
        <input type="file" id="uploadBtn" hidden/>
        <label for="uploadBtn" class="actionBtn">IMPORT FILE</label>
    </div>

    <div class="actionBtnDiv">
        <label class="actionBtn">NEW FOLDER</label>
    </div>
  </div>
</template>

<script>
export default {
    name : 'ActionBar',
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
}
.actionBtn:hover {
    opacity: 1;
}

</style>