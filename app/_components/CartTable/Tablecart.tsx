import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCartWithItems } from '@/app/(actions)/cart';
import { cart, CartItem } from "@prisma/client";

type SafeCart = cart & {
  items: CartItem[]; // Assuming items are of type CartItem
};

export default function Carttable() {
  const [cart, setCart] = useState<SafeCart | null>(null);   

  useEffect(() => {
    getCartWithItems()
      .then((cart) => {
        setCart(cart);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart?.items.map((item) => (
              <TableRow
                key={item.id} // Assuming CartItem has a unique id
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name} {/* Displaying CartItem's name */}
                </TableCell>
                <TableCell align="right">{item.quantity}</TableCell> {/* Displaying quantity */}
                <TableCell align="right">{item.fat}</TableCell> {/* Displaying fat */}
                <TableCell align="right">{item.carbs}</TableCell> {/* Displaying carbs */}
                <TableCell align="right">{item.protein}</TableCell> {/* Displaying protein */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
