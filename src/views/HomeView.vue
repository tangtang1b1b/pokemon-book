<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const prepare = ref(false);
const pokeNum = route.query.id;
const pokemon = reactive({});
const imageLoad = ref(true);
const loadFail = ref(false);
const pokeFetch = async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`)
    if (!response.ok) {
      if (response.status === 404) {
        imageLoad.value = false
        loadFail.value = true;
      }
      throw new Error('Failed to fetch');
    } else {
      prepare.value = true;
    }
    const data = await response.json();
    pokemon.name = data.moves.name;
    pokemon.img = data.sprites.other['official-artwork'].front_default;
  } catch (error) {
    // 看有沒有要輸出
  }
}

const onImageLoad = () => {
  imageLoad.value = false;
}

const pokeData = onMounted(async () => {
  await pokeFetch();
})
</script>

<template>
  <div class="pokeContainer">
    <div class="pokeLook">
      <span class="material-symbols-outlined" v-if="loadFail">error</span>
      <img class="loadImage" src="@/assets/images/rotate.svg" alt="loadImage" v-show="imageLoad" v-if="imageLoad">
      <img class="pokeImage" :src="pokemon.img" :alt="pokemon.name" @load="onImageLoad" v-show="!imageLoad"
        v-if="!loadFail">
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');

.pokeContainer {
  width: 100%;
  display: flex;
  justify-content: center;

  .pokeLook {
    width: 300px;
    height: 300px;
    border-radius: 100%;
    background-color: #fff;
    box-shadow: 0px 0px 10px 10px #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    .material-symbols-outlined {
      color: rgb(255, 107, 107);
      font-size: 104px;
    }

    .loadImage {
      width: 100%;
      border-radius: 100%;
    }

    .pokeImage {
      width: 100%;
      background-size: cover;
    }
  }
}
</style>