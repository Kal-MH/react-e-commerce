"use client";

import React, { useState } from "react";

import styles from "./CheckoutAddress.module.scss";

import Heading from "@/components/heading/Heading.jsx";
import Button from "@/components/button/Button.jsx";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "@/redux/slice/checkoutSlice";

const initialAddress = {
  name: "",
  line: "",
  city: "",
  postalCode: "",
};
const CheckoutAddressClient = () => {
  const [shippingAddress, setShippingAddress] = useState({ ...initialAddress });
  const [billingAddress, setBillingAddress] = useState({ ...initialAddress });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleShippingInput = (e) => {
    const { name, value } = e.target;

    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleBillingInput = (e) => {
    const { name, value } = e.target;

    setBillingAddress({ ...billingAddress, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));

    router.push("/checkout");
  };
  return (
    <section className={styles.checkout}>
      <Heading title="상세주문" />
      <form onSubmit={handleSubmit}>
        <div className={styles.card}>
          <h3>배송 주소</h3>
          <label>받는 사람</label>
          <input
            type="text"
            placeholder="받는 사람 이름"
            required
            name="name"
            value={shippingAddress.name}
            onChange={handleShippingInput}
          />
          <label>상세 주소</label>
          <input
            type="text"
            placeholder="상세 주소"
            required
            name="line"
            value={shippingAddress.line}
            onChange={handleShippingInput}
          />
          <label>도시</label>
          <input
            type="text"
            placeholder="도시"
            required
            name="city"
            value={shippingAddress.city}
            onChange={handleShippingInput}
          />
          <label>우편번호</label>
          <input
            type="text"
            placeholder="우편번호"
            required
            name="postalCode"
            value={shippingAddress.postalCode}
            onChange={handleShippingInput}
          />
        </div>
        <div className={styles.card}>
          <h3>청구 주소</h3>
          <label>보내는 사람</label>
          <input
            type="text"
            placeholder="보내는 사람 이름"
            required
            name="name"
            value={billingAddress.name}
            onChange={handleBillingInput}
          />
          <label>상세 주소</label>
          <input
            type="text"
            placeholder="상세 주소"
            required
            name="line"
            value={billingAddress.line}
            onChange={handleBillingInput}
          />
          <label>도시</label>
          <input
            type="text"
            placeholder="도시"
            required
            name="city"
            value={billingAddress.city}
            onChange={handleBillingInput}
          />
          <label>우편번호</label>
          <input
            type="text"
            placeholder="우편번호"
            required
            name="postalCode"
            value={billingAddress.postalCode}
            onChange={handleBillingInput}
          />
          <Button style={{ float: "right" }} type="submit">
            주문하기
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CheckoutAddressClient;
