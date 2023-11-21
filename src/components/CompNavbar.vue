<template>
    <div id="nav">
        <router-link to="/" id="logoUrl">
            <img :src="logo" :alt="alt" id="logo" />
        </router-link>
        <router-link :to="{ path: '/', hash: '#home' }">HOME</router-link>
        <router-link :to="{ path: '/lutas', hash: '#lutas' }">LUTAS</router-link>
        <router-link :to="{ path: '/cadastro', hash: '#cadastro' }">CADASTRE-SE</router-link>
        <router-link :to="{ path: '/', hash: '#ranking' }">RANKINGS</router-link>
        <div class="traco1"></div>
        <div class="traco2"></div>
        <div class="traco3"></div>
        <div class="traco4"></div>
        <div class="traco5"></div>
        <div class="traco6"></div>
        <div class="traco7"></div>
        <div class="traco8"></div>
        <div class="traco9"></div>
        <div class="traco10"></div>
        <div class="traco11"></div>
    </div>
</template>

<script>
export default {
    name: 'CompNavbar',
    props: [ 'logo', 'alt' ]
}
</script>

<style scoped>
    #nav {
        position: fixed;
        background-color: #212121;
        width: 100%;
        height: 111px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 192px;
        top: 0;
        z-index: 1;
    }

    #nav #logoUrl {
        margin: auto;
        margin-left: 0;
    }

    #nav a {
        color: #fff;
        text-decoration: none;
        margin: 20px;
        transition: .5s;
        font-weight: bold;
        font-size: 20px;
        z-index: 1;
    }

    #nav a:hover {
        color: #939393;
    }

    .traco1 {
        padding: 15px;
        height: 111px;
        background-color: #2E2E2E;
        position: absolute;
        margin-right: 55rem;
    }

    .traco2 {
        padding: 15px;
        height: 111px;
        background-color: #2E2E2E;
        position: absolute;
        margin-right: 50rem;
    }

    .traco3 {
        padding: 15px;
        height: 111px;
        background-color: #2E2E2E;
        position: absolute;
        margin-right: 45rem;
    }

    .traco4 {
        padding: 15px;
        height: 111px;
        background-color: #2E2E2E;
        position: absolute;
        margin-right: 40rem;
    }

    .traco5 {
        padding: 15px;
        height: 111px;
        background-color: #2E2E2E;
        position: absolute;
        margin-right: 35rem;
    }

    .traco6 {
        padding: 15px;
        height: 111px;
        background-color: #2E2E2E;
        position: absolute;
        margin-right: 30rem;
    }

    .traco7 {
        padding: 15px;
        height: 111px;
        background-color: #2E2E2E;
        position: absolute;
        margin-right: 25rem;
    }

    .traco8 {
        padding: 15px;
        height: 111px;
        background-color: #2E2E2E;
        position: absolute;
        margin-right: 20rem;
    }

    .traco9 {
        padding: 15px;
        height: 111px;
        background-color: #2E2E2E;
        position: absolute;
        margin-right: 15rem;
    }

    .traco10 {
        padding: 15px;
        height: 111px;
        background-color: #2E2E2E;
        position: absolute;
        margin-right: 10rem;
    }

    .traco11 {
        padding: 15px;
        height: 111px;
        background-color: #2E2E2E;
        position: absolute;
        margin-right: 5rem;
    }

</style>