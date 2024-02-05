import React, { useEffect, useState } from "react"
import style from "./home.module.css"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../useContext/UserContext";
import axios from "axios";
import { useContext } from "react";
import ProductCart from '../../Component/ProductCart/ProductCart'
const Home = () => {
    const { user, setUser, fetchUserData } = useContext(UserContext);
const [products,setProducts]=useState([])
    const navigate = useNavigate()
    const signIn = () => {
        navigate('/sign/in')
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts= async()=>{
try{
    const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/product/read/all`);
        if(response){
            setProducts(response.data)
            console.log(response.data)
        }
}
catch(error){
    console.log(error.message)
}
    }
    return (
        <div>
            <button className={`${style.signBtn} ${style.btns}`} onClick={signIn}>
                {user ? "Log out" :
                    "Log in"}
            </button>
<button className={`${style.signBtn} ${style.btns}`}>
Cart
</button>
            <div className={style.productsHolder}>
                {products&& products.length>0&&(
products.map((product,index)=>(
    <ProductCart key={index} item={product} /> 
))
                )}
                {/* <ProductCart /> */}
            </div>
        </div>
    )
}
export default Home