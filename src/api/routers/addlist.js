const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();

const ObjectId = require('mongodb').ObjectID;


/**
 * ctx
 */ 
router.post('/',async (ctx,next)=>{




let {_id,goods_name,goods_price,goods_id,user_goods_limit_num,goods_image,goods_edittime,goods_salenum,gc_id_1_name}=ctx.request.body;
// console.log('qqq',_id,title,pricing, sellingPrice,
// repertory,img,uploadtime,salenum,classify)
var date1 = goods_edittime;
date1 = date1.substring(0,19);    
date1 = date1.replace(/-/g,'/'); 
goods_edittime = new Date(date1).getTime()/1000;
let  res=await db.find('goodslist',{"_id":new ObjectId(_id)});
    // console.log(res.length,img);
// 更新
    
    
    if(res.length>0){
        await db.update('goodslist',{"_id":new ObjectId(_id)},{$set:{goods_name,goods_price,goods_id,user_goods_limit_num,goods_image,goods_edittime,goods_salenum,gc_id_1_name}});
        // console.log(888,img);
        ctx.body ={msg:'商品信息更新成功'};
    }
    else if(res.length==0){
         await db.insert('goodslist',{goods_name,goods_price,goods_id,user_goods_limit_num,goods_image,goods_edittime,goods_salenum,gc_id_1_name});
         ctx.body ={msg:'添加商品成功'};

    }
    



    

});



module.exports = router;


