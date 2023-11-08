<script setup>
import { onMounted, reactive } from 'vue';
const pokemon = reactive({});
const pokeFetch = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/1')
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const data = await response.json();
    pokemon.name = data['moves']['name'];
    pokemon.img = data['sprites']['other']['dream_world']['front_default'];
  } catch (error) {
    // 看有沒有要輸出
  }
}
const pokeData = onMounted(async () => {
  await pokeFetch();
})
</script>

<template>
  <div class="container">
    <img :src="pokemon.img" :alt="pokemon.name">
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  background-color: #fa0;
  // overflow: hidden;

  img {
    width: 100%;
    background-size: cover;
  }
}
</style>