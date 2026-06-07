// "use client";

// import React, { useState } from "react";
// import styled from "styled-components";
// import Swal from "sweetalert2";

// import {
//   PayPalScriptProvider,
//   PayPalButtons,
// } from "@paypal/react-paypal-js";

// import { auth, db } from "@/firebaseConfig";

// import {
//   collection,
//   addDoc,
//   serverTimestamp,
// } from "firebase/firestore";

// const PAYPAL_CLIENT_ID =
//   process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

// const PRICE_USD = 2;

// const Container = styled.div`
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background: #f6f9ff;
//   padding: 2rem;
// `;

// const Card = styled.div`
//   width: 100%;
//   max-width: 650px;
//   background: white;
//   border-radius: 18px;
//   padding: 2rem;
//   box-shadow: 0 10px 30px rgba(0,0,0,.08);
// `;

// const Title = styled.h1`
//   color: #0056b3;
// `;

// const Price = styled.div`
//   margin: 20px 0;
//   padding: 16px;
//   border-radius: 12px;
//   background: #eef5ff;
//   font-size: 1.4rem;
//   font-weight: 700;
// `;

// export default function PayPalPortfolioSubscription() {
//   const [loading, setLoading] = useState(false);

//   console.log("PAYPAL CLIENT ID:", process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);

//   const saveSubscription = async (order) => {
//     const now = new Date();

//     const expiryDate = new Date();
//     expiryDate.setFullYear(now.getFullYear() + 1);

//     const capture =
//       order.purchase_units?.[0]?.payments?.captures?.[0];

//     await addDoc(collection(db, "subscriptions"), {
//       userId: auth.currentUser?.uid || null,
//       email: auth.currentUser?.email || null,

//       paymentMethod: "PayPal",

//       paypalOrderId: order.id,
//       paypalPayerId: order.payer?.payer_id,

//       payerName: `${order.payer?.name?.given_name || ""} ${
//         order.payer?.name?.surname || ""
//       }`,

//       payerEmail: order.payer?.email_address,

//       transactionReference: capture?.id,

//       amount: PRICE_USD,
//       currency: "USD",

//       status: "active",

//       subscriptionStartDate: now.toISOString(),
//       subscriptionExpiryDate: expiryDate.toISOString(),

//       paypalResponse: order,

//       createdAt: serverTimestamp(),
//     });
//   };

//   return (
//     <PayPalScriptProvider
//       options={{
//         clientId: PAYPAL_CLIENT_ID,
//         currency: "USD",
//       }}
//     >
//       <Container>
//         <Card>

//           <Title>Portfolio Builder Subscription</Title>

//           <p>
//             Unlock unlimited portfolio creation and premium
//             features for one year.
//           </p>

//           <Price>
//             $2 USD / Year
//           </Price>

//           {loading && <p>Processing payment...</p>}

//           <PayPalButtons
//             style={{
//               layout: "vertical",
//               shape: "rect",
//               label: "pay",
//             }}

//             createOrder={(data, actions) => {
//               return actions.order.create({
//                 purchase_units: [
//                   {
//                     description:
//                       "Portfolio Builder Annual Subscription",

//                     amount: {
//                       currency_code: "USD",
//                       value: PRICE_USD,
//                     },
//                   },
//                 ],
//               });
//             }}

//             onApprove={async (data, actions) => {
//               try {
//                 setLoading(true);

//                 const order =
//                   await actions.order.capture();

//                 await saveSubscription(order);

//                 Swal.fire({
//                   icon: "success",
//                   title: "Payment Successful",
//                   text:
//                     "Your subscription has been activated.",
//                 });

//                 window.location.href = "/dashboard";
//               } catch (error) {
//                 console.error(error);

//                 Swal.fire({
//                   icon: "error",
//                   title: "Error",
//                   text:
//                     "Unable to save subscription.",
//                 });
//               } finally {
//                 setLoading(false);
//               }
//             }}

//             onError={(err) => {
//               console.error(err);

//               Swal.fire({
//                 icon: "error",
//                 title: "PayPal Error",
//                 text:
//                   "An error occurred while processing payment.",
//               });
//             }}

//             onCancel={() => {
//               Swal.fire({
//                 icon: "info",
//                 title: "Cancelled",
//                 text: "Payment was cancelled.",
//               });
//             }}
//           />

//         </Card>
//       </Container>
//     </PayPalScriptProvider>
//   );
// }




"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";

import { auth, db } from "@/firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const PAYPAL_CLIENT_ID =
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

const PRICE_USD = 2;

// ================= STYLES =================

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f6f9ff;
//   padding: 1rem;
`;

const Card = styled.div`
  width: 100%;
  max-width: 650px;
  background: white;
  border-radius: 18px;
  padding: 1rem;
  box-shadow: 0 10px 30px rgba(0,0,0,.08);
`;

const Title = styled.h1`
  color: #0056b3;
`;

const Price = styled.div`
  margin: 20px 0;
  padding: 16px;
  border-radius: 12px;
  background: #eef5ff;
  font-size: 1.4rem;
  font-weight: 700;
`;

// ================= COMPONENT =================

export default function PayPalPortfolioSubscription() {
  const [loading, setLoading] = useState(false);
  const [paypalReady, setPaypalReady] = useState(false);

  // FIX: ensures PayPal loads after navigation
  useEffect(() => {
    setPaypalReady(true);
  }, []);

  const saveSubscription = async (order) => {
    const now = new Date();

    const expiryDate = new Date();
    expiryDate.setFullYear(now.getFullYear() + 1);

    const capture =
      order.purchase_units?.[0]?.payments?.captures?.[0];

    await addDoc(collection(db, "subscriptions"), {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,

      paymentMethod: "PayPal",

      paypalOrderId: order.id,
      paypalPayerId: order.payer?.payer_id,

      payerName: `${order.payer?.name?.given_name || ""} ${
        order.payer?.name?.surname || ""
      }`,

      payerEmail: order.payer?.email_address,

      transactionReference: capture?.id,

      amount: PRICE_USD,
      currency: "USD",

      status: "active",

      subscriptionStartDate: now.toISOString(),
      subscriptionExpiryDate: expiryDate.toISOString(),

      paypalResponse: order,

      createdAt: serverTimestamp(),
    });
  };

  // ================= GUARDS =================

  if (!PAYPAL_CLIENT_ID) {
    return <p>PayPal not configured</p>;
  }

  if (!paypalReady) {
    return <p>Loading payment system...</p>;
  }

  // ================= UI =================

  return (
    <PayPalScriptProvider
      key={PAYPAL_CLIENT_ID} // IMPORTANT FIX
      options={{
        clientId: PAYPAL_CLIENT_ID,
        currency: "USD",
      }}
    >
      <Container>
        <Card>
          <Title>Portfolio Builder Subscription</Title>

          <p>
            Unlock unlimited portfolio creation and premium features for one year.
          </p>

          <Price>$2 USD / Year</Price>

          {loading && <p>Processing payment...</p>}

          <PayPalButtons
            forceReRender={[PRICE_USD]} // IMPORTANT FIX
            style={{
              layout: "vertical",
              shape: "rect",
              label: "pay",
            }}

            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description:
                      "Portfolio Builder Annual Subscription",
                    amount: {
                      currency_code: "USD",
                      value: PRICE_USD,
                    },
                  },
                ],
              });
            }}

            onApprove={async (data, actions) => {
              try {
                setLoading(true);

                const order = await actions.order.capture();

                await saveSubscription(order);

                Swal.fire({
                  icon: "success",
                  title: "Payment Successful",
                  text: "Your subscription has been activated.",
                });

                window.location.href = "/dashboard";
              } catch (error) {
                console.error(error);

                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Unable to save subscription.",
                });
              } finally {
                setLoading(false);
              }
            }}

            onError={(err) => {
              console.error(err);

              Swal.fire({
                icon: "error",
                title: "PayPal Error",
                text: "An error occurred while processing payment.",
              });
            }}

            onCancel={() => {
              Swal.fire({
                icon: "info",
                title: "Cancelled",
                text: "Payment was cancelled.",
              });
            }}
          />
        </Card>
      </Container>
    </PayPalScriptProvider>
  );
}