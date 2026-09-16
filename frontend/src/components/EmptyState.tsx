"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import Link from "next/link";

type Props = {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
};

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: Props) {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 10,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1.5,
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 3,
        bgcolor: "rgba(255,255,255,0.45)",
      }}
    >
      <Inventory2OutlinedIcon sx={{ fontSize: 52, color: "text.disabled" }} />
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      {description && (
        <Typography color="textSecondary" sx={{ maxWidth: 380, lineHeight: 1.7 }}>
          {description}
        </Typography>
      )}
      {actionLabel && actionHref && (
        <Button
          component={Link}
          href={actionHref}
          variant="contained"
          color="secondary"
          sx={{ mt: 1 }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
