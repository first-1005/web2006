module.exports={
    devServer:{
        proxy:{
            '/api':{
                target:'http://localhost:3005',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            },

        }
    }
}