<template>
    <div>
      <img :src="Logo" />
      <div id="heading">
        <div>Nick:</div>
        <div>Vitórias</div>
      </div>
      <div id="tabela">
        <div id="tabelaRows" v-for="jogador in jogadores" :key="jogador.id">
          <div class="tabelaRow" >
            <div>{{ jogador.nick }}</div>
            <div>{{ jogador.vitoriasGeral }}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'CompInfoGeral',
    data: () => ({
      Logo: '/img/LogoFC.svg',
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
            if(atual.vitoriasGeral < proximo.vitoriasGeral) {
              return -1
            } else if(atual.vitoriasGeral > proximo.vitoriasGeral) {
              return 1
            }
              return 0
          })
      },
      
    },
    mounted() {
      this.getJogadores()
    }
}
</script>

<style scoped>

</style>