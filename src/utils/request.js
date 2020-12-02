import axios from 'axios';
import qs from 'querystring'

const errorHandle=(status,info)=>{
    switch(status){
        case 400:
            console.log("服务器收到客户端通过PUT或者POST请求提交的表示，表示的格式正确，但服务器不懂它什么意思");
            break;
        case 401:
            console.log("客户端试图对一个受保护的资源进行操作，却又没有提供正确的认证证书");
            break;
        case 403:
            console.log("客户端请求的结构正确，但是服务器不想处理它");
            break;
        case 404:
            console.log("资源被围定义(网络请求地址错误)");
            break;
        case 500:
            console.log("执行请求处理代码时遇到了异常，它们就发送此响应代码");
            break;
        case 503:
            console.log("最可能的原因是资源不足：服务器突然收到太多请求，以至于无法全部处理");
            break;
        default:
            console.log(info);
            break;
    }
}

var instance = axios.create({
    timeout: 5000,
  });

// 处理并发请求方法
instance.all = axios.all;
instance.spread = axios.spread

//  全局的 axios 默认值 
//  axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


  // 添加请求拦截器
axios.interceptors.request.use(
    // 在发送请求之前做些什么
    config=>{
        if(config.method == 'post'){
            config.data = qs.stringify(config.data)
        }
        return config;
    }
 , 
    // 对请求错误做些什么
   error=> Promise.reject(error)
  );

  // 添加响应拦截器
axios.interceptors.response.use(
    // 对响应数据做点什么
    response=>response.status == 200 ? Promise.resolve(response) : Promise.reject(response),
    error=>{
        const {response} = error;
        if(response){
            errorHandle(response.status,response.data);
            // 对响应错误做点什么
            return Promise.reject(error);
        }else{
            console.log('请求中断');
        }
    } 
    
  );
  export default instance;