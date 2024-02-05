
import React, { useEffect, useState } from "react"
import style from './Sign.module.css'
import mountain from '../../assests/Images/mountain.jpg'
import TextField from '@mui/material/TextField';
import Glogo from '../../assests/Images/google.png'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { UserContext } from "../../useContext/UserContext";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { rootShouldForwardProp } from "@mui/material/styles/styled";
const SignForm = () => {
    const { user, setUser, fetchUserData } = useContext(UserContext);
    const { type } = useParams()
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: "",
        password: ""

    });

    useEffect(() => {
        console.log(type)

    }, [type])

    const styleField = {
        '& .MuiOutlinedInput-root': {
            borderColor: 'darkgray', // Default border color
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { // More specific selector for focus
                borderColor: 'darkgray',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': { // More specific selector for hover
                borderColor: 'darkgray',
            },
            '& .MuiInputLabel-root': {
                color: 'black'
            },
        },

        '& .MuiInputLabel-root': {
            color: 'gray', // Set desired label color here
        },


    }

    const handleSign = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        console.log(formData)
    }

    const submitForm=async(e)=>{
            e.preventDefault();
        
            if (!formData.email || !formData.password) {
            //   toast.error("Please enter your email.");
              console.log("Fields are required")
              return;
            }
            else{
                if(type==="in"){
                    setFormData({
                        email: formData.email,
                        password:formData.password
                    });  
                    
                    try {
                        const response = await axios.post(
                          `${process.env.REACT_APP_BACKEND}/login`,
                          formData,
                          { withCredentials: true }
                        );
                        if (response.data) {
                            setUser(response.data.user)
                        //   await fetchUserData();
                          navigate('/')
                          console.log("Login successfully");
                        }
                      } catch (error) {
                      
                          console.log("An error occurred. Please try again.");
                        
                      }
                   }
                   else{

                    try {
                        setFormData({
                            name:formData.firstName+" "+formData.lastName,
                            email: formData.email,
                            password:formData.password
                        });  

                        const response = await axios.post(
                          `${process.env.REACT_APP_BACKEND}/user/register`,
                          formData,
                          { withCredentials: true }
                        );
                        if (response.data) {
                        navigate('/sign/in')
                          console.log("SIgnup successfully");
                        }
                      } catch (error) {
                          console.log(error.message);
                        
                      }

                   }
            }
    }
    return (
        <div className={style.signPage}>
            <img src={mountain} className={style.backImg} />
            <section className={style.SignForm}>
                <div className={style.signTitle}>Welcome back.</div>
                <div className={style.signTitle}> Log in and start exploring </div>
                <form className={style.form}>
                    {type === "up" && (

                        <TextField id="firstName" label="first Name" name="firstName" placeholder='Your first Name' type="name" variant="outlined" required
                            sx={styleField}
                            className={style.inputs}
                            onChange={(e) => handleSign(e)}

                        />)
                    }
                    {type === "up" && (
                        <TextField id="lastName" label="last Name" name="lastName" placeholder='Your last Name' type="name" variant="outlined" required
                            sx={styleField}
                            className={`${type !== "up" ? style.hide : style.show}`}
                            onChange={(e) => handleSign(e)}

                        />
                    )}

                    <TextField id="email" label="Your Email" name="email" placeholder='Ex: email@gmail.com' type="email" variant="outlined" required
                        sx={styleField}
                        className={style.inputs}
                        onChange={(e) => handleSign(e)}
                    />
                    <TextField id="password" label="Your Password" name="password" placeholder='*****' type="password" variant="outlined" required
                        sx={styleField}
                        className={style.inputs}
                        onChange={(e) => handleSign(e)}
                    />
                    <button className={`${style.signBtn} ${style.btns}`} onClick={submitForm}>
                        {"Sign" + " " + type}
                    </button>
                    <button className={`${style.GBtn} ${style.btns}`}>
                        <img src={Glogo} className={style.googleImg} />  Sign With Google
                    </button>
                </form>
                {
                    type === "up" ? (
                        <span className={style.signSpan}> Already have an account? <Link className={style.links} to={'/sign/in'}>Sign In</Link></span>

                    ) : (
                        <span className={style.signSpan}> Don't have an account? <Link className={style.links} to={'/sign/up'}>Sign Up for free</Link></span>

                    )
                }

            </section>
        </div>
    )

}
export default SignForm