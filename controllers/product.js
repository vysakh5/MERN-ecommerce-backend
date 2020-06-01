const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

exports.getProductById = (req, res, next, id) => {
    this.getProductById.findById(id).populate("category").exec((err, product) => {
        if (err) {
            return res.status(400).json({
                error: "product not found in DB"
            });
        }
        req.product = product
        next()
    })
}


exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields) => {
            if (err) {
                return res.status(400).json({
                    error: "problem with image"
                });
            }

            //TODO reatrict on fields
            let product = new Product(fields)


            //hsndle file

            if (File.photo) {
                if (File.photo.size > 30000000) {
                    return res.status(400).json({
                        error: "file size is larger than 3mb"
                    });
                }
                product.photo.data = fs.readFileSync(file.photo.path)
                product.photo.contentType = file.photo.type
            }
        })
        //savve to DB

    product.save((err, product) => {
        if (err) {
            return res.status(400).json({
                error: "saving faild"
            });
        }
        res.json(product)
    })
}