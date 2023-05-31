<template>
  <div>
    <!-- <Draggable></Draggable> -->
    <!-- <BackTop></BackTop>
    <Copy></Copy>
  
   <HidePop></HidePop>
   <UseList></UseList>
    <UseFullScreen></UseFullScreen>-->
    <UseDownloadFile></UseDownloadFile> 
    <!-- <Debounce></Debounce>
    <Throttle></Throttle> -->
  </div>
</template>
<script>
// directives
// import BackTop from "./components/directives/backTop.vue";
// import Copy from "./components/directives/copy.vue";
// import Draggable from "./components/directives/draggable.vue";
// import Debounce from "./components/directives/debounce.vue";
// import Throttle from "./components/directives/throttle.vue";
// import HidePop from "./components/directives/hidePop.vue";
//hooks
// import UseList from "./components/hooks/useList.vue";
// import UseFullScreen from "./components/hooks/useFullScreen.vue";
import UseDownloadFile from "./components/hooks/useDownloadFile.vue";
export default {
  name: "App",
  components: {
    // Copy,
    // BackTop,
    // Draggable,
    // Debounce,
    // Throttle,
    // HidePop,
    // UseList,
    // UseFullScreen,
    UseDownloadFile,
  },
};
</script>
<style>
</style>
