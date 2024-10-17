"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  destino: z.enum(["area_a", "area_b"], {
    required_error: "Campo obrigatório",
  }),
  tipo: z.enum(["caixa", "granel", "objeto_unico"], {
    required_error: "Campo obrigatório",
  }),
  comprimento: z
    .number({
      required_error: "Campo obrigatório",
      invalid_type_error: "Por favor, insira um número válido",
    })
    .positive("O comprimento deve ser um valor positivo.")
    .min(1, "O comprimento deve ser pelo menos 1 metro."),
  largura: z
    .number({
      required_error: "Campo obrigatório",
      invalid_type_error: "Por favor, insira um número válido",
    })
    .positive("A largura deve ser um valor positivo.")
    .min(1, "A largura deve ser pelo menos 1 metro."),
  altura: z
    .number({
      required_error: "Campo obrigatório",
      invalid_type_error: "Por favor, insira um número válido",
    })
    .positive("A altura deve ser um valor positivo.")
    .min(1, "A altura deve ser pelo menos 1 metro."),
  peso: z
    .number({
      required_error: "Campo obrigatório",
      invalid_type_error: "Por favor, insira um número válido",
    })
    .positive("O peso deve ser um valor positivo.")
    .min(1, "O peso deve ser pelo menos 1 kg."),
});

export default function GestaoTransporteForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destino: undefined,
      tipo: undefined,
      comprimento: undefined,
      largura: undefined,
      altura: undefined,
      peso: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Novo Transporte
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <SelectItem value="area_a">
                          Área de descarga A
                        </SelectItem>
                        <SelectItem value="area_b">
                          Área de descarga B
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="caixa">Caixa</SelectItem>
                        <SelectItem value="granel">Granel</SelectItem>
                        <SelectItem value="objeto_unico">
                          Objeto único
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className="md:col-span-2 col-span-1 my-6" />
              <h3 className="md:col-span-2 col-span-1">Medidas</h3>
              <FormField
                control={form.control}
                name="comprimento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comprimento (mm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Digite o comprimento"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="largura"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Largura (mm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Digite a largura"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="altura"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Altura (mm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Digite a altura"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="peso"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso (g)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Digite o peso"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Setar transporte</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
