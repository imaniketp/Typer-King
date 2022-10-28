import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useAlert } from '../context/AlertContext';
import { useTheme } from '../context/ThemeContext'
import { auth } from '../FirebaseConfig'



function SignUpForm({handelClose}) {

 const {theme} = useTheme();

 const {setAlert} = useAlert();
    
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')

const handleSubmit = () => {
    if(!email || !password || !confirmPassword){
        setAlert({
            open: true,
            type: 'warning',
            message: 'fill all details'
        });
        setTimeout(()=>{
            setAlert({
                open:false,
                type: "",
                message: ""
            })
        },2000);;
        return;
    }
    if(password!==confirmPassword){
        setAlert({
            open: true,
            type: 'warning',
            message: 'password mismatch'
        });
        setTimeout(()=>{
            setAlert({
                open:false,
                type: "",
                message: ""
            })
        },2000);;
        return;
    }

    auth.createUserWithEmailAndPassword(email,password).then((ok)=>{
        setAlert({
            open: true,
            type: 'success',
            message: 'Account Created'
        });
        setTimeout(()=>{
            setAlert({
                open:false,
                type: "",
                message: ""
            })
        },2000);
        handelClose();
    }).catch((err)=>{
        setAlert({
            open: true,
            type: 'error',
            message: 'Unable to SignUp'
        });
        setTimeout(()=>{
            setAlert({
                open:false,
                type: "",
                message: ""
            })
        },2000);
    });
}

  return (

    <Box
    p={3}
    style={{
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    }}
    >
        <TextField
            variant= "outlined"
            type= "email"
            label= "Enter Email"
            InputLabelProps={{
                style: {
                    color: theme.title,
                } }}
            InputProps={{
                style:{
                    color: theme.title,
                }
            }
            }
            onChange={(e) => setEmail(e.target.value)}
        >
        </TextField>

        <TextField
            variant= "outlined"
            type= "password"
            label= "Enter Password"
            autoComplete='new-password'
            InputLabelProps={{
                style: {
                    color: theme.title,
                } }}
            InputProps={{
                style:{
                    color: theme.title,
                }
            }
            }
            onChange={(e) => setPassword(e.target.value)}
        >
        </TextField>

        <TextField
            variant= "outlined"
            type= "password"
            label= "Confirm Password"
            InputLabelProps={{
                style: {
                    color: theme.title,
                } }}
            InputProps={{
                style:{
                    color: theme.title,
                }
            }
            }
            onChange={(e) => setConfirmPassword(e.target.value)}
        >
        </TextField>

        <Button
        variant= "contained"
        size= "large"
        style= {{backgroundColor: theme.title, color: theme.background}}
        onClick = {handleSubmit}>
            Sign Up

        </Button>

    </Box>
  )
}

export default SignUpForm