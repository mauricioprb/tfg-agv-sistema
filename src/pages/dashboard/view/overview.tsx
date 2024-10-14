"use client";

import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { RadialGraph } from "../radial-graph";
import { getFormattedDate } from "@/lib/dateUtils";
import { SpeedometerGraph } from "../speedometer-graph";
import { MonitorTrack } from "@/components/monitor-track";

export default function OverviewPage() {
  const currentDate = getFormattedDate();

  return (
    <PageContainer scrollable>
      <div className="space-y-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-1">
              Visão geral
            </h2>
            <h3 className="text-muted-foreground">{currentDate}</h3>
          </div>
          <div className="hidden items-center space-x-2 md:flex">
            <Button variant="destructive" className="font-bold ">
              <Icons.parar className="mr-2" />
              PARAR
            </Button>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div className="space-y-4">
            <div className="col-span-4 md:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-5">
              <RadialGraph />
              <div className="grid grid-rows-2 gap-5">
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
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Erros
                    </CardTitle>
                    <Icons.bug className="text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <Button
                      variant="link"
                      className="p-0 text-primary-foreground"
                    >
                      Ver detalhes
                      <Icons.arrowRight className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <SpeedometerGraph />
              <div className="grid grid-rows-2 gap-5">
                <Card className="w-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Tempo em operação
                    </CardTitle>
                    <Icons.timer className="text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">02:48h</div>
                  </CardContent>
                </Card>
                <Card className="w-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Distância total percorrida
                    </CardTitle>
                    <Icons.regua className="text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">100m</div>
                  </CardContent>
                </Card>
                <Button className="w-full">
                  Registro de atividades
                  <Icons.arrowRight className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <Card className="w-full md:min-h-[150px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex mb-4">
                  <Icons.split className="mr-2 h-5 w-5 text-muted-foreground" />
                  Transportando
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-2">
                  Carga / Destino
                </p>
                <div className="flex items-center gap-5">
                  <h2 className="text-2xl font-bold">Caixa</h2>
                  <Icons.arrowRight />
                  <h2 className="text-2xl font-bold">Área de descarga B</h2>
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
                    Área de Carga
                  </p>
                  <p className="text-muted-foreground text-sm flex items-center">
                    <Icons.descarga className="w-6 h-6 mr-2" />
                    Áreas de Descarga
                  </p>
                  <p className="text-muted-foreground text-sm flex items-center">
                    <Icons.manutencao className="w-6 h-6 mr-2" />
                    Manutenção
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
