<template>
  <div id="footer">
    <div id="info">
        <div>
            <small>Todos os direitos autorais de Fortnite são da Epic Games.</small>
            <small>Todos os direitos autorais de League of Legends são da Riot Games.</small>
            <small class="noMargin">Todos os direitos autorais de Street Fighter são da Capcom.</small>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'CompFooter'
}
</script>

<style scoped>

    #footer {
        height: 192px;
        background-color: #2F2F2F;
        justify-content: center;
        align-items: center;
        display: flex;
    }

    #info {
        margin: 0 auto;
    }

    small {
        color: #fff;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }

    .noMargin {
        margin-bottom: 0;
    }

</style>