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
    accessorKey: "evento",
    header: "Evento",
  },
];
