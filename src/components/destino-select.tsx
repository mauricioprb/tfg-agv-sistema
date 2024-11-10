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

interface DestinoSelectProps {
  form: UseFormReturn<any>;
}

export function DestinoSelect({ form: _form }: DestinoSelectProps) {
  return (
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
  );
}
