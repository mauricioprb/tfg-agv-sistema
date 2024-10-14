"use client";

import { DataTable } from "@/components/ui/table/data-table";
import { RegistroAtividades } from "@/constants/data";
import { columns } from "./columns";

export default function RegistroAtividadesTable({
  data,
  totalData,
}: {
  data: RegistroAtividades[];
  totalData: number;
}) {
  return (
    <div className="space-y-4 ">
      <div className="flex flex-wrap items-center gap-4"></div>
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
