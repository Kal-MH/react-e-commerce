"use client";

import React, { useEffect } from "react";
import useFetchCollection from "@/hooks/useFetchCollection.jsx";
import { useDispatch } from "react-redux";

import styles from "./Product.module.scss";

import Loader from "../loader/Loader";
import ProductList from "./productList/ProductList";
import ProductFilter from "./productFilter/ProductFilter";
import { GET_PRICE_RANGE, STORE_PRODUCTS } from "@/redux/slice/productSlice";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [data, dispatch]);

  return (
    <section className={styles.product}>
      <aside className={styles.filter}>
        {isLoading ? null : <ProductFilter />}
      </aside>
      <div className={styles.content}>
        {isLoading ? <Loader basic /> : <ProductList />}
      </div>
    </section>
  );
};

export default Product;
