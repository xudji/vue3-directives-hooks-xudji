<template>
  <!--拖拽-->
  <el-button @click="dialog.visible = true"
    >打开拖拽el-dialog对话框，可拖拽到屏幕外</el-button
  >
  <div v-draggable="dialog">
    <el-dialog v-model="dialog.visible" title="自定义拖拽2" width="25%">
      <span>拖拽测试</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog.visible = false">Cancel</el-button>
          <el-button type="primary" @click="dialog.visible = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "nf-dialog-move",
  props: {},
  setup(props, context) {
    const dialog = reactive({
      visible: false,
    });

    const meta = reactive({});

    return {
      meta,
      dialog,
    };
  },
});
</script>