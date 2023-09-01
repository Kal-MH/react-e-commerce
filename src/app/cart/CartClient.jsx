"use client";

import React, { useEffect } from "react";
import styles from "./CartClient.module.scss";

import Heading from "@/components/heading/Heading.jsx";
import Link from "next/link";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";

import logo from "@/assets/logo.svg";
import priceFormat from "@/utils/priceFormat";
import Button from "@/components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItem,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "@/redux/slice/cartSlice";
import { selectIsLoggedIn } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";

const CartClient = () => {
  const cartItems = useSelector(selectCartItem);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  const url = typeof window !== "undefined" ? window.location.href : "";
  const checkout = () => {
    if (isLoggedIn) {
      router.push("/checkout-address");
    } else {
      dispatch(SAVE_URL(url));
      router.push("/login");
    }
  };

  return (
    <section className={styles.table}>
      <Heading title="장바구니" />
      {cartItems.length === 0 ? (
        <>
          <p className={styles.emptyText}>장바구니가 비었습니다.</p>
          <div className={styles.emptyText}>
            <Link href={"/"}>계속 쇼핑하기</Link>
          </div>
        </>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>순서</th>
                <th>상품</th>
                <th>가격</th>
                <th>개수</th>
                <th>합계</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cart, index) => {
                const { id, name, price, imageURL, cartQuantity } = cart;

                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <Image
                        src={imageURL}
                        alt={name}
                        width={100}
                        height={100}
                      />
                    </td>
                    <td>{priceFormat(price)}</td>
                    <td>
                      <div className={styles.count}>
                        <button onClick={() => decreaseCart(cart)}>-</button>
                        <p>
                          <b>{cartQuantity}</b>
                        </p>
                        <button onClick={() => increaseCart(cart)}>+</button>
                      </div>
                    </td>
                    <td>
                      <span>{priceFormat(price * cartQuantity)}원</span>
                    </td>
                    <td className={styles.icons}>
                      <FaTrashAlt
                        size={19}
                        color="red"
                        onClick={() => removeFromCart(cart)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.summary}>
            <Button onClick={clearCart}>카트 비우기</Button>
            <div className={styles.checkout}>
              <div className={styles.text}>
                <h4>총 상품 개수</h4>
                <p>{cartTotalQuantity}</p>
              </div>
              <div className={styles.text}>
                <h4>합계</h4>
                <p>{priceFormat(cartTotalAmount)}원</p>
              </div>
              <Button onClick={checkout}>계산하기</Button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CartClient;
