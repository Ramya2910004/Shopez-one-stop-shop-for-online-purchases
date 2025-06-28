export const filterAndSortProducts = (products, category, gender, sortBy) => {
  let filteredProducts = [...products];

  // Filter by category
  if (category && category !== "All") {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }

  // Only apply gender filter for Fashion category
  if (
    gender && gender !== "All" &&
    (category === "Fashion" || category === "All")
  ) {
    filteredProducts = filteredProducts.filter(product => product.gender === gender);
  }

  // Sort products
  switch (sortBy) {
    case "Price: Low to High":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "Price: High to Low":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "Rating":
      // Since MongoDB doesn't have rating, sort by popularity (id)
      filteredProducts.sort((a, b) => a._id.localeCompare(b._id));
      break;
    case "Popularity":
    default:
      // Keep original order for popularity
      break;
  }

  return filteredProducts;
}; 