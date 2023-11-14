<script setup>
import { ref, onMounted, defineProps, watchEffect, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
  cards: Array
});

const tpyeColor = (name) => {
  switch (name) {
    case 'normal':
      return { backgroundColor: '#a0a0a0' };
    case 'fighting':
      return { backgroundColor: '#c85500' };
    case 'flying':
      return { backgroundColor: '#79bcd7' };
    case 'poison':
      return { backgroundColor: '#be78be' };
    case 'ground':
      return { backgroundColor: '#cca142' };
    case 'rock':
      return { backgroundColor: '#a07850' };
    case 'bug':
      return { backgroundColor: '#32b432' };
    case 'ghost':
      return { backgroundColor: '#8c78f0' };
    case 'steel':
      return { backgroundColor: '#96b4dc' };
    case 'fire':
      return { backgroundColor: '#ff3700' };
    case 'water':
      return { backgroundColor: '#0094e5' };
    case 'grass':
      return { backgroundColor: '#92bf19' };
    case 'electric':
      return { backgroundColor: '#e4b700' };
    case 'psychic':
      return { backgroundColor: '#dc78c8' };
    case 'ice':
      return { backgroundColor: '#00b7ee' };
    case 'dragon':
      return { backgroundColor: '#3c64c8' };
    case 'dark':
      return { backgroundColor: '#646464' };
    case 'fairy':
      return { backgroundColor: '#ff7eb8' };
    default:
      return {};
  }
}

const pokePersonPage = (id) => {
  router.push(`/home?id=${id}`);
}
</script>

<template>
  <div class="pokeArea">
    <ul class="pokeContainer">
      <li class="pokeCard" @click="pokePersonPage(card.id)" v-for="card in cards" :key="card">
        <div class="pokeLine">
          <div class="pokeImage"><img :src="card.img" alt=""></div>
          <div class="pokeDetail">
            <div class="pokeName">
              <div class="id">{{ String(card.id).padStart(4, '0') }}</div>
              <div class="name">{{ card.name }}</div>
            </div>
            <div class="pokeStatus">
              <div class="type" v-for="type in card.types" :key="type">
                <p :style="tpyeColor(type.type.name)">{{ type.type.name }}</p>
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
@import url('https://fonts.googleapis.com/css2?family=Stick+No+Bills&display=swap');
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

  @include phone {
    padding: 5px 0;
  }

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

        &:hover {
          box-shadow: 0px 0px 7px 0px rgba(194, 204, 211, 1);
        }

        &:hover .pokeImage img {
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
          background-image: linear-gradient(to top, rgba(39, 65, 91, 0.6), rgba(0, 0, 0, 0));
          border-radius: 0px 0px 15px 15px;

          .pokeName {
            width: 100%;
            display: flex;

            .id,
            .name {
              margin-left: 5%;
              font-size: 1.4vw;

              @include phone {
                font-size: 2.8vw;
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
                font-size: 1.4vw;
                background-color: #f0a;
                color: #fff;
                text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
                box-shadow: 0 0 2px 1px #a0a0a0;

                @include phone {
                  font-size: 2.8vw;
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