"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { createProduct, getCategories } from "../(actions)/product"; // Ensure you have the getCategories function
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import style from "./style.module.scss";
import Image from "next/image";
import { UploadButton } from "@/src/utils/uploadthing";
import { Product, Category } from "@prisma/client"; // Ensure Category is imported
import Swal from "sweetalert2";

const Page = () => {
  const { register, handleSubmit, control, setValue } = useForm<Product>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories(); // Fetch categories from the database
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data: Product) => {
    data.categoryId = selectedCategory; // Add the selected category ID to the data
    try {
      await createProduct(data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your product has been created",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className={style.pageWrapper}>
      <Container maxWidth="md">
        <Paper elevation={3} className={style.formContainer}>
          <Typography variant="h4" component="h1" className={style.title}>
            Create a New Product
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Name"
                  {...register("name", { required: true })}
                  variant="outlined"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  inputProps={{ step: "0.01" }}
                  {...register("price", { required: true })}
                  variant="outlined"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Typography variant="body1">Product Image</Typography>
                      {field.value ? (
                        <>
                          <Image src={field.value} width={100} height={100} alt="Product" />
                          <Button
                            onClick={() => setValue("image", "")}
                            variant="outlined"
                            color="secondary"
                          >
                            Remove Image
                          </Button>
                        </>
                      ) : (
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            const url = res[0]?.url;
                            if (url) {
                              setValue("image", url);
                  
