import React from 'react'
import {Snackbar} from '@mui/material';
import {Slide} from '@mui/material';
import {Alert} from '@mui/material';
import { useAlert } from '../context/AlertContext';

function AlertSnackbar({open}) {

    const {alert} = useAlert();

  return (
    <div>
            <Snackbar
            open = {alert.open}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}>

                <Slide in={alert.open} >
                <Alert variant="filled" severity={alert.type?alert.type:"error"}>
                        {alert.message}
                    </Alert>
                </Slide>

            </Snackbar>
    </div>
  )
}

export default AlertSnackbar