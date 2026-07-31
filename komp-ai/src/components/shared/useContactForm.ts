"use client";

import { useState } from "react";

export interface ContactFormState {
  imie: string;
  nazwisko: string;
  email: string;
  telefon: string;
  wiadomosc: string;
  zgoda: boolean;
}

export function useContactForm() {
  const [values, setValues] = useState<ContactFormState>({
    imie: "",
    nazwisko: "",
    email: "",
    telefon: "",
    wiadomosc: "",
    zgoda: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.zgoda) {
      setError("Wymagana akceptacja zgody");
      return;
    }
    setError(null);
    setSubmitted(true);
    // Tu nastąpi połączenie z backendem/API
  };

  return {
    values,
    submitted,
    error,
    handleChange,
    handleSubmit,
  };
}
