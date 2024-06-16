import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  price: number;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
