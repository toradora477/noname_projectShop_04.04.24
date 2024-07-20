import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { addProduct, setModal } from '../../store/commonReducer';
import { request } from '../../tools';
import { Modal, ColorPicker, Box, Typography } from '../../components';
import { PRODUCT_CATEGORIES, SIZE_OPTIONS } from '../../common_constants/business';
import './ProductAdd.scss';

const ProductAdd = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.common.modal);
  const editData = data?.item; // is edit modal
  console.log('data', editData);

  const [formData, setFormData] = useState({
    productName: editData?.n ?? '',
    description: editData?.d ?? '',
    price: editData?.p ?? '',
    category: editData?.c?.[0] ?? '',
    subcategory: editData?.c?.[1] ?? '',
    colors: [{ images: [] }],
    sizes: [],
  });
  const [formError, setFormError] = useState('');

  const [Title, Label] = [
    ({ children, mt }) => <Typography children={children} mt={mt ?? 0} sz={30} fw={700} />,
    ({ children }) => <Typography children={children} mb={4} fs={12} fw={600} />,
  ];

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

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value, subcategory: '' });
  };

  const handleSubcategoryChange = (e) => {
    setFormData({ ...formData, subcategory: e.target.value });
  };

  const handleAddColor = () => {
    setFormData({
      ...formData,
      colors: [...formData.colors, { images: [] }],
    });
  };

  const toggleSize = (size) => {
    setFormData((prevData) => {
      const newSizes = prevData.sizes.includes(size) ? prevData.sizes.filter((s) => s !== size) : [...prevData.sizes, size];
      return { ...prevData, sizes: newSizes };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.sizes.length === 0) {
      setFormError('Будь ласка, оберіть хоча б один розмір.');
      return;
    }

    const body = new FormData();
    body.append('productName', formData.productName);
    body.append('description', formData.description);
    body.append('price', formData.price);
    body.append('category', formData.category);
    body.append('subcategory', formData.subcategory);
    body.append('sizes', JSON.stringify(formData.sizes));

    const colorsInfo = formData.colors.map((color) => ({
      color: color.color || '#000000',
      images: color.images.map((image) => image.name),
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

  const selectedCategory = PRODUCT_CATEGORIES.find((cat) => cat.value === parseInt(formData.category));

  return (
    <Modal position="center">
      <Title>Додавання товару</Title>
      <form onSubmit={handleSubmit} className="product-form-add">
        <label className="form-label">
          <Label> Назва товару:</Label>
          <input type="text" name="productName" value={formData.productName} onChange={(e) => handleChange(e)} className="form-input" required />
        </label>
        <label className="form-label">
          <Label> Опис:</Label>
          <textarea name="description" value={formData.description} onChange={(e) => handleChange(e)} className="form-input textarea" required />
        </label>
        <Box className="input-group">
          <Label>Ціна</Label>
          <input
            placeholder="Введіть ціну"
            aria-label="price"
            id="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={(e) => handleChange(e)}
          />
        </Box>
        <label className="form-label">
          <Label>Категорія:</Label>
          <select name="category" value={formData.category} onChange={handleCategoryChange} className="form-input" required>
            <option value="">Оберіть категорію</option>
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </label>
        {selectedCategory && (
          <label className="form-label">
            <Label>Підкатегорія:</Label>
            <select name="subcategory" value={formData.subcategory} onChange={handleSubcategoryChange} className="form-input" required>
              <option value="">Оберіть підкатегорію</option>
              {selectedCategory.subcategories.map((subcat) => (
                <option key={subcat.value} value={subcat.value}>
                  {subcat.label}
                </option>
              ))}
            </select>
          </label>
        )}
        <label className="form-label">
          <Label>Розміри</Label>
          <div className="size-selector">
            {SIZE_OPTIONS.map((size) => (
              <button
                type="button"
                key={size}
                className={clsx('size-button', { selected: formData.sizes.includes(size) })}
                onClick={() => toggleSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          {formError && <p className="form-error">{formError}</p>}
        </label>
        {formData.colors.map((color, index) => (
          <div key={index} className="color-group">
            <label className="form-label">
              <Label>Колір товару:</Label>
              <ColorPicker initialColor={color.color || '#000000'} onChange={(newColor) => handleColorChange(newColor, index)} />
            </label>
            <label className="form-label">
              <Label> Зображення товару для цього кольору:</Label>
              <input
                type="file"
                name="colorImage"
                onChange={(e) => handleChange(e, index)}
                multiple
                accept="image/*"
                className="form-input"
                required
              />
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
