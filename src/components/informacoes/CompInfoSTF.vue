<template>
    <div>
      <img :src="LogoSTF" />
      <div id="heading">
        <div>Nick:</div>
        <div>Vitórias</div>
      </div>
      <div id="tabela">
        <div id="tabelaRows" v-for="jogador in jogadores" :key="jogador.id">
          <div class="tabelaRow">
            <div>{{ jogador.nick }}</div>
            <div>{{ jogador.vitoriasSTF }}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'CompInfoLoL',
    data: () => ({
      LogoSTF: '/img/streetLOGO.png',
      jogadores: null,
      nick: null,
      vitorias: null,
    }),
    methods: {
      async getJogadores() {
        const req = await fetch("http://localhost:3000/jogadores")
        const data = await req.json()
        this.jogadores = data

        this.jogadores.sort((proximo, atual) => {
            if(atual.vitoriasSTF < proximo.vitoriasSTF) {
              return -10
            } else if(atual.vitoriasSTF > proximo.vitoriasSTF) {
              return 10
            }
              return 0
          })
      }
    },
    mounted() {
      this.getJogadores()
    }
}
</script>

<style scoped>

</style>