import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { RegistroAtividades } from "@/constants/data";
import { fakeOperadores } from "@/constants/mock-api";
import RegistroAtividadesTable from "../registro-atividades-tables";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Registro de Atividades", link: "/dashboard/registro-atividades" },
];

export default async function RegistroAtividadesListingPage() {
  const data = await fakeOperadores.getOperadores({ page: 1, limit: 10 });
  const total = data.total_operadores;
  const registros: RegistroAtividades[] = data.operadores;

  return (
    <PageContainer scrollable>
      <div className="space-y-6">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={"Registro de Atividades"}
            description="Visualizar e gerenciar os registros de atividades dos opradores."
          />
        </div>
        <Separator />
        <RegistroAtividadesTable data={registros} totalData={total} />
      </div>
    </PageContainer>
  );
}
