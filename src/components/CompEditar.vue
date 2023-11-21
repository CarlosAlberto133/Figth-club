<template>
    <div id="compCadastro">
        <div class="container">
            <div class="title">
                <h1>Atualize seu cadastro!</h1>
            </div>
            <div class="msg">
                <CompMensagem :msg="msg" v-show="msg" />
            </div>
            <div id="cadastro">
                <div>
                    <form method="PUT" >
                        <div>
                            <p>Nick: <input type="text" id="nick" name="nick" v-model="jogadores.nick" /></p>
                        </div>
                        <div>
                            <p>Total de partidas: <input type="number" id="partidas" name="partidas" v-model="jogadores.partidas" /></p>
                        </div>
                        <div>
                            <p>Vitórias Fortnite: <input type="number" id="vitoriasFortnite" name="vitoriasFortnite" v-model="jogadores.vitoriasFortnite" /></p>
                        </div>
                        <div>
                            <p>Vitórias LoL: <input type="number" id="vitoriasLol" name="vitoriasLol" v-model="jogadores.vitoriasLol" /></p>
                        </div>
                        <div>
                            <p>Vitórias STF: <input type="number" id="vitoriasSTF" name="vitoriasSTF" v-model="jogadores.vitoriasSTF" /></p>
                        </div>
                        <div class="inputContainer">
                            <button id="btnSubmit" @click="atualizarCadastro($event, jogadores.id)">Atualizar</button>
                            <router-link to="/lutas">Voltar</router-link>
                        </div>
                    </form>
                </div>
            
                <div class="imagens">
                    <img :src="LogoFortnite" />
                    <img :src="LogoLol" />
                    <img :src="LogoSTF" class="noMargin" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CompMensagem from '@/components/CompMensagem.vue'
import firebase from 'firebase/compat/app'
import { firebaseMixin } from '@/firebase/mixinFirebase'
import "firebase/compat/database"

export default {
    name: 'CompEditar',
    mixins: [firebaseMixin],
    components: {
        CompMensagem
    },
    data: () => ({
        LogoFortnite: '/img/fortniteLOGO.png',
        LogoLol: '/img/LOLLOGO.png',
        LogoSTF: '/img/streetLOGO.png',
        msg: null,
        jogadores: []
    }),
    methods: {
        getDadosApi() {
            const dbRef = firebase.database().ref(`/${this.$route.params.id}`)

                dbRef.once('value')
                    .then(snapshot => {
                        this.jogadores = snapshot.val()
                })
                .catch(error => {
                    alert('Erro ao obter dados do banco', error)
                })
        },
        atualizarCadastro(event, id) {
            event.preventDefault()

            const data = this.jogadores

            if(data.nick === '') {
                this.msg = "Nick obrigatório!"
                this.erroNick = true
            } else if(data.partidas === 0) {
                this.msg = "-_- Número total de partidas obrigatório!"
                this.erroPartidas = true
            } else if(data.vitoriasFortnite > data.partidas) {
                this.msg = "-_- Você tem mais vitórias do que partidas!"
            }else if (data.vitoriasLol > data.partidas) {
                this.msg = "-_- Você tem mais vitórias do que partidas!"
            } else if(data.vitoriasSTF > data.partidas) {
                this.msg = "-_- Você tem mais vitórias do que partidas!"
            } else {

                data.vitoriasGeral = data.vitoriasFortnite + data.vitoriasLol + data.vitoriasSTF
                data.derrotas = data.partidas - data.vitoriasGeral

                if(data.vitoriasGeral > data.partidas) {
                    this.msg = "-_- Você tem mais vitórias do que partidas!"
                } else {

                    const dbRef = firebase.database().ref(`/${id}`)

                    dbRef.update(data)
                    .then(() => {
                        this.msg = `O jogador ${data.nick} foi atualizado com sucesso!`
                        setTimeout(() => this.msg = "", 3000)
                    })
                    .catch(error => {
                        alert('Erro ao atualizar', error)
                    })
                }
            }
        }
    },
    mounted() {
        this.getDadosApi()
    }
}
</script>

<style scoped>

    #compCadastro {
        padding-top: 120px;
        background-color: #A9A9A9;
    }

    .container {
        padding: 50px 0px 50px 150px;
    }

    .title,
    .msg {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 0 150px 0 0;
    }

    h1 {
        font-size: 50px;
    }

    #cadastro {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
        width: 0 auto;
    }

    form {
        width: 575px;
    }

    p {
        font-weight: bold;
        font-size: 20px;
    }

    div {
        padding: 15px 0;
    }

    input {
        width: 50%;
        height: 40px;
        padding: 10px 25px;
        border-radius: 5px;
        border: none;
    }

    #nick {
        width: 70%;
    }

    #vitoriasFortnite {
        width: 51%;
    }

    #vitoriasLol,
    #vitoriasSTF {
        width: 57.5%;
    }

    .imagens {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        width: 0 auto;
    }

    img {
        align-items: center;
        display: flex;
        justify-content: center;
    }

    .noMargin {
        margin-right: 0;
    }

    .inputContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
    }

    #btnSubmit {
        border: none;
        border-radius: 15px;
        background-color: #F53B3B;
        color: #fff;
        font-weight: bold;
        font-size: 20px;
        width: 200px;
        height: 50px;
        cursor: pointer;
        transition: .5s;
    }

    #btnSubmit:hover {
        background-color: #AD1313;
    }

    a {
        background-color: #222;
        color: #fff;
        border-radius: 15px;
        text-decoration: none;
        font-weight: bold;
        border: 2px solid #222;
        padding: 10px 65px;
        font-size: 20px;
        margin: 0 auto;
        cursor: pointer;
        transition: .5s;
    }

    a:hover {
        background-color: transparent;
        color: #222;
    }

</style>