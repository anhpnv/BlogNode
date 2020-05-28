const db = require('../db')
module.exports.getProduct = function(req,res){
    var page = parseInt(req.query.page) || 1
    var perPage = 8;
    var end = page * perPage;
    var start = (page-1) * perPage;
    var products = db.get('products').value();
    res.render('product/view',{
        products: products.slice(start, end),
        paginProducts: Array.from(Array(parseInt(products.length/perPage)+2).keys())
    })
}