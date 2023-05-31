import { reactive, isReactive, watchEffect } from "vue";

export default function useList(callback, params) {
  // 创建一个响应式对象 result
  let result = reactive({
    list: [], // 列表数据
    loading: true // 加载状态
  })

  // 定义 doFetch 函数，用于获取列表数据
  function doFetch() {
    result.loading = true; // 设置加载状态为 true
    // 调用参数 callback 函数获取列表数据，并在获取成功后赋值给 result.list 对象
    // 在获取失败时同样设置加载状态为 false
    callback(params).then(res => {
      result.list = res;
      result.loading = false;
    }, (err) => {
      console.log(err)
      result.loading = false;
    })
  }

  // 如果传入的参数 params 是一个响应式对象，则使用 watchEffect 自动观察其变化，
  // 并在变化时自动调用 doFetch 函数来获取最新的列表数据
  if (isReactive(params)) {
    watchEffect(doFetch)
  }

  // 返回包含 result 对象的对象，使其能够在组件中使用
  return {
    result
  }
}
