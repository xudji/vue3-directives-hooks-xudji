# vue3 自定义指令 by xudji

## 返回顶部指令 v-backtop

### 使用方法

```html
<el-button v-backtop="100">返回顶部</el-button>
```

### 使用说明

实现回到顶部的功能，当滚动条滚动的距离大于或等于指令值时，显示"返回顶部"按钮，点击之后返回顶部。

### 实现逻辑

1. 在组件挂载到页面上时，先获取需要滚动的目标元素和类型，以及滚动的阈值。
2. 给当前组件添加一个鼠标点击事件的监听器，当用户点击按钮时，如果指定了滚动目标，则调用 smooth 方法进行平滑滚动操作；否则直接使用 target.scrollTo 方法进行滚动，并且设置 behavior 属性为 smooth 以实现平滑滚动效果。
3. 为滚动目标元素添加一个滚动事件的监听器，在滚动事件发生时判断滚动距离是否超过了指定的阈值，如果超过则显示回到顶部按钮，否则隐藏按钮。
4. 在组件从页面中卸载时，移除添加的事件监听器，避免内存泄漏。
5. 定义 smooth 方法，用于实现平滑滚动的操作。该方法根据每一次需要滚动的距离和时间间隔，使用定时器不断让滚动位置逐渐向上移动，直到回到页面顶部。

## 复制文本指令 v-copy

### 使用方法

```html
<el-button v-copy="jack">copy复制文本</el-button>
```

### 使用说明

实现复制功能，可以将指定的内容复制到剪切板中。需要绑定的是变量，变量为需要复制的内容。

### 实现逻辑

1. 导入 element-plus 库中的 ElMessage 组件，用于在复制完成或者出错时给用户提示。
2. 定义一个名为 copy 的对象，该对象包含三个钩子函数：mounted、beforeUpdate 和 unmounted。
3. 在 mounted 钩子函数中： · 获取传入的需要复制的值，并将其保存到当前组件实例的 $value 属性中。 · 为当前组件实例添加一个点击事件的监听器方法 handler，用于在点击按钮时触发复制操作。 · 当用户点击按钮时，先判断要复制的值是否为空，若为空则利用 ElMessage 组件弹窗提示用户 "复制的值不能为空"；否则利用浏览器提供的 API，将需要复制的值成功复制到剪贴板中，并调用 ElMessage 组件给用户提示 "复制成功"。 · 最后，将 handler 监听器方法绑定到当前组件实例上的点击事件上。
4. 在 beforeUpdate 钩子函数中，只需更新当前组件实例的 $value 属性即可。
5. 在 unmounted 钩子函数中，将当前组件实例的点击事件监听器 handler 移除，以避免内存泄漏。

## 拖拽对话框指令 v-draggable

### 使用方法

```
htmlCopy Code<div v-draggable="dialog">
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
```

### 使用说明

需要绑定 dialog，在 el-dialog 外面添加一层 div 包裹，自定义指令加在外层 div 才能生效，可以拖动至浏览器视口外，elementui 的不能超出屏幕。

### 实现逻辑

1. 首先定义了一个 setDialog 函数，用来设置拖拽事件。这个函数接收四个参数：container（大容器，比如蒙版）、dialog（被拖拽的窗口）、dialogTitle（拖拽的标题）、width（宽度比例）。
2. 在 setDialog 函数中，首先计算可视窗口的宽度和高度，并根据传入的宽度比例计算出 dialog 的初始位置。如果之前已经设置过 dialog 的位置，就将其作为初始位置；否则使用计算出来的初始位置。
3. 接着设置鼠标事件，当光标经过 dialogTitle 时，光标形状变成 move，表示可以移动窗口。当鼠标按下时，记录下当前光标坐标，并将光标形状变成 move。当鼠标移动时，计算偏移量，并根据这个偏移量实时改变 dialog 的位置。当鼠标抬起时，记录下新的坐标，并结束拖拽。
4. 最后，在 mounted 钩子函数中监听 dialog 是否显示的状态。当 dialog 显示时，寻找 el-dialog 组件，并且等待 DOM 渲染完毕。然后设置拖拽事件，并传入 el-dialog 组件、弹窗、句柄和宽度。在 unmounted 钩子函数中移除拖拽事件。

## 防抖指令 v-debounce

### 使用方法

```html
<el-button v-debounce="{ fn: handleClick, event: 'click', delay: 200 }">
  点击试试防抖
</el-button>
```

### 使用说明

绑定点击函数和事件，设置延迟时间，实现防抖功能。参数为函数、事件和延迟时间，延迟时间不传默认为 200ms。

### 实现逻辑

1. 在 `mounted` 钩子函数中，首先判断传入的参数是否符合要求，即必须有回调函数 `fn` 和监听事件类型 `event`。如果参数不符合要求，就直接返回。
2. 接着设置默认的延迟时间 `delay` 为 200 毫秒，并且初始化 `el.timer` 为 null。然后定义一个 `handler` 函数来处理事件，该函数会在事件发生时被调用。
3. 在 `handler` 函数中，首先判断 `el.timer` 是否存在，如果存在则使用 `clearTimeout()` 方法清除定时器并将 `el.timer` 重置为 `null`。然后使用 `setTimeout()` 方法设置一个新的定时器，在延迟时间之后执行回调函数 `fn` 并将 `el.timer` 重置为 `null`。
4. 在设置新的定时器之前，可以通过 `binding.value.delay` 来覆盖默认的延迟时间 `delay`。
5. 最后，在事件监听事件类型 `event` 上绑定 `handler` 函数。
6. 在 `beforeUnmount` 钩子函数中，移除事件监听和清除定时器。

## 节流指令 v-throttle

### 使用方法

```html
<el-input
  style="width: 150px"
  v-throttle="{ fn: handleInput, event: 'input', delay: 1000 }"
  v-model="obj.hello"
/>
```

### 使用说明

绑定输入事件函数和事件，设置延迟时间，实现节流功能。参数为函数、事件和延迟时间，延迟时间不传默认为 200ms。

### 实现逻辑

1. 在 `mounted` 钩子函数中判断传递给指令的回调函数和事件名称是否存在。如果不存在则直接返回。
2. 然后获取 `delay` 参数，如果没有指定则默认设置为 200 毫秒。
3. 定义 `handler` 函数作为回调函数的代理函数，通过 `apply` 方法将 `arguments` 对象传递给原始回调函数。
4. 在 `handler` 函数中，记录当前时间 `now`，并进行节流操作：如果上一次触发执行的时间 `lastTime` 不存在，或者距离上一次执行已经超过了 `delay` 的时间间隔，则调用原始回调函数，并将 `lastTime` 更新为当前时间。
5. 最后，在 `mounted` 钩子函数中，将 `handler` 函数作为回调函数绑定到指定的 DOM 元素上，并根据事件名称添加相应的事件监听器。
6. 在 `beforeUnmount` 钩子函数中，移除绑定到 DOM 元素上的事件监听器。

## 隐藏弹框指令 v-hidePop

### 使用方法

```html
<button @click.stop="showModal">点击显示弹窗(点击其他区域关闭)</button>

<div class="modal dialog" v-hidePop="{ fn: cancleModal }" v-if="isShowModal">
  我是弹框
  <button @click.stop="cancleModal">关闭</button>
</div>
```

### 使用说明

需要传入取消的函数，实现了点击元素以外的区域隐藏该元素的功能，什么元素都可以，兼容 HTML 元素和 Element Plus 元素及其他模板元素。

### 实现逻辑

1. 在 `mounted` 钩子函数中，定义 `handler` 函数作为全局点击事件的回调函数。
2. 在 `handler` 函数中，首先判断当前点击事件发生在指令所绑定的元素内部，如果是，则直接返回，不做任何事情；否则，判断绑定给指令的值是否是一个函数，如果是，则调用该函数并将上下文设置为绑定指令的 DOM 元素。
3. 然后，在 `handler` 函数中解除全局点击事件的绑定，防止事件被重复触发。
4. 在 `mounted` 钩子函数中，监听全局的点击事件，并将 `handler` 函数作为回调函数绑定到文档根元素上。
5. 在 `beforeUnmount` 钩子函数中，解除全局点击事件的绑定，防止内存泄漏。

# Vue3 自定义 Hooks by xudji

## 全屏 useFullscreen()

### 使用方法

```html
<template>
  <div class="hello">
    <div ref="fullScreen" style="background: white">
      <p>是否全屏: {{ isFullscreen }}</p>
      <button @click="setFull" id="a">全屏</button>
      <button @click="exitFull">退出全屏</button>
      <button @click="toggle">toggle 切换</button>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from "vue";
  import useFullscreen from "../../hooks/fullScreen";
  const fullScreen = ref();
  const [isFullscreen, { setFull, exitFull, toggle }] = useFullscreen();
</script>
```

### 使用说明

实现点击切换全屏、退出全屏和切换全屏显示隐藏功能。`useFullscreen()` 函数可以传入一个参数，用以指定要全屏的元素。如果不传参数，则默认全屏 `document.body`。

例如，如果你想让 `<div id="my-element"></div>` 成为全屏元素，在 `<script setup>` 中调用 `useFullscreen` 函数时可以这样传递参数：`useFullscreen(document.querySelector('#my-element'))`。这样，在全屏模式下只有 `<div id="my-element"></div>` 元素会被全屏，而其它元素不受影响。

如果你想让整个页面的所有元素都进入全屏模式，只需要将 `useFullscreen` 函数的目标元素参数设为 `document.documentElement` 即可。这样会将整个页面都设置为全屏模式。`useFullscreen(document.documentElement)`。

### 实现逻辑

1. 使用 Vue 模块中的 `ref()` 函数创建响应式变量 `isFullscreen`，表示当前是否处于全屏模式。
2. 定义一个默认选项对象 `defaultOptions` 和一个合并选项的变量 `{ onFull, onExitFull }`，用于设置在开启/退出全屏模式时需要执行的回调函数。
3. 初始化全屏元素的默认值 `el` 为 `document.body`。
4. 定义函数 `getEl()`，通过传入的 `target` 参数获取目标元素。如果传入的 `target` 是一个函数，则返回该函数的结果；否则返回 `target.value` 或 `target` 本身。
5. 定义函数 `handler()`，作为全屏状态改变事件的处理函数。当进入全屏模式时，执行 `onFull()` 回调函数；当退出全屏模式时，执行 `onExitFull()` 回调函数。
6. 在 `onMounted()` 钩子函数中，通过调用 `getEl()` 函数获取目标元素，并使用 `addEventListener()` 方法监听全屏状态改变事件，在事件发生时触发 `handler()` 函数。
7. 在 `onUnmounted()` 钩子函数中，使用 `removeEventListener()` 方法解除全屏状态改变事件的监听。
8. 定义了一个 `actions` 对象，包含三个方法：`setFull()`、`exitFull()` 和 `toggle()`。分别用于开启全屏模式、退出全屏模式和切换全屏模式。
9. 在 `setFull()` 方法中，先使用 `isFullscreen.value` 判断是否已经处于全屏模式。如果是，则不执行任何操作；否则，调用 `el.requestFullscreen()` 方法请求进入全屏模式，并将 `isFullscreen.value` 设置为 `true`。
10. 在 `exitFull()` 方法中，同样通过 `isFullscreen.value` 判断是否已经处于退出全屏模式。如果是，则不执行任何操作；否则，调用 `document.exitFullscreen()` 方法请求退出全屏模式，并将 `isFullscreen.value` 设置为 `false`。
11. 在 `toggle()` 方法中，使用三目运算符判断当前是否处于全屏模式，如果是，则调用 `exitFull()` 方法；否则，调用 `setFull()` 方法。

## 分页 useList()

### 使用方法

```html
let { result } = useList(axios, searchParams);

<li v-for="(item, index) in result.list" :key="index">{{ item }}</li>
```

### 使用说明

封装了获取列表数据的逻辑；提供了一个 reactive 对象 `result`，方便在组件中监测列表数据的变化；监听 `params` 的变化，并在变化时重新获取列表数据，以保证数据的及时更新。`callback` 是用来获取列表数据的函数；`params` 是一个 reactive 对象，用来管理 `callback` 函数的参数。

### 实现逻辑

1. 初始化 `result` 对象，将其定义为一个 reactive 对象，包含 `list` 和 `loading` 两个属性，初始值分别为 `[]` 和 `true`。
2. 定义 `doFetch()` 函数，它用来触发获取列表数据的过程。
3. 使用 `watchEffect` 函数，监听 `params` 的变化，并在 `params` 改变时自动重新获取数据。
4. 最后，返回一个对象，包含 `result` 属性，其值为定义的 `result` 对象。

## 下载 useDownloadFile()

### 使用方法

```javascript
<button @click="startDownload">下载文件</button>
javascriptCopy Codeimport { ref } from "vue";
import useDownloadFile from "../../hooks/useDownloadFile";

const { downloadFile } = useDownloadFile();
const fileName = ref("demo");
const fileUrl = ref(
  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
);

const startDownload = () => {
  downloadFile({
    fileName: fileName.value,
    url: fileUrl.value,
  });
};
```

### 使用说明

使用 import 引入，执行 `useDownloadFile()` 函数，获取 `downloadFile` 方法。执行 `useDownloadFile()` 函数，需要触发文件下载的地方调用 `downloadFile` 方法，并传入一个 `options` 参数对象，其中包括要下载文件的 url 和 fileName。点击下载按钮即可。

### 实现逻辑

使用 Blob 对象进行封装下载文件方法

1. 在 hook 中定义两个变量：`xhr` 和 `downloading`。其中，`xhr` 是用来发送 XMLHttpRequest 请求的对象，`downloading` 用来限制同一文件同时触发多次下载。
2. 使用 `onBeforeUnmount` 钩子函数，在组件销毁前取消正在进行中的下载请求。
3. 实现 `downloadFile` 函数，该函数的作用是下载文件。首先判断是否正在进行中的下载请求或者需要下载的文件没有地址或文件名，如果是则直接返回。之后设置 `downloading` 为 `true`，使得在下载过程中无法再次触发下载请求。如果需要下载的文件是通过 HTTP 访问的，则将其地址中的 "http" 转换为 "https"。然后创建一个进度条 `ref` 对象 `progress`，用于在下载过程中更新下载进度。从 URL 中获取文件类型并赋值给 `fileType` 变量。接着，创建 XMLHttpRequest 请求，并设置响应类型为 blob 类型。然后使用 `open` 方法以 GET 方式打开地址，并设置异步。接下来通过设置 `onprogress` 回调函数，将当前下载进度除以总大小所得百分比值更新到 `progress.value`。在下载完成时，将下载进度条的提示消息从页面中移除，并执行下载文件的操作，然后取出对象 URL 并释放掉，最后设置 `downloading` 为 `false`，提示用户文件已下载完成。若在下载过程中发生异常，则输出异常信息，设置 `downloading` 为 `false`，并提示用户下载发生异常，请重试。
4. 最后，将 `downloadFile` 函数作为对象的属性返回。

### 补充说明

方法 操作原理 优点 缺点

**form 表单** 动态生成一个表单，利用表单提交的功能来实现文件的下载 兼容性好，不会出现 URL 长度限制问题 无法知道下载的进度，用户体验交互差
无法直接下载浏览器可直接预览的文件类型
**window.open / location.href** 打开新标签页访问下载资源 简单粗暴 会出现 URL 长度限制问题
无法知道下载的进度，用户体验交互差
无法直接下载浏览器可直接预览的文件类型，直接就预览打开了像 pdf、jpg、png 文件
需要注意 url 编码问题
不能添加 header，也就不能进行鉴权
**a download** 属性 利用 a 标签原生访问属性，附加新增的 download 属性，使用浏览器进行下载 简单粗暴且可下载正常预览文件 不能下载跨域地址文件
IE/Edge 内兼容问题
无法鉴权
**Blob 对象** 发请求获取二进制数据，转化为 Blob 对象，利用 URL.createObjectUrl 生成 url 地址，赋值在 a 标签的 href 属性上，结合 download 进行下载 能解决不能直接下载浏览器可浏览的文件
可以鉴权 IE10 以下不可用
Safari 使用情况可能有问题

## 格式化数字 useFormatter()

### 使用方法

```javascript
const { numberFormater, moneyFormater } = useFormater();
  <div class="emphasis">日同比 &nbsp;{{numberFormater(salesGrowthLastDay)}}% &nbsp; <span class="decrement"></span></div>
   <div>昨日销售额 <span class="emphasis">{{ moneyFormater(salesLastDay) }}</span></div>
```

### 使用说明

数据格式化的工具函数，用于将数字每千位加上逗号分隔，或在数字前面加上人民币符号。执行 `useFormatter()` 函数，获取 `numberFormater` 和 `moneyFormater` 两个方法。在需要展示的数据上调用 `numberFormater` 或 `moneyFormater` 方法，对数据进行格式化。数据作为参数传入函数，可以直接再模板中使用。

### 实现逻辑

1. 定义一个工具函数 `formaterNumber()`，用于对传入的数字进行格式化，实现方式是将数字转化为字符串，并使用正则表达式将每千位加上逗号分隔。例如：将 `123456789` 转化为 `'123,456,789'`。
2. 在 `useFormatter()` 函数中定义两个方法：`numberFormater` 和 `moneyFormater`。
3. `numberFormater` 方法中调用 `formaterNumber()` 函数，对数字进行格式化后返回，这里没有添加额外符号。
4. `moneyFormater` 方法中先调用 `formaterNumber()` 函数对数字进行格式化，然后在格式化后的字符串前添加“￥”符号，最后返回。
5. 在 `useFormatter()` 函数中返回包含 `numberFormater` 和 `moneyFormater` 的对象，以供组件中调用。
