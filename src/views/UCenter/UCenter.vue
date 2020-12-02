<template>
  <div>
    <p>个人中心</p>
    <el-button @click="dialogPdfVisible = true">查看合同</el-button>
    <el-dialog title="合同" :visible.sync="dialogPdfVisible" width="70%" :before-close="handleClose">
       <el-button @click="$refs.pdf.print()">打印</el-button>
      <div class="pdfcontent">
        <pdf
          ref="pdf"
          :src="src"
          :page="currentPage"
          @progress="getProgress = $event"
          @page-loaded="currentPage = $event"
          @load="loadPdfHandle"
        ></pdf>
         
      </div>
       <el-pagination
                background
                layout="prev, pager, next"
                :page-size="1"
                :total="numPages"
                @current-change="changePage"
            ></el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPdfVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogPdfVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import pdf from "vue-pdf";
var loadingTask = pdf.createLoadingTask("./sxt.pdf");
export default {
  name: "UCenter",

  components: {
    pdf,
  },
  data() {
    return {
      currentPage: 1,
      pageCount: 1,
      src: loadingTask,
      dialogPdfVisible: false,
      numPages:1
    };
  },
  mounted() {
    this.src.promise.then((pdf) => {
      this.numPages = pdf.numPages;
    });
  },
  methods: {
    // 进度
    getProgress(e) {
      console.log("加载进度：", e);
    },
    loadPdfHandle() {
      console.log("PDF加载完成");
    },
    handleClose() {
      this.$confirm("确认关闭？")
                .then((_) => {
                  this.dialogPdfVisible=false
                    done();
                })
                .catch((_) => {});
    },
    changePage(page){
      this.currentPage=page
    }
  },
};
</script>

<style scoped>
.pdfcontent{
  margin-bottom: 40px;
}
</style>