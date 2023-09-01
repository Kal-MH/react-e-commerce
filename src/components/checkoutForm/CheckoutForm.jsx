"use client";

import React, { useEffect } from "react";
import styles from "./CheckoutForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItem,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "@/redux/slice/cartSlice";
import Link from "next/link";
import priceFormat from "@/utils/priceFormat";

const CheckoutForm = () => {
  const cartItems = useSelector(selectCartItem);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch]);

  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartTotalAmount = useSelector(selectCartTotalAmount);

  return (
    <div className={styles.summary}>
      <h3>주문 요약</h3>
      {cartItems.length === 0 ? (
        <>
          <p>상품이 없습니다.</p>
          <Link href="/">홈으로</Link>
        </>
      ) : (
        <>
          <div>
            {cartItems.map((cart) => {
              const { id, name, price, cartQuantity } = cart;

              return (
                <div key={id} className={styles.card}>
                  <p>
                    <b>상품:</b>
                    {name}
                  </p>
                  <p>
                    <b>개수: </b>
                    {cartQuantity}
                  </p>
                  <p>
                    <b>가격: </b>
                    {priceFormat(price)}
                  </p>
                  <p>
                    <b>세트 가격: </b>
                    {priceFormat(price * cartQuantity)}
                  </p>
                </div>
              );
            })}
            <div className={styles.text}>
              <p>
                <b>총 상품 개수: </b>
                {cartTotalQuantity}
              </p>
            </div>
            <div className={styles.text}>
              <p>
                <b>합계: </b>
                {cartTotalAmount}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutForm;
