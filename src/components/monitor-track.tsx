"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { Icons } from "./icons";
import { useToast } from "@/components/ui/use-toast";

interface MonitorTrackProps {
  rota: "carga" | "manutencao" | "descarga a" | "descarga b";
  destino: "carga" | "manutencao" | "descarga a" | "descarga b";
  chegou: boolean;
}

export function MonitorTrack({ rota, destino, chegou }: MonitorTrackProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (chegou) {
      toast({
        title: "Destino alcançado!",
        description: `O AGV chegou ao destino ${destino}.`,
      });
    }
  }, [chegou, destino, toast]);

  const blinkingAnimation = {
    fill: ["#ff7b39", "hsl(215 27.9% 16.9%)", "#ff7b39"],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const arrivedBlinkAnimation = {
    fill: ["#2eb88a", "hsl(215 27.9% 16.9%)"],
    transition: {
      duration: 0.5,
      repeat: 10,
      ease: "easeInOut",
      repeatType: "reverse",
    },
  };

  const getAnimation = (segment: string) => {
    if (destino === segment && chegou) {
      return arrivedBlinkAnimation;
    }
    if (rota === segment && !chegou) {
      return blinkingAnimation;
    }
    return undefined;
  };

  return (
    <svg
      width="603"
      height="284"
      viewBox="0 0 603 284"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        id="trecho-descarga-b"
        d="M374.8 144C366.6 144 358.9 147.1 353.1 152.8C347.2 158.6 343.9 166.2 343.9 174.4V232.7C343.8 237.5 342.8 241.9 340.8 246.1C338.9 250.2 336.3 253.9 333 257C329.7 260.1 326 262.5 321.7 264.1C317.7 265.6 313.4 266.5 309 266.5C308.6 266.5 125.9 266.5 125.9 266.5V262.6H309C325.7 262.6 339.5 249.3 340 232.5V173.9C340 169.4 341 165 342.8 160.9C344.6 156.9 347.1 153.3 350.3 150.1C352.8 147.6 355.8 145.6 359 144H374.8Z"
        fill="hsl(215 27.9% 16.9%)"
        animate={getAnimation("descarga b")}
      />
      <motion.path
        id="trecho-descarga-a"
        d="M374.8 140H359C355.8 138.4 352.8 136.4 350.3 133.9C347.1 130.7 344.6 127.1 342.8 123.1C341 119 340 114.6 340 110.1V51.5C339.5 34.7 325.7 21.4 309 21.4H125.9V17.5C125.9 17.5 308.6 17.5 309 17.5C313.4 17.5 317.7 18.4 321.7 19.9C326 21.5 329.7 23.9 333 27C336.3 30.1 338.9 33.8 340.8 37.9C342.8 42.1 343.8 46.5 343.9 51.3V109.6C343.9 117.8 347.2 125.4 353.1 131.2C358.9 136.9 366.6 140 374.8 140Z"
        fill="hsl(215 27.9% 16.9%)"
        animate={getAnimation("descarga a")}
      />
      <motion.path
        d="M375.8 140H21.2V144H375.8V140Z"
        id="trecho-manutencao"
        fill="hsl(215 27.9% 16.9%)"
        animate={getAnimation("manutencao")}
      />
      <motion.path
        d="M581.8 140H375.8V144H581.8V140Z"
        id="trecho-carga"
        fill="hsl(215 27.9% 16.9%)"
        animate={getAnimation("carga")}
      />

      <g transform="translate(555, 128)">
        <Icons.carga chegou={destino === "carga" && chegou} />
      </g>

      <g transform="translate(20, 128)">
        <Icons.manutencao chegou={destino === "manutencao" && chegou} />
      </g>

      <g transform="translate(126, 10)">
        <Icons.descarga_a chegou={destino === "descarga a" && chegou} />
      </g>

      <g transform="translate(126, 255)">
        <Icons.descarga_b chegou={destino === "descarga b" && chegou} />
      </g>

      <g transform="translate(362, 128)">
        <Icons.rfid />
      </g>
    </svg>
  );
}
