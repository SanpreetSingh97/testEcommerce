export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const pluralize = (count: number, singular: string, plural?: string) =>
  `${count} ${count === 1 ? singular : plural || `${singular}s`}`;
