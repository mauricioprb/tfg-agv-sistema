"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { Icons } from "./icons";
import { useToast } from "@/components/ui/use-toast";

interface MonitorTrackProps {
  rota: string;
  destino: string;
  chegou: boolean;
}

export function MonitorTrack({ rota, destino, chegou }: MonitorTrackProps) {
  const { toast } = useToast();

  // Exibir toast quando o AGV alcançar o destino
  useEffect(() => {
    if (chegou) {
      toast({
        title: "Destino alcançado!",
        description: `O AGV chegou ao destino ${destino}.`,
      });
    }
  }, [chegou, destino, toast]);

  // Animação para rota em andamento (laranja)
  const blinkingAnimation = {
    fill: ["#ff7b39", "hsl(215 27.9% 16.9%)", "#ff7b39"],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Animação para destino alcançado (verde)
  const arrivedBlinkAnimation = {
    fill: ["#2eb88a", "hsl(215 27.9% 16.9%)"],
    transition: {
      duration: 0.5,
      repeat: 10,
      ease: "easeInOut",
      repeatType: "reverse",
    },
  };

  // Lógica para determinar a animação de cada segmento
  const getAnimation = (segment: string) => {
    console.log(
      "Segment:",
      segment,
      "Rota:",
      rota,
      "Destino:",
      destino,
      "Chegou:",
      chegou
    ); // Debug
    if (destino === segment && chegou) {
      return arrivedBlinkAnimation; // Verde para destino alcançado
    }
    if (rota === segment && !chegou) {
      return blinkingAnimation; // Laranja para rota em andamento
    }
    return undefined; // Sem animação
  };

  return (
    <>
      <svg
        width="438"
        height="252"
        viewBox="0 0 438 252"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Trecho Manutenção */}
        <motion.path
          d="M18 124.344H262.775V127.553H18V124.344Z"
          id="trecho-manutencao"
          fill="hsl(215 27.9% 16.9%)"
          animate={getAnimation("Manutenção")}
        />
        {/* Trecho Carga */}
        <motion.path
          d="M262.775 124.344H420V127.553H262.775V124.344Z"
          id="trecho-carga"
          fill="hsl(215 27.9% 16.9%)"
          animate={getAnimation("Carga")}
        />
        {/* Trecho Descarga A */}
        <motion.path
          d="M101.196 18H262.775V21.2087H101.196V18Z"
          id="trecho-descarga-a"
          fill="hsl(215 27.9% 16.9%)"
          animate={getAnimation("Descarga A")}
        />
        {/* Trecho Descarga B */}
        <motion.path
          d="M100.738 230.688H262.775V233.897H100.738V230.688Z"
          id="trecho-descarga-b"
          fill="hsl(215 27.9% 16.9%)"
          animate={getAnimation("Descarga B")}
        />
        {/* Trecho Interseção A */}
        <motion.path
          d="M262.775 124.344V18H265.984V124.344H262.775Z"
          id="trecho-intersecao-a"
          fill="hsl(215 27.9% 16.9%)"
          animate={getAnimation("Interseção A")}
        />
        {/* Trecho Interseção B */}
        <motion.path
          d="M262.775 233.897V127.553H265.984V233.897H262.775Z"
          id="trecho-intersecao-b"
          fill="hsl(215 27.9% 16.9%)"
          animate={getAnimation("Interseção B")}
        />

        {/* Ícones para cada ponto */}
        <g transform="translate(410, 113)">
          <Icons.carga chegou={destino === "Carga" && chegou} />
        </g>
        <g transform="translate(0, 111)">
          <Icons.manutencao chegou={destino === "Manutenção" && chegou} />
        </g>
        <g transform="translate(68, 8)">
          <Icons.descarga_a chegou={destino === "Descarga A" && chegou} />
        </g>
        <g transform="translate(68, 223)">
          <Icons.descarga_b chegou={destino === "Descarga B" && chegou} />
        </g>
        <g transform="translate(251, 113)">
          <Icons.rfid />
        </g>
        <g transform="translate(251, 7)">
          <Icons.rfid />
        </g>
        <g transform="translate(251, 219)">
          <Icons.rfid />
        </g>
      </svg>
    </>
  );
}
