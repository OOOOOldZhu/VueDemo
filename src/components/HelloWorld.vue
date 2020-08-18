<template>
  <div class="hello">
    <img id="headImg" src="../assets/head.png">
    <!--<div id="headP">
      <img id="headImg" src="../assets/head.png">
      <h2 id="headYear">打卡第4年</h2>
    </div>-->

    <h1>{{ msg }}</h1>
    <h2 @click="requestPost()">jx.requestPost()</h2>
    <h2 @click="requestGet()">jx.requestGet()</h2>
    <h2 @click="showLogin()">jx.showLogin()</h2>
    <h2 @click="isLogin()">x.isLogin()</h2>
    <h2 @click="showAlert()">jx.showAlert</h2>
    <h2 @click="hideBackBtn()">jx.hideBackBtn</h2>
    <h2 @click="jumpTo()">jx.jumpTo</h2>
    <h2 @click="getDataAndTo()">获取数据并跳转到领奖界面</h2>
  </div>
</template>

<script>

  import jx from './jx.js'

  jx.init()

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
          method: 'post',
          data: {
            card_no: '1jjguftgytfy',
            code: '1gy7gty'
            //...
          }
        }
        jx.request(option, res => {
          console.log('vue post res =====> ' + res)
        }, err => {
          console.log('vue post err =====> ' + err)
        })
      },
      requestGet () {
        // 点击事件的时候去寻找相应的方法，在底层做转换直接写方法名，大括号里面写相应的业务逻辑
        console.log('22')
        let option = {
          url: 'api.freego.haitiand.cn/travelcard/getActivityData',
          method: 'get',
          data: {}
        }
        jx.request(option, res => {
          console.log('vue get res =====> ' + res)
        }, err => {
          console.log('vue get err =====> ' + err)
        })
      },
      showLogin () {
        console.log('22')
        jx.showLogin(userInfo => {
          console.log('vue 中showLogin ==> ' + userInfo)
        })
      },
      isLogin () {
        console.log('33')
        jx.isLogin(isLogin => {
          // isLogin 为布尔值
          console.log('vue 中是否登录 ==> ' + isLogin)
        })
      },
      showAlert () {
        console.log('44')
        jx.showAlert({
          /*
          * type = 0 error  //比如活动暂未开启
          * type = 1 success
          * type = 其他， 就是普通弹窗
          */
          type: '1',
          title: '打卡成功',
          descrip: '我是来自于JS的描述',
          cancelBtnVisble:false,
          confirmBtnText:'确定'
        }, () => {

        }, () => {

        })
      },
      hideBackBtn () {
        jx.hideBackBtn(false)
      },
      jumpTo () {
        jx.jumpTo({type:'video'})
      },
      getDataAndTo(){
        let option = {
          url: 'api.freego.haitiand.cn/travelcard/getActivityData',
          method: 'get',
          data: {}
        }
        jx.request(option, res => {
          console.log('vue get res =====> ' + res)
          // day 连续天数
          // State: 0/1 可以继续打卡
          // Date: 服务器时间
          // Task: 任务列表 id=1,check:是当天否已打卡;   id=2,check:完成游记的篇数
          let day = JSON.parse(res).data.day
          //this.getAwardList(day);
          jx.jumpTo({type:'award',data:{day:day}})
        }, err => {
          console.log('vue get err =====> ' + err)
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
