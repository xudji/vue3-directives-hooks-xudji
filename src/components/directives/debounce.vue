<template>
  防抖输入框<el-input
    style="width: 150px"
    v-debounce="{ fn: handleInput, event: 'input', delay: 200 }"
    v-model="obj.hello"
  />
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "MyDebounce",
});
</script>

<script setup>
const obj = reactive({
  hello: "",
  world: "",
});
const handleInput = () => {
  console.log("防抖输入框的值：", obj.hello);
};
</script>