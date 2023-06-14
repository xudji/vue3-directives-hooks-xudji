// 对数据进行格式化
function formaterNumber(value) {
    if (!value) return // 阻止代码向下执行
    // ?= 正向肯定预查 
    // 小括号表示分组 123,456,78
    // \d 表示正则中的数字 digit数字的意思
    // $1是用来匹配分组中的第1项内容
    // /g global就是全局的意思
    return `${value}`.replace(/(\d{3})(?=\d)/g, '$1,')
  
    // 人民币千分位
    // + 表示1到多个
    // ? 表示0或1
    // * 表示0到多个
    // return `${value}`.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
  }
  
  // 默认导出这个函数 写不写函数名无所谓
  // 一个函数只能返回一个数据
  export default function () {
    const numberFormater = (value) => formaterNumber(value)
    const moneyFormater = (value) => `￥${formaterNumber(value)}`
    return {
      numberFormater,
      moneyFormater
    }
  }

  