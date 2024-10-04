"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { createProduct } from "../(actions)/product"; // Ensure this is a client-safe import
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import style from "./style.module.scss";
import Image from "next/image";
import { UploadButton } from "@/src/utils/uploadthing";
import Swal from "sweetalert2";
import { Product } from "@prisma/client";


// interface FormData {
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   sliderImageOne: string;
//   sliderImageTwo: string;
//   sliderImageThree: string;
//   gameplayVideo: string;
// }

const Page = () => {
   const { register, handleSubmit, control, setValue } = useForm<Product>();

  const onSubmit = async (data: Product) => {
    console.log(data);
    try {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      await createProduct(data); 
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
                            }
                          }}
                        />
                      )}
                    </div>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  {...register("description", { required: true })}
                  multiline
                  rows={4}
                  variant="outlined"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Slider Image 1 URL"
                  {...register("sliderImageOne")}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Slider Image 2 URL"
                  {...register("sliderImageTwo")}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Slider Image 3 URL"
                  {...register("sliderImageThree")}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Gameplay Video URL"
                  {...register("gameplayVideo")}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
             
            </Grid> 
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Page;
