// src/hooks/use-toast.ts
"use client";

import { toast as sonnerToast } from "sonner";

type ToastOptions = {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  return {
    toast: ({ title, description, variant = "default" }: ToastOptions) => {
      sonnerToast[variant === "destructive" ? "error" : "success"](
        `${title}: ${description ?? ""}`
      );
    },
  };
}
