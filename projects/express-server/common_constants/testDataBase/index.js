const { ObjectId } = require('mongodb');

const PRODUCTS = (() => {
  const SEASONS = ['Літній', 'Весняний', 'Осінній', 'Зимовий'];
  const CLOTHING_TYPES = ['футболка', 'світшот', 'штани', 'куртка', 'кепка', 'светр', 'шорти', 'кросівки'];

  const getRandomName = () => {
    const randomSeason = SEASONS[Math.floor(Math.random() * SEASONS.length)];
    const randomClothingType = CLOTHING_TYPES[Math.floor(Math.random() * CLOTHING_TYPES.length)];

    const generateRandomWord = (length) => {
      const v = 'aeiou';
      const c = 'bcdfghjklmnpqrstvwxyz';
      let r = '';
      let i = Math.random() < 0.5;

      for (let j = 0; j < length; j++) {
        r += i ? v[Math.floor(Math.random() * v.length)] : c[Math.floor(Math.random() * c.length)];
        i = !i;
      }

      return '"' + r.charAt(0).toUpperCase() + r.slice(1) + '"';
    };

    return `${randomSeason} ${randomClothingType} ${generateRandomWord(5)}`;
  };

  const products = [];

  for (let i = 1; i <= 500; i++) {
    const productName = getRandomName();

    products.push({
      _id: new ObjectId(),
      i: i,
      name: productName,
      price: Math.floor(Math.random() * 100) + 1,
      imageUrl: `https://via.placeholder.com/150?text=${productName.replace(/ /g, '+')}`,
    });
  }

  return products;
})();

module.exports = {
  PRODUCTS,
};
