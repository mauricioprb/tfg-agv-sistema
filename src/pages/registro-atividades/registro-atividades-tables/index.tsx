"use client";

import { DataTable } from "@/components/ui/table/data-table";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import { DataTableSearch } from "@/components/ui/table/data-table-search";
import { RegistroAtividades } from "@/constants/data";
import { columns } from "./columns";
import { useRegistroAtividadesFilters } from "./use-registro-atividades-filters";

export default function RegistroAtividadesTable({
  data,
  totalData,
}: {
  data: RegistroAtividades[];
  totalData: number;
}) {
  const {
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
  } = useRegistroAtividadesFilters();

  return (
    <div className="space-y-4 ">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="operador"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
