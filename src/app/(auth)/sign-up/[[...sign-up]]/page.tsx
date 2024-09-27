import { SignUp } from "@clerk/nextjs";

export default function Page() {
  let configId;
  if (typeof window === "undefined") {
    configId = null;
  } else {
    configId = localStorage.getItem("configurationId");
  }
  return <SignUp fallbackRedirectUrl={configId ? "../auth-callback" : "/"} />;
}
