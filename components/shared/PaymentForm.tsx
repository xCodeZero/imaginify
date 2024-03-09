"use client";
// import { auth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as randomId } from "uuid";
import { Button } from "@/components/ui/button";
import Image from "next/image";
// import { getUserById } from "@/lib/actions/user.actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomPaymentField } from "./CustomPaymentField";
import { useState } from "react";
import PaymentImageUploader from "./PaymentImageUploader";
import { createPayment } from "@/lib/actions/payments.action";
import { plans } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

export const formSchema = z.object({
  refno: z.string().min(2, {
    message: "Please enter the GCash Reference Number.",
  }),
  paymentId: z.string(),
  plan: z.string().min(2, {
    message: "Please select a Plan",
  }),
  image: z.string().min(2, {
    message: "Please upload proof of payment",
  }),
  amount: z.number(),
  credits: z.number(),
});

function PaymentForm({
  action,
  data = null,
  buyerId,
  type,
  creditBalance,
}: PaymentFormProps) {
  const [image, setImage] = useState(data);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { userId } = auth();

  // if (!userId) redirect("/sign-in");

  // const user = await getUserById(userId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      refno: "",
      paymentId: "",
      plan: "",
      image: "",
      amount: 0,
      credits: 0,
    },
  });

  const { toast } = useToast();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    if (values.plan === "Pro Package") {
      values.amount = 40;
      values.credits = 120;
    } else if (values.plan === "Premium Package") {
      values.amount = 199;
      values.credits = 2000;
    }

    const paymentData = {
      refno: values.refno,
      paymentType: type,
      paymentId: randomId(),
      plan: values.plan,
      image: values.image,
      amount: values.amount,
      credits: values.credits,
      buyerId: buyerId,
      createdAt: new Date(),
    };

    console.log(paymentData);

    if (type === "gcash" || "bank") {
      try {
        const newPayment = await createPayment(paymentData);

        if (newPayment.code === 11000) {
          toast({
            title: "Something went wrong",
            description: "Reference Number already exist.",
            duration: 5000,
            className: "error-toast",
          });
        } else {
          form.reset();
          setImage(data);
          // router.push(`/profile`);
          // typeof window !== "undefined" && router.push("/profile");

          if (!(typeof window === undefined)) {
            window.history.pushState(
              null,
              "/paymentdetails",
              "/paymentdetails"
            );
            window.location.reload();
          }
        }

        // if (newPayment) {
        //   form.reset();
        //   setImage(data);
        //   router.push(`/profile`);
        // }

        setIsSubmitting(false);
      } catch (error) {
        setIsSubmitting(false);
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomPaymentField
          control={form.control}
          name="refno"
          formLabel="Reference Number"
          className="w-full"
          render={({ field }) => <Input {...field} className="input-field" />}
        />

        <CustomPaymentField
          control={form.control}
          name="plan"
          formLabel="Select Plan"
          className="w-full"
          render={({ field }) => (
            <Select
              onValueChange={(plan) => field.onChange(plan)}
              defaultValue={undefined}
            >
              <SelectTrigger className="w-[500px] ">
                <SelectValue placeholder="Select Plan" />
              </SelectTrigger>
              <SelectContent>
                {plans.map((plan) => (
                  <SelectItem
                    key={plan._id}
                    value={plan.name}
                    className="select-item"
                    onChange={(plan) => field.onChange(plan)}
                  >
                    {plan.name} - ${plan.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <div className="align-content: center">
          {image ? (
            <div>
              <Image
                src={image?.secureURL}
                alt="image"
                height={500}
                width={500}
                className="flex size-full flex-col"
              />
            </div>
          ) : (
            <CustomPaymentField
              control={form.control}
              name="image"
              className="flex size-full flex-col"
              render={({ field }) => (
                <PaymentImageUploader
                  onValueChange={field.onChange}
                  setImage={setImage}
                  publicId={field.value}
                  image={"image"}
                  type={type}
                />
              )}
            />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            className="submit-button capitalize"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default PaymentForm;
