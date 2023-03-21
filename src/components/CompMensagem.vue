<template>
    <div class="message-container">
        <p>{{ msg }}</p>
    </div>
</template>

<script>
export default {
    name: 'CompMessagem',
    props: {
        msg: String
    }
}
</script>

<style scoped>
    .message-container {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #fff;
        background-color: #212121;
        border: 2px solid #2E2E2E;
        border-radius: 5px;
        padding: 10px;
        max-width: 400px;
        margin: 15px auto;
    }
</style>