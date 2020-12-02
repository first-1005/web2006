<template>
  <div>
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import api from '../../api/index';
export default {
name:'ProductPagination',
data(){
    return{
        currentPage:1,
        total:0
    }
},
methods:{
    handleSizeChange(key){
        // console.log(key);
    },
    handleCurrentChange(key){
        // console.log(key);
        this.$bus.$emit('page',key)
    }
},
mounted(){
  api.getTotal().then(res=>{
    //   console.log(res.data);
      this.total = res.data[0]['count(*)']
  })
}
}
</script>

<style>

</style>