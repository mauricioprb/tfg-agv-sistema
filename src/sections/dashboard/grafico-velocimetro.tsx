"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

interface GraficoVelocimetroProps {
  velocidade?: number;
}

const obterCorVelocidade = (velocidade: number) => {
  if (velocidade < 10) return "hsl(var(--primary))";
  if (velocidade < 20) return "hsl(var(--primary))";
  return "hsl(var(--destructive))";
};

const configuracaoGrafico = {
  velocidade: {
    label: "Velocidade",
  },
} satisfies ChartConfig;

export function GraficoVelocimetro({
  velocidade = 0,
}: GraficoVelocimetroProps) {
  const dadosVelocidade = [
    { velocidade, fill: obterCorVelocidade(velocidade) },
  ];

  const startAngle = 180;
  const endAngle = 180 - velocidade * 180;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-muted-foreground font-medium">
          Velocidade Atual
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={configuracaoGrafico}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={dadosVelocidade}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={80}
            outerRadius={130}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-border last:fill-card"
              polarRadius={[86, 74]}
              style={{ clipPath: "inset(0 0 50% 0)" }}
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
                          className="dark:fill-white text-2xl font-bold"
                        >
                          {velocidade.toLocaleString("pt-BR", {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                          })}{" "}
                          m/s
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Velocidade
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="velocidade"
              cornerRadius={5}
              fill={dadosVelocidade[0].fill}
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
