import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:     { type: String, required: true, unique: true },
    password:  { type: String, required: true },
    confirmed: { type: Boolean, required: true, default: false },
    usertype:  { type: String, required: true, enum: ['user', 'seller', 'admin'] },
    phone:     { type: Number, required: false },
    name:      { type: String, required: false },
    city:      { type: String, required: false }
});

userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);  
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);  
};

export default mongoose.model('User', userSchema);