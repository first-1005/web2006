<template>
  <div >
    <ProductHeader/>
    <ProductList/>
    <div class="page">
      <ProductPagination/>
    </div>
    <ProductAdd/>
    <ProductEditor/>
  </div>
</template>

<script>
import ProductList from './ProductList'
import ProductPagination from './ProductPagination'
import ProductHeader from './ProductHeader'
import ProductAdd from './ProductAdd'
import ProductEditor from './ProductEditor'
export default {
name:'product',
components:{
  ProductList,
  ProductPagination,
  ProductHeader,
  ProductAdd,
  ProductEditor
}
}
</script>

<style scoped>
.page{
  margin-top: 40px;
}
</style>