const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    name: { type: String, /*required: true,*/ trim: true },
    cedula: {type: Number, unique: true},
    email: { type: String, required: true, unique: true, trim: true },
    telefono: {type: Number, unique: true},
    direccion: {type: String},
    name_place: {type: String},
    nit: { type: Number, unique: true, trim: true},
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: {type: String},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}; 

 module.exports = mongoose.model("User", UserSchema)

