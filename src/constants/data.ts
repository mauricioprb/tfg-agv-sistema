import { NavItem } from "../types";

export type RegistroAtividades = {
  id: string;
  data: string;
  operador: string;
  evento: string;
};

export const navItems: NavItem[] = [
  {
    title: "Visão geral",
    href: "/dashboard",
    icon: "dashboard",
    label: "dashboard",
  },
  {
    title: "Gestão de transporte",
    href: "/dashboard/gestao-transporte",
    icon: "packageOpen",
    label: "gestao-transporte",
  },
  {
    title: "Registro de atividades",
    href: "/dashboard/registro-atividades",
    icon: "terminal",
    label: "registro-atividades",
  },
];
