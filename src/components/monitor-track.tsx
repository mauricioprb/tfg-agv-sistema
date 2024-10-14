"use client";

import { useState, useEffect, useRef } from "react";
import { Icons } from "./icons";

export function MonitorTrack() {
  const [position, setPosition] = useState(0);
  const [iconsStatus, setIconsStatus] = useState({
    carga: false,
    manutencao: false,
    descargaA: false,
    descargaB: false,
  });
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const speed = 0.0002;

  const iconCoordinates = {
    carga: { x: 554, y: 128 },
    manutencao: { x: 20, y: 128 },
    descargaA: { x: 126, y: 10 },
    descargaB: { x: 126, y: 255 },
  };

  const iconRadius = 20; // Raio de tolerância para colisão do AGV com os ícones

  const animate = (time: number) => {
    if (previousTimeRef.current != null) {
      const deltaTime = time - previousTimeRef.current;
      setPosition((prev) => {
        const newPos = prev + deltaTime * speed;
        checkIconCollision(newPos); // Verifica colisões
        return newPos >= 1 ? 0 : newPos;
      });
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  // Iniciar a animação
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const checkIconCollision = (newPos: number) => {
    const agvCoords = getCoordinates(newPos);
    const updatedIconsStatus = { ...iconsStatus };

    // Verificar colisão com cada ícone
    Object.keys(iconCoordinates).forEach((icon) => {
      const iconCoord = iconCoordinates[icon as keyof typeof iconCoordinates];
      const distance = Math.sqrt(
        Math.pow(agvCoords.x - iconCoord.x, 2) +
          Math.pow(agvCoords.y - iconCoord.y, 2)
      );

      // Se o AGV colidir com o ícone (dentro do raio), marque o ícone como atingido
      if (distance <= iconRadius) {
        updatedIconsStatus[icon as keyof typeof iconsStatus] = true; // Define como chegou
      } else {
        updatedIconsStatus[icon as keyof typeof iconsStatus] = false; // Volta ao estado original
      }
    });

    // Apenas atualiza o estado se houver mudança para evitar re-renderizações desnecessárias
    if (JSON.stringify(updatedIconsStatus) !== JSON.stringify(iconsStatus)) {
      setIconsStatus(updatedIconsStatus);
    }
  };

  return (
    <div>
      <svg
        id="Camada_1"
        width="603"
        height="284"
        viewBox="0 0 603 284"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="track"
          d="M581.6 139.809V143.609H374.8C366.6 143.609 358.9 146.709 353.1 152.409C347.2 158.209 343.9 165.809 343.9 174.009V232.309C343.8 237.109 342.8 241.509 340.8 245.709C338.9 249.809 336.3 253.509 333 256.609C329.7 259.709 326 262.109 321.7 263.709C317.7 265.209 313.4 266.109 309 266.109C308.6 266.109 125.9 266.109 125.9 266.109V262.209H309C325.7 262.209 339.5 248.909 340 232.109V173.509C340 169.009 341 164.609 342.8 160.509C344.6 156.509 347.1 152.909 350.3 149.709C352.8 147.209 355.8 145.209 359 143.609H21V139.809H359C355.9 138.209 353 136.209 350.3 133.709C347 130.609 344.5 126.909 342.8 122.909C341 118.909 340 114.609 340 110.209V52.1093C339.7 43.8093 336.4 36.2093 330.3 30.5093C324.4 24.9093 316.8 21.8093 308.6 21.8093H125.9V18.0093H308.1C312.9 17.9093 317.4 18.6093 321.8 20.4093C325.9 22.0093 329.7 24.4093 333.1 27.5093C336.4 30.6093 339 34.3093 340.9 38.4093C342.8 42.7093 343.9 47.2093 344 51.8093V109.209C344 117.409 347.3 125.009 353.2 130.809C359.1 136.409 366.7 139.609 374.9 139.609H581.6V139.809Z"
          fill="#94A1AD"
        />
        <g transform="translate(554, 128)">
          <Icons.carga chegou={iconsStatus.carga} />
        </g>

        <g transform="translate(20, 128)">
          <Icons.manutencao chegou={iconsStatus.manutencao} />
        </g>

        <g transform="translate(126, 10)">
          <Icons.descarga_a chegou={iconsStatus.descargaA} />
        </g>

        <g transform="translate(126, 255)">
          <Icons.descarga_b chegou={iconsStatus.descargaB} />
        </g>

        <g
          transform={`translate(${getCoordinates(position).x}, ${getCoordinates(position).y})`}
        >
          <Icons.agv_logo />
        </g>
      </svg>
    </div>
  );

  function getCoordinates(percentage: number) {
    const pathElement = document.getElementById(
      "track"
    ) as unknown as SVGPathElement;
    if (pathElement) {
      const pathLength = pathElement.getTotalLength();
      const point = pathElement.getPointAtLength(percentage * pathLength);
      return { x: point.x - 15, y: point.y - 15 };
    }
    return { x: 0, y: 0 };
  }
}
