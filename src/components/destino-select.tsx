import {
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
import { trpc } from "@/server/client";
import { UseFormReturn } from "react-hook-form";

interface DestinoSelectProps {
  form: UseFormReturn<any>;
}

export function DestinoSelect({ form: _form }: DestinoSelectProps) {
  const { data: rotas, isLoading } = trpc.rota.listarRotas.useQuery();

  return (
    <FormField
      name="destino"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Destino</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
            }}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o destino" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {isLoading ? (
                <SelectItem value="">Carregando...</SelectItem>
              ) : (
                rotas?.map((rota) => (
                  <SelectItem key={rota.id} value={rota.id}>
                    {rota.nome}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
