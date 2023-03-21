<template>
  <div id="home">
    <CompCarrossel />
    <CompInfo />
  </div>
</template>

<script>
import CompCarrossel from '@/components/carrossel/CompCarrossel.vue';
import CompInfo from '@/components/informacoes/CompInfo.vue';

export default {
  name: 'HomeView',
  components: {
    CompCarrossel,
    CompInfo
  }
}
</script>

<style scoped>
</style>
