import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  vanConfigSchema, 
  vanOptions as defaultOptions, 
  type VanConfigType,
  type VanConfiguration
} from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

import {
  Form,
  FormControl,
  FormDescription,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Solo para el formulario, extendemos el esquema para validaciones específicas
const formSchema = vanConfigSchema.extend({
  contactInfo: z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("Dirección de email inválida"),
    phone: z.string().optional(),
    comments: z.string().optional(),
  }),
});

export default function VanConfigurator() {
  const { toast } = useToast();
  const [vanOptions, setVanOptions] = useState(defaultOptions);
  const [loading, setLoading] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Formulario
  const form = useForm<VanConfigType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "",
      size: "",
      interiorFeatures: [],
      materials: "",
      contactInfo: {
        name: "",
        email: "",
        phone: "",
        comments: "",
      },
    },
  });

  // Cargar opciones del backend
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await apiRequest<{ success: boolean; data: typeof defaultOptions }>({
          url: "/api/van-options",
          method: "GET",
        });
        
        if (response && response.success && response.data) {
          setVanOptions(response.data);
        }
      } catch (error) {
        console.error("Error cargando opciones:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar las opciones del configurador.",
          variant: "destructive",
        });
      }
    };

    fetchOptions();
  }, [toast]);

  // Calcular precio cuando cambian las selecciones
  const calculatePrice = async () => {
    const { model, size, interiorFeatures, materials } = form.getValues();
    
    // Verificar que los campos esenciales estén completados
    if (!model || !size || !materials) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await apiRequest<{ success: boolean; data: { price: number } }>({
        url: "/api/calculate-van-price",
        method: "POST",
        body: {
          model,
          size,
          interiorFeatures,
          materials,
        },
      });
      
      if (response && response.success && response.data) {
        setEstimatedPrice(response.data.price);
      }
    } catch (error) {
      console.error("Error calculando precio:", error);
      toast({
        title: "Error",
        description: "No se pudo calcular el precio estimado.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Observar cambios en selecciones para actualizar precio
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (
        name?.startsWith("model") ||
        name?.startsWith("size") ||
        name?.startsWith("interiorFeatures") ||
        name?.startsWith("materials")
      ) {
        calculatePrice();
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, form.watch]);

  // Enviar formulario
  const onSubmit = async (data: VanConfigType) => {
    setSubmitting(true);
    
    try {
      const response = await apiRequest<{ success: boolean; data: VanConfiguration }>({
        url: "/api/van-configurations",
        method: "POST",
        body: data,
      });
      
      if (response && response.success) {
        setSubmitted(true);
        toast({
          title: "¡Configuración enviada!",
          description: "Nos pondremos en contacto contigo pronto.",
        });
        
        // Resetear formulario
        form.reset();
        setEstimatedPrice(null);
      }
    } catch (error) {
      console.error("Error enviando configuración:", error);
      toast({
        title: "Error",
        description: "No se pudo enviar la configuración. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Función para formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Configurador de Furgonetas</h1>
        <p className="text-muted-foreground mt-2">
          Personaliza tu furgoneta camper ideal y recibe un presupuesto estimado
        </p>
      </div>

      {submitted ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>¡Gracias por tu solicitud!</CardTitle>
            <CardDescription>
              Hemos recibido tu configuración personalizada.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Nuestro equipo revisará tus preferencias y se pondrá en contacto contigo lo antes posible para discutir los detalles y proporcionarte un presupuesto más detallado.
            </p>
            <p>
              Si tienes alguna pregunta, no dudes en contactarnos directamente.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setSubmitted(false)}>Crear nueva configuración</Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personaliza tu Furgoneta</CardTitle>
                <CardDescription>
                  Selecciona las opciones que mejor se adapten a tus necesidades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Características Básicas</h3>
                      
                      {/* Modelo */}
                      <FormField
                        control={form.control}
                        name="model"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Modelo</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecciona un modelo" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {vanOptions.models.map((model) => (
                                  <SelectItem key={model.id} value={model.id}>
                                    {model.name} ({formatPrice(model.basePrice)})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              El modelo base de la furgoneta para tu conversión
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Tamaño */}
                      <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tamaño</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecciona un tamaño" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {vanOptions.sizes.map((size) => (
                                  <SelectItem key={size.id} value={size.id}>
                                    {size.name} {size.priceModifier > 0 ? `(+${formatPrice(size.priceModifier)})` : ''}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              El tamaño de la furgoneta determina el espacio disponible
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    {/* Características interiores */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Características Interiores</h3>
                      <FormField
                        control={form.control}
                        name="interiorFeatures"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel>Selecciona las características que deseas</FormLabel>
                              <FormDescription>
                                Cada característica afecta al precio final
                              </FormDescription>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {vanOptions.interiorFeatures.map((feature) => (
                                <FormField
                                  key={feature.id}
                                  control={form.control}
                                  name="interiorFeatures"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={feature.id}
                                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(feature.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value || []),
                                                    feature.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== feature.id
                                                    )
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                          <FormLabel>
                                            {feature.name} (+{formatPrice(feature.price)})
                                          </FormLabel>
                                        </div>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    {/* Materiales */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Materiales</h3>
                      <FormField
                        control={form.control}
                        name="materials"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Calidad de Materiales</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecciona calidad de materiales" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {vanOptions.materials.map((material) => (
                                  <SelectItem key={material.id} value={material.id}>
                                    {material.name} {material.priceModifier > 0 ? `(+${formatPrice(material.priceModifier)})` : ''}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              La calidad de los materiales afecta tanto al precio como a la durabilidad
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    {/* Información de contacto */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Información de Contacto</h3>
                      
                      {/* Nombre */}
                      <FormField
                        control={form.control}
                        name="contactInfo.name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                              <Input placeholder="Tu nombre" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Email */}
                      <FormField
                        control={form.control}
                        name="contactInfo.email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="tu@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Teléfono */}
                      <FormField
                        control={form.control}
                        name="contactInfo.phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teléfono (opcional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Tu teléfono" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Comentarios */}
                      <FormField
                        control={form.control}
                        name="contactInfo.comments"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Comentarios adicionales (opcional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Cualquier detalle adicional que quieras comentarnos..." 
                                className="resize-none" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" disabled={submitting} className="w-full">
                      {submitting ? "Enviando..." : "Solicitar presupuesto"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          {/* Resumen de precio */}
          <div className="md:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumen</CardTitle>
                <CardDescription>
                  Precio estimado basado en tus selecciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {form.watch("model") && (
                    <div className="flex justify-between">
                      <span>Modelo:</span>
                      <span>
                        {vanOptions.models.find(m => m.id === form.watch("model"))?.name}
                      </span>
                    </div>
                  )}
                  
                  {form.watch("size") && (
                    <div className="flex justify-between">
                      <span>Tamaño:</span>
                      <span>
                        {vanOptions.sizes.find(s => s.id === form.watch("size"))?.name}
                      </span>
                    </div>
                  )}
                  
                  {form.watch("interiorFeatures")?.length > 0 && (
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Características:</span>
                        <span>{form.watch("interiorFeatures").length} seleccionadas</span>
                      </div>
                      <ul className="text-sm pl-5 list-disc space-y-1">
                        {form.watch("interiorFeatures").map(featureId => (
                          <li key={featureId}>
                            {vanOptions.interiorFeatures.find(f => f.id === featureId)?.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {form.watch("materials") && (
                    <div className="flex justify-between">
                      <span>Materiales:</span>
                      <span>
                        {vanOptions.materials.find(m => m.id === form.watch("materials"))?.name}
                      </span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Precio estimado:</span>
                    <span>
                      {loading
                        ? "Calculando..."
                        : estimatedPrice !== null
                        ? formatPrice(estimatedPrice)
                        : "Pendiente"}
                    </span>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    * Este es un precio estimado. El precio final puede variar según detalles específicos de tu proyecto.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}