<script setup>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';
import { usePokemonStore } from '../stores/counter';
const pokemonStore = usePokemonStore();

const flattenedStats = [];

const chartRef = ref(null);

onMounted(() => {
  const ctx = chartRef.value.getContext('2d');
  chartRef.value.width = window.innerWidth * 0.8;
  const unwatch = watch(pokemonStore.stats, async (newStats) => {

    for (let i = 0; i < newStats.value.length; i++) {
      flattenedStats.push(Number(newStats.value[i].base_stat))
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'],
        datasets: [{
          label: 'stats',
          data: flattenedStats,
          borderWidth: 1,
          borderColor: 'rgba(48, 167, 215, 1)',
          backgroundColor: 'rgba(48, 167, 215, 0.4)'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: 'rgba(255, 255, 255, 0.8)'
            }
          },
          x:{
            ticks: {
              color: 'rgba(255, 255, 255, 0.8)'
            }
          }
        }
      }
    });
    unwatch();
  });
});
</script>

<template>
  <div>
    <canvas ref="chartRef" id="myChart"></canvas>
  </div>
</template>

<style lang="scss" scoped>
div {
  width: 100%;
  max-width: 997px;

  #myChart {
    margin-top: 100px;
  }
}
</style>