const { Schema, model } = require('mongoose');

const productoSchema = new Schema({
    sku: {type: Number},
    nombre_producto: {type: String},
    proveedor: {type: String},
    descripcion: {type: String},
    precio_sku_producto: {type: Number},
    stock: {type: Number},
    filename: {type: String},
    path: {type: String},
    originalname: {type: String},
    mimetype: {type: String},
    size: { type: Number},
    created_at: {type: Date, default: Date.now()},
    user: {type: String}
    
   
});

module.exports = model('Producto', productoSchema);