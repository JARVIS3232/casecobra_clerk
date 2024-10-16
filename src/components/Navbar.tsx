import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const Navbar = async () => {
  const user = await currentUser();
  const isAdmin =
    user?.emailAddresses[0].emailAddress === process.env.ADMIN_EMAIL;
  return (
    <nav
      className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 
      bg-white/75 backdrop-blur-lg transition-all"
    >
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            case <span className="text-green-600">cobra</span>
          </Link>
          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                {isAdmin ? (
                  <div className="flex items-center justify-center">
                    <Link
                      href="/dashboard"
                      className={buttonVariants({
                        size: "lg",
                        class: "pt-1",
                        variant: "ghost",
                      })}
                    >
                      DashBoard
                    </Link>
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                  </div>
                ) : (
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                )}
                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <SignedOut>
                  <Link
                    href="/sign-in"
                    className={buttonVariants({
                      size: "sm",
                      className: "hidden sm:flex items-center gap-1",
                    })}
                  >
                    Login / Sign Up
                  </Link>
                </SignedOut>

                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
