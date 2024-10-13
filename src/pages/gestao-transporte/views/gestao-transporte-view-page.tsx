import { Breadcrumbs } from "@/components/breadcrumbs";
import { ScrollArea } from "@/components/ui/scroll-area";
import GestaoTransporteForm from "./gestao-transporte-form";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Gestão de Transporte", link: "/dashboard/gestao-transporte" },
  { title: "Novo Transporte", link: "/dashboard/gestao-transporte/novo" },
];

export default function GestaoTransporteViewPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-6">
        <Breadcrumbs items={breadcrumbItems} />
        <GestaoTransporteForm />
      </div>
    </ScrollArea>
  );
}
