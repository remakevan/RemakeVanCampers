import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import React from 'react';

export default function ContactSection() {
  return (
    <section className="py-20 bg-white" id="contact">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
            <div className="h-full bg-gray-50 rounded-xl shadow-lg p-8 flex flex-col">
              <div>
                <h3 className="text-2xl font-bold mb-6">Información de contacto</h3>
                <div className="mb-8">
                  <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                  <p className="text-gray-600">Sábados: 10:00 - 14:00</p>
                </div>
              </div>

              <div className="mt-auto">
                <h4 className="font-semibold text-lg mb-4">Contáctanos directamente</h4>
                <div className="flex gap-4 mb-6">
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
                </div>

                <h4 className="font-semibold text-lg mb-4">Síguenos</h4>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/remake_van/"
                    className="flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white rounded-lg py-3 px-6 transition-colors shadow-md flex-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram mr-2 text-xl"></i>
                    Instagram
                  </a>
                  <a
                    href="https://www.tiktok.com/@remake.van"
                    className="flex items-center justify-center bg-black hover:bg-[#1e1e1e] text-white rounded-lg py-3 px-6 transition-colors shadow-md flex-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-tiktok mr-2 text-xl"></i>
                    TikTok
                  </a>
                  <a 
                    href="https://es.pinterest.com/Remakevan/" 
                    className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-lg py-3 px-6 transition-colors shadow-md flex-1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
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