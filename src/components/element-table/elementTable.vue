<template>
  <div>
      <el-table 
      :data="tableData" 
      style="width: 100%" 
      :header-cell-style="{background:'#eee',color:'#666'}"
      >
      <slot></slot>
      </el-table>
  </div>
</template>

<script>
export default {
name:'elementTable',
props:{
    tableData:{
        type:Array,
        default:function(){
            return []
        }
    }
}
}
</script>

<style>

</style>