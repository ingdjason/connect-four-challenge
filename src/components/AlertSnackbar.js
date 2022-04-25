import React from "react";
import { Snackbar, Alert } from "@mui/material";

const AlertSnackbar = ({open, handleClose, message, severity})=>{
  return <Snackbar 
    open={open} 
    autoHideDuration={6000} 
    onClose={(e)=>{
      handleClose({open: false, message:'', severity: ''})
    }}
    anchorOrigin={{ vertical:'top', horizontal: 'right' }}>
    <Alert severity={severity} sx={{ width: '100%' }}
      onClose={(e)=>{
        handleClose({open: false, message:'', severity: ''})
      }}>
      {message}
    </Alert>
</Snackbar>
}

export default AlertSnackbar