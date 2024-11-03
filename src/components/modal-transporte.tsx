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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { trpc } from "@/server/client";

const formSchema = z.object({
  carga: z.string().nonempty("Seleção obrigatória"),
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
      destino: undefined,
    },
  });

  const { data: cargas, isLoading } = trpc.carga.listarCargas.useQuery();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Transporte Selecionado:", values.carga);
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Selecionar Transporte</DialogTitle>
          <DialogDescription>
            Escolha o os dados de transporte desejado e clique em iniciar.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="carga"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carga</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a carga" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cargas?.map((carga) => (
                        <SelectItem key={carga.id} value={carga.tipo}>
                          {carga.tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="destino"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destino</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o destino" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="area_a">Área de descarga A</SelectItem>
                      <SelectItem value="area_b">Área de descarga B</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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
