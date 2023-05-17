import { ElMessage } from "element-plus";  //复制
const copy = {
  mounted (el, { value }) {
    el.$value = value;
    el.handler = () => {
      if (!el.$value) {
        // 值为空的时候，给出提示
        ElMessage.warning({
          message: "您好，复制的值不能为空。",
          type: "warning"
        });
        return;
      }
      if (window.clipboardData) {
        window.clipboardData.setData("text", el.$value);
      } else {
        (function (content) {
          document.oncopy = function (e) {
            e.clipboardData.setData("text", content);
            e.preventDefault();
            document.oncopy = null;
          };
        })(el.$value);
        document.execCommand("Copy");
      }

      ElMessage.success("复制成功");
    };
    // 绑定点击事件
    el.addEventListener("click", el.handler);
  },
  beforeUpdate (el, {
    value
  }) {
    el.$value = value;
  },
  unmounted (el) {
    el.removeEventListener("click", el.handler);
  }
};

export default copy;
