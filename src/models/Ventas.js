const { Schema, model } = require('mongoose');

const ventasSchema = new Schema({
    name_cli: {type: String},
    cedula_cli: {type: Number},
    email_cli: {type: String},
    cel_cli: {type: Number},
    direccion_cli: {type: String},
    created_at: {type: Date, default: Date.now()},
    user: {type: String},
    producto: { type: Schema.Types.ObjectId, ref: "Producto"},
    producto_precio: {type: Number},
    valor_total: { type: Number},
});
module.exports = model('Ventas', ventasSchema);