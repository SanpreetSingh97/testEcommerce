"use client";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A–Z" },
] as const;

type Props = {
  search: string;
  category: string;
  sort: string;
  categories: string[];
  isSearching?: boolean;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

export default function ProductFilters({
  search,
  category,
  sort,
  categories,
  isSearching = false,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: Props) {
  return (
    <Stack spacing={2.5}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ width: "100%" }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search products…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  {isSearching ? (
                    <CircularProgress size={16} thickness={5} />
                  ) : (
                    <SearchIcon fontSize="small" color="action" />
                  )}
                </InputAdornment>
              ),
              endAdornment: search ? (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    aria-label="Clear search"
                    onClick={() => onSearchChange("")}
                    edge="end"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : undefined,
            },
          }}
        />
        <TextField
          select
          size="small"
          label="Sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          sx={{ minWidth: { md: 220 } }}
        >
          {SORT_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        <Chip
          label="All"
          clickable
          component="button"
          type="button"
          color={category === "all" ? "primary" : "default"}
          variant={category === "all" ? "filled" : "outlined"}
          onClick={() => onCategoryChange("all")}
        />
        {categories.map((item) => (
          <Chip
            key={item}
            label={item}
            clickable
            component="button"
            type="button"
            color={category === item ? "primary" : "default"}
            variant={category === item ? "filled" : "outlined"}
            onClick={() => onCategoryChange(item)}
          />
        ))}
      </Box>
    </Stack>
  );
}
