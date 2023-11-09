<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const inputValue = ref('');

const submitButton = (name) => {
  router.push(`/home?id=${name}`);
  inputValue.value = '';
}
</script>

<template>
  <div class="container">
    <p>輸入編號</p>
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
  <div class="test">{{ inputValue }}</div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');


.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .shadowContainer {
    display: flex;
    filter: drop-shadow(0px 0px 2px rgba(255, 255, 255, 0.7));

    .searchArea {
      border-radius: 20px 0 0 20px;
      overflow: hidden;

      input {
        margin: 0;
        padding: 5px 10px;
        height: 30px;
        border: none;

        &:focus-visible {
          outline: none;
        }
      }
    }

    .submitArea {
      background-color: #fff;
      border-radius: 0 20px 20px 0;
      height: 30px;
      width: 30px;
      background-color: #b3eaff;
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