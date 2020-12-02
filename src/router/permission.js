import router from './index';
import store from '../store/index';

router.beforeEach((to,from,next)=>{

    if(to.meta.isLogin){
      var token = store.state.loginModule.userInfo.token;
      if(token){
          next()
      }else{
          next('/login')
      }
    }else{
        next()
    }
})