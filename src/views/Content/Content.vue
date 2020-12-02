<template>
  <div>
     <div class="content-left">
       <ContentTree/>
     </div>
     <div class="content-right">
       <ContentInfo/>
     </div>
  </div>
</template>

<script>
import ContentTree from './ContentTree';
import ContentInfo from './ContentInfo';
export default {
name:'Content',
components:{
  ContentTree,
  ContentInfo
}
}
</script>

<style scoped>
.content-left{
  width: 30%;
  float: left;
  text-align: center;
}
.content-right{
  width: 70%;
  float: left;
  text-align: center;
}
</style>