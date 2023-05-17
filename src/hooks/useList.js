import { reactive, isReactive, watchEffect } from "vue";

export default function useList(callback, params) {
  let result = reactive({
    list: [],
    loading: true
  })

  function doFetch() {
    result.loading = true;
    callback(params).then(res => {
      result.list = res;
      result.loading = false;
    }, err => {
      result.loading = false;
    })
  }
  if (isReactive(params)) {
    watchEffect(doFetch)
  }

  return {
    result
  }
}
