import mongoose, { Document, Schema } from "mongoose"

export interface IProduct  extends Document {
    name: string;
    description: string;
    price: number;
   
}
const ProductSchema:Schema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
export default Product;