import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icons } from "@/components/icons";
import PageContainer from "@/components/layout/page-container";
import { MonitorTrack } from "@/components/monitor-track";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/dist/client/link";
import GestaoTransporteTable from "../gestao-transporte-table";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Gestão Transporte", link: "/dashboard/gestao-transporte" },
];

export default async function RegistroAtividadesListingPage() {
  return (
    <PageContainer scrollable>
      <div className="space-y-6">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={"Gestão de Transporte"}
            description="Acompanhe e gerencie as atividades de transporte."
          />
        </div>
        <Separator />
        <div className="grid lg:grid-cols-2 gap-5 grid-cols-1 mt-4">
          <div className="flex flex-col gap-5">
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Status do AGV
                </CardTitle>
                <Icons.operacao className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  Em operação
                </div>
              </CardContent>
            </Card>

            <Card className="w-full h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex mb-4">
                  <Icons.monitor className="mr-2 h-5 w-5 text-muted-foreground" />
                  Monitoramento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-12">
                  <div className="md:scale-75 3xl:scale-100 2xl:scale-75 sm:scale-50 scale-50 flex justify-center">
                    <MonitorTrack />
                  </div>
                </div>
                <div className="flex gap-6 flex-wrap justify-center">
                  <p className="text-muted-foreground text-sm flex items-center">
                    <Icons.agv_logo className="w-6 h-6 mr-2" />
                    AGV
                  </p>
                  <p className="text-muted-foreground text-sm flex items-center">
                    <Icons.carga className="w-6 h-6 mr-2" />
                    Carga
                  </p>
                  <p className="text-muted-foreground text-sm flex items-center">
                    <Icons.descarga className="w-6 h-6 mr-2" />
                    Descarga
                  </p>
                  <p className="text-muted-foreground text-sm flex items-center">
                    <Icons.manutencao className="w-6 h-6 mr-2" />
                    Manutenção
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-4 md:flex-nowrap flex-wrap">
              <Button variant="secondary" className="w-full">
                <Icons.chave className="w-4 h-4 mr-2" />
                Manutenção
              </Button>
              <Link
                href={"/dashboard/gestao-transporte/novo"}
                className={
                  cn(buttonVariants({ variant: "default" })) + " w-full"
                }
              >
                <Icons.add className="w-4 h-4 mr-2" />
                Novo Transporte
              </Link>
            </div>
            <Card className="w-full h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex mb-4">
                  <Icons.split className="mr-2 h-5 w-5 text-muted-foreground" />
                  Transportando
                </CardTitle>
              </CardHeader>
              <CardContent className="lg:grid lg:grid-cols-[2fr_1fr]">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">
                    Carga / Destino
                  </p>
                  <div className="flex items-center gap-5 mb-4 lg:mb-0">
                    <h2 className="text-2xl font-bold">Caixa</h2>
                    <Icons.arrowRight />
                    <h2 className="text-2xl font-bold">Área de descarga B</h2>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Button>
                    <Icons.pausar className="w-4 h-4 mr-2" />
                    Pausar Operação
                  </Button>
                  <Button variant="destructive">
                    <Icons.parar className="w-4 h-4 mr-2" />
                    Calcelar Operação
                  </Button>
                </div>
                <Separator className="my-8 col-span-2" />
                <h3 className="text-muted-foreground font-medium text-sm mb-5 col-span-2 flex items-center">
                  <Icons.dados className="w-4 h-4 mr-2" />
                  Dados do Transporte
                </h3>
                <div className="col-span-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground text-sm mb-2">
                        Comprimento
                      </p>
                      <h3 className="text-lg font-bold">90mm</h3>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-2">
                        Altura
                      </p>
                      <h3 className="text-lg font-bold">50mm</h3>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-2">
                        Largura
                      </p>
                      <h3 className="text-lg font-bold">60mm</h3>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-2">Peso</p>
                      <h3 className="text-lg font-bold">100g</h3>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Separator />
        <h2 className="text-lg font-medium text-muted-foreground">
          Histórico de Transportes
        </h2>
        <GestaoTransporteTable data={[]} totalData={0} />
      </div>
    </PageContainer>
  );
}
