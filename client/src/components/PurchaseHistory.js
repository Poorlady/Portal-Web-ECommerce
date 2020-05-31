import React, { useState, useEffect } from "react";
import axios from "axios";
import PurchaseList from "./PurchaseList";
import ReviewForm from "./ReviewForm";

function PurchaseHistory({ user }) {
  const [history, setHistory] = useState([]);
  const URL = `/api/order/${user._id}`;
  const [doReview, setDoReview] = useState(false);
  const [productToReview, setProductToReview] = useState({});
  const [orderId, setOrderId] = useState();

  const opernReview = (product, orderId) => {
    setProductToReview(product);
    setOrderId(orderId);
    setDoReview(true);
  };

  const closeReview = (status) => {
    if (status === 200) {
      fetchOrder();
    }
    setDoReview(false);
  };

  const fetchOrder = async (e) => {
    await axios
      .get(URL)
      .then((result) => {
        setHistory(result.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const mappedHistory = history.map((item) => (
    <PurchaseList
      key={item._id}
      item={item}
      reviewClick={opernReview}
      closeReview={closeReview}
    />
  ));

  return (
    <>
      <h4 className="mb-20">Purchase History</h4>
      <div className="purchase-history-wrapper"> </div>
      {mappedHistory.length > 0 ? (
        mappedHistory
      ) : (
        <div className="purchase-history-wrapper input-border">
          <p className="span-col-4">You dont have purchase history</p>
        </div>
      )}
      {doReview && (
        <ReviewForm
          productToReview={productToReview}
          closeReview={closeReview}
          orderId={orderId}
        />
      )}
    </>
  );
}

export default PurchaseHistory;

//   <div className="purchase-history-wrapper input-border">
//     <div className="purchase-history-logo">
//       <p>Logo Cart</p>
//     </div>
//     <div className="purchase-history-item span-col-2">
//       <p className="capitalize">{item.order.items.length} item(s)</p>
//       <Link onClick={handleClick} className="input-border">
//         See details
//       </Link>
//     </div>
//     <div>
//       <p className="capitalize">
//         date: {item.orderDate && item.orderDate.split("T").shift()}
//       </p>
//     </div>
//     <div>
//       <p>{currency.toCurrency(item.total)}</p>
//     </div>
//     <div>
//       <p className="capitalize">payment method</p>
//     </div>
//     {isDetailClicked &&
//       item.order.items.map(product => (
//         <PurchaseItem
//           onClick={reviewClick}
//           product={product}
//           key={product._id}
//         />
//       ))}
//   </div>
// ));
