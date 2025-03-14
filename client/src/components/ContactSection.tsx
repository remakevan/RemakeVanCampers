import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  email: z.string().email({ message: "Email no válido" }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      // Here you would typically send the data to a server
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactar con Remake Van. Nos pondremos en contacto contigo pronto.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contacto</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos aquí para responder a todas tus preguntas y ayudarte a crear la furgoneta de tus sueños.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2" data-aos="fade-right">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-50 rounded-xl shadow-lg p-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-gray-700 font-medium">Nombre completo</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Tu nombre" 
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="tu@email.com" 
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-gray-700 font-medium">Teléfono</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Tu teléfono" 
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-gray-700 font-medium">Mensaje</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Cuéntanos tu proyecto..." 
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                          rows={5}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                </Button>
              </form>
            </Form>
          </div>

          <div className="md:w-1/2" data-aos="fade-left">
            <div className="h-full bg-gray-50 rounded-xl shadow-lg p-8 flex flex-col">
              <h3 className="text-2xl font-bold mb-6">Información de contacto</h3>

              <div className="flex items-start mb-6">
                <div className="mr-4 text-amber-500">
                  <i className="fas fa-map-marker-alt text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Ubicación</h4>
                  <p className="text-gray-600">Rincón de la Victoria (Málaga)</p>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <div className="mr-4 text-amber-500">
                  <i className="fas fa-phone text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Teléfono</h4>
                  <p className="text-gray-600">+34 654 181 829</p>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <div className="mr-4 text-amber-500">
                  <i className="fas fa-envelope text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <p className="text-gray-600">info@remakevan.com</p>
                </div>
              </div>

              <div className="flex items-start mb-8">
                <div className="mr-4 text-amber-500">
                  <i className="fas fa-clock text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Horario</h4>
                  <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                  <p className="text-gray-600">Sábados: 10:00 - 14:00</p>
                </div>
              </div>

              <div className="mt-auto">
                <h4 className="font-semibold text-lg mb-4">Contáctanos directamente</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://wa.me/34654181829" 
                    className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-lg py-3 px-6 transition-colors shadow-md flex-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-whatsapp mr-2 text-xl"></i>
                    WhatsApp
                  </a>
                  <a 
                    href="mailto:info@remakevan.com" 
                    className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-3 px-6 transition-colors shadow-md flex-1"
                  >
                    <i className="fas fa-envelope mr-2"></i>
                    Email
                  </a>
                  <a
                    href="https://www.instagram.com/remake_van/"
                    className="flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white rounded-lg py-3 px-6 transition-colors shadow-md flex-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram mr-2 text-xl"></i>
                    Instagram
                  </a>
                  <a href="https://es.pinterest.com/Remakevan/" className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-lg py-3 px-6 transition-colors shadow-md flex-1" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-pinterest mr-2 text-xl"></i>
                    Pinterest
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}