<template>
  <div>
      <el-dialog title="编辑商品" :visible.sync="dialogEditorVisible" width="80%" :before-close="handleClose">
      <el-form label-width="70px" :label-position="labelPosition" :model="addForm" ref="addForm">
        <el-form-item label="类目选择">
          <el-button type="primary" @click="categoryVisible=true" class="categoryBtn">类目选择</el-button>
            <span class="categoryBtn">{{treeData.name}}</span>
          <el-dialog width="50%" title="类目选择" :visible.sync="categoryVisible" append-to-body>       
            <ProductTree @treeData="getTreeDara"/>
            <span>
               <el-button type="primary" @click="getTreeDataHandle">确定</el-button>
            </span>
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input type="text" v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input type="text" v-model="addForm.sellPoint" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input type="text" v-model="addForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input type="text" v-model="addForm.num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-button type="primary" class="categoryBtn" @click="dislogUploadVisible=true">选择图片</el-button>
          <span class="categoryBtn" >{{this.upload.url}}</span>
          <el-dialog width="50%" title="上传图片" :visible.sync="dislogUploadVisible" append-to-body>
            <ProductUpload @upload="getUpload" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品">
          <ProductWangEditor @oneditor='getEditorData' :editorAddData='descText'/>
        </el-form-item>
      </el-form>
      <span>
        <el-button @click="dialogEditorVisible = false">取消</el-button>
        <el-button type="primary" @click="sureSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ProductWangEditor from "./ProductWangEditor";
import ProductUpload from "./ProductUpload";
import ProductTree from './ProductTree';
import api from '../../api/index';
import {mapMutations,mapState} from 'vuex'
export default {
name:'ProductEditor',
 components: {
    ProductWangEditor,
    ProductUpload,
    ProductTree
  },
   data() {
    return {
      dialogEditorVisible: false,
      dislogUploadVisible: false,
      categoryVisible:false,
      labelPosition: "left",
      addForm: {
        name: "",
        sellPoint:'',
        price:'',
        num:''
      },
      treeData:{},
      upload:{},
      editorData:'',
      currentId:''
    };
  },
  computed:{
   ...mapState('editorLoad',{
       descText:state=>state.descText
   })
  },
  mounted() {
    //编辑显示
    this.$bus.$on("editorVisible", (row) => {
      this.dialogEditorVisible = true;
      this.currentId = row.id
       api.getUploadItem({
        id:row.id
      }).then(res=>{
        console.log(res.data);
        if(res.data.status === 200){
            this.addForm={
                name:res.data.result[0].title,
                sellPoint:res.data.result[0].sellPoint,
                price:res.data.result[0].price,
                num:res.data.result[0].num
            },
            this.treeData.name=res.data.result[0].cid,
            this.editorData = res.data.result[0].descs,
            this.setDescText(this.editorData),
            this.upload.url = res.data.result[0].image
        }
      })
    });
  },
  methods: {
      ...mapMutations('editorLoad',['setDescText']),
    handleClose(done) {
      this.dialogEditorVisible = false;
    },
    // 添加数据
    sureSubmit() {
     api.getReUploadItem({
       title:this.addForm.name,
       id:this.currentId,
       sellPoint:this.addForm.sellPoint,
       price:this.addForm.price,
       num:this.addForm.num,
       descs:this.editorData,
       image:this.upload.url 
     })
     .then(res=>{
      //  console.log(res);
       if(res.status === 200){
         this.dialogEditorVisible = false;
        // console.log(res.data);
        //  this.initForm();
         this.$bus.$emit('onUploadItem',true)
       }else{
         this.$message.error(res.msg)
       }
     })
    },
    // 将添加框里的内容置空
    initForm(){
       this.addForm.name="";
       this.addForm.sellPoint="";
       this.addForm.num = '';
       this.addForm.price = '';
       this.treeData={};
       this.upload={};
       this.editorData='';
    },   
    // 上传图片
    getUpload(data) {
      // console.log(data);
      this.dislogUploadVisible = false;
      this.upload = data;
    },
    getTreeDataHandle(data){
        // this.$on('treeData',data);
        this.categoryVisible = false
    },
    // 获取tree数据
    getTreeDara(data){
      // console.log(data);
      this.treeData = data;
    },
    // 获取editor数据
    getEditorData(data){
      // console.log(data);
      this.editorData = data;
    }
  },
}
</script>

<style scoped>
.categoryBtn {
  float: left;
  margin-right: 10px;
}
</style>