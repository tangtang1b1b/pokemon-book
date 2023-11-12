<script setup>
import { ref, onMounted, computed } from 'vue';
import { usePokemonStore } from '../stores/counter';
import pokemonCards from '../components/pokemonCards.vue';
const pokemonStore = usePokemonStore();

const inputValue = ref('');
const submitButton = async (name) => {
  pokemonStore.storeCards = [];
  name = name.replace(/^0+/, ''); //拿掉開頭的所有0
  await pokemonStore.pokeFetch(name);
  pokemonStore.storeCards.push(pokemonStore.pokemon);
  inputValue.value = '';
}

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
  pokemonStore.storeCards = [];
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
    pokemonStore.storeCards.push(pokeData);
  }
}
const randomClick = (() => {
  isRandom.value = true;
  randomCard();
})

onMounted(() => {
  if (!pokemonStore.isRandomCardCalled) {
    randomCard();
    pokemonStore.isRandomCardCalled = true;
  }
})
</script>

<template>
  <div class="container">
    <h1>Pokédex</h1>
    <div class="typeArea">
      <div class="typeContainer">
        <div class="shadowContainer">
          <div class="searchArea">
            <input type="text" v-model="inputValue" placeholder="Number or Name">
          </div>
          <div class="submitArea">
            <div class="submitButton" @click="submitButton(inputValue)">
              <span class="material-symbols-outlined">search</span>
            </div>
          </div>
        </div>
      </div>
      <div class="selectRandom" @click="randomClick">
        <p>Random button</p>
        <span class="material-symbols-outlined">cached</span>
      </div>
    </div>
    <pokemonCards :cards="pokemonStore.storeCards"></pokemonCards>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans&display=swap');

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
  }

  .typeArea {
    width: 100%;
    max-width: 997px;
    margin: 0px auto;
    display: flex;
    justify-content: space-between;
    padding: 20px 0;

    @include phone {
      padding: 5px 0;
    }

    .typeContainer {
      width: 70%;
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
      width: 25%;
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
        font-size: 18px;
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
}
</style>