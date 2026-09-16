"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ErrorState from "@/components/ErrorState";
import QuantityStepper from "@/components/QuantityStepper";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";

export default function ProductDetails() {
  const params = useParams<{ id: string }>();
  const { addItem, refreshing } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [actionError, setActionError] = useState<string | null>(null);
  const [toastOpen, setToastOpen] = useState(false);

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!params.id) return;
    const controller = new AbortController();

    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getProduct(params.id, controller.signal);
        setProduct(data);
        setQuantity(1);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadProduct();
    return () => controller.abort();
  }, [params.id, reloadKey]);

  const handleAddToCart = async () => {
    if (!product) return;
    setActionError(null);
    try {
      await addItem(product._id, quantity);
      setToastOpen(true);
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Could not add to cart"
      );
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant="rounded" height={460} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton width="30%" height={28} />
            <Skeleton width="85%" height={52} sx={{ mt: 2 }} />
            <Skeleton width="25%" height={40} sx={{ mt: 2 }} />
            <Skeleton height={140} sx={{ mt: 3 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <ErrorState
          message={error || "Product not found"}
          onRetry={() => setReloadKey((key) => key + 1)}
        />
        <Button component={Link} href="/" startIcon={<ArrowBackIcon />}>
          Back to shop
        </Button>
      </Container>
    );
  }

  const outOfStock = product.stock <= 0;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
      <Button
        component={Link}
        href="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3.5 }}
      >
        Back to shop
      </Button>

      <Grid container spacing={{ xs: 3, md: 6 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: "100%",
              height: { xs: 300, md: 520 },
              objectFit: "cover",
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "#ebe7e0",
              boxShadow: 2,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2.75} sx={{ maxWidth: 520 }}>
            <Chip
              label={product.category}
              variant="outlined"
              sx={{ alignSelf: "flex-start" }}
            />
            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              {product.name}
            </Typography>
            <Typography
              variant="h4"
              color="secondary"
              sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}
            >
              {formatPrice(product.price)}
            </Typography>
            <Typography color="textSecondary" sx={{ lineHeight: 1.8, fontSize: "1.05rem" }}>
              {product.description || "No description available."}
            </Typography>

            <Divider />

            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {outOfStock ? (
                <Chip label="Sold out" size="small" />
              ) : (
                <>
                  {product.stock} in stock
                  {product.stock <= 8 ? " · shipping soon may vary" : ""}
                </>
              )}
            </Typography>

            {!outOfStock && (
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Quantity
                </Typography>
                <QuantityStepper
                  value={quantity}
                  min={1}
                  max={product.stock}
                  onChange={setQuantity}
                  disabled={refreshing}
                />
              </Stack>
            )}

            {actionError && <Alert severity="error">{actionError}</Alert>}

            <Button
              variant="contained"
              size="large"
              color="secondary"
              startIcon={<ShoppingBagOutlinedIcon />}
              onClick={handleAddToCart}
              disabled={outOfStock || refreshing}
              sx={{ alignSelf: { xs: "stretch", sm: "flex-start" } }}
            >
              {outOfStock ? "Sold out" : refreshing ? "Adding…" : "Add to bag"}
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Snackbar
        open={toastOpen}
        autoHideDuration={2600}
        onClose={() => setToastOpen(false)}
        message="Added to your bag"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Container>
  );
}
