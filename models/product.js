import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const schema = new Schema({
	unique:      { type: Number, unique: true },
    owner:       { type: Schema.Types.ObjectId, ref: 'User' },
    imagePath:   { type: [String], required: true },
    title:       { type: String, required: true },
    description: { type: String, required: true },
    partDesc:    { type: Object, required: true },
    price:       { type: Number, required: true },
    sale:        { type: Number, required: true, min: 0, max: 100 },
    type:        { type: String, required: true },
    size:        { type: [Number], required: true },
    quantity:    { type: Number, required: true, default: 0 },
    confirmed:   { type: Boolean, required: true, default: false },
    addInfo:     { type: String, required: false }
});

autoIncrement.initialize(mongoose.connection);
schema.plugin(autoIncrement.plugin, {
	model: 'schema',
	field: 'unique',
	startAt: 1,
	incrementBy: 1
});

export default mongoose.model('Product', schema);