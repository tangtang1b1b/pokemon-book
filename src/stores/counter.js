import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', () => {
  const prepare = ref(false)
  const pokeNum = ref('')
  const pokemon = reactive({})
  const imageLoad = ref(true)
  const loadFail = ref(false)

  const pokeFetch = async (num) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
      if (!response.ok) {
        if (response.status === 404) {
          imageLoad.value = false
          loadFail.value = true
        }
        throw new Error('Failed to fetch')
      } else {
        prepare.value = true
      }
      const data = await response.json()
      pokemon.name = data.name
      pokemon.img = data.sprites.other['official-artwork'].front_default
    } catch (error) {
      // 看有沒有要輸出
    }
  }

  const onImageLoad = () => {
    imageLoad.value = false;
  }

  return { prepare, pokeNum, pokemon, imageLoad, loadFail, pokeFetch, onImageLoad }
})
