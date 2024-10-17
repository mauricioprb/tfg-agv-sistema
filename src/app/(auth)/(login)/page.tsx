import { LoginPage } from "@/sections/auth/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGV | Login",
  description: "Login.",
};

export default function Page() {
  return <LoginPage />;
}
