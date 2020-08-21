<template>
  <div class="hello">
    <!--<img id="headImg" src="../assets/head.png">-->
    <!--<div id="headP">
      <img id="headImg" src="../assets/head.png">
      <h2 id="headYear">打卡第4年</h2>
    </div>-->

    <h1>{{ msg }}</h1>
    <h2 @click="hideBackBtn()">jx.hideBackBtn()</h2>

  </div>
</template>

<script>

  export default {
    name: 'TestVue',
    data () {
      return {
        msg: '朱海文的 TestVue.js'
      }
    },
    methods: {

      hideBackBtn () {

      }

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  #headP {
    position: relative;
  }

  #headImg {
    width: 100%;
    /*position:absolute;*/
    /*z-index: 100;*/
  }

  #headYear {
    position: absolute;
    z-index: 101;
  }

</style>
