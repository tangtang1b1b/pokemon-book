<script setup>
import { ref, onMounted, defineProps, watchEffect, computed } from 'vue';
import { usePokemonStore } from '../stores/counter';
const pokemonStore = usePokemonStore();

const props = defineProps({
  cards: Array
});

onMounted(() => {

});

</script>

<template>
  <div class="pokeArea">
    <ul class="pokeContainer">
      <li class="pokeCard" v-for="card in cards" :key="card">
        <div class="pokeLine">
          <div class="pokeImage"><img :src="card.img" alt=""></div>
          <div class="pokeDetail">
            <div class="pokeName">
              <div class="id">{{ String(card.id).padStart(4, '0') }}</div>
              <div class="name">{{ card.name }}</div>
            </div>
            <div class="pokeStatus">
              <div class="type" v-for="type in card.types" :key="type">
                {{ type.type.name }}
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.pokeArea {
  width: 100%;
  padding: 20px 0;

  .pokeContainer {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;

    .pokeCard {
      width: 25%;
      height: 25vw;
      padding: 5px;

      .pokeLine {
        width: 100%;
        height: 100%;
        border: solid 2px #466D9A;
        border-radius: 15px;

        .pokeImage {
          width: 100%;
          height: 60%;
          display: flex;
          justify-content: center;

          img {
            height: 100%;
          }
        }


        .pokeDetail {
          width: 100%;
          height: 40%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          padding: 5px 0px;
          box-sizing: border-box;
          color: #f7f7f7;

          .pokeName {
            width: 100%;
            display: flex;

            .id,
            .name {
              padding-left: 5px;
            }
          }

          .pokeStatus {
            width: 100%;
            display: flex;
            flex-wrap: wrap;

            .type {
              width: 25%;
              padding-left: 5px;
            }
          }
        }
      }
    }
  }
}
</style>