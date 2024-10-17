"use client";

import { GestaoTransporte } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<GestaoTransporte>[] = [
  {
    accessorKey: "data",
    header: "Data",
  },
  {
    accessorKey: "operador",
    header: "Operador",
  },
  {
    accessorKey: "carga",
    header: "Carga",
  },
  {
    accessorKey: "destino",
    header: "Destino",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
