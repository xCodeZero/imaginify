import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { PaymentCollection } from "@/components/shared/PaymentCollection";
import Header from "@/components/shared/Header";
import { getUserById } from "@/lib/actions/user.actions";
import { getUserPayments } from "@/lib/actions/payments.action";

const PaymentDetails = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  const payments = await getUserPayments({ page, userId: user._id });

  return (
    <>
      <Header title="Payment Records" />

      <section className="mt-8 md:mt-14">
        <PaymentCollection
          payments={payments?.data}
          totalPages={payments?.totalPages}
          page={page}
        />
      </section>
    </>
  );
};

export default PaymentDetails;
