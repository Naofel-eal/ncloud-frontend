<template>
  <div class="actionBar">
    <div class="uploadBtn">
        <input type="file" id="uploadBtn" hidden/>
        <label for="uploadBtn" class="actionBtn labelUploadBtn">IMPORT FILE</label>
    </div>
    <div class="uploadBtn">
        <label class="actionBtn labelUploadBtn">NEW FOLDER</label>
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
    border-bottom: 10px solid;
    border-image-slice: 1;
    border-width: 5px;
    border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
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