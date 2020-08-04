<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2 @click="request()">jx.request()</h2>
    <h2 @click="showLogin()">jx.showLogin()</h2>
    <h2 @click="isLogin()">x.isLogin()</h2>
    <h2 @click="showAlert()">jx.showAlert</h2>
  </div>
</template>

<script>

import jx from './jx.js';
jx.init();

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '朱海文的 Vue.js'
    }
  },
  methods: {
    request () {
      // 点击事件的时候去寻找相应的方法，在底层做转换直接写方法名，大括号里面写相应的业务逻辑
      console.log('11')
      jx.request()
    },
    // 也可以采用匿名函数的写法定义方法名，然后进行调用这种方法也是可以的，只不过getMethod ()的写法更加简洁，但是在实际开发当中这个可是不支持的例如   aaFunc (){}         //直接这样写是会报错的，一定要注意;
    showLogin () {
      console.log('22')
      jx.showLogin()
    },
    isLogin: function () {
      console.log('33')
      jx.isLogin()
    },
    showAlert: function () {
      console.log('44')
      jx.showAlert({
        title: '我是来自于JS的标题',
        descrip:'我是来自于JS的描述'
      },()=>{

      },()=>{

      })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
