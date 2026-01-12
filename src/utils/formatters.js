export const formatPrice = (price, currency) => {
  if (!price) {
    return "By request";
  }

  const value = price[currency?.toLowerCase()];
  if (!value) {
    return "By request";
  }

  try {
    return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
      style: "currency",
      currency
    }).format(value);
  } catch (error) {
    return `${currency} ${value}`;
  }
};

export const formatList = (items) => {
  if (!items || items.length === 0) {
    return "";
  }
  return items.join(", ");
};
