import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
    user:      { type: Schema.Types.ObjectId, ref: 'User' },
    cart:      [{
    	customer: { type: Schema.Types.ObjectId, ref: 'User' },
    	price:  { type: Number, required: true },
    	size:   { type: Number, required: true },
    	qty:    { type: Number, required: true },
    	image:  { type: String, required: true },
    	unique: { type: Number, requred: true },
	    time:   { type: Date, default: Date.now }
    }]
});

export default mongoose.model('Selling', schema);