"use client";

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/navigation';

export default function Dropdown() {
  const router = useRouter();
  const [sortOrder, setSortOrder] = React.useState('');

  const handleChange = ((event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value as string;
    setSortOrder(selectedValue);
    
    const query = selectedValue ? `?sort=price-${selectedValue}` : '';
    router.push(`/products${query}`); 
  })

  return (
    <div>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="sort-select-label">Sort</InputLabel>
        <Select
          labelId="sort-select-label"
          id="sort-select"
          value={sortOrder}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="asc">Price: Low to High</MenuItem>
          <MenuItem value="desc">Price: High to Low</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
