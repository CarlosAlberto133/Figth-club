<template>
  <CompNavbar :logo="logoSrc" :alt="appName" />
  <router-view/>
  <CompFooter />
</template>

<script>
import CompNavbar from '@/components/CompNavbar.vue'
import CompFooter from '@/components/CompFooter.vue';

export default {
  name: 'App',
  components: {
    CompNavbar,
    CompFooter
  },
  data: () => ({
    logoSrc: '/img/LogoFC.svg',
    appName: 'Fight Club'
  })
}
</script>

<style>

  * {
    font-family: Helvetica;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  #tabela {
    max-width: 1200px;
    margin: 0 auto;
  }

  #heading,
  #tabelaRows,
  .tabelaRow {
    display: flex;
    flex-wrap: wrap;
  }

  #heading {
    font-weight: bold;
    padding: 12px;
    color: #fff;
    font-size: 20px;
    margin-bottom: 30px;
  }

  #heading div,
  .tabelaRow div {
    width: 50%;
    color: #fff;
    font-weight: bold;
  }

  .tabelaRow {
    width: 100%;
    padding: 12px;;
  }

</style>
