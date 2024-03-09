"use server";

import { redirect } from "next/navigation";
import { handleError } from "../utils";
import { connectToDatabase } from "../database/mongoose";
import { getUserById, updateCredits } from "./user.actions";
import Payment from "../database/models/payment.model";
import { auth } from "@clerk/nextjs";
import User from "../database/models/user.model";

const { userId } = auth();

const populateUser = (query: any) =>
  query.populate({
    path: "author",
    model: User,
    select: "_id firstName lastName clerkId",
  });

export async function createPayment(payment: CreatePaymentParams) {
  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);

  try {
    await connectToDatabase();

    // Create a new transaction with a buyerId
    const newPayment = await Payment.create({
      ...payment,
      author: user._id,
    });

    // await updateCredits(user._id, payment.credits);

    return JSON.parse(JSON.stringify(newPayment));
  } catch (error) {
    console.log(error);
    return JSON.parse(JSON.stringify(error));
  }
}

// GET PAYMENTS BY USER
export async function getUserPayments({
  limit = 9,
  page = 1,
  userId,
}: {
  limit?: number;
  page: number;
  userId: string;
}) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;

    const payments = await populateUser(Payment.find({ author: userId }))
      .sort({ createdAt: -1 })
      .skip(skipAmount)
      .limit(limit);

    console.log(payments);

    const totalPayments = await Payment.find({
      author: userId,
    }).countDocuments();

    return {
      data: JSON.parse(JSON.stringify(payments)),
      totalPages: Math.ceil(totalPayments / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
