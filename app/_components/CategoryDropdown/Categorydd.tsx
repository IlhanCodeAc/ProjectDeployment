import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Category } from "@prisma/client";
import { getCategories } from "@/app/(actions)/cart";

interface CategorySelectProps {
  control: any; // Adjust according to your types
  name: string;
  required?: boolean;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ name, required }) => {
  const [categories, setCategories] = useState<Category[]>([]); // Explicitly typed

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel id="category-label">Category</InputLabel>
      <Controller
        name={name}
        render={({ field }) => (
          <Select
            labelId="category-label"
            {...field}
            required={required}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default CategorySelect;
