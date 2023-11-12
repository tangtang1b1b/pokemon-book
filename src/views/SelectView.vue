<!-- eslint-disable vue/return-in-computed-property -->
<script setup>
import { ref, onMounted, computed } from 'vue';
import { usePokemonStore } from '../stores/counter';
import pokemonCards from '../components/pokemonCards.vue';
const pokemonStore = usePokemonStore();

const inputValue = ref('');
const submitButton = (name) => {
  name = name.replace(/^0+/, ''); //拿掉開頭的所有0
  pokemonStore.pokeNum = name;
  // router.push(`/home?id=${name}`);
  inputValue.value = '';
  pokemonStore.pokeFetch(pokemonStore.pokeNum)
}

const cards = ref([]);
const isRandom = ref(false);
const random = () => {
  const randomNum = ref([]);
  while (randomNum.value.length < 20) {
    const num = Math.floor(Math.random() * 1017);
    if (randomNum.value.indexOf(num) === -1) {
      randomNum.value.push(num);
    }
  }
  return randomNum.value
}
const randomCard = async () => {
  cards.value = [];
  const randomNumbers = random();
  for (let i = 0; i < randomNumbers.length; i++) {
    const num = isRandom.value ? randomNumbers[i] : i + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
    const data = await response.json();
    const pokeData = {
      id: data.id,
      name: data.name,
      img: data.sprites.other['official-artwork'].front_default,
      types: data.types
    };
    cards.value.push(pokeData);
    console.log(cards.value);
  }
}
const randomClick = (() => {
  isRandom.value = true;
  randomCard();
})

onMounted(() => {
  randomCard();
})
</script>

<template>
  <div class="container">
    <div class="typeArea">
      <div class="typeContainer">
        <!-- <p>Enter id or name</p> -->
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
      <div class="selectRandom">
        <p @click="randomClick">隨機顯示</p>
        <span class="material-symbols-outlined">cached</span>
      </div>
    </div>
    <pokemonCards :cards="cards"></pokemonCards>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');

// ----- search 參數設定 -----
$searchHeight: 50px;
$submitWidth: 20%;
$inputWidth: 80%;
$borderSize: 30px;

// ----------
.container {
  width: 100%;
  max-width: 768px;
  margin: 0px auto;

  .typeArea {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px 0;

    .typeContainer {
      width: 70%;
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        font-size: 28px;
        color: #333;
      }

      .shadowContainer {
        display: flex;
        width: 100%;
        filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 1));

        .searchArea {
          border-radius: $borderSize 0 0 $borderSize;
          overflow: hidden;
          width: $inputWidth;

          input {
            margin: 0;
            padding: 5px 10px;
            width: 100%;
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

    .selectRandom {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      width: 25%;
      font-size: 18px;
      box-shadow: 0px 0px 5px #FFCC02;
      border-radius: $borderSize;
      background-color: #FFCC02;
      color: #fff;
      cursor: pointer;
      user-select: none;

      p {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>