"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";
import QuantityStepper from "@/components/QuantityStepper";
import { useCart } from "@/context/CartContext";
import { formatPrice, pluralize } from "@/lib/format";

export default function CartView() {
  const { cart, loading, refreshing, updateItem } = useCart();
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async (itemId: string, quantity: number) => {
    setError(null);
    try {
      await updateItem(itemId, quantity);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update cart");
    }
  };

  if (loading) {
    return <LoadingState label="Loading your bag…" />;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <EmptyState
          title="Your bag is empty"
          description="Browse the catalog and add something you’ll use every day."
          actionLabel="Continue shopping"
          actionHref="/"
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          Your bag
        </Typography>
        <Typography color="textSecondary">
          {pluralize(cart.itemCount, "item")} ready when you are
        </Typography>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={2}>
        {cart.items.map((item) => (
          <Paper
            key={item._id}
            elevation={0}
            sx={{
              p: 2.25,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              opacity: refreshing ? 0.72 : 1,
              transition: "opacity 160ms ease",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2.25}
              sx={{ alignItems: { sm: "center" } }}
            >
              <Box
                component={Link}
                href={`/products/${item.product._id}`}
                sx={{ display: "block", flexShrink: 0 }}
              >
                <Box
                  component="img"
                  src={item.product.image}
                  alt={item.product.name}
                  sx={{
                    width: { xs: "100%", sm: 104 },
                    height: { xs: 200, sm: 104 },
                    objectFit: "cover",
                    borderRadius: 2,
                    bgcolor: "#ebe7e0",
                  }}
                />
              </Box>

              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography
                  component={Link}
                  href={`/products/${item.product._id}`}
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": { color: "secondary.main" },
                  }}
                >
                  {item.product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.product.category}
                </Typography>
                <Typography sx={{ fontWeight: 700, mt: 0.5 }}>
                  {formatPrice(item.product.price)}
                </Typography>
              </Box>

              <QuantityStepper
                value={item.quantity}
                min={1}
                max={item.product.stock}
                disabled={refreshing}
                allowDeleteAtMin
                onChange={(next) => handleUpdate(item._id, next)}
              />

              <Typography
                sx={{
                  fontWeight: 800,
                  minWidth: { sm: 92 },
                  textAlign: { sm: "right" },
                  letterSpacing: "-0.02em",
                }}
              >
                {formatPrice(item.product.price * item.quantity)}
              </Typography>
            </Stack>
          </Paper>
        ))}
      </Stack>

      <Paper
        elevation={0}
        sx={{
          mt: 3.5,
          p: 3,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(243,241,236,0.9) 100%)",
        }}
      >
        <Stack spacing={1.25} sx={{ mb: 2.5 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography color="textSecondary">Subtotal</Typography>
            <Typography sx={{ fontWeight: 600 }}>
              {formatPrice(cart.subtotal)}
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography color="textSecondary">Shipping</Typography>
            <Typography sx={{ fontWeight: 600 }}>Calculated later</Typography>
          </Stack>
          <Divider />
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Total
            </Typography>
            <Typography variant="h6" color="secondary" sx={{ fontWeight: 800 }}>
              {formatPrice(cart.subtotal)}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Button component={Link} href="/" variant="outlined" fullWidth>
            Continue shopping
          </Button>
          <Button variant="contained" color="secondary" fullWidth disabled>
            Checkout soon
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
