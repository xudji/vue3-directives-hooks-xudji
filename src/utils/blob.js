export const download = (res, type, filename) => {
    // 创建blob对象，解析流数据
    const blob = new Blob([res], {
       // 设置返回的文件类型
       // type: 'application/pdf;charset=UTF-8' 表示下载文档为pdf，如果是word则设置为msword，excel为excel
    type: type
     })
    // 这里就是创建一个a标签，等下用来模拟点击事件
    const a = document.createElement('a')
    // 兼容webkix浏览器，处理webkit浏览器中href自动添加blob前缀，默认在浏览器打开而不是下载
    const URL = window.URL || window.webkitURL
    // 根据解析后的blob对象创建URL 对象
    const herf = URL.createObjectURL(blob)
    // 下载链接
    a.href = herf
    // 下载文件名,如果后端没有返回，可以自己写a.download = '文件.pdf'
    a.download = filename
    document.body.appendChild(a)
    // 点击a标签，进行下载 
    a.click()
    // 收尾工作，在内存中移除URL 对象
    document.body.removeChild(a)
    window.URL.revokeObjectURL(herf)
   }
 /* 

 download 函数可以用于下载各种文件类型，具体使用方式如下：
引入 download 函数：

import { download } from '@/utils/download'
调用 download 函数，传入需要下载的文件内容、文件类型（MIME 类型）和文件名：

// 下载 PDF 文件
const res = await axios.get('http://example.com/pdf-file', { responseType: 'arraybuffer' })
download(res.data, 'application/pdf;charset=UTF-8', 'example.pdf')

// 下载 Word 文件
const res = await axios.get('http://example.com/word-file', { responseType: 'arraybuffer' })
download(res.data, 'application/vnd.ms-word;charset=UTF-8', 'example.doc')

// 下载 Excel 文件
const res = await axios.get('http://example.com/excel-file', { responseType: 'arraybuffer' })
download(res.data, 'application/vnd.ms-excel;charset=UTF-8', 'example.xls')
其中，axios.get 方法用于向服务器请求文件内容，返回的 res.data 表示获取到的文件流数据。

download 函数会将文件流数据通过 Blob 对象转换为 URL，然后创建一个 a 标签对象模拟点击下载。最后记得清除掉创建的 a 标签对象以及 URL 对象，释放浏览器内存。

需要注意的是，download 函数是用来下载二进制文件的，如果需要下载其它类型的文件（如文本文件），可以将 responseType 设置为 'text'。此外，在请求文件前，需要根据实际情况对请求头进行设置，以确保服务器可以正确返回文件数据。
 */