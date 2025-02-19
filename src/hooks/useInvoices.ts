import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export type Invoice = {
  id: string;
  invoiceName: string;
  invoiceNumber: string;
  dueDate: string;
  status: string;
  amount: string;
};

const INVOICES_QUERY_KEY = "invoices";

const getInvoicesFromLocalStorage = (): Invoice[] => {
  if (typeof window === "undefined") return [];
  const storedData = localStorage.getItem(INVOICES_QUERY_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

const saveInvoicesToLocalStorage = (invoices: Invoice[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(INVOICES_QUERY_KEY, JSON.stringify(invoices));
  }
};

export const useInvoices = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return useQuery<Invoice[]>({
    queryKey: [INVOICES_QUERY_KEY],
    queryFn: getInvoicesFromLocalStorage,
    initialData: isClient ? getInvoicesFromLocalStorage() : [],
    enabled: isClient,
  });
};

export const useRemoveInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (invoiceId: string) => {
      const currentInvoices = getInvoicesFromLocalStorage();
      const updatedInvoices = currentInvoices.filter(
        (inv) => inv.id !== invoiceId
      );
      saveInvoicesToLocalStorage(updatedInvoices);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INVOICES_QUERY_KEY] });
    },
  });
};

export const useAddInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Invoice>({
    mutationFn: (newInvoice: Invoice) => {
      const currentInvoices = getInvoicesFromLocalStorage();
      const updatedInvoices = [...currentInvoices, newInvoice];
      saveInvoicesToLocalStorage(updatedInvoices);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INVOICES_QUERY_KEY] });
    },
  });
};
