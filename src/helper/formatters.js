export const formatCurrency = (value) => {
  if (!value) return "0";
  return "₹" + Number(value).toLocaleString("en-IN");
};
