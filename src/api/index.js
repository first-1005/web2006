import axios from '../utils/request';
import base from './base';

const api = {
    // 登录
    getLogin(params){
        return axios.post(base.baseUrl + base.login ,params)
    },
    // 注册
    getRegister(params){
        return axios.post(base.baseUrl + base.register,params)
    },
    // 商品查询列表展示
    getSelectItem(params){
        return axios.get(base.baseUrl + base.selectItem,{
            params
        })
    },
    // 商品总条数
    getTotal(){
        return axios.get(base.baseUrl + base.total)
    },
    // 添加商品
    getAddCategoryItem(params){
        return axios.get(base.baseUrl + base.addCategoryItem ,{
            params
        })
    },
    // 商品查询
    getSearch(params){
        return axios.get(base.baseUrl + base.search,{
            params
        })
    },
    // 类目查询
    getCategorySelect(params){
        return axios.get(base.baseUrl + base.categorySelect,{
            params
        })
    },
    // 删除列表
    getDelItem(params){
        return axios.get(base.baseUrl + base.delItem,{
            params
        })
    },
    // 预更新接口
    getUploadItem(params){
        return axios.get(base.baseUrl + base.uploadItem,{
            params
        })
    },
    // 修改商品
    getReUploadItem(params){
        return axios.get(base.baseUrl + base.reUploadItem,{
            params
        })
    },
    // 规格参数数据
    getParamsData(params){
        return axios.get(base.baseUrl + base.paramsData,{
            params
        })
    },
    // 删除参数
    deleteParams(params){
        return axios.get(base.baseUrl + base.deleteParams,{
            params
        })
    },
    // 模糊查询参数
    searchParams(params){
        return axios.get(base.baseUrl + base.searchParams,{
            params
        })
    },
    // 参数总条数
    getParamsTotal(){
        return axios.get(base.baseUrl + base.paramsTotal)
    },
    // 参数添加
    getParamsAdd(params){
        return axios.get(base.baseUrl + base.paramsAdd,{
            params
        })
    },



    // 内容管理tree数据获取
    getContentTree(params){
        return axios.get(base.baseUrl+base.contentTree,{
            params
        })
    },
    // 内容管理子导航增加
    contentTreeAdd(params){
        return axios.get(base.baseUrl + base.contentTreeAdd,{
            params
        })
    },
    // 删除内容管理导航
    deleteContent(params){
        return axios.get(base.baseUrl + base.deleteContent,{
            params
        })
    },
    //修改子级导航
    updateContent(params){
        return axios.get(base.baseUrl + base.updateContent,{
            params
        })
    },
    //contentinfo数据查询
    getContentInfo(params){
        return axios.get(base.baseUrl + base.contentInfo,{
            params
        })
    },
    // contentinfo数据添加
    contentInfoAdd(params){
        return axios.get(base.baseUrl + base.contentInfoAdd,{
            params
        })
    },
    // contentinfo数据删除
    deleteContentInfo(params){
        return axios.get(base.baseUrl+base.deleteContentInfo,{
            params
        })
    }
}
export default api;