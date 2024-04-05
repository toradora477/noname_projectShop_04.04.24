const PRODUCTS = (() => {
  // ? Example of product data (typically the data will come from an API or state store)
  const products = [];

  for (let i = 1; i <= 500; i++) {
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 1, // Random price from 1 to 100
      imageUrl: `https://via.placeholder.com/150?text=Product ${i}`, // Use the text "Product{i}" as the image label
    });
  }

  return products;
})();

module.exports = {
  PRODUCTS,
};
