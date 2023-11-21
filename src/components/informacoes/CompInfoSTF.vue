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
import firebase from 'firebase/compat/app'
import { firebaseMixin } from '@/firebase/mixinFirebase'
import "firebase/compat/database"

export default {
    name: 'CompInfoLoL',
    mixins: [firebaseMixin],
    data: () => ({
      LogoSTF: '/img/streetLOGO.png',
      jogadores: [],
      nick: null,
      vitorias: null,
    }),
    methods: {
      getJogadores() {
        const dbRef = firebase.database().ref('/');

        dbRef.once('value')
            .then(snapshot => {
                this.jogadores = snapshot.val();

                const jogadoresArray = Object.values(this.jogadores);

                jogadoresArray.sort((atual, proximo) => {
                    return proximo.vitoriasSTF - atual.vitoriasSTF;
                });

                this.jogadores = jogadoresArray;
            })
            .catch(error => {
                alert('Erro ao obter dados do banco', error);
            });
      }
    },
    mounted() {
      this.getJogadores()
    }
}
</script>

<style scoped>

</style>