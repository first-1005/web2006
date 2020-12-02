<template>
  <div>
    <SearchHeader @submitParamsAdd="getParamsAdd" />
    <elementTable :tableData="tableData" style="width: 100%">
      <el-table-column prop="id" label="商品ID" width="200"></el-table-column>
      <el-table-column prop="itemCatId" label="规格参数ID" width="300"></el-table-column>
      <el-table-column prop="paramData" show-overflow-tooltip width="600" label="规格参数"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </elementTable>
    <div class="page">
      <Pagination :total="total" @pages="getPages" />
    </div>
    <el-dialog title="添加类目" :visible.sync="dialogParamsVisible" width="80%">
      <ProductTree @treeData='getTreeData'/>
      <el-dialog width="50%" title="添加规格参数" :visible.sync="innerParamsVisible" append-to-body>
        <el-button @click="addDomains">添加分组</el-button>
        <el-form :model="validateForm" status-icon ref="validateForm" label-width="100px">
          <el-form-item v-for="(item,index) in validateForm.domains" :key="index" label='规格参数'>
             <el-input type="text" v-model="item.value" autocomplete="off"></el-input>
             <el-button @click="addParams(index)">添加参数</el-button>
             <el-button @click="deleteDomains(index)">删除分组</el-button>
             <div v-for="(innerItem,innerIndex) in item.children" :key="innerIndex">
               <el-input type="text" v-model="innerItem.childValue"  autocomplete="off" style='width:80%'></el-input>
               <el-button @click="deleteChild(index,innerIndex)">删除参数</el-button> 
             </div>       
          </el-form-item>
        </el-form> 
        <div slot="footer" class="dialog-footer">
               <el-button type="primary" @click="paramsSubmit">确定</el-button>
              </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogParamsVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerParamsVisible = true">确定并添加分组内容</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SearchHeader from "../../components/SearchHeader";
import api from "../../api/index";
import Pagination from "../../components/Pagination";
import ProductTree from "../Product/ProductTree";
export default {
  name: "Params",
  components: {
    SearchHeader,
    Pagination,
    ProductTree,
  },
  data() {
    return {
      tableData: [],
      total: 1,
      dialogParamsVisible: false,
      innerParamsVisible: false,
      validateForm: {
        domains: [
          {
            value: "",
            children: [
              {
                childValue: "",
                value: "",
              },
              {
                childValue: "",
                value: "",
              },
            ],
          },
        ],
      },
      treeData:''
    };
  },
  mounted() {
    this.http();
    api.getParamsTotal().then((res) => {
      // console.log(res.data);
      if (res.data.status === 200) {
        this.total = res.data.result[0]["count(*)"];
      }
    });
    // this.$bus.$on('paramsPage',key=>{
    //   // console.log(key);
    //   this.http(key)
    // })
  },
  methods: {
    http(page) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      api
        .getParamsData({
          page,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data.status === 200) {
            this.tableData = res.data.result;
            loading.close();
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api
            .deleteParams({
              id: row.id,
            })
            .then((res) => {
              // console.log(res);
              if (res.status === 200) {
                this.$message.success(res.data.msg);
                this.http(1);
              } else {
                this.$message.error("删除失败");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 模糊查询规格参数
    searchParamsData(content) {
      // console.log(content);
      api
        .searchParams({
          search: content,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data.status === 200) {
            this.tableData = res.data.result;
            this.total = res.data.result.lenght;
          } else {
            this.tableData = [];
            this.$message.error(res.data.msg);
          }
        });
    },
    // 获取分页点击的页码
    getPages(page) {
      this.http(page);
    },
    // 添加页面显示
    getParamsAdd(flag) {
      this.dialogParamsVisible = flag;
    },
    // 添加分组
    addDomains() {
      this.validateForm.domains.push({
        value: "",
        children: [
          {
            childValue: "",
            value: "",
          },
        ],
      });
    },
    // 添加分组
    addParams(index){
      this.validateForm.domains[index].children.push({
                childValue: "",
                value: "",
      })
    },
    // 删除分组
    deleteDomains(index){
      this.validateForm.domains.splice(index,1)
    },
    // 删除内层参数
    deleteChild(index,innerIndex){
      this.validateForm.domains[index].children.splice(innerIndex,1)
    },
    // 提交数据
    paramsSubmit(){
        //  console.log(this.validateForm);
        // console.log(this.treeData);
         api.getParamsAdd({
           itemCatId:this.treeData.cid,
           paramData:JSON.stringify(this.validateForm.domains)
         })
         .then(res=>{
          //  console.log(res.data);
           if(res.data.status === 200){
             this.$message.success(res.data.msg);
             this.dialogParamsVisible = false;
             this.innerParamsVisible = false;
             this.http(1)
           }else{
             this.$message.error(res.data.msg);
           }
         })
        
    },
    // 获取tree数据
    getTreeData(data){
      // console.log(data);
      this.treeData = data
    }
  },
};
</script>

<style scoped>
.page {
  margin-top: 40px;
}
.innerItem{
 float: left;
}
</style>