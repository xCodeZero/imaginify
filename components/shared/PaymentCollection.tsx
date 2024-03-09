"use client";

import Image from "next/image";
import Link from "next/link";

import { useSearchParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { paymentTypes, transformationTypes } from "@/constants";
import { IImage } from "@/lib/database/models/image.model";
import { formUrlQuery, getTimestamp, truncate } from "@/lib/utils";

import { Button } from "../ui/button";

import { Search } from "./Search";
import { IPayment } from "@/lib/database/models/payment.model";

export const PaymentCollection = ({
  hasSearch = false,
  payments,
  totalPages = 1,
  page,
}: {
  payments: IPayment[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // PAGINATION HANDLER
  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <div className="collection-heading">{hasSearch && <Search />}</div>

      {payments.length > 0 ? (
        <Table className="mt-10">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Reference Number</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Document</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <>
                <TableRow key={payment._id}>
                  <TableCell>{truncate(payment.refno)}</TableCell>
                  <TableCell>{payment.plan}</TableCell>
                  <TableCell>{payment.credits}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>
                    <Image
                      src={payment.image}
                      alt="image"
                      width={32}
                      height={32}
                    />
                  </TableCell>
                  <TableCell>
                    {payment.paymentType === "gcash"
                      ? "GCash"
                      : payment.paymentType === "bank"
                      ? "Bank Transfer"
                      : "Card"}
                  </TableCell>
                  <TableCell>
                    {payment.status === 0 ? "Pending" : "Completed"}
                  </TableCell>
                  <TableCell>{getTimestamp(payment.createdAt)}</TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="collection-empty">
          <p className="p-20-semibold">Empty List</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="flex w-full">
            <Button
              disabled={Number(page) <= 1}
              className="collection-btn"
              onClick={() => onPageChange("prev")}
            >
              <PaginationPrevious className="hover:bg-transparent hover:text-white" />
            </Button>

            <p className="flex-center p-16-medium w-fit flex-1">
              {page} / {totalPages}
            </p>

            <Button
              className="button w-32 bg-purple-gradient bg-cover text-white"
              onClick={() => onPageChange("next")}
              disabled={Number(page) >= totalPages}
            >
              <PaginationNext className="hover:bg-transparent hover:text-white" />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

const Card = ({ image }: { image: IImage }) => {
  return (
    <li>
      <Link href={`/transformations/${image._id}`} className="collection-card">
        <CldImage
          src={image.publicId}
          alt={image.title}
          width={image.width}
          height={image.height}
          {...image.config}
          loading="lazy"
          className="h-52 w-full rounded-[10px] object-cover"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />
        <div className="flex-between">
          <p className="p-20-semibold mr-3 line-clamp-1 text-dark-600">
            {image.title}
          </p>
          <Image
            src={`/assets/icons/${
              transformationTypes[
                image.transformationType as TransformationTypeKey
              ].icon
            }`}
            alt={image.title}
            width={24}
            height={24}
          />
        </div>
      </Link>
    </li>
  );
};
