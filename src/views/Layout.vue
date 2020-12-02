<template>
  <div>
     <NavHeader/>
      <div  class="container">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
export default {
name:'Layout',
components:{
    NavHeader
}
}
</script>

<style scoped>
.container{
  width: 1400px;
  margin: 0 auto;
  margin-top: 10px;
}

</style>