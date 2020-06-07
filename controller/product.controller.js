const Product = require('../models/product.model')
module.exports.getProduct = function(req,res){
    var page = parseInt(req.query.page) || 1
    var perPage = 8;
    var end = page * perPage;
    var start = (page-1) * perPage;

    Product.find().then(function(products){
        res.render('product/view', {
            products:products.slice(start,end),
            paginProducts: Array.from(Array(parseInt(products.length/perPage)+2).keys())
        })
    })
}