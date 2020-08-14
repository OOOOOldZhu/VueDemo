class JX {

  constructor () {
    this.init.bind(this)
    this.request.bind(this)
    this.showLogin.bind(this)
    this.isLogin.bind(this)
    this.showAlert.bind(this)
    this.finish.bind(this)
  }

  init (callback) {
    console.log('init()')
    let bridge = window.WebViewJavascriptBridge
    if (bridge) {
      bridge.init((message, responseCallback) => {
        console.log('android bridge.init()...初始化完成了1')
        let data = {'json': 'JS返回任意数据!'}
        responseCallback(data)
        if(callback)callback();
      })
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady'
        , () => {
          //do your work here
          let bridge = window.WebViewJavascriptBridge
          bridge.init((message, responseCallback) => {
            console.log('android bridge.init()...初始化完成了2')
            let data = {'json': 'JS返回任意数据!'}
            responseCallback(data)
            if(callback)callback();
          })
        },
        false
      )
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
          console.log('jx.js 接收数据 ===> ' + dataFromJava)
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

  finish(){
    let bridge = window.WebViewJavascriptBridge
    if (bridge) {
      bridge.callHandler(
        'finish',
        "",
        () => {

        }
      )
    }
  }

  jumpTo (type) {
    // video award writeTravel travelList
    let bridge = window.WebViewJavascriptBridge
    if (bridge) {

      bridge.callHandler(
        'jumpTo',
        type,
        () => {

        }
      )

      //看视频
      if (type.contains('video')) {

        return
      }
      //去领奖
      if (type.contains('award')) {

        return
      }
      //去完成 写游记
      if (type.contains('writeTravel')) {

        return
      }
      //游记列表 我的游记
      if (type.contains('travelList')) {

        return
      }
    }
  }

}

let jx

if (!jx) {
  jx = new JX()
}

export default jx
