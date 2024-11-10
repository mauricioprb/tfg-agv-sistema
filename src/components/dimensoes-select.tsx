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

interface DimensoesSelectProps {
  form: UseFormReturn<any>;
  dimensoes:
    | Array<{
        id: string;
        comprimento: number;
        largura: number;
        altura: number;
        peso: number;
      }>
    | undefined;
  isLoading: boolean;
  selectedCarga: string | undefined;
}

export function DimensoesSelect({
  form,
  dimensoes,
  isLoading,
  selectedCarga,
}: DimensoesSelectProps) {
  return (
    <FormField
      name="dimensoes"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Dimensões</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={isLoading || !selectedCarga}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione as dimensões" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {dimensoes?.map((dimensao) => (
                <SelectItem key={dimensao.id} value={dimensao.id}>
                  {`${dimensao.comprimento}mm x ${dimensao.largura}mm x ${dimensao.altura}mm - ${dimensao.peso}g`}
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
