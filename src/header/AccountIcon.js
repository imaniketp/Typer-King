import React,{useState} from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Box, Modal, AppBar, Tabs, Tab } from '@mui/material';
import { makeStyles } from "@mui/styles";
import SignUpForm from '../signUp/SignUpForm';
import LoginForm from '../signUp/LoginForm';
import { auth } from '../FirebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate} from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAlert } from '../context/AlertContext';

const useStyles = makeStyles(() => ({
    modal:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(2px)'
    },
    box: {
        width: 400,
        textAlign: 'center',
    }
}))

function AccountIcon() {

const [open, setOpen] = useState(false);
const [value, setValue] = useState(0);
const {setAlert} = useAlert();
const [user] = useAuthState(auth);

const googleProvider = new GoogleAuthProvider();

const SignInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((res) => {
        setAlert({
            open: true,
            type: 'success',
            message: 'Logged in'
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
            message: 'not able to use google auth'
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

const handelClose =() => {
    setOpen(false);
}

const handelChange = (e, v) => {
    setValue(v);
}
const navigate = useNavigate();

const logout = () =>{
    auth.signOut().then((okk)=>{
        setAlert({
            open: true,
            type: 'success',
            message: 'logged out!'
        });
        setTimeout(()=>{
            setAlert({
                open:false,
                type: "",
                message: ""
            })
        },2000);
        navigate("/");
    });
}

const handelAccountClick = () => {
    if(user){
        navigate('/user');
    }
    else{
        setOpen(true);
    }
}

const {theme} = useTheme();
const  classes = useStyles();

  return (
    <div >
        <AccountCircleIcon fontSize='large' onClick={handelAccountClick} />
        {user && <LogoutIcon fontSize='large' onClick={logout} />}

        <Modal 
                open={open}
                onClose={handelClose}
                className = {classes.modal}
                >
                        <div className={classes.box}>
                            <AppBar
                            position='static'
                            style={{
                                backgroundColor: 'transparent'}}
                            >
                                <Tabs
                                value={value}
                                variant="fullWidth"
                                onChange={handelChange}>

                                    <Tab label='login' 
                                        style={{
                                            color: theme.title,
                                        }}></Tab>

                                    <Tab label='signup'
                                        style={{
                                            color: theme.title,
                                        }}></Tab>
                                </Tabs>
                            </AppBar>
                            {value === 0 && <LoginForm handelClose ={handelClose} />}
                            {value === 1 && <SignUpForm handelClose ={handelClose}/>}

                            <Box className={classes.box}>
                                <span>OR</span>
                                <GoogleButton 
                                style={{width: '100%', marginTop: '1rem'}}
                                onClick={SignInWithGoogle} />
                            </Box>
                        </div>
                </Modal>
        
        
    </div>
  )
}

export default AccountIcon