"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  Stack,
  InputLabel,
} from "@mui/material";

const invoiceFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  number: z.string().min(1, "Number is required"),
  dueDate: z.string().min(1, "Due date is required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  status: z.string().min(1, "Status is required"),
});

type InvoiceFormData = z.infer<typeof invoiceFormSchema>;

const InvoiceForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceFormSchema),
  });

  const onSubmit = (data: InvoiceFormData) => {
    console.log(data);
  };

  return (
    <Card>
      <CardContent sx={{ border: "1px solid #e2e8f0" }}>
        <Typography variant="h6" gutterBottom sx={{ color: "#1c2434" }}>
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
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...register("name")}
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
                  error={!!errors.number}
                  helperText={errors.number?.message}
                  {...register("number")}
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
                  className="uppercase"
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
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your invoice amount"
                  type="number"
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                  {...register("amount", { valueAsNumber: true })}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <InputLabel className="mb-3 font-semibold text-sm text-[#1c2434]">
                  Status <span className="text-[#FF0000]">*</span>
                </InputLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Choose the status"
                  error={!!errors.status}
                  helperText={errors.status?.message}
                  {...register("status")}
                />
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
  );
};

export default InvoiceForm;
