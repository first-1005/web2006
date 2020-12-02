const base ={
    baseUrl:'/api',
    login:'/api/login',//登录
    register:'/api/register',//注册
    selectItem:'/api/selectItem',//商品列表展示
    total:'/api/total',//商品总条数
    addCategoryItem:'/api/addCategoryItem',//添加商品
    search:'/api/search',//产品查询（模糊查询）
    categorySelect:'/api/categorySelect',//类目查询
    delItem:"/api/delItem",//删除按钮功能
    uploadItem:"/api/uploadItem",//预更新
    reUploadItem:'/api/reUploadItem',//修改
    paramsData:"/api/paramsData",//规格参数数据
    deleteParams:"/api/deleteParams",//删除参数行
    searchParams:"/api/searchParams",//模糊查询参数
    paramsTotal:'/api/paramsTotal',//参数总条数
    paramsAdd:"/api/paramsAdd",//参数添加
    contentTree:'/api/contentTree',//内容管理tree 数据获取
    contentTreeAdd:'/api/contentTreeAdd',//content增加子导航
    deleteContent:"/api/deleteContent",//删除子导航
    updateContent:'/api/updateContent',//修改子级导航
    contentInfo:'/api/contentInfo',//contentinfo数据查询
    contentInfoAdd:'/api/contentInfoAdd',//contentinfo数据添加
    deleteContentInfo:'/api/deleteContentInfo',//contentinfo数据删除
}
export default base;