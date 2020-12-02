<template>
  <div>
     <el-menu 
     :default-active="activeIndex"  
     mode="horizontal" 
     @select="handleSelect"
     background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b"
  router
     >
      <el-menu-item index="/"><i class="el-icon-menu"></i>商品管理</el-menu-item>
      <el-menu-item index="/params" > <i class="el-icon-s-comment"></i>规格参数</el-menu-item>
      <el-menu-item index="/content"><i class="el-icon-help"></i>内容分类管理</el-menu-item>
      <el-menu-item index="/login" class="login" v-if="!username">登录</el-menu-item>
      <template v-else>
        <el-menu-item index="/login" class="login" @click="layout">退出登录</el-menu-item>
        <el-menu-item index="/UCenter" class="login">{{username}}</el-menu-item>
      </template>
    </el-menu> 
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name: "NavHeader",
  data(){
      return{
          activeIndex:'/'
      }
  },
  computed:{
     ...mapState('loginModule',{
       username:state=>state.userInfo.username
     })
  },
  methods:{
    ...mapMutations('loginModule',['setLogout']),
      handleSelect(key,keyPath){
        // console.log(key);
        // console.log(keyPath);
        localStorage.setItem('ego-path',keyPath)
      },
      layout(){
         this.setLogout();
         this.$router.push('/login')
         localStorage.removeItem('ego');
      }
  }
};
</script>

<style scoped>
.login{
  float: right !important;

}

</style>