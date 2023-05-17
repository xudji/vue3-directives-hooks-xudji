<template>
  <button @click="startDownload">下载文件</button>
</template>

<script setup>
import { ref } from "vue";
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

/* 
https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf
https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4
https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_500_kB.pdf
https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.doc
https://file-examples-com.github.io/uploads/2017/02/file_example_XLSX_1.xlsx
*/
</script>