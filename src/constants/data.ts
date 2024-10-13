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
    href: "/dashboard/transporte",
    icon: "packageOpen",
    label: "transporte",
  },
  {
    title: "Registro de atividades",
    href: "/dashboard/product",
    icon: "terminal",
    label: "product",
  },
];
