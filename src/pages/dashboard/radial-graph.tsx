"use client";

import { BatteryCharging } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

// Função para determinar a cor com base no nível da bateria
const obterCorBateria = (nivelBateria: number) => {
  if (nivelBateria < 15) return "hsl(var(--destructive))";
  if (nivelBateria < 30) return "hsl(var(--warning))";
  return "hsl(var(--chart-2))";
};

const dadosBateria = [{ nivelBateria: 80, fill: obterCorBateria(80) }];

const configuracaoGrafico = {
  nivelBateria: {
    label: "Nível de Bateria",
  },
} satisfies ChartConfig;

export function RadialGraph() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Nível de Bateria</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={configuracaoGrafico}
          className="mx-auto aspect-square max-h-[212px]"
        >
          <RadialBarChart
            data={dadosBateria}
            startAngle={90}
            endAngle={-200}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-border last:fill-card"
              polarRadius={[86, 74]}
            />
            <RadialBar
              dataKey="nivelBateria"
              cornerRadius={10}
              fill={dadosBateria[0].fill}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="dark:fill-white text-4xl font-bold"
                        >
                          {dadosBateria[0].nivelBateria}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Bateria
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm text-white">
        <div className="flex items-center gap-2 font-medium text-muted-foreground leading-none">
          Status da bateria <BatteryCharging className="h-4 w-4" />
        </div>
        <div className="leading-none text-primary-100">
          A bateria está com 11,2V
        </div>
      </CardFooter>
    </Card>
  );
}
