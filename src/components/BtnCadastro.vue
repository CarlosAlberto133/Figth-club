<template>
  <div>
    <a href="#">CADASTRO</a>
  </div>
</template>

<script>
export default {
    name: 'BtnCadastro'
}
</script>

<style scoped>

    div {
      justify-content: center;
      align-items: center;
      display: flex;
    }

    a {
      padding: 15px 60px;
      border: none;
      text-decoration: none;
      border-radius: 15px;
      background-color: #F53B3B;
      color: #fff;
      font-weight: bold;
      font-size: 20px;
      transition: .5s;
    }

    a:hover {
      background-color: #AD1313;
    }

</style>