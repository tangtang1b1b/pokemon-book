<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<script setup>
import { ref, onMounted, computed } from 'vue';
import { usePokemonStore } from '../stores/counter';
import pokemonCards from '../components/pokemonCards.vue';
const pokemonStore = usePokemonStore();

const inputValue = ref('');
const selected = ref('low');
const isRandom = ref(false);

const submitButton = async (name) => {
  pokemonStore.storeCards = [];
  name = name.replace(/^0+/, ''); //拿掉開頭的所有0
  await pokemonStore.pokeFetch(name);
  pokemonStore.storeCards.push(pokemonStore.pokemon);
  inputValue.value = '';
}

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
  pokemonStore.storeCards = [];
  const randomNumbers = random();
  for (let i = 0; i < randomNumbers.length; i++) {
    const num = isRandom.value ? randomNumbers[i] : i + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
    const data = await response.json();
    const pokeData = {
      id: data.id,
      name: data.name,
      img: data.sprites.other['official-artwork'].front_default,
      types: data.types
    };
    pokemonStore.storeCards.push(pokeData);
  }
}

const randomButton = (() => {
  isRandom.value = true;
  randomCard();
})

const homeButton = (() => {
  isRandom.value = false;
  randomCard();
})

const filterArray = computed(() => {
  switch (selected.value) {
    case 'low':
      return pokemonStore.storeCards.sort((a, b) => {
        const idA = parseInt(a.id, 10);
        const idB = parseInt(b.id, 10);
        return idA - idB
      });
    case 'high':
      return pokemonStore.storeCards.sort((a, b) => {
        const idA = parseInt(a.id, 10);
        const idB = parseInt(b.id, 10);
        return idB - idA
      });
    default:
      return pokemonStore.storeCards;
  }
});

onMounted(() => {
  if (!pokemonStore.isRandomCardCalled) {
    randomCard();
    pokemonStore.isRandomCardCalled = true;
  }
})
</script>

<template>
  <div class="container">
    <h1 @click="homeButton">Pokédex</h1>
    <div class="typeArea">
      <div class="typeContainer">
        <div class="shadowContainer">
          <div class="searchArea">
            <input type="text" @keyup.enter="submitButton(inputValue)" v-model="inputValue"
              placeholder="Name or 1 - 1017">
          </div>
          <div class="submitArea">
            <div class="submitButton" @click="submitButton(inputValue)">
              <span class="material-symbols-outlined">search</span>
            </div>
          </div>
        </div>
      </div>
      <div class="selectRandom" @click="randomButton">
        <p>Random</p>
        <span class="material-symbols-outlined">cached</span>
      </div>
      <select class="filterButton" v-model="selected">
        <option value="low">Low</option>
        <option value="high">High</option>
      </select>
    </div>
    <pokemonCards :cards="filterArray"></pokemonCards>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Stick+No+Bills&display=swap');

@mixin phone {
  @media screen and (max-width: 768px) {
    @content
  }
}

// ----- search 參數設定 -----
$searchHeight: 50px;
$submitWidth: 20%;
$inputWidth: 80%;
$borderSize: 30px;
$fontFamily: 'Pixelify Sans';

// ----------
.container {
  width: 100%;

  h1 {
    width: 100%;
    max-width: 997px;
    margin: 0px auto;
    color: #f7f7f7;
    font-family: $fontFamily;
    font-size: 36px;
    letter-spacing: 4px;
    cursor: pointer;
    user-select: none;

    @include phone {
      text-align: center;
      font-size: 32px;
    }
  }

  .typeArea {
    width: 100%;
    max-width: 997px;
    margin: 0px auto;
    display: flex;
    justify-content: space-evenly;
    padding: 20px 0;
    flex-wrap: wrap;

    @include phone {
      padding: 5px 0;
    }

    .typeContainer {
      width: 65%;
      height: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;


      @include phone {
        width: 75%;
      }

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
            font-family: $fontFamily;
            letter-spacing: 1px;
            border-radius: 0;

            @include phone {
              height: 35px;
              font-size: 16px;
            }

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

          @include phone {
            height: 35px;
          }

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
      width: 20%;
      height: 50px;
      box-shadow: 0px 0px 5px #FFCC02;
      border-radius: $borderSize;
      background-color: #FFCC02;
      color: #fff;
      cursor: pointer;
      user-select: none;
      font-family: $fontFamily;

      @include phone {
        height: 35px;
        width: 20%;
      }

      p {
        height: 100%;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

        @include phone {
          display: none;
        }
      }
    }
  }

  .filterButton {
    width: 10%;
    color: #000;
    display: flex;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    color: #fff;
    background-color: #0D1A26;
    box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.5);
    border: none;
    border-radius: $borderSize;
    font-size: 16px;
    font-family: $fontFamily;

    @include phone {
      height: 35px;
      width: 30%;
    }
  }
}
</style>