<template>
    <div id="lutas">
        <div class="container">
            <div class="title">
                <h1>Tabela de Lutas</h1>
            </div>
            <div id="tabela">
                <div>
                    <input 
                        class="pesquisa" 
                        type="text" 
                        v-model="pesquisa"
                        placeholder="Pesquisar jogador" 
                    />
                </div>
                <CompMensagem :msg="msg" v-show="msg" />
                <div>
                    <div id="heading">
                        <div class="cursor" @click="ordemAlfabetica">Nick</div>
                        <div class="cursor" @click="ordemPartidas">Partidas</div>
                        <div class="cursor" @click="ordemFortnite">Vitórias / Fortnite</div>
                        <div class="cursor" @click="ordemLoL">Vitórias / LoL</div>
                        <div class="cursor" @click="ordemSTF">Vitórias / STF</div>
                        <div class="cursor" @click="ordemDerrotas">Derrotas</div>
                        <div class="cursor" @click="ordemGeral">Vitórias / geral</div>
                        <div>Editar / Exluir</div>
                    </div>
                </div>

                <div id="tabelaRows" v-for="jogador in jogadores" :key="jogador.id">
                    <div class="tabelaRow">
                        <div>{{ jogador.nick }}</div>
                        <div>{{ jogador.partidas }}</div>
                        <div>{{ jogador.vitoriasFortnite }}</div>
                        <div>{{ jogador.vitoriasLol }}</div>
                        <div>{{ jogador.vitoriasSTF }}</div>
                        <div>{{ jogador.derrotas }}</div>
                        <div>{{ jogador.vitoriasGeral }}</div>
                        <div class="btn">
                            <router-link 
                                :to="`/lutas/${jogador.id}`"
                            >
                                Editar
                            </router-link>
                            <button class="deleteBtn" @click="deletarJogador(jogador.id)">Excluir</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CompMensagem from './CompMensagem.vue'
import firebase from 'firebase/compat/app'
import { firebaseMixin } from '@/firebase/mixinFirebase'
import "firebase/compat/database"

export default {
    name: 'CompTabelaLutas',
    mixins: [firebaseMixin],
    components: {
        CompMensagem,
    },
    data: () => ({
        jogadores: {},
        pesquisa: '',
        msg: null,
        modal: false
    }),
    methods: {
        getJogadores() {
            const dbRef = firebase.database().ref('/')

            dbRef.once('value')
            .then(snapshot => {
                this.jogadores = snapshot.val()
            })
            .catch(error => {
                alert('Erro ao obter dados do banco', error)
            })
        },
        deletarJogador(id) {
            const ref = firebase.database().ref(`/${id}`);

            ref.remove()
            .then(() => {
                this.msg = 'Jogador removido com sucesso';

                setTimeout(() => {
                    this.msg = '';
                }, 3000);

                this.msg = 'Jogador removido com sucesso'

                setTimeout(() => this.msg = "", 3000)
            })
            .catch((error) => {
                alert('Erro ao excluir o jogador:', error);
            });

            this.getJogadores()
        },
        ordemAlfabetica() {
            const jogadoresArray = Object.values(this.jogadores);

            if (Array.isArray(jogadoresArray)) {
                jogadoresArray.sort((atual, proximo) => {
                    return atual.nick.localeCompare(proximo.nick);
                });
                this.jogadores = jogadoresArray;
            }
        },
        ordemPartidas() {
            const jogadoresArray = Object.values(this.jogadores);

            if (Array.isArray(jogadoresArray)) {
                jogadoresArray.sort((atual, proximo) => {
                    return proximo.partidas - atual.partidas;
                });
                this.jogadores = jogadoresArray;
            }
        },
        ordemFortnite() {
            const jogadoresArray = Object.values(this.jogadores);

            if (Array.isArray(jogadoresArray)) {
                jogadoresArray.sort((atual, proximo) => {
                    return proximo.vitoriasFortnite - atual.vitoriasFortnite;
                });
                this.jogadores = jogadoresArray;
            }
        },
        ordemLoL() {
            const jogadoresArray = Object.values(this.jogadores);

            if (Array.isArray(jogadoresArray)) {
                jogadoresArray.sort((atual, proximo) => {
                    return proximo.vitoriasLol - atual.vitoriasLol;
                });
                this.jogadores = jogadoresArray;
            }
        },
        ordemSTF() {
            const jogadoresArray = Object.values(this.jogadores);

            if (Array.isArray(jogadoresArray)) {
                jogadoresArray.sort((atual, proximo) => {
                    return proximo.vitoriasSTF - atual.vitoriasSTF;
                });
                this.jogadores = jogadoresArray;
            }
        },
        ordemDerrotas() {
            const jogadoresArray = Object.values(this.jogadores);

            if (Array.isArray(jogadoresArray)) {
                jogadoresArray.sort((atual, proximo) => {
                    return proximo.derrotas - atual.derrotas;
                });
                this.jogadores = jogadoresArray;
            }
        },
        ordemGeral() {
            const jogadoresArray = Object.values(this.jogadores);

            if (Array.isArray(jogadoresArray)) {
                jogadoresArray.sort((atual, proximo) => {
                    return proximo.vitoriasGeral - atual.vitoriasGeral;
                });
                this.jogadores = jogadoresArray;
            }
        },
    },
    watch: {
        pesquisa(valorNovo) {
            const dbRef = firebase.database().ref('/');
        
            dbRef.orderByChild('nick').startAt(valorNovo).endAt(valorNovo + '\uf8ff').once('value')
                .then(snapshot => {
                    this.jogadores = snapshot.val();
                })
                .catch(error => {
                    console.error('Erro ao obter dados do banco', error);
                });
        }
    },
    mounted() {
        this.getJogadores()
    }
}
</script>

<style scoped>

    #lutas {
        padding-top: 120px;
        background-color: #A9A9A9;
    }

    .container {
        padding: 50px 150px;;
    }

    .title {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    h1 {
        font-size: 50px;
    }

    #tabela {
        margin: 0 auto;
        text-align: center;
    }

    #heading,
    #tabelaRows,
    .tabelaRow {
        display: flex;
        flex-wrap: wrap;
    }

    #heading {
        font-weight: bold;
        padding: 12px 0;
        color: #fff;
        font-size: 20px;
        margin-bottom: 20px;
        border-bottom: 2px solid #fff;
        justify-content: space-around;
    }

    #heading div,
    .tabelaRow div {
        width: 12%;
        color: #fff;
        font-weight: bold;
    }

    .tabelaRow {
        width: 100%;
        padding: 12px 0;
        border-bottom: 1px solid #fff;
        justify-content: space-between;
    }

    .pesquisa {
        width: 70%;
        padding: 10px;
        text-align: center;
        border-radius: 10px;
        border: none;
        margin: 45px 0 30px 0;
    }

    .btn {
        display: flex;
    }


    .deleteBtn {
        background-color: #F53B3B;;
        color: #fff;
        font-weight: bold;
        border: none;
        padding: 6px;
        font-size: 12px;
        margin: 0 auto;
        cursor: pointer;
        transition: .5s;
    }

    .deleteBtn:hover {
        background-color: #AD1313;
    }

    a:hover {
        background-color: transparent;
        color: #222;
    }

    a {
        background-color: #222;
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        border: 2px solid #222;
        padding: 6px;
        font-size: 12px;
        margin: 0 auto;
        cursor: pointer;
        transition: .5s;
    }

    .cursor {
        cursor: pointer;
        position: relative;
        transition: 0.3s;
    }

    .cursor:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: -5px;
        left: 0;
        background-color: #000;
        visibility: hidden;
        transform: scaleX(0);
        transition: all 0.3s ease-in-out 0s;
    }

    .cursor:hover:before {
        visibility: visible;
        transform: scaleX(1);
    }

    .cursor:hover {
        color: #8E8E8E;
    }

</style>