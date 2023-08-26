import React from "react";

const OrderDetails = ({ params }) => {
  const { id } = params;

  return <div>OrderDetails: {id}</div>;
};

export default OrderDetails;
