import { SignedIn, auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { paymentLinks } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import Checkout from "@/components/shared/Checkout";
import Link from "next/link";

const Payments = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <>
      <Header title="Buy Credits" subtitle="Choose a payment method!" />

      <section>
        <ul className="credits-list">
          {paymentLinks.map((payment) => (
            <Link
              key={payment.route}
              href={payment.route}
              className="flex-center flex-col gap-2"
            >
              <li key={payment.label} className="credits-item">
                <div className="flex-center flex-col gap-3">
                  <p className="p-20-semibold mt-2 text-purple-500">
                    {payment.label}
                  </p>
                  <Image
                    src={payment.icon}
                    alt="check"
                    width={100}
                    height={100}
                  />
                </div>

                {/* Inclusions */}
              </li>
            </Link>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Payments;
