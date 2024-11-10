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
import { UseFormReturn } from "react-hook-form";

interface CargaSelectProps {
  form: UseFormReturn<any>;
  cargas: Array<{ id: string; tipo: string }> | undefined;
  isLoading: boolean;
}

export function CargaSelect({ form, cargas, isLoading }: CargaSelectProps) {
  return (
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
              {cargas
                ?.map((carga) => carga.tipo)
                .filter((tipo, index, self) => self.indexOf(tipo) === index)
                .map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
