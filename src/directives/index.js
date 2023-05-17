import backtop from './vbacktop' // 引入指令
import copy from './copy'
import draggable from './draggable'
import throttle from './throttle'
import debounce from './debounce'
import hidePop from './hidePop'
const directives = { // 指令对象
  backtop,
  copy,
  draggable,
  debounce,
  throttle,
  hidePop
}

export default {
  install(app) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    });
  }
}