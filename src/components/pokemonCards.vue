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
                <p>{{ type.type.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans&display=swap');
$fontFamily: 'Pixelify Sans';

@mixin phone {
  @media screen and (max-width: 768px) {
    @content
  }
}

.pokeArea {
  width: 100%;
  padding: 20px 0;
  font-family: $fontFamily;
  letter-spacing: 1px;

  .pokeContainer {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;

    .pokeCard {
      width: 25%;
      height: 30vw;
      padding: 5px;

      @include phone {
        width: 50%;
        height: 60vw;
      }

      .pokeLine {
        width: 100%;
        height: 100%;
        border: solid 2px #466D9A;
        border-radius: 15px;
        cursor: pointer;
        transition: 0.2s;
        &:hover{
          box-shadow: 0px 0px 7px 0px rgba(194,204,211,1);
        }
        &:hover .pokeImage img{
          height: 110%;
        }

        .pokeImage {
          width: 100%;
          height: 60%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-image: url('../assets/images/pokeball.png');
          background-size: cover;
          background-position: center;

          img {
            transition: 0.2s;
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
          background-image: linear-gradient(to top, rgba(39,65,91,0.55), rgba(0,0,0,0));
          border-radius: 0px 0px 15px 15px;

          .pokeName {
            width: 100%;
            display: flex;

            .id,
            .name {
              margin-left: 5%;
              font-size: 1.5vw;

              @include phone {
                font-size: 3vw;
              }
            }
          }

          .pokeStatus {
            width: 100%;
            display: flex;
            flex-wrap: wrap;

            .type {
              width: 40%;
              margin-left: 5%;

              p {
                border-radius: 10vw;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5vw;
                background-color: #f0a;

                @include phone {
                  font-size: 3vw;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>