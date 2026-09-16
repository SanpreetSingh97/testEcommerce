"use client";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

type Props = {
  value: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  onChange: (next: number) => void;
  allowDeleteAtMin?: boolean;
};

export default function QuantityStepper({
  value,
  min = 1,
  max = 99,
  disabled = false,
  onChange,
  allowDeleteAtMin = false,
}: Props) {
  const atMin = value <= min;
  const showDelete = allowDeleteAtMin && value === min;

  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{
        alignItems: "center",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 999,
        px: 0.5,
        py: 0.25,
        bgcolor: "background.paper",
      }}
    >
      <IconButton
        size="small"
        disabled={disabled || (!allowDeleteAtMin && atMin)}
        onClick={() => onChange(Math.max(allowDeleteAtMin ? 0 : min, value - 1))}
        aria-label={showDelete ? "Remove item" : "Decrease quantity"}
      >
        {showDelete ? (
          <DeleteOutlinedIcon fontSize="small" />
        ) : (
          <RemoveIcon fontSize="small" />
        )}
      </IconButton>
      <Typography
        aria-live="polite"
        sx={{ minWidth: 28, textAlign: "center", fontWeight: 700, fontSize: 14 }}
      >
        {value}
      </Typography>
      <IconButton
        size="small"
        disabled={disabled || value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Increase quantity"
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}
