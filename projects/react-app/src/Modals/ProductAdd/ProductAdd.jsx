import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, setModal } from '../../store/commonReducer';
import { request } from '../../tools';
import { Modal, ColorPicker } from '../../components';
import './ProductAdd.scss';

const ProductAdd = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    colors: [{ images: [] }],
  });

  const handleColorChange = (newColor, index) => {
    const updatedColors = [...formData.colors];
    updatedColors[index] = { ...updatedColors[index], color: newColor };
    setFormData({ ...formData, colors: updatedColors });
  };

  const handleChange = (e, index) => {
    const { name, value, files } = e.target;
    if (name === 'colorName') {
      const updatedColors = [...formData.colors];
      updatedColors[index] = { ...updatedColors[index] };
      setFormData({ ...formData, colors: updatedColors });
    } else if (name === 'colorImage') {
      const updatedColors = [...formData.colors];
      const images = updatedColors[index].images.concat([...files]);
      updatedColors[index] = { ...updatedColors[index], images };
      setFormData({ ...formData, colors: updatedColors });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddColor = () => {
    setFormData({
      ...formData,
      colors: [...formData.colors, { images: [] }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append('productName', formData.productName);
    body.append('description', formData.description);
    body.append('price', formData.price);

    const colorsInfo = formData.colors.map((color) => ({
      color: color.color || '#000000',
      images: color.images.map((image) => image.name), // Store only file names
    }));

    body.append('colorsInfo', JSON.stringify(colorsInfo));

    formData.colors.forEach((color) => {
      color.images.forEach((image) => {
        body.append('files', image);
      });
    });

    request.post('/products/addProduct', body, (res) => {
      console.log('Товар успішно додано', res);
      if (res?.data) dispatch(addProduct(res.data));
      dispatch(setModal());
    });
  };

  return (
    <Modal position="center">
      <form onSubmit={handleSubmit} className="product-form-add">
        <label className="form-label">
          Назва товару:
          <input type="text" name="productName" value={formData.productName} onChange={(e) => handleChange(e)} className="form-input" required />
        </label>
        <label className="form-label">
          Опис:
          <textarea name="description" value={formData.description} onChange={(e) => handleChange(e)} className="form-input textarea" required />
        </label>
        <label className="form-label">
          Ціна:
          <input type="number" name="price" value={formData.price} onChange={(e) => handleChange(e)} className="form-input" required />
        </label>
        {formData.colors.map((color, index) => (
          <div key={index}>
            <label className="form-label">
              Колір товару: <ColorPicker initialColor={color.color || '#000000'} onChange={(newColor) => handleColorChange(newColor, index)} />
            </label>
            <br />
            <label className="form-label">
              Зображення товару для цього кольору:
              <input type="file" name="colorImage" onChange={(e) => handleChange(e, index)} multiple accept="image/*" className="form-input" />
            </label>
          </div>
        ))}
        <button type="button" onClick={handleAddColor} className="form-button">
          Додати новий колір
        </button>
        <button type="submit" className="form-button">
          Завершити створення товару
        </button>
      </form>
    </Modal>
  );
};

export default ProductAdd;
