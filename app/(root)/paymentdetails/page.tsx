import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";
import { getUserPayments } from "@/lib/actions/payments.action";
import { PaymentCollection } from "@/components/shared/PaymentCollection";

const Gcash = async ({ searchParams }: SearchParamProps) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);
  const page = Number(searchParams?.page) || 1;
  const payments = await getUserPayments({ page, userId: user._id });

  return (
    <div>
      <section className="home">
        <h1 className="home-heading">
          Unleash Your Creative Vision with AIditor
        </h1>
      </section>
      <section className="mt-8 md:mt-14">
        <PaymentCollection
          payments={payments?.data}
          totalPages={payments?.totalPages}
          page={page}
        />
      </section>
    </div>
  );
};

export default Gcash;
