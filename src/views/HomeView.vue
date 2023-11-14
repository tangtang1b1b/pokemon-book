<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { usePokemonStore } from '../stores/counter';
const pokemonStore = usePokemonStore();
const router = useRouter();
const route = useRoute();

const prepare = ref(false);
const pokeNum = route.query.id;
const pokemon = ref({});
const infoDetails = ref({
  height: { name: 'Height', val: '' },
  weight: { name: 'Weight', val: '' },
  abilities: { name: 'Abilities', val: '' }
});

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
    pokemon.value.id = data.id,
      pokemon.value.name = data.name;
    pokemon.value.img = data.sprites.other['official-artwork'].front_default;
    infoDetails.value.abilities.val = data.abilities;
    infoDetails.value.weight.val = `${data.weight / 10} kg`;
    infoDetails.value.height.val = `${data.height / 10} m`;
    infoDetails.value.stats.val = data.stats;
  } catch (error) {
    // 看有沒有要輸出
  }
}
const onImageLoad = () => {
  imageLoad.value = false;
}

const pokeData = onMounted(async () => {
  await pokeFetch(pokeNum);
})

const pokeBackPage = () => {
  router.push(`/`);
}
</script>

<template>
  <div class="container">
    <div class="pokeContainer">
      <div class="pokeStatus">
        <div class="pokeId">{{ String(pokemon.id).padStart(4, '0') }}</div>
        <div class="pokeName">{{ pokemon.name }}</div>
      </div>
      <div class="pokeAllMation">
        <div class="pokeLook">
          <span class="material-symbols-outlined" v-if="loadFail">error</span>
          <img class="loadImage" src="@/assets/images/rotate.svg" alt="loadImage" v-show="imageLoad" v-if="imageLoad">
          <img class="pokeImage" :src="pokemon.img" :alt="pokemon.name" @load="onImageLoad" v-show="!imageLoad"
            v-if="!loadFail">
        </div>
        <div class="pokeInfo">
          <div class="infoDetail" v-for="infoDetail in infoDetails" :key="infoDetail">
            <p class="name">{{ infoDetail.name }}</p>
            <div class="val" v-if="Array.isArray(infoDetail.val)">
              <p class="ability" v-for="info in infoDetail.val" :key="info">{{ info.ability.name }}</p>
            </div>
            <div class="val" v-else>
              <p>{{ infoDetail.val }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="backButton" @click="pokeBackPage">
      <span class="material-symbols-outlined">arrow_back</span>
      <p>Back Pokédex</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans&display=swap');
$fontFamily: 'Pixelify Sans';

@mixin phone {
  @media screen and (max-width: 768px) {
    @content
  }
}

.container {
  width: 100%;
  max-width: 997px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;


  .pokeContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: $fontFamily;

    .pokeStatus {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 25px;

      @include phone {
        flex-direction: column;
      }

      .pokeId {
        width: 50%;
        font-size: 28px;
        color: #B3EAFE;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin: 0 5px;

        @include phone {
          width: 100%;
          justify-content: center;
        }
      }

      .pokeName {
        width: 50%;
        font-size: 28px;
        color: #fff;
        text-shadow: 0 0 3px #000, 0px 0px 3px #9be1ff, -2px -2px 7px #9be1ff;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 0 5px;

        @include phone {
          width: 100%;
          justify-content: center;
        }
      }
    }

    .pokeAllMation {
      width: 100%;
      height: 300px;
      display: flex;

      @include phone {
        flex-direction: column;
        height: unset;
      }

      .pokeLook {
        position: relative;
        width: 50%;
        height: 100%;
        margin: 0px auto;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: wave 3s infinite;

        @include phone {
          width: 100%;
        }

        .material-symbols-outlined {
          color: rgb(255, 107, 107);
          font-size: 104px;
        }

        .loadImage {
          width: 100%;
          border-radius: 100%;
        }

        .pokeImage {
          width: 80%;
          background-size: cover;
        }
      }

      .pokeInfo {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        padding: 10px 20px;
        border-radius: 30px;
        background-color: rgba(255, 255, 255, 0.01);
        border: solid 3px rgba(48, 167, 215, 0.5);
        box-shadow: inset 0px 0px 15px rgba(48, 167, 215, 1);

        @include phone {
          width: 100%;
        }

        .infoDetail {
          width: 50%;
          height: 50%;
          font-size: 22px;

          .name {
            color: #b3eafe;
          }

          .val {
            color: #fff;
          }
        }
      }
    }
  }

  .backButton {
    position: relative;
    display: flex;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-family: $fontFamily;
    max-width: 300px;
    padding: 10px 20px;
    border-radius: 5vw;
    border: solid 1px rgba(48, 167, 215, 0.5);
    box-shadow: 0px 0px 5px rgba(48, 167, 215, 1);
    margin-top: 50px;
    cursor: pointer;
    transition: 0.2s;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      box-shadow: inset 0px 0px 5px rgba(48, 167, 215, 1);
      border-radius: 5vw;
      padding: 10px 20px;
    }

    &:hover {
      background-color: #B4EBFF;
      color: #000;
    }

    p {
      font-size: 20px;
    }

    span {
      display: flex;
      align-items: center;
    }
  }
}

@keyframes wave {
  0% {
    filter: drop-shadow(0px 0px 5px #fff);
  }

  50% {
    filter: drop-shadow(0px 0px 10px #fff);
  }

  100% {
    filter: drop-shadow(0px 0px 5px #fff);
  }
}</style>