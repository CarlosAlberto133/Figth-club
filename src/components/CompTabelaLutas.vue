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

export default {
    name: 'CompTabelaLutas',
    components: {
        CompMensagem,
    },
    data: () => ({
        jogadores: [],
        pesquisa: '',
        msg: null,
        modal: false
    }),
    methods: {
        getJogadores() {
            fetch("http://localhost:3000/jogadores")
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    this.jogadores = data
                })
        },
        deletarJogador(id) {//this.modal = 
            fetch(`http://localhost:3000/jogadores/${id}`, {
                method: "DELETE"
            })
                .then(response => {
                    return response.json()
                })

            this.msg = 'Jogador removido com sucesso'

            setTimeout(() => this.msg = "", 3000)

            this.getJogadores()
        },
        ordemAlfabetica() {
            this.jogadores.sort((proximo, atual) => {
                if(atual.nick < proximo.nick) {
                    return 1
                }
                if(atual.nick > proximo.nick) {
                    return -1
                }
                    return 0
            })
        },
        ordemPartidas() {
            this.jogadores.sort((proximo, atual) => {
                if(atual.partidas < proximo.partidas) {
                    return -1
                }
                if(atual.partidas > proximo.partidas) {
                    return 1
                }
                    return 0
            })
        },
        ordemFortnite() {
            this.jogadores.sort((proximo, atual) => {
                if(atual.vitoriasFortnite < proximo.vitoriasFortnite) {
                    return -1
                }
                if(atual.vitoriasFortnite > proximo.vitoriasFortnite) {
                    return 1
                }
                    return 0
            })
        },
        ordemLoL() {
            this.jogadores.sort((proximo, atual) => {
                if(atual.vitoriasLol < proximo.vitoriasLol) {
                    return -1
                }
                if(atual.vitoriasLol > proximo.vitoriasLol) {
                    return 1
                }
                    return 0
            })
        },
        ordemSTF() {
            this.jogadores.sort((proximo, atual) => {
                if(atual.vitoriasSTF < proximo.vitoriasSTF) {
                    return -1
                }
                if(atual.vitoriasSTF > proximo.vitoriasSTF) {
                    return 1
                }
                    return 0
            })
        },
        ordemDerrotas() {
            this.jogadores.sort((proximo, atual) => {
                if(atual.derrotas < proximo.derrotas) {
                    return -1
                }
                if(atual.derrotas > proximo.derrotas) {
                    return 1
                }
                    return 0
            })
        },
        ordemGeral() {
            this.jogadores.sort((proximo, atual) => {
                if(atual.vitoriasGeral < proximo.vitoriasGeral) {
                    return -1
                }
                if(atual.vitoriasGeral > proximo.vitoriasGeral) {
                    return 1
                }
                    return 0
            })
        }
    },
    watch: {
        pesquisa(valorNovo) {
            fetch(`http://localhost:3000/jogadores?nick_like=${valorNovo}`)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    this.jogadores = data
                })
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
    }

</style>