<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2 @click="requestPost()">jx.requestPost()</h2>
    <h2 @click="requestGet()">jx.requestGet()</h2>
    <h2 @click="showLogin()">jx.showLogin()</h2>
    <h2 @click="isLogin()">x.isLogin()</h2>
    <h2 @click="showAlert()">jx.showAlert</h2>
  </div>
</template>

<script>

import jx from './jx.js';
jx.init();
console.log('jx.init()')

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '朱海文的 Vue.js'
    }
  },
  methods: {
    requestPost () {
      // 点击事件的时候去寻找相应的方法，在底层做转换直接写方法名，大括号里面写相应的业务逻辑
      console.log('11')
      let option = {
        url: 'api.freego.haitiand.cn/travelcard/bindCard',
        method:'post',
        data: {
          card_no: '1jjguftgytfy',
          code: '1gy7gty'
          //...
        }}
      jx.request(option,res=>{
        console.log('vue post res =====> '+res)
      },err=>{
        console.log('vue post err =====> '+err)
      })
    },
    requestGet () {
      // 点击事件的时候去寻找相应的方法，在底层做转换直接写方法名，大括号里面写相应的业务逻辑
      console.log('22')
      let option = {
        url: 'api.freego.haitiand.cn/travelcard/getActivityData',
        method:'get',
        data: {

        }}
      jx.request(option,res=>{
        console.log('vue get res =====> '+res)
      },err=>{
        console.log('vue get err =====> '+err)
      })
    },
    showLogin () {
      console.log('22')
      jx.showLogin(userInfo=>{
        console.log('vue 中showLogin ==> '+userInfo);
      })
    },
    isLogin () {
      console.log('33')
      jx.isLogin(isLogin=>{
        // isLogin 为布尔值
        console.log('vue 中是否登录 ==> '+isLogin);
      })
    },
    showAlert() {
      console.log('44')
      jx.showAlert({
        /*
        * type = 0 error  //比如活动暂未开启
        * type = 1 success
        * type = 其他， 就是普通弹窗
        */
        type:'1',
        title: '打卡成功',
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
