import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import EmployeeTable from "../employee-tables";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Employee } from "@/constants/data";
import { fakeUsers } from "@/constants/mock-api";
import { searchParamsCache } from "@/lib/searchparams";

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

  // mock api call
  const data = await fakeUsers.getUsers(filters);
  const totalUsers = data.total_users;
  const employee: Employee[] = data.users;

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
        <EmployeeTable data={employee} totalData={totalUsers} />
      </div>
    </PageContainer>
  );
}
