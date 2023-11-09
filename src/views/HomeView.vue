<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const prepare = ref(false);
const pokeNum = route.query.id;
const pokemon = reactive({});
const pokeFetch = async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`)
    if (!response.ok) {
      throw new Error('Failed to fetch');
    } else {
      prepare.value = true;
    }
    const data = await response.json();
    pokemon.name = data['moves']['name'];
    pokemon.img = data['sprites']['other']['official-artwork']['front_default'];
    console.log(data);
  } catch (error) {
    // 看有沒有要輸出
  }
}
const pokeData = onMounted(async () => {
  await pokeFetch();
})
</script>

<template>
  <div class="pokeContainer">
    <div class="pokeLook">
      <img :src="pokemon.img" :alt="pokemon.name">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pokeContainer {
  width: 100%;
  display: flex;
  justify-content: center;

  .pokeLook {
    outline: solid 1px #000;
    width: 200px;
    height: 200px;
    border-radius: 100%;
    background-color: #fa0;

    img {
      width: 100%;
      background-size: cover;
    }
  }
}
</style>