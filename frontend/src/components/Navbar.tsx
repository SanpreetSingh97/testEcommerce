"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const onShop = pathname === "/";
  const onCart = pathname.startsWith("/cart");

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(243, 241, 236, 0.86)",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
        backdropFilter: "blur(14px)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 1.25, minHeight: 72 }}>
          <Box
            component={Link}
            href="/"
            sx={{
              display: "flex",
              alignItems: "baseline",
              gap: 0.75,
              textDecoration: "none",
              color: "inherit",
              mr: "auto",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "primary.main",
              }}
            >
              Shoply
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 600,
                display: { xs: "none", sm: "inline" },
              }}
            >
              Goods
            </Typography>
          </Box>

          <Button
            component={Link}
            href="/"
            color={onShop ? "primary" : "inherit"}
            variant={onShop ? "contained" : "text"}
            size="small"
          >
            Shop
          </Button>

          <IconButton
            component={Link}
            href="/cart"
            aria-label={`Shopping bag, ${itemCount} items`}
            sx={{
              border: "1px solid",
              borderColor: onCart ? "primary.main" : "divider",
              bgcolor: onCart ? "primary.main" : "background.paper",
              color: onCart ? "primary.contrastText" : "text.primary",
              "&:hover": {
                bgcolor: onCart ? "primary.dark" : "grey.100",
              },
            }}
          >
            <Badge
              badgeContent={itemCount}
              color="secondary"
              max={99}
              overlap="circular"
            >
              <ShoppingBagOutlinedIcon fontSize="small" />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
