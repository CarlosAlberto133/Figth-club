<template>
  <div id="info">
    <div>
      <div class="inscricoes">
        <h1>Iscrições Abertas!</h1>
      </div>
      
      <router-link to="/cadastro"><BtnCadastro /></router-link>

      <div class="ranking">
        <h1 id="ranking">Ranking Geral</h1>

        <div id="links">
          <router-link to="/home">Geral</router-link>
          <router-link to="/fortnite">Fortnite</router-link>
          <router-link to="/lol">Leage of Legends</router-link>
          <router-link to="/stf">Street Fighter</router-link>
        </div>

        <div id="tabela">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BtnCadastro from '@/components/BtnCadastro.vue'

export default {
    name: 'CompInfo',
    components: {
      BtnCadastro
    },
    data: () => ({
      jogadores: null,
      nick: null,
      vitorias: null,
    }),
    methods: {
      async getJogadores() {
        const req = await fetch("http://localhost:3000/jogadores")
        const data = await req.json()
        this.jogadores = data
      }
    },
    mounted() {
      this.getJogadores()
    }
}
</script>

<style scoped>

  #info {
    background-image: url('@/assets/img/img2.svg');
    height: auto;
    margin-top: 80px;
    padding: 60px 150px;
  }

  .inscricoes {
    justify-content: center;
    align-content: center;
    display: flex;
    text-align: center;
  }

  h1 {
    font-size: 55px;
    color: #fff;
    margin-bottom: 25px;
  }

  .ranking {
    margin-top: 60px;
    text-align: center;
  }

  #links {
    display: flex;
    justify-content: space-between;
    margin-top: 60px;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 50px;
    transition: .5s;
  }

  a:hover {
    color: #939393;
  }

</style>