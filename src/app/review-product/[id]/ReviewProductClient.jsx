"use client";

import React, { useState } from "react";
import styles from "./ReviewProductClient.module.scss";
import Heading from "@/components/heading/Heading.jsx";
import useFetchDocument from "@/hooks/useFetchDocument";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
import { Rating } from "react-simple-star-rating";
import Button from "@/components/button/Button";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectUserID, selectUserName } from "@/redux/slice/authSlice";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { toast } from "react-toastify";

const ReviewProductClient = () => {
  const { id } = useParams();
  const [rate, setRate] = useState(3);
  const [review, setReview] = useState("");
  const router = useRouter();

  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);
  const { document: product } = useFetchDocument("products", id);

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toDateString();

    const reviewData = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "reviews"), reviewData);

      router.push(`/product-details/${id}`);
    } catch (error) {
      console.error(error);
      toast.error("리뷰 작성 도중 에러가 발생했습니다.");
    }
  };

  return (
    <section className={styles.review}>
      <Heading title="상품평 작성하기" />
      {product === null ? (
        <Loader basic />
      ) : (
        <>
          <div className={styles.name}>
            <p>
              <b>상품 이름:</b>
              {product.name}
            </p>
            <Image
              src={product.imageURL}
              alt={product.name}
              width={100}
              height={100}
              priority
            />
          </div>
        </>
      )}
      <div className={styles.card}>
        <form onSubmit={handleSubmit}>
          <label>평점: </label>
          <Rating initialValue={rate} onClick={(rate) => setRate(rate)} />
          <label>상품평</label>
          <textarea
            cols={30}
            rows={10}
            value={review}
            required
            onChange={(e) => setReview(e.target.value)}
          />
          <Button type="submit">상품평 작성하기</Button>
        </form>
      </div>
    </section>
  );
};

export default ReviewProductClient;
