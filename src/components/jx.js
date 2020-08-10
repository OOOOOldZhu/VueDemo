class JX {

  constructor () {
    this.init.bind(this)
    this.initBridge.bind(this)
    this.request.bind(this)
    this.showLogin.bind(this)
    this.isLogin.bind(this)
    this.showAlert.bind(this)
  }

  init () {
    console.log('init()')
    let bridge = window.WebViewJavascriptBridge
    if (bridge) {
      //do your work here
      console.log('bridge已经初始化了')
      this.initBridge(bridge)
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady'
        ,  ()=>{
          //do your work here
          console.log('bridge初始化完成了第一步')
          let bridge = window.WebViewJavascriptBridge
          this.initBridge(bridge)
        },
        false
      )
    }
  }

  initBridge (bridge) {
    if (bridge) {
      //You can also define a default handler use init method, so that Java can send message to js without assigned handlerName
      bridge.init((message, responseCallback) => {
        console.log('android bridge.init()...初始化完成了第二步')
        let data = {'json': 'JS返回任意数据!'}
        responseCallback(data)
      })
    }
  }

  /*
  * option = {
          url: 'xxxx',
          method:'get',
          data: {
              a: 1,
              b: 2,
              ...
          }}
  */
  request (option, successCallback, errCallback) {
    console.log('jx.request')
    let bridge = window.WebViewJavascriptBridge
    if (bridge) {
      bridge.callHandler(
        'request',
        JSON.stringify(option),
        dataFromJava => {
          console.log('jx.js 接收数据 ===> '+dataFromJava)
          let ind = dataFromJava.indexOf('err:')
          if (ind == 0) {
            //错误信息
            let res = dataFromJava.substring(ind + 4)
            errCallback(res)
          } else {
            //正确结果
            successCallback(dataFromJava)
          }
        }
      )
    }
  }

  showLogin (callback) {
    // ... 原生的一些操作完毕之后返回用户信息
    let bridge = window.WebViewJavascriptBridge
    if (bridge) {
      bridge.callHandler(
        'showLogin',
        '',
        userInfo => {
          callback(userInfo)
        }
      )
    }
  }

  isLogin (callback) {
    let bridge = window.WebViewJavascriptBridge
    if (bridge) {
      bridge.callHandler(
        'isLogin',
        '',
        loginCode => {
          callback(loginCode == 'true')
        }
      )
    }
  }

  /*
  * option = {
          title: '我是标题',
          descrip:'我是描述'
         }
  */
  showAlert (option, okCallback, cancelCallback) {
    let bridge = window.WebViewJavascriptBridge
    if (bridge) {
      bridge.callHandler(
        'showAlert',
        JSON.stringify(option),
        code => {
          if (code == '1') {
            okCallback()
            return
          }
          cancelCallback()
        }
      )
    }
  }

  hideBackBtn(isShow){
    let bridge = window.WebViewJavascriptBridge
    if (bridge) {
      bridge.callHandler(
        'hideBackBtn',
        isShow,
        nill => {

        }
      )
    }
  }

}
let jx;

if(!jx){
  jx = new JX();
  jx.init();
}

export default jx;
