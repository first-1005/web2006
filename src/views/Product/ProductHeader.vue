<template>
  <div>
      <el-form :model="searchForm" ref="searchForm" class="search-box" @submit.native.prevent>
          <el-form-item class="s-inp">
          <el-input type="text" v-model="searchForm.content" @keyup.enter.native='submitSearch' autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="btn1">
               <el-button type="primary" @click="submitSearch">查询</el-button>
          </el-form-item>
          <el-form-item class="btn2">
               <el-button type="primary" @click="submitAdd">添加</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
import api from '../../api/index';
export default {
name:'ProductHeader',
data(){
    return{
        searchForm:{
            content:""
        }
    }
},
methods:{
    submitSearch(){
     api.getSearch({
         search:this.searchForm.content
     })
     .then(res=>{
         console.log(res.data);
         this.$bus.$emit('searchData',res.data)
     })
    },
    submitAdd(){
        this.$bus.$emit('isVisible',true)
    }
}
}
</script>

<style scoped>
.search-box {
    overflow: hidden;
    clear: both;
}
.el-form-item{
    float: left;
}
.s-inp{
    width: 80%;
    margin-right: 10px;
}
.btn1{
    margin-right: 10px;
}

</style>