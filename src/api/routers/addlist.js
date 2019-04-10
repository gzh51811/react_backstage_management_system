const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();

const ObjectId = require('mongodb').ObjectID;


/**
 * ctx
 */ 
router.post('/',async (ctx,next)=>{




let {_id,title,pricing,sellingPrice,gid,repertory,img,uploadtime,salenum,classify}=ctx.request.body;
// console.log('qqq',_id,title,pricing, sellingPrice,
// repertory,img,uploadtime,salenum,classify)

let  res=await db.find('goodslist',{"_id":new ObjectId(_id)});
    // console.log(res.length,img);
// 更新
    
    
    if(res.length>0){
        await db.update('goodslist',{"_id":new ObjectId(_id)},{$set:{'goods_name':title,'gid':gid,'goods_price':pricing,'market_price':sellingPrice,
         'replys':repertory,'photo':img,'uploadtime':uploadtime,'sold':salenum,'classify':classify}});
        // console.log(888,img);
        ctx.body ={msg:'更新成功'};
    }
    else if(res.length==0){
         await db.insert('goodslist',{'subject':title,'gid':gid,'sale_price':pricing, 'market_price':sellingPrice,
         'replys':repertory,'photo':img,'uploadtime':uploadtime,'sold':salenum,'classify':classify});
         ctx.body ={msg:'插入成功'};

    }
    



    

});



module.exports = router;


