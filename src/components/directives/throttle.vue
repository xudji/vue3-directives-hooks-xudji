<template>
  节流输入框<el-input
    style="width: 150px"
    v-throttle="{ fn: handleInput, event: 'input', delay: 200 }"
    v-model="obj.hello"
  />
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "MyThrottle",
});
</script>

<script setup>
import { reactive } from "vue";
const obj = reactive({
  hello: "",
  world: "",
});
const handleInput = () => {
  console.log("节流输入框的值：", obj.hello);
};
</script>