"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import { Status } from "@/constants/enum";
import ToastNotification from "../toast/ToastNotification";
import { Invoice, useAddInvoice } from "@/hooks/useInvoices";

const invoiceFormSchema = z.object({
  invoiceName: z.string().min(1, "Name is required"),
  invoiceNumber: z.string().min(1, "Number is required"),
  dueDate: z.string().min(1, "Due date is required"),
  amount: z.string().min(1, "Amount is required"),
  status: z.string().min(1, "Status is required"),
});

type InvoiceFormData = z.infer<typeof invoiceFormSchema>;

const InvoiceForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceFormSchema),
  });

  const [toastOpen, setToastOpen] = useState(false);

  const { mutate: addInvoice } = useAddInvoice();

  const onSubmit = (data: InvoiceFormData) => {
    const newInvoice: Invoice = {
      id: crypto.randomUUID(),
      invoiceName: data.invoiceName,
      invoiceNumber: `INV${data.invoiceNumber}`,
      dueDate: data.dueDate,
      status: data.status,
      amount: data.amount.toString(),
    };

    addInvoice(newInvoice);

    setToastOpen(true);
  };

  return (
    <>
      <Card>
        <CardContent sx={{ border: "1px solid #e2e8f0" }}>
          <Typography
            className="text-[#1c2434] font-semibold"
            sx={{
              fontFamily: ["Inter", "sans-serif"].join(","),
            }}
          >
            Invoice Form
          </Typography>
        </CardContent>

        <CardContent sx={{ border: "1px solid #e2e8f0" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack className="space-y-8 mt-6">
              <Box sx={{ display: "flex", gap: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel className="mb-3 font-semibold text-sm text-[#1c2434]">
                    Name <span className="text-[#FF0000]">*</span>
                  </InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter your invoice name"
                    variant="outlined"
                    error={!!errors.invoiceName}
                    helperText={errors.invoiceName?.message}
                    {...register("invoiceName")}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel className="mb-3 font-semibold text-sm text-[#1c2434]">
                    Number <span className="text-[#FF0000]">*</span>
                  </InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter your invoice number"
                    variant="outlined"
                    error={!!errors.invoiceNumber}
                    helperText={errors.invoiceNumber?.message}
                    {...register("invoiceNumber")}
                  />
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel className="mb-3 font-semibold text-sm text-[#1c2434]">
                    Due Date <span className="text-[#FF0000]">*</span>
                  </InputLabel>
                  <TextField
                    fullWidth
                    type="date"
                    placeholder="DD/MM/YYYY"
                    variant="outlined"
                    error={!!errors.dueDate}
                    helperText={errors.dueDate?.message}
                    {...register("dueDate")}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel className="mb-3 font-semibold text-sm text-[#1c2434]">
                    Amount <span className="text-[#FF0000]">*</span>
                  </InputLabel>
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                      <NumericFormat
                        {...field}
                        customInput={TextField}
                        thousandSeparator="."
                        decimalSeparator=","
                        defaultValue={null}
                        prefix="Rp "
                        fixedDecimalScale
                        allowNegative={false}
                        fullWidth
                        variant="outlined"
                        placeholder="Enter your invoice amount"
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                        onValueChange={(values) => {
                          field.onChange(values.value);
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel className="mb-3 font-semibold text-sm text-[#1c2434]">
                    Status <span className="text-[#FF0000]">*</span>
                  </InputLabel>
                  <FormControl fullWidth error={!!errors.status}>
                    <Select
                      {...register("status")}
                      defaultValue=""
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Choose the status
                      </MenuItem>
                      {Object.entries(Status).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ flex: 1 }}></Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-end",
                  marginTop: 2,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  className="font-medium capitalize bg-[#3c50e0]"
                  sx={{
                    width: 250,
                    height: 50,
                  }}
                >
                  + Add Invoice
                </Button>
              </Box>
            </Stack>
          </form>
        </CardContent>
      </Card>

      <Stack className="mt-9">
        <ToastNotification
          message="Invoice added successfully!"
          isOpen={toastOpen}
          onClose={() => setToastOpen(false)}
        />
      </Stack>
    </>
  );
};

export default InvoiceForm;
