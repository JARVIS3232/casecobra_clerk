"use client";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  let configId;
  if (typeof window === "undefined") {
    configId = null;
  } else {
    configId = localStorage.getItem("configurationId");
  }
  return <SignIn fallbackRedirectUrl={configId ? "../auth-callback" : "/"} />;
}
