import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { Product } from '../../components';
import { PRODUCT_CATEGORIES } from '../../common_constants/business';
import { billboard_subcategory } from '../../images';
import './Shop.scss';

const Shop = () => {
  const location = useLocation();
  const products = useSelector((state) => state.common.products) ?? [];

  const titleBillboardStandart = 'МАГАЗИН';
  const productsPerPage = 15;

  const [currentPage, setCurrentPage] = useState(0);
  const [titleBillboard, setTitleBillboard] = useState(titleBillboardStandart);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const pageCount = Math.ceil(products.length / productsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');

    const isCategoryValid = category !== null && !isNaN(Number(category));
    const isSubcategoryValid = subcategory !== null && !isNaN(Number(subcategory));

    if (isCategoryValid) {
      const getCategoryAndSubcategoryLabel = (categoryValue, subcategoryValue) => {
        let category, subcategory;
        category = PRODUCT_CATEGORIES.find((cat) => cat.value === Number(categoryValue));

        if (!category) return null;

        if (isSubcategoryValid) {
          subcategory = category.subcategories.find((sub) => sub.value === Number(subcategoryValue));
          if (!subcategory) return null;
        }

        return {
          categoryLabel: category.label,
          ...(isSubcategoryValid ? { subcategoryLabel: subcategory.label } : {}),
        };
      };

      const labels = getCategoryAndSubcategoryLabel(category, subcategory);

      setTitleBillboard(isSubcategoryValid ? labels.subcategoryLabel : labels.categoryLabel);

      const filtered = products.filter((product) => {
        const retval = product.c?.[0] === category && (isSubcategoryValid ? product.c?.[1] === subcategory : true);
        return retval;
      });

      setFilteredProducts(filtered);
    } else {
      setTitleBillboard(titleBillboardStandart);
      setFilteredProducts(products);
    }
  }, [location.search, products]);

  return (
    <div className="shop-page">
      <div className="billboard-container">
        <div className="billboard-label">{titleBillboard}</div>
        <img src={billboard_subcategory} alt="billboard" className="billboard-image" />
      </div>
      <div className="product-list">
        {filteredProducts.map((item) => (
          <Product key={item._id} item={item} />
        ))}
      </div>

      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={currentPage === 0 ? '' : '<'}
          nextLabel={currentPage === pageCount - 1 ? '' : '>'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      )}
    </div>
  );
};

export default Shop;
