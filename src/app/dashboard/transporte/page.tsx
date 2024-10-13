import { searchParamsCache } from "@/lib/searchparams";
import { EmployeeListingPage } from "@/pages/employee/views";
import { SearchParams } from "nuqs/parsers";
import React from "react";

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "AGV | Gestão de transporte",
};

export default async function Page({ searchParams }: pageProps) {
  searchParamsCache.parse(searchParams);

  return <EmployeeListingPage />;
}
