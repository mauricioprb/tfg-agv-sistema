import { Breadcrumbs } from "@/components/breadcrumbs";
import GestaoTransporteForm from "../gestao-transporte-form";
import PageContainer from "@/components/layout/page-container";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Gestão de Transporte", link: "/dashboard/gestao-transporte" },
  { title: "Novo Transporte", link: "/dashboard/gestao-transporte/novo" },
];

export default function GestaoTransporteViewPage() {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <GestaoTransporteForm />
      </div>
    </PageContainer>
  );
}
