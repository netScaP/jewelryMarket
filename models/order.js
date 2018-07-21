import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
    user:      {type: Schema.Types.ObjectId, ref: 'User'},
    cart:      {type: Object, required: true},
    address:   {type: String, required: true},
    name:      {type: String, required: true},
    phone:     {type: String, required: true}
});

export default mongoose.model('Order', schema);