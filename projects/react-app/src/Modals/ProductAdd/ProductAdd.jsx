import React, { useState } from 'react';
import { request } from '../../tools';
import { Modal } from '../../components';
import './ProductAdd.scss';

const ProductAdd = () => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    mainImage: null,
    auxiliaryImages: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'mainImage') {
      setFormData({ ...formData, mainImage: files[0] });
    } else if (name === 'auxiliaryImages') {
      setFormData({ ...formData, auxiliaryImages: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append('productName', formData.productName);
    body.append('description', formData.description);
    body.append('mainImage', formData.mainImage);
    formData.auxiliaryImages.forEach((image) => {
      body.append('auxiliaryImages', image);
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
          Основне зображення товару:
          <input type="file" name="mainImage" onChange={handleChange} accept="image/*" className="form-input" required />
        </label>
        <label className="form-label">
          Додаткові зображення товару:
          <input type="file" name="auxiliaryImages" onChange={handleChange} multiple accept="image/*" className="form-input" />
        </label>
        <button type="submit" className="form-button">
          Додати товар
        </button>
      </form>
    </Modal>
  );
};

export default ProductAdd;
