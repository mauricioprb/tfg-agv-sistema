"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { trpc } from "@/server/client";
import { DimensoesSelect } from "./dimensoes-select";
import { DestinoSelect } from "./destino-select";
import { CargaSelect } from "./carga-select";

const formSchema = z.object({
  carga: z.string().min(1, { message: "Campo obrigatório" }),
  dimensoes: z.string().optional(),
  destino: z.enum(["area_a", "area_b"], {
    required_error: "Campo obrigatório",
  }),
});

interface ModalTransporteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalTransporte({ isOpen, onClose }: ModalTransporteProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carga: undefined,
      dimensoes: undefined,
      destino: undefined,
    },
  });

  const { data: cargas, isLoading } = trpc.carga.listarCargas.useQuery();
  const selectedCarga = form.watch("carga");

  // Filtra as dimensões de acordo com o tipo selecionado em "carga"
  const filteredDimensoes = cargas?.filter(
    (carga) => carga.tipo === selectedCarga
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Transporte Selecionado:", values);
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Selecionar Transporte</DialogTitle>
          <DialogDescription>
            Escolha os dados de transporte desejado e clique em iniciar.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CargaSelect form={form} cargas={cargas} isLoading={isLoading} />
            <DimensoesSelect
              form={form}
              dimensoes={filteredDimensoes}
              isLoading={isLoading}
              selectedCarga={selectedCarga}
            />
            <DestinoSelect form={form} />
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">Iniciar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
