"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Pagination from "@mui/material/Pagination";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import { api } from "@/lib/api";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { pluralize } from "@/lib/format";
import type { Product } from "@/types";

const PAGE_SIZE = 8;

function ProductGridSkeleton() {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: PAGE_SIZE }).map((_, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Skeleton variant="rounded" height={320} sx={{ borderRadius: 3 }} />
        </Grid>
      ))}
    </Grid>
  );
}

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const debouncedSearch = useDebouncedValue(search.trim(), 400);
  const isDebouncing = search.trim() !== debouncedSearch;

  // Reset to first page whenever search/filter/sort changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category, sort]);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await api.getProducts({
          search: debouncedSearch || undefined,
          category,
          sort,
          page,
          limit: PAGE_SIZE,
          signal: controller.signal,
        });

        if (!active) return;

        setProducts(data.products);
        setCategories(data.categories);
        setTotal(data.total);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (!active) return;
        setProducts([]);
        setTotal(0);
        setTotalPages(1);
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        if (active && !controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      active = false;
      controller.abort();
    };
  }, [debouncedSearch, category, sort, page, reloadKey]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  const resultLabel = useMemo(() => {
    if (loading || isDebouncing) return "Updating results…";
    const base = pluralize(total, "product");
    if (debouncedSearch) return `${base} matching “${debouncedSearch}”`;
    if (category !== "all") return `${base} in ${category}`;
    return base;
  }, [loading, isDebouncing, total, debouncedSearch, category]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack spacing={4}>
        <Box sx={{ display: "grid", gap: 1.5, maxWidth: 640 }}>
          <Typography
            variant="overline"
            sx={{ letterSpacing: "0.14em", color: "secondary.main", fontWeight: 700 }}
          >
            Catalog
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            Everyday goods, carefully chosen
          </Typography>
          <Typography color="textSecondary" sx={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
            Search and filters always query the live MongoDB catalog with pagination.
          </Typography>
        </Box>

        <ProductFilters
          search={search}
          category={category}
          sort={sort}
          categories={categories}
          isSearching={loading || isDebouncing}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
        />

        <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 600 }}>
          {resultLabel}
          {!loading && total > 0 ? ` · Page ${page} of ${totalPages}` : ""}
        </Typography>

        {error && (
          <ErrorState
            message={error}
            onRetry={() => setReloadKey((key) => key + 1)}
          />
        )}

        {!error && (loading || isDebouncing) && products.length === 0 && (
          <ProductGridSkeleton />
        )}

        {!error && !loading && !isDebouncing && products.length === 0 && (
          <EmptyState
            title="No products found"
            description="Try a different keyword or clear the category filter."
          />
        )}

        {!error && products.length > 0 && (
          <Fade in timeout={280}>
            <Box>
              <Grid
                container
                spacing={3}
                sx={{
                  opacity: loading || isDebouncing ? 0.55 : 1,
                  transition: "opacity 200ms ease",
                }}
              >
                {products.map((product) => (
                  <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>

              {totalPages > 1 && (
                <Stack sx={{ mt: 4, alignItems: "center" }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => {
                      setPage(value);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    color="primary"
                    shape="rounded"
                    size="large"
                  />
                </Stack>
              )}
            </Box>
          </Fade>
        )}
      </Stack>
    </Container>
  );
}
