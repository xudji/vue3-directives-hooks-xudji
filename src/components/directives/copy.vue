<template>
  <el-button v-copy="jack">copy复制文本</el-button>
  <text>{{ jack }}</text>
</template>

<script >
import { defineComponent } from "vue";
export default defineComponent({
  name: "MyCopy",
});
</script>
<script setup>
import { ref } from "vue";
const jack = ref("jack111111111");
</script>

<style>
</style>