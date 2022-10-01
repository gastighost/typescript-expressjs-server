import { Schema, model, Types } from "mongoose";

export interface IProduct {
  name: string;
  price: number;
  quantity: number;
  userId: Types.ObjectId | string;
  available: boolean;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

export default model<IProduct>("Product", productSchema);
