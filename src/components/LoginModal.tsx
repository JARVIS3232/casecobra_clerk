import type { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import Image from "next/image";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const LoginModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const redirectUrl = process.env.NEXT_PUBLIC_SERVER_URL + "/auth-callback";
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="absolute z-[999999]">
        <DialogHeader>
          <div className="relative mx-auto w-24 h-24 mb-2">
            <Image
              src="/snake-1.png"
              alt="snake image"
              className="object-contain"
              fill
            />
          </div>
          <DialogTitle className="text-3xl text-center font-bold  tracking-tight text-gray-900">
            Login to continue
          </DialogTitle>
          <DialogDescription className="text-base text-center py-2">
            <span className="font-medium text-zinc-900">
              Your configuration was saved!
            </span>{" "}
            Please Login or Create an account to complete your purchase.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center divide-x divide-gray-200">
          <SignedOut>
            <Link
              href={`/sign-in?redirectUrl=${redirectUrl}`}
              className={buttonVariants({ variant: "outline" })}
            >
              Login/Sign Up
            </Link>
          </SignedOut>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
