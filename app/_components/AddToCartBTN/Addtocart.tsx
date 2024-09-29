"use client"
import { addToCart } from "@/app/(actions)/cart"
import style from "./style.module.scss"

const Addtocart = ({productId}:{productId:string}) => {
    const handleAddToCart =  () => {
         addToCart({productId,quantity:1})}
  return (
   <>
   <button onClick={()=>handleAddToCart()} className={style.Addtocart}>Add to Cart</button>
   </>
)
}

export default Addtocart