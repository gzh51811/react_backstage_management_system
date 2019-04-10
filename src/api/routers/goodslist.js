const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();


/**
 * ctx
 */
router.get('/',async (ctx,next)=>{
    // 解构
    
    let {page,limit} = ctx.request.query;
    // console.log(page,limit);
    let allcountlength=await db.find('goodslist',{});
    let res = await db.slices('goodslist',(page-1)*limit,limit*1,{});
    let sortarr=await db.sortfind('goodslist',{'salenum':-1},{});
    console.log(sortarr);
    sortarr.map((item)=>{
      var a=new Date(item.goods_edittime*1000);
      item.goods_edittime=a.toLocaleDateString().replace(/\//g, "-") + " " + a.toTimeString().substr(0, 8)
      if(item.goods_edittime==='Invalid Date Invalid '){
        item.goods_edittime='2019-3-23 18:33:30'
      }
    })
    let slicearr=sortarr.slice((page-1)*limit,(page-1)*limit+10);
    // console.log(sliceobj)
    ctx.body ={
                  "code": 0
                  ,"msg": ""
                  ,"count": allcountlength.length
                  ,"data":slicearr
                } ;

});



module.exports = router;


