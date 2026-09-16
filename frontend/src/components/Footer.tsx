"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NextLink from "next/link";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "rgba(255,255,255,0.55)",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            alignItems: { sm: "center" },
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 800, letterSpacing: "-0.03em" }}>
              Shoply
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Curated everyday goods — thoughtfully made, fairly priced.
            </Typography>
          </Box>
          <Stack direction="row" spacing={2.5}>
            <Link
              component={NextLink}
              href="/"
              underline="hover"
              color="textSecondary"
              variant="body2"
            >
              Shop
            </Link>
            <Link
              component={NextLink}
              href="/cart"
              underline="hover"
              color="textSecondary"
              variant="body2"
            >
              Bag
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
