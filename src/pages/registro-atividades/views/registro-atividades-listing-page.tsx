import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { RegistroAtividades } from "@/constants/data";
import { fakeOperadores } from "@/constants/mock-api";
import { searchParamsCache } from "@/lib/searchparams";
import RegistroAtividadesTable from "../registro-atividades-tables";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Registro de Atividades", link: "/dashboard/registro-atividades" },
];

export default async function EmployeeListingPage() {
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("q");
  const pageLimit = searchParamsCache.get("limit");

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
  };

  const data = await fakeOperadores.getOperadores(filters);
  const totalUsers = data.total_operadores;
  const employee: RegistroAtividades[] = data.operadores;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={"Registro de Atividades"}
            description="Visualizar e gerenciar os registros de atividades dos opradores."
          />
        </div>
        <Separator />
        <RegistroAtividadesTable data={employee} totalData={totalUsers} />
      </div>
    </PageContainer>
  );
}
