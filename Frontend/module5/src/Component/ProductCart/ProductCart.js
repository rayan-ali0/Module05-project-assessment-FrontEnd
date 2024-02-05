import styled from "@emotion/styled";
import React from "react";
import style from "./Product.module.css"
import { Link } from "react-router-dom";
const ProductCart=({item})=>{
    return(
        <section className={style.productCart}>
            <div  className={style.image}>
            <Link to={`/productDetails/${item.slug}`}>
            <img src={`${process.env.REACT_APP_BACKEND}/${item.image}`}  className={style.itemImg}/>

            </Link>
            </div>
           
            <h4>{item.title||'no title'}</h4>
            <div className={style.btmSection}>
                <span>{item.price||'no price'}</span>
                <button className={style.btn}>Add to Cart</button>
            </div>
        </section>
    )
}

export default  ProductCart
