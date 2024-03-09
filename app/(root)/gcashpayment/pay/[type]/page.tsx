import Header from "@/components/shared/Header";
import PaymentForm from "@/components/shared/PaymentForm";
import { paymentTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const GcashPayment = async ({ params: { type } }: SearchPaymentParamProps) => {
  const { userId } = auth();
  const payment = paymentTypes[type];

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <>
      <Header title={payment.title} subtitle={payment.subTitle} />

      <section className="mt-10">
        <PaymentForm
          action="gcash"
          buyerId={user._id}
          type={payment.type as PaymentTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default GcashPayment;
