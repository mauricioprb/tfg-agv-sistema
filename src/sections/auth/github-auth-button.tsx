"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default function GithubSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams ? searchParams.get("callbackUrl") : null;

  return (
    <Button
      className="w-full"
      variant="secondary"
      type="button"
      onClick={() =>
        signIn("github", { callbackUrl: callbackUrl ?? "/dashboard" })
      }
    >
      <Icons.gitHub className="mr-2 h-4 w-4" />
      Fazer login com o GitHub
    </Button>
  );
}
