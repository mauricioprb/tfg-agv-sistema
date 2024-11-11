import { useToast } from "@/components/ui/use-toast";
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
  dimensoes: z.string().min(1, { message: "Campo obrigatório" }),
  destino: z.string().min(1, { message: "Campo obrigatório" }),
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

  const { toast } = useToast();

  const { data: cargas, isLoading } = trpc.carga.listarCargas.useQuery();
  const selectedCarga = form.watch("carga");

  // Encontra a carga selecionada para usar suas dimensões
  const cargaSelecionada = cargas?.find((carga) => carga.id === selectedCarga);

  const criarTransporte = trpc.transporte.criarTransporte.useMutation({
    onSuccess: () => {
      toast({
        title: "Transporte iniciado",
        description: "O transporte foi iniciado com sucesso!",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Erro ao iniciar transporte",
        description: error.message,
        variant: "destructive",
      });
      console.error("Erro ao criar transporte:", error.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    criarTransporte.mutate({
      rotaId: values.destino,
      cargaId: values.carga,
      status: "Em transporte",
      finalizado: false,
    });
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
              dimensoes={cargaSelecionada ? [cargaSelecionada] : []} // Passa a carga selecionada como dimensões
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
