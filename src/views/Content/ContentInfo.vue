<template>
  <div>
    <el-button
      type="primary"
      @click="dialogContentInfoAddVisible = true"
      v-if="contentData.name"
    >添加 {{contentData.name}} 信息</el-button>
    <elementTable :tableData="tableData" style="width: 100%">
      <el-table-column prop="id" label="商品ID" width="100"></el-table-column>
      <el-table-column prop="name" show-overflow-tooltip label="商品名称" width="200"></el-table-column>
      <el-table-column prop="url" show-overflow-tooltip label="商品地址"></el-table-column>
      <el-table-column prop="image" show-overflow-tooltip label="商品图片"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </elementTable>
    <el-dialog
      title="添加内容信息"
      :visible.sync="dialogContentInfoAddVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="contentAddInfoForm" status-icon ref="contentAddInfoForm" label-width="100px">
        <el-form-item label="名称">
          <el-input type="text" v-model="contentAddInfoForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="text" v-model="contentAddInfoForm.url"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-input type="text" v-model="contentAddInfoForm.image"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogContentInfoAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitContentInfoAdd">添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "../../api/index";
export default {
  name: "ContentInfo",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      dialogContentInfoAddVisible: false,
      contentAddInfoForm: {
        name: "",
        url: "",
        image: "",
      },
      contentData: {},
    };
  },
  mounted() {
    this.$bus.$on("contentTreePid", (key) => {
      this.contentData = key;
      // console.log(this.infoPid);
      //         api.getContentInfo({
      //       pid:this.contentData.pid
      //   })
      //   .then(res=>{
      //     //   console.log(res.data);
      //       if(res.data.status === 200){
      //           this.tableData=res.data.result
      //       }else{
      //          this.tableData=[]
      //       }
      //   })
      this.http();
    });
  },
  methods: {
    handleClose() {},
    http() {
      api
        .getContentInfo({
          pid: this.contentData.pid,
        })
        .then((res) => {
          //   console.log(res.data);
          if (res.data.status === 200) {
            this.tableData = res.data.result;
          } else {
            this.tableData = [];
          }
        });
    },
    // 添加contentinfo信息
    submitContentInfoAdd() {
      api
        .contentInfoAdd({
          pid: this.contentData.pid,
          name: this.contentAddInfoForm.name,
          url: this.contentAddInfoForm.url,
          image: this.contentAddInfoForm.image,
        })
        .then((res) => {
          //   console.log(res.data);
          if (res.data.status === 200) {
            this.dialogContentInfoAddVisible = false;
            this.http();
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    // 删除contentinfo信息
    handleDelete(index,row){
        // console.log(row);
        api.deleteContentInfo({
            id:row.id
        })
        .then(res=>{
            // console.log(res.data);
            if(res.data.status === 200){
                this.http()
            }else{
                this.$message.error(res.data.msg)
            }
        })
    }
  },
};
</script>

<style>
</style>