import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', () => {
  
  const isRandomCardCalled = ref(false)
  const storeCards = ref([])
  const pokemon = ref([])
  const pokeFetch = async (num) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
      if (!response.ok) {
        if (response.status === 404) {
          // imageLoad.value = false
          // loadFail.value = true
        }
        throw new Error('Failed to fetch')
      } else {
        // prepare.value = true
      }
      const data = await response.json()
      const pokeData = {
        id: data.id,
        name: data.name,
        img: data.sprites.other['official-artwork'].front_default,
        types: data.types
      }
      pokemon.value = pokeData
    } catch (error) {
      // 看有沒有要輸出
    }
  }

  return { pokemon, storeCards, isRandomCardCalled, pokeFetch }
})
