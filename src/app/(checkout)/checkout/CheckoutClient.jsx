"use client";

import React from "react";
import styles from "./CheckoutClient.module.scss";
import Heading from "@/components/heading/Heading";
import CheckoutForm from "@/components/checkoutForm/CheckoutForm";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_CART,
  selectCartItem,
  selectCartTotalAmount,
} from "@/redux/slice/cartSlice";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { selectEmail, selectUserID } from "@/redux/slice/authSlice";
import { selectShippingAddress } from "@/redux/slice/checkoutSlice";

const CheckoutClient = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const userID = useSelector(selectUserID);
  const userEmail = useSelector(selectEmail);
  const shippingAddress = useSelector(selectShippingAddress);
  const cartItems = useSelector(selectCartItem);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tossPayment = await loadTossPayments(
      process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
    );

    tossPayment
      .requestPayment("카드", {
        amount: cartTotalAmount,
        orderId: Math.random().toString(36).slice(2),
        orderName: "주문",
      })
      .then(async function (data) {
        const { orderId, paymentKey, amount } = data;
        const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;

        const url = `https://api.tosspayments.com/v1/payments/confirm`;
        const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString(
          "base64"
        );

        const result = await fetch(url, {
          method: "post",
          headers: {
            Authorization: `Basic ${basicToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId,
            paymentKey,
            amount,
          }),
        });

        try {
          if (result.ok) {
            const today = new Date();
            const date = today.toDateString();
            const time = today.toLocaleDateString();

            const orderData = {
              userID,
              userEmail,
              orderDate: date,
              orderTime: time,
              orderAmount: amount,
              orderStatus: "주문수락",
              cartItems,
              shippingAddress,
              createdAt: Timestamp.now().toDate(),
            };

            addDoc(collection(db, "orders"), orderData);
            dispatch(CLEAR_CART());

            router.push(`/checkout-success?orderId=${orderId}`);
          }
        } catch (error) {
          console.error(error);
        }
      })
      .catch((error) => {
        if (error.code === "USER_CANCEL") {
          toast.error("결제창이 닫아졌습니다.");
        }
      });
  };

  return (
    <section>
      <div className={styles.checkout}>
        <Heading title="주문하기" />
        <form onSubmit={handleSubmit}>
          <div className={styles.cart}>
            <CheckoutForm />
          </div>
          <div>
            <Button type="submit">토스로 결제하기</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutClient;
