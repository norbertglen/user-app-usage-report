import React, { useEffect, useState } from 'react'
import { Alert, AlertTitle, Box } from '@mui/material';

export function Notification({ notification }) {
  const [message, setMessage] = useState('')
  const type = notification?.type
  const text = notification?.text
  useEffect(() => {
    setMessage(text)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }, [text])
  return message ? (
    <Box mb={1}>
      <Alert severity={type} onClose={() => setMessage('')}>
        <AlertTitle>{type}</AlertTitle>
        {text}
      </Alert>
    </Box>
  ) : null
}

export default Notification
