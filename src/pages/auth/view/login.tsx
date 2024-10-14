"use client";

import { Metadata } from "next";
import UserAuthForm from "../user-auth-form";
import { Logo } from "@/components/layout/logo";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { handleAuthError } from "@/auth/errorHandler";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams ? searchParams.get("error") : null;

  useEffect(() => {
    if (error) {
      const toastData = handleAuthError(error);
      toast({
        title: toastData.title,
        description: toastData.description,
        variant: toastData.variant,
      });
    }
  }, [error]);

  return (
    <div className="relative h-screen flex-col items-center px-4 justify-center grid lg:max-w-none lg:px-0">
      <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[380px] border bg-card p-8 rounded-xl">
        <Logo />
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Faça login</h1>
          <p className="text-sm text-muted-foreground">
            Faça login pelo GitHub ou pela conta do Google
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Este é um projeto de Trabalho de Final de Graduação.
        </p>
      </div>
    </div>
  );
}
