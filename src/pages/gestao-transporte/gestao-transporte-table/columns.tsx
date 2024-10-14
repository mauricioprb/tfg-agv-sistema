"use client";

import { RegistroAtividades } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<RegistroAtividades>[] = [
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
