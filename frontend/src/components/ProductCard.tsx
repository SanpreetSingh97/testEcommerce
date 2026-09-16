"use client";

import Link from "next/link";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const outOfStock = product.stock <= 0;
  const lowStock = !outOfStock && product.stock <= 8;

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        overflow: "hidden",
        transition: "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 3,
          borderColor: "transparent",
          "& .product-image": {
            transform: "scale(1.04)",
          },
        },
      }}
    >
      <CardActionArea
        component={Link}
        href={`/products/${product._id}`}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            position: "relative",
            pt: "72%",
            bgcolor: "#ebe7e0",
            overflow: "hidden",
          }}
        >
          <CardMedia
            className="product-image"
            component="img"
            image={product.image}
            alt={product.name}
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: outOfStock ? 0.5 : 1,
              transition: "transform 320ms ease",
            }}
          />
          <Stack
            direction="row"
            spacing={0.75}
            sx={{ position: "absolute", top: 12, left: 12 }}
          >
            {outOfStock && (
              <Chip label="Sold out" size="small" sx={{ bgcolor: "rgba(255,255,255,0.92)" }} />
            )}
            {lowStock && (
              <Chip
                label="Low stock"
                size="small"
                color="secondary"
                sx={{ bgcolor: "rgba(255,255,255,0.92)" }}
              />
            )}
          </Stack>
        </Box>
        <CardContent sx={{ flexGrow: 1, width: "100%", p: 2.25 }}>
          <Stack spacing={1.1}>
            <Typography
              variant="caption"
              sx={{
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "text.secondary",
                fontWeight: 700,
              }}
            >
              {product.category}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                lineHeight: 1.35,
                minHeight: 44,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {product.name}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
              {formatPrice(product.price)}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
