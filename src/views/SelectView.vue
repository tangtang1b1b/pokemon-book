<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const inputValue = ref('');

const submitButton = (name) => {
  name = name.replace(/^0+/, ''); //拿掉開頭的所有0
  router.push(`/home?id=${name}`);
  inputValue.value = '';
}
</script>

<template>
  <div class="container">
    <p>Enter id or name</p>
    <div class="shadowContainer">
      <div class="searchArea">
        <input type="text" v-model="inputValue">
      </div>
      <div class="submitArea">
        <div class="submitButton" @click="submitButton(inputValue)">
          <span class="material-symbols-outlined">search</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');

// ----- search 參數設定 -----
$searchHeight: 50px;
$submitWidth: 100px;
$inputWidth: $submitWidth * 4;
$borderSize: 30px;

// ----------
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 28px;
    color: #333;
  }

  .shadowContainer {
    display: flex;
    filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 1));

    .searchArea {
      border-radius: $borderSize 0 0 $borderSize;
      overflow: hidden;

      input {
        margin: 0;
        padding: 5px 10px;
        width: $inputWidth;
        height: $searchHeight;
        border: none;
        font-size: 20px;

        &:focus-visible {
          outline: none;
        }
      }
    }

    .submitArea {
      background-color: #fff;
      border-radius: 0 $borderSize $borderSize 0;
      width: $submitWidth;
      height: $searchHeight;
      background-color: #82bbe4;
      cursor: pointer;
      user-select: none;

      .submitButton {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
      }
    }
  }
}
</style>