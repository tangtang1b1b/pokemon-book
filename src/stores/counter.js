import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', () => {
  const isFinish = ref(false)
  const isLoadFail = ref(false)
  const stats = ref({})
  const isRandomCardCalled = ref(false)
  const storeCards = ref([])
  const pokemon = ref([])
  const pokeFetch = async (num) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
      if (!response.ok) {
        if (response.status === 404) {
          isFinish.value = false
          isLoadFail.value = true
        }
        throw new Error('Failed to fetch')
      } else {
        isFinish.value = true
        isLoadFail.value = false
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

  return { isLoadFail, isFinish, stats, pokemon, storeCards, isRandomCardCalled, pokeFetch }
})
