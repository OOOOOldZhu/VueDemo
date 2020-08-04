class JX {

  constructor () {
    this.init.bind(this)
    this._initBridge.bind(this)
    this.showLogin.bind(this)
    this.isLogin.bind(this)
    this.showAlert.bind(this)
  }

  init () {
    console.log('onBridgeInit()')
    let bridge = window.WebViewJavascriptBridge
    if (bridge) {
      //do your work here
      console.log('do your work here 1')
      this.initBridge(bridge)
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady'
        , function () {
          //do your work here
          console.log('do your work here 2')
          let bridge = window.WebViewJavascriptBridge
          this.initBridge(bridge)
        },
        false
      )
    }
  }

  _initBridge (bridge) {
    if (bridge) {
      //You can also define a default handler use init method, so that Java can send message to js without assigned handlerName
      bridge.init((message, responseCallback) => {
        console.log('android bridge.init()...初始化完成')
        let data = {'json': 'JS返回任意数据!'}
        responseCallback(data)
      })
    }
  }

  /*
  * option = {
          url: 'xxxx',
          method:'get'
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
        "",
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
        "",
        loginCode => {
          callback(loginCode == '1')
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
  showAlert (option,okCallback,cancelCallback) {
    let bridge = window.WebViewJavascriptBridge
    if (bridge) {
      bridge.callHandler(
        'showAlert',
        JSON.stringify(option),
        code => {
          if(loginCode == '1'){
            okCallback()
            return
          }
          cancelCallback()
        }
      )
    }
  }

}

export default new JX()
