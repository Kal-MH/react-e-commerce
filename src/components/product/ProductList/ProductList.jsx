"use client";

import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";

import ProductItem from "../ProductItem/ProductItem.jsx";
import Pagination from "@/components/pagination/Pagination.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  SORT_PRODUCTS,
  selectFilteredProducts,
} from "@/redux/slice/filterSlice";

const ProductList = () => {
  const [sort, setSort] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(1);

  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      SORT_PRODUCTS({
        products: filteredProducts,
        sort,
      })
    );
  }, [dispatch, sort]);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  console.log(
    currentPage,
    indexOfFirstProduct,
    indexOfLastProduct,
    filteredProducts,
    currentProducts
  );

  const handleRadioClick = (e) => setSort(e.target.value);
  const isRadioSelected = (value) => (sort === value ? "checked" : "");

  return (
    <div className={styles.productList}>
      <div className={styles.top}>
        <div>
          <ul className={styles.sort}>
            <li className={isRadioSelected("latest") ? styles.selected : ""}>
              <input
                type="radio"
                value="latest"
                id="latest"
                checked={isRadioSelected("latest")}
                onChange={handleRadioClick}
              />
              <label htmlFor="latest">최신순</label>
            </li>
            <li
              className={isRadioSelected("lowest-price") ? styles.selected : ""}
            >
              <input
                type="radio"
                value="lowest-price"
                id="lowest-price"
                checked={isRadioSelected("lowest-price")}
                onChange={handleRadioClick}
              />
              <label htmlFor="lowest-price">낮은가격순</label>
            </li>
            <li
              className={
                isRadioSelected("highest-price") ? styles.selected : ""
              }
            >
              <input
                type="radio"
                value="highest-price"
                id="highest-price"
                checked={isRadioSelected("highest-price")}
                onChange={handleRadioClick}
              />
              <label htmlFor="highest-price">높은가격순</label>
            </li>
          </ul>
        </div>
        <div className={styles.limit}>
          <select onChange={(e) => setProductPerPage(e.target.value)}>
            <option value={10}>10개씩 보기</option>
            <option value={20}>20개씩 보기</option>
          </select>
        </div>
      </div>
      <div className={styles.grid}>
        {currentProducts.length === 0 ? (
          <p>상품이 없습니다.</p>
        ) : (
          <>
            {currentProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={filteredProducts.length}
        productsPerPage={productPerPage}
      />
    </div>
  );
};

export default ProductList;
