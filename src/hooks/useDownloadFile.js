import { createVNode, ref, onBeforeUnmount } from 'vue';
import { ElMessage } from 'element-plus';

export default function useDownloadFile() {
    let xhr = null;
    let downloading = false; // 限制同一文件同时触发多次下载
    // xhr.abort() 被用于确保在组件卸载时，下载操作能够被正确地中止，并释放资源。如果不调用 xhr.abort() 方法，在组件卸载时，由于下载操作尚未完成，可能会出现一些不可预知的异常或内存泄漏问题。如切换页面
    onBeforeUnmount(() => {
        xhr && xhr.abort();
    });
    const downloadFile = options => {
        try {
            if (downloading || !options.url || !options.fileName) return;
            downloading = true;
            // 增强数据传输的安全性和可靠性
            options.url = options.url.replace('http://', 'https://');
            // 使用 ref() 创建响应式数据 progress，用于记录下载进度的百分比。
            const progress = ref(0);
            // .pop() 方法会修改原始数组，即删除数组的最后一个元素，并将其作为返回值返回, 获取url文件后缀名
            const fileType = options.url.split('.').pop();
            xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.open('get', options.url, true);
            // xhr.onprogress事件属性 用于监听 HTTP 请求的下载进度
            xhr.onprogress = function (e) {
                progress.value = Math.floor((e.loaded / e.total) * 100);
            };
            // e 是由浏览器自动创建并传递给 xhr.onprogress 和 xhr.onloadend 方法的事件对象
            xhr.onloadend = function (e) {
                if (e.target.status === 200 || e.target.status === 304) {
                    // 创建一个 <a> 元素，并使用 window.URL.createObjectURL() 方法创建一个 URL 对象 url。将 url 设置为 <a> 元素的 href 属性，值为二进制数据 blob。
                    const aElement = document.createElement('a');
                    // 而使用 Blob 下载，则可以自定义文件名和文件类型，避免因为 URL 命名不规范或格式错误导致的下载问题。
                    const blob = e.target.response;
                    // 生成的 URL 类似于 "blob:http://example.com/32a6e601-e9ea-4d9c-bf42-6597c21b1eb6"，其中包含了协议、域名和一个 UUID 作为其唯一标识符，用于指向内存中的文件对象。URL用于指向文件数据在内存中的位置。通过这个 URL，我们可以在 Web 应用中访问和处理文件数据
                    const url = window.URL.createObjectURL(blob);
                    aElement.style.display = 'none';
                    aElement.href = url;
                    aElement.download = `${options.fileName}.${fileType}`;
                    document.body.appendChild(aElement);
                    aElement.click(); 
                    // 释放资源，手动销毁已经生成的 URL 对象，不然可能会造成过多的内存开销，从而导致程序的运行速度明显变慢或崩溃
                    if (window.URL) {
                        window.URL.revokeObjectURL(url);
                    } else {
                        window.webkitURL.revokeObjectURL(url);
                    }
                    // 从 HTML 文档中移除该 <a> 元素。
                    document.body.removeChild(aElement);
                    downloading = false;
                    ElMessage.success('文件下载完成');
                }
            };
            xhr.send();
            // createVNode 是 Vue 3 中提供的一个方法，用于创建虚拟节点（VNode）。type 表示节点的类型，可以是一个字符串或组件对象。props 表示节点的属性，是一个对象，用于存储节点的各种属性。children 表示该节点的子节点，可以是一个数组或字符串
            ElMessage({
                message: createVNode('div', {}, [
                    createVNode('div', {}, ['文件下载过程中请勿关闭当前页面']),
                    createVNode('div', { className: 'mt-2' }, [`当前下载进度 ${progress.value}%`]),
                ]),
                type: 'info',
                iconClass: 'el-icon-download',
                duration: 0,
                showClose: true,
            });
        } catch (e) {
            console.error(e);
            downloading = false;
            ElMessage.error('下载发生异常，请重试');
        }
    };
    return {
        downloadFile,
    };
}