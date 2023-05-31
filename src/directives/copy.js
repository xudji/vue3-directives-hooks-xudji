import { ElMessage } from "element-plus";  //复制
const copy = {
  // el 表示当前绑定指令的元素， el-button按钮
  mounted (el, { value }) {
    // el.$value 就是为了避免与用户自定义的属性名冲突
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
        // 复制操作可能会在各种条件下被阻止，例如用户禁用了浏览器的剪贴板、浏览器限制了网页对剪贴板的访问等。为了确保复制操作能够在各种情况下正常进行，我们需要在复制前添加额外的事件处理程序和立即调用函数。
        (function (content) {
          document.oncopy = function (e) {
            // setData()它接受两个参数：第一个参数指定要设置的数据格式，例如 "text/plain" 或 "text/html"；第二个参数指定要设置的数据内容。
            e.clipboardData.setData("text", content);
            e.preventDefault();
            document.oncopy = null;
          };
        })(el.$value);
        // 我们会创建一个闭包函数，并将需要复制的文本内容作为函数参数传递给该函数。在闭包函数中，我们为 document.oncopy 事件绑定了一个事件处理函数，并在事件处理函数内部使用 e.clipboardData.setData() 方法将需要复制的文本内容设置到剪切板中，同时阻止默认的复制操作。事件处理结束后，我们会手动解除对 document.oncopy 事件的绑定，并使用 document.execCommand("Copy") 方法来手动触发剪贴板的复制操作，以确保复制操作在各种情况下都能够正常进行。
        document.execCommand("Copy");
      }
      ElMessage.success("复制成功");
    };
    // 绑定点击事件，用户点击触发handler回调
    el.addEventListener("click", el.handler);
  },
  beforeUpdate (el, {
    value
  }) {
    // 我们将最新的属性值保存在 $value 属性中。这可能是因为在后面的 updated 钩子函数中需要用到这个值
    el.$value = value;
  },
  unmounted (el) {
    el.removeEventListener("click", el.handler);
  }
};

export default copy;
