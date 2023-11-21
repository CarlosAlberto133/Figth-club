<template>
    <div id="cadastro">
        <div class="container">
            <div class="title">
                <h1>Seu Cadastro</h1>
            </div>
            <div class="msg">
                <CompMensagem :msg="msg" v-show="msg" />
            </div>
            <div id="tabelaCadastro">
                <div>
                    <form method="POST" @submit="criarCadastro">
                        <div>
                            <p>Nick: <input type="text" id="nick" name="nick" v-model="nick" placeholder="Ex: João123" /></p>
                            <small v-show="erroNick">* Este campo é obrigatório!</small>
                        </div>
                        <div>
                            <p>Total de partidas: <input type="number" id="partidas" name="partidas" v-model="partidas" /></p>
                            <small v-show="erroPartidas">* Este campo é obrigatório!</small>
                        </div>
                        <div>
                            <p>Vitórias Fortnite: <input type="number" id="vitoriasFortnite" name="vitoriasFortnite" v-model="vitoriasFortnite" /></p>
                        </div>
                        <div>
                            <p>Vitórias LoL: <input type="number" id="vitoriasLol" name="vitoriasLol" v-model="vitoriasLol" /></p>
                        </div>
                        <div>
                            <p>Vitórias STF: <input type="number" id="vitoriasSTF" name="vitoriasSTF" v-model="vitoriasSTF" /></p>
                        </div>
                        <div class="inputContainer">
                            <input id="btnSubmit" type="submit" value="Cadastrar" /> 
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
import { firebaseMixin } from '@/firebase/mixinFirebase'
import firebase from 'firebase/compat/app';
import "firebase/compat/database";

export default {
    name: 'CompCadastro',
    mixins: [firebaseMixin],
    components: {
        CompMensagem
    },
    data: () => ({
        LogoFortnite: '/img/fortniteLOGO.png',
        LogoLol: '/img/LOLLOGO.png',
        LogoSTF: '/img/streetLOGO.png',
        msg: null,
        nick: '',
        vitoriasFortnite: 0,
        vitoriasLol: 0,
        vitoriasSTF: 0,
        vitoriasGeral: 0,
        partidas: 0,
        derrotas: 0,
        erroNick: false,
        erroPartidas: false
    }),
    methods: {
        criarCadastro(e) {
            e.preventDefault()

            const ref = firebase.database().ref()
            const id = ref.push().key
            
            const data = {
                nick: this.nick,
                vitoriasFortnite: this.vitoriasFortnite,
                vitoriasLol: this.vitoriasLol,
                vitoriasSTF: this.vitoriasSTF,
                vitoriasGeral: this.vitoriasGeral,
                partidas: this.partidas,
                derrotas: this.derrotas,
                id: id
            }
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

                    ref.child(id).set(data, err => {
                    if(err) {
                        alert('Ops, algo deu errado, tente novamente xD')
                    } else {

                        this.msg = `Cadastro realizado com sucesso!`

                        setTimeout(() => this.msg= "", 5000)

                        this.nick= "",
                        this.vitoriasFortnite= 0,
                        this.vitoriasLol= 0,
                        this.vitoriasSTF= 0,
                        this.vitoriasGeral= 0,
                        this.partidas= 0,
                        this.derrotas= 0,
                        this.erroNick= false,
                        this.erroPartidas= false
                    }
                })
                }
            }
        }
    }
}
</script>

<style scoped>

    #cadastro {
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

    #tabelaCadastro {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
        width: 0 auto;
    }

    form {
        width: 575px;
    }

    p, span {
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
        justify-content: center;
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
        width: 250px;
        height: 50px;
        cursor: pointer;
        transition: .5s;
    }

    #btnSubmit:hover {
        background-color: #AD1313;
    }

    small {
        color: red;
        margin-bottom: 5px;
        font-weight: 700;
    }

</style>