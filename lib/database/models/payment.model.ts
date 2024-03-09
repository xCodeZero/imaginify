import { Document, Schema, model, models } from "mongoose";

export interface IPayment extends Document {
  _id: string;
  refno: string;
  paymentType: string;
  paymentId: string;
  image: string;
  plan: string;
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  amount: number;
  credits: number;
  createdAt: Date;
  status: number;
}

const PaymentSchema = new Schema({
  refno: {
    type: String,
    required: true,
    unique: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  credits: {
    type: Number,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },
});

const Payment = models?.Payment || model("Payment", PaymentSchema);

export default Payment;
