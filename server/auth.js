const express = require('express');
const router=express.Router();
const sqlFn = require('./mysqlConfig');
const jwt = require('jsonwebtoken');
const config = require('./config');
const url = require('url');
const fs = require('fs');
const multer = require('multer');



// 登录
router.post('/login',(req,res)=>{
    const {username,password} = req.body;
    const arr =[username,password];
   const sql = 'select * from user where username = ? and password = ?';
   sqlFn(sql,arr,result=>{
       if(result.length>0){
        const token = jwt.sign({
            id:result[0].id,
            username:result[0].username
        },config.jwtSecret)
        res.status(200).json(token)
       }else{
           res.status(401).json({
               errors:'用户名或密码错误'
           })
       }
   })
})

// 注册
router.post('/register',(req,res)=>{
  const {username,password,email} = req.body;
  const sql = "insert into user values(null,?,?,?)";
  const arr = [username,password,email];
  sqlFn(sql,arr,result=>{
      if(result.affectedRows>0){
          res.status(200).json({
              msg:'注册成功'
          })
      }else{
          res.status(400).json({
              msg:'注册失败'
          })
      }
  })
})


// 商品查询
router.get('/selectItem',(req,res)=>{
    const page = url.parse(req.url,true).query.page || 1;
    const sql = "select * from project order by id desc limit 10 offset " + (page - 1) *10;
    const arr = [page];
    sqlFn(sql,arr,result=>{
        if(result.length>0){
            res.status(200).json(result)
        }else{
            res.status(401).json({
                msg:'暂无数据'
            })
        }
    })
})

// 页码总数
router.get('/total',(req,res)=>{
    const sql = "select count(*) from project where id";
    sqlFn(sql,null,result=>{
        if(result.length>0){
            res.status(200).json(result)
        }else{
            res.status(500).json({
                msg:'无更多数据'
            })
        }
    })
})

// 添加接口
router.get('/addCategoryItem',(req,res)=>{
    //获取参数
    const title = url.parse(req.url,true).query.title || '';
    const cid = url.parse(req.url,true).query.cid || '';
    const sellPoint = url.parse(req.url,true).query.sellPoint || '';
    const price = url.parse(req.url,true).query.price || '';
    const num = url.parse(req.url,true).query.num || '';
    const descs = url.parse(req.url,true).query.descs || '';
    const image = url.parse(req.url,true).query.image || '';
    const sql = "insert into project values (null,?,?,?,?,?,?,'',1,'','',?)";
    const arr = [title, image, sellPoint, price, cid, num, descs];
    sqlFn(sql,arr,result=>{
        if(result.affectedRows>0){
            res.status(200).json({
                msg:'添加成功'
            })
        }else{
            res.status(500).json({
                msg:'添加失败'
            })
        }
    })
})

// 模糊查询接口
router.get('/search',(req,res)=>{
    const search = url.parse(req.url,true).query.search;
    const sql =  "select * from project where concat(`title`,`sellPoint`,`descs`) like '%" + search + "%'";
    sqlFn(sql,null,result=>{
      if(result.length>0){
          res.status(200).json(result)
      }else{
          res.status(400).json({
              msg:'暂无数据'
          })
      }
    })
})

// 图片上传
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
}

var uploadFolder = './upload/';
createFolder(uploadFolder);
var upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), function (req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.json({ res_code: '0', name: file.originalname, url: file.path });
});

// 类目选择
router.get('/categorySelect',(req,res)=>{
    const id = url.parse(req.url,true).query.id || 1;
    const sql = 'select * from category where id = ?';
    const arr =[id]
    sqlFn(sql,arr,result=>{
        if(result.length>0){
           res.send({
               status:200,
               result
           })
        }else{
            res.send({
                status:500,
                msg:'暂无数据'
            })
        }
        // if(result.length>0){
        //     res.status(200).json(result)
        // }else{
        //     res.status(500).json({
        //         msg:'暂无数据'
        //     })
        // }
    })

})

// 删除接口
router.get('/delItem',(req,res)=>{
    const id = url.parse(req.url,true).query.id;
    const sql = "delete from project where id=?";
    const arr = [id];
    sqlFn(sql,arr,result=>{
        if(result.affectedRows>0){
            res.status(200).json({
                msg:'删除成功'
            })
        }else{
            res.status(500).json({
                msg:'删除失败'
            })
        }
    })
})

// 预更新接口
router.get('/uploadItem',(req,res)=>{
    const id = url.parse(req.url,true).query.id;
    const sql = "select * from project where id=?";
    const arr =[id];
    sqlFn(sql,arr,result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                msg:'预更新失败'
            })
        }
    })
})

// 修改商品
router.get('/reUploadItem',(req,res)=>{
    const id = url.parse(req.url,true).query.id;
    const title = url.parse(req.url,true).query.title || '';
    const sellPoint = url.parse(req.url,true).query.sellPoint || '';
    const price = url.parse(req.url,true).query.price || '';
    const num = url.parse(req.url,true).query.num || '';
    const descs = url.parse(req.url,true).query.descs || '';
    const image = url.parse(req.url,true).query.image || '';
    const sql = "update project set title=?,sellPoint=?,price=?,num=?,descs=?,image=? where id=?";
    const arr = [title,sellPoint, price,num,descs,image,id];
    sqlFn(sql,arr,result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                msg:'修改失败'
            })
        }
    })

})
// 获取参数数据
router.get('/paramsData',(req,res)=>{
    const page = url.parse(req.url,true).query.page || 1;
    const sql = "select * from params order by id desc limit 10 offset " + (page - 1) *10;
    const arr=[page];
    sqlFn(sql,arr,result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                msg:'暂无数据'
            })
        }
    })
})

// 删除接口
router.get('/deleteParams',(req,res)=>{
    const id = url.parse(req.url,true).query.id;
    const sql = "delete from params where id=?"
    sqlFn(sql,[id],result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:'删除成功'
            })
        }else{
            res.send({
                status:401,
                msg:'删除失败'
            })
        }
    })
})
// 参数查询
router.get('/searchParams',(req,res)=>{
    const search = url.parse(req.url,true).query.search;
    const sql = "select * from params where concat(`paramData`) like '%" + search + "%'";
    sqlFn(sql,[search],result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                msg:'暂无数据'
            })
        }
    })
})
// 获取参数总条数
router.get('/paramsTotal',(req,res)=>{
    const sql = "select count(*) from params where id";
    sqlFn(sql,null,result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                msg:'暂无数据'
            })
        }
    })
})
// 添加参数
router.get('/paramsAdd',(req,res)=>{
    const itemCatId = url.parse(req.url,true).query.itemCatId;
    const paramData = url.parse(req.url,true).query.paramData;
    const sql = "insert into params values (null,?,?)";
    sqlFn(sql,[itemCatId,paramData],result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:'添加成功'
            })
        }else{
            res.send({
                status:401,
                msg:'添加失败'
            })
        }
    })
})
// 获取规格参数添加到产品
// router.get('/productAddParams',(req,res)=>{
//     const cid = url.parse(rew.url,true).query.cid;

// })





// 获取content tree数据
router.get('/contentTree',(req,res)=>{
    const id = url.parse(req.url,true).query.id;
    const sql = "select * from content where id=?";
    sqlFn(sql,[id],result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                msg:'暂无数据'
            })
        }
    })
})

// 增加子导航
router.get('/contentTreeAdd',(req,res)=>{
  const pid = url.parse(req.url,true).query.pid;
  const name = url.parse(req.url,true).query.name;
  const currentId = Math.floor(Math.random() * 10000);
  const sql = "insert into content values (?,?,?)";
  sqlFn(sql,[pid,name,currentId],result=>{
      if(result.affectedRows>0){
          res.send({
              status:200,
              msg:'添加成功'
          })
      }else{
          res.send({
              status:500,
              msg:'添加失败'
          })
      }
  })
})

// 删除子导航
router.get('/deleteContent',(req,res)=>{
    const pid = url.parse(req.url,true).query.pid;
    const sql = "delete from content where pid=?";
    sqlFn(sql,[pid],result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:'删除成功'
            })
        }else{
            res.send({
                status:500,
                msg:'删除失败'
            })
        }
    })
})
// 修改子级导航
router.get('/updateContent',(req,res)=>{
    const pid = url.parse(req.url,true).query.pid;
    const name = url.parse(req.url,true).query.name;
    const sql = "update content set name=? where pid=?";
    sqlFn(sql,[name,pid],result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:'修改成功'
            })
        }else{
            res.send({
                status:500,
                msg:'修改失败'
            })
        }
    })
})
// content右侧内容管理查询
router.get('/contentInfo',(req,res)=>{
    const pid = url.parse(req.url,true).query.pid;
    const sql = "select * from contentinfo where pid=?";
    sqlFn(sql,[pid],result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                msg:'暂无数据'
            })
        }
    })
})
// content右侧内容添加
router.get('/contentInfoAdd',(req,res)=>{
    const pid = url.parse(req.url,true).query.pid;
    const name = url.parse(req.url,true).query.name;
    const contentUrl = url.parse(req.url,true).query.url;
    const image = url.parse(req.url,true).query.image;
    const sql = "insert into contentinfo values(null,?,?,?,?)";
    sqlFn(sql,[pid,name,contentUrl,image],result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:'添加成功'
            })
        }else{
            res.send({
                status:500,
                msg:'添加失败'
            })
        }
    })
})
// 删除contentinfo信息
router.get('/deleteContentInfo',(req,res)=>{
    const id = url.parse(req.url,true).query.id;
    const sql = 'delete from contentinfo where id=?';
    sqlFn(sql,[id],result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:'删除成功'
            })
        }else{
            res.send({
                status:500,
                msg:'删除失败'
            })
        }
    })
})
module.exports = router;