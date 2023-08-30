"use client";

import React, { useEffect, useState } from "react";

import styles from "./ProductFilter.module.scss";

import Button from "@/components/button/Button.jsx";

import priceFormat from "@/utils/priceFormat.js";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from "@/redux/slice/productSlice";
import { FILTER_BY } from "@/redux/slice/filterSlice";

const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(10000);
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];

  useEffect(() => {
    dispatch(FILTER_BY({ products, category, brand, price }));
  }, [dispatch, products, category, brand, price]);

  const clearFilter = () => {
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  };

  return (
    <div className={styles.filter}>
      <h4>카테고리</h4>
      <div className={styles.category}>
        {allCategories.map((cat) => {
          return (
            <button
              key={cat}
              type="button"
              className={`${category === cat ? `${styles.active}` : ""}`}
              onClick={() => setCategory(cat)}
            >
              &#8250; {cat}
            </button>
          );
        })}
      </div>
      <h4>브랜드</h4>
      <div className={styles.brand}>
        <select
          name="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          {allBrands.map((brand) => {
            return (
              <option key={brand} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
      </div>
      <h4>가격</h4>
      <p>{priceFormat(price)}원</p>
      <div className={styles.price}>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={(e) => setPrice(e.target.valueAsNumber)}
        />
      </div>

      <br />
      <Button onClick={clearFilter}>필터 초기화</Button>
    </div>
  );
};

export default ProductFilter;
