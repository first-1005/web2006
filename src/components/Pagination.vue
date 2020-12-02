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
export default {
name:'Pagination',
data(){
    return{
        currentPage:1,
    }
},
props:{
   total:{
       type:Number,
       default:0
   }
},
methods:{
    handleSizeChange(){},
    handleCurrentChange(key){
        this.$emit('pages',key)
        // this.$emit(get)
    }
}
}
</script>

<style>

</style>