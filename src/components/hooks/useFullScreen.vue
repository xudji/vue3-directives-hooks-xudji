<template>
  <div class="hello">
    <div ref="fullScreen" style="background: white">
      <p>是否全屏: {{ isFullscreen }}</p>
      <button @click="setFull" id="a">全屏</button>
      <button @click="exitFull">退出全屏</button>
      <button @click="toggle">toggle切换</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import useFullscreen from "../../hooks/fullScreen";
const fullScreen = ref();
const [isFullscreen, { setFull, exitFull, toggle }] = useFullscreen();
</script>