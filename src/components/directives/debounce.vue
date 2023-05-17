<template>
  <el-button v-debounce="{ fn: handleClick, event: 'click', delay: 200 }">
    点击试试防抖
  </el-button>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "MyDebounce",
});
</script>

<script setup>
const handleClick = () => {
  console.log("防抖点击");
};
</script>