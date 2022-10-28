import React,{useState} from 'react'
import { Box, Button, TextField } from '@mui/material'
import { auth } from '../FirebaseConfig'
import { useTheme } from '../context/ThemeContext';
import { useAlert } from '../context/AlertContext';



function LoginForm({handelClose}) {

const {theme} = useTheme();
const {setAlert} = useAlert();

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const handleSubmit = () => {
    if(!email || !password){
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
    auth.signInWithEmailAndPassword(email,password).then((ok) => {
        setAlert({
            open: true,
            type: 'success',
            message: 'logged in'
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
        console.log(err.code, err.message);
        setAlert({
            open: true,
            type: 'error',
            message: 'not able to login'
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
    }}>
        <TextField
            variant= "outlined"
            type= "email"
            label= "Enter Email"
            autoComplete='off'
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
                    color: theme.title
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

        <Button
        variant= "contained"
        size= "large"
        style= {{backgroundColor: theme.title, color: theme.background}}
        onClick = {handleSubmit}
        >
            Login

        </Button>

    </Box>
  )
}

export default LoginForm