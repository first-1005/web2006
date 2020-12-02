<template>
  <div>
    <elementTable :tableData="tableData" style="width: 100%" >
      <el-table-column prop="id" label="商品ID" width="100"></el-table-column>
      <el-table-column prop="title" show-overflow-tooltip label="商品名称" width="200"></el-table-column>
      <el-table-column prop="image" show-overflow-tooltip label="商品图片" width="200"></el-table-column>
      <el-table-column prop="sellPoint" show-overflow-tooltip label="商品卖点" width="200"></el-table-column>
      <el-table-column prop="price" label="商品价格" width="100"></el-table-column>
      <el-table-column prop="num" label="商品数量" width="100"></el-table-column>
      <el-table-column prop="descs" show-overflow-tooltip label="商品描述" width="300">
         <template  slot-scope="scope">
             <div v-html="scope.row.descs"></div>
         </template>
      </el-table-column>
       <el-table-column label="操作" width="200">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </elementTable>
  </div>
</template>

<script>
import api from '../../api/index';
export default {
  name: "ProductList",
  data() {
    return {
      tableData: [],
    };
  },
  mounted(){
    this.http(1);
    this.$bus.$on('page',key=>{
      // console.log(key);
      this.http(key)
    })
    this.$bus.$on('searchData',data=>{
      this.tableData = data
    })
    this.$bus.$on('onAddItem',data=>{
      this.http(1)
    })
    this.$bus.$on('onUploadItem',data=>{
      this.http(1)
    })
  },
  methods:{
    http(page){
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      api.getSelectItem({
        page
      }).then(res=>{
        // console.log(res.data);
        this.tableData = res.data;
        loading.close();
    })
    },
    // 编辑
    handleEdit(index,row){
      // console.log(row);
        this.$bus.$emit('editorVisible',row)
    },
    // 删除
    handleDelete(index,row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.getDelItem({
        id:row.id
      })
      .then(res=>{
        // console.log(res);
        if(res.status === 200){
          this.$message.success(res.data.msg);
          this.http(1)
        }else{
          this.$message.error('删除失败');
        }
      })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });      
    },
    
  }
};
</script>

<style>
</style>