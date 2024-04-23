import React, { useState } from 'react';
import { request } from '../../tools';
import { Modal } from '../../components';
import './ProductAdd.scss';

const ProductAdd = () => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    colors: [{ colorName: '', images: [] }],
  });

  const handleChange = (e, index) => {
    const { name, value, files } = e.target;
    if (name === 'colorName') {
      const updatedColors = [...formData.colors];
      updatedColors[index] = { ...updatedColors[index], colorName: value };
      setFormData({ ...formData, colors: updatedColors });
    } else if (name === 'colorImage') {
      const updatedColors = [...formData.colors];
      const images = updatedColors[index].images.concat([...files]); // Додавання нових файлів до існуючого масиву зображень
      updatedColors[index] = { ...updatedColors[index], images };
      setFormData({ ...formData, colors: updatedColors });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddColor = () => {
    setFormData({
      ...formData,
      colors: [...formData.colors, { colorName: '', images: [] }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append('productName', formData.productName);
    body.append('description', formData.description);
    body.append('price', formData.price);
    formData.colors.forEach((color, index) => {
      body.append(`colors[${index}][colorName]`, color.colorName);
      color.images.forEach((image) => {
        body.append(`colors[${index}][images]`, image);
      });
    });

    request.post('/products/info', body, () => {
      console.log('Товар успішно додано');
    });
  };

  return (
    <Modal position="center">
      <form onSubmit={handleSubmit} className="product-form-add">
        <label className="form-label">
          Назва товару:
          <input type="text" name="productName" value={formData.productName} onChange={handleChange} className="form-input" required />
        </label>
        <label className="form-label">
          Опис:
          <textarea name="description" value={formData.description} onChange={handleChange} className="form-input textarea" required />
        </label>
        <label className="form-label">
          Ціна:
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-input" required />
        </label>
        {formData.colors.map((color, index) => (
          <div key={index}>
            <label className="form-label">
              Колір:
              <input type="text" name="colorName" value={color.colorName} onChange={(e) => handleChange(e, index)} className="form-input" required />
            </label>
            <label className="form-label">
              Зображення для кольору "{color.colorName}":
              <input type="file" name="colorImage" onChange={(e) => handleChange(e, index)} multiple accept="image/*" className="form-input" />
            </label>
          </div>
        ))}
        <button type="button" onClick={handleAddColor} className="form-button">
          Додати колір
        </button>
        <button type="submit" className="form-button">
          Додати товар
        </button>
      </form>
    </Modal>
  );
};

export default ProductAdd;
