"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface DistanciaCardProps {
  distancia?: number;
}

export function DistanciaCard({ distancia }: DistanciaCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Distância total percorrida
        </CardTitle>
        <Icons.regua className="text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{distancia ? distancia : 0}cm</div>
      </CardContent>
    </Card>
  );
}
