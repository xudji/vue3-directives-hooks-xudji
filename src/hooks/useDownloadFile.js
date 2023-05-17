import { createVNode, ref, onBeforeUnmount } from 'vue';
import { ElMessage } from 'element-plus';

export default function useDownloadFile() {
    let xhr = null;
    let downloading = false; // 限制同一文件同时触发多次下载

    onBeforeUnmount(() => {
        xhr && xhr.abort();
    });

    const downloadFile = options => {
        try {
            if (downloading || !options.url || !options.fileName) return;
            downloading = true;
            options.url = options.url.replace('http://', 'https://');
            const progress = ref(0);
            const fileType = options.url.split('.').pop();
            xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.open('get', options.url, true);
            xhr.onprogress = function (e) {
                progress.value = Math.floor((e.loaded / e.total) * 100);
            };
            xhr.onloadend = function (e) {
                if (e.target.status === 200 || e.target.status === 304) {
                    const aElement = document.createElement('a');
                    const blob = e.target.response;
                    const url = window.URL.createObjectURL(blob);
                    aElement.style.display = 'none';
                    aElement.href = url;
                    aElement.download = `${options.fileName}.${fileType}`;
                    document.body.appendChild(aElement);
                    aElement.click();
                    if (window.URL) {
                        window.URL.revokeObjectURL(url);
                    } else {
                        window.webkitURL.revokeObjectURL(url);
                    }
                    document.body.removeChild(aElement);
                    downloading = false;
                    ElMessage.success('文件下载完成');
                }
            };
            xhr.send();
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