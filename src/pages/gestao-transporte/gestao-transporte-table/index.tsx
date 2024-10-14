"use client";

import { DataTable } from "@/components/ui/table/data-table";
import { GestaoTransporte } from "@/constants/data";
import { columns } from "./columns";

export default function GestaoTransporteTable({
  data,
  totalData,
}: {
  data: GestaoTransporte[];
  totalData: number;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-4"></div>
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
