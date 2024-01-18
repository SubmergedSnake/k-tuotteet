import { Alert, AlertColor, Snackbar } from "@mui/material";

interface EphemeralToastProps {
  message: string;
  duration: number;
  open: boolean;
  toastColor: AlertColor
  closeToast: () => void
}

const EphemeralToast = ({ open, message, duration, closeToast, toastColor }: EphemeralToastProps) => {

  return (
    <Snackbar
      onClose={closeToast}
      open={open}
      autoHideDuration={duration}>
      <Alert severity={toastColor} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>

  )
}

export default EphemeralToast
