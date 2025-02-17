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
      <CardContent sx={{ border: "1px solid var(--borderColor)" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "var(--secondary)" }}
        >
          Invoice Form
        </Typography>
      </CardContent>

      <CardContent sx={{ border: "1px solid var(--borderColor)" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack className="space-y-8 mt-6">
            <Box sx={{ display: "flex", gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  label="Name"
                  fullWidth
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...register("name")}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField
                  label="Number"
                  fullWidth
                  variant="outlined"
                  error={!!errors.number}
                  helperText={errors.number?.message}
                  {...register("number")}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  label="Due Date"
                  fullWidth
                  type="date"
                  variant="outlined"
                  error={!!errors.dueDate}
                  helperText={errors.dueDate?.message}
                  {...register("dueDate")}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField
                  label="Amount"
                  fullWidth
                  variant="outlined"
                  type="number"
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                  {...register("amount", { valueAsNumber: true })}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  label="Status"
                  fullWidth
                  variant="outlined"
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
                className="font-medium capitalize"
                sx={{
                  width: 250,
                  height: 50,
                  backgroundColor: "var(--primary)",
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
