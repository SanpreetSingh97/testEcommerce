"use client";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

type Props = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorState({ message, onRetry }: Props) {
  return (
    <Box sx={{ py: 4 }}>
      <Alert
        severity="error"
        action={
          onRetry ? (
            <Button color="inherit" size="small" onClick={onRetry}>
              Retry
            </Button>
          ) : undefined
        }
      >
        {message}
      </Alert>
    </Box>
  );
}
