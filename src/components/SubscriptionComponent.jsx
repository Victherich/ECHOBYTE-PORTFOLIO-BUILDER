// "use client";

// import { useEffect, useState } from "react";
// import styled, { keyframes } from "styled-components";
// import { auth, db } from "@/firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";

// /* ========== ANIMATION ========== */
// const glow = keyframes`
//   0% { box-shadow: 0 0 0px rgba(0,86,179,0.2); }
//   50% { box-shadow: 0 0 25px rgba(0,86,179,0.4); }
//   100% { box-shadow: 0 0 0px rgba(0,86,179,0.2); }
// `;

// /* ========== STYLES ========== */
// const Wrapper = styled.div`

//   margin-top:50px;
//   padding: 2rem;
//   border-radius: 16px;
//   background: #ffffff;
// //   border: 1px solid #e6f0ff;
// //   animation: ${glow} 3s infinite;
// `;

// const Title = styled.h2`
//   color: #0056b3;
//   font-size: 1.6rem;
// //   margin-bottom: 0.5rem;
// `;

// const Subtitle = styled.p`
//   color: rgba(0,0,0,0.6);
// //   margin-bottom: 1.5rem;
// `;

// const PriceBox = styled.div`
//   background: #f4f8ff;
//   padding: 1rem;
//   border-radius: 12px;
// //   margin: 1rem 0;
// `;

// const Price = styled.h3`
//   margin: 0;
//   color: #0056b3;
// `;

// const Status = styled.div`
//   padding: 10px;
//   border-radius: 10px;
//   margin: 0.5rem 0;
//   font-weight: 600;
//   background: ${(p) => (p.active ? "#e8fff0" : "#ffe8e8")};
//   color: ${(p) => (p.active ? "green" : "red")};
// `;

// const BtnRow = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-top: 0.5rem;
// `;

// const Btn = styled.button`
//   flex: 1;
//   padding: 12px;
//   border: none;
//   border-radius: 10px;
//   cursor: pointer;
//   font-weight: 700;
//   color: white;
//   transition: 0.3s;

//   background: ${(p) => (p.$usd ? "#1a73e8" : "#0056b3")};

//   &:hover {
//     transform: translateY(-2px);
//     opacity: 0.9;
//   }
// `;

// const CTA = styled.div`
//   margin-top: 0.5rem;
//   padding: 1rem;
//   background: linear-gradient(135deg, #0056b3, #00aaff);
//   color: white;
//   border-radius: 12px;
//   text-align: center;
//   font-weight: 600;
// `;

// /* ========== COMPONENT ========== */

// export default function SubscriptionComponent() {
//   const [subscription, setSubscription] = useState(null);

//   const user = auth.currentUser;

//   useEffect(() => {
//     const load = async () => {
//       if (!user) return;

//       const ref = doc(db, "subscriptions", user.uid);
//       const snap = await getDoc(ref);

//       if (snap.exists()) {
//         setSubscription(snap.data());
//       } else {
//         setSubscription(null);
//       }
//     };

//     load();
//   }, [user]);

//   const isActive =
//     subscription?.expiryDate &&
//     new Date(subscription.expiryDate) > new Date();

//   return (
//     <Wrapper>
//       <Title>Subscriptions</Title>

//       <Subtitle>
//         Subscribe and start building unlimited professional portfolios that
//         showcase your skills to the world.
//       </Subtitle>

//       <PriceBox>
//         <Price>₦1000 per year or $2 per year</Price>
//         <p>Full access to portfolio creation, editing and 24 hours uptime</p>
//       </PriceBox>

//       <Status active={isActive}>
//         {isActive
//           ? `Active — expires on ${new Date(
//               subscription.expiryDate
//             ).toDateString()}`
//           : "Not Subscribed"}
//       </Status>

//       <BtnRow>
//         <Btn
//           onClick={() =>
//             (window.location.href = "/dashboard/paystackpayment")
//           }
//         >
//           Pay ₦1000 (Naira)
//         </Btn>

//         <Btn
//           $usd
//           onClick={() =>
//             (window.location.href = "/pay-usd")
//           }
//         >
//           Pay $2 (USD)
//         </Btn>
//       </BtnRow>

//       <CTA>
//         Start your journey today — build your portfolio, land opportunities,
//         and grow your personal brand 🚀
//       </CTA>
//     </Wrapper>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { auth, db } from "@/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

/* ========== ANIMATION ========== */
const glow = keyframes`
  0% { box-shadow: 0 0 0px rgba(0,86,179,0.2); }
  50% { box-shadow: 0 0 25px rgba(0,86,179,0.4); }
  100% { box-shadow: 0 0 0px rgba(0,86,179,0.2); }
`;

/* ========== STYLES ========== */

const Wrapper = styled.div`
  margin-top: 50px;
  padding: 2rem;
  border-radius: 16px;
  background: #ffffff;
`;

const Title = styled.h2`
  color: #0056b3;
  font-size: 1.6rem;
`;

const Subtitle = styled.p`
  color: rgba(0, 0, 0, 0.6);
`;

const PriceBox = styled.div`
  background: #f4f8ff;
  padding: 1rem;
  border-radius: 12px;
`;

const Price = styled.h3`
  margin: 0;
  color: #0056b3;
`;

const Status = styled.div`
  padding: 12px;
  border-radius: 10px;
  margin-top: 1rem;
  font-weight: 600;
  background: ${(p) => (p.active ? "#e8fff0" : "#ffe8e8")};
  color: ${(p) => (p.active ? "green" : "red")};
`;

const BtnRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Btn = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  color: white;
  transition: 0.3s;

  background: ${(p) => (p.$usd ? "#1a73e8" : "#0056b3")};

  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }
`;

const CTA = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #0056b3, #00aaff);
  color: white;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
`;

const Loader = styled.div`
  margin-top: 1rem;
  color: #0056b3;
  font-weight: 600;
`;

/* ========== COMPONENT ========== */

export default function SubscriptionComponent() {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubscription = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          setLoading(false);
          return;
        }

        const subscriptionsRef = collection(db, "subscriptions");

        const q = query(
          subscriptionsRef,
          where("userId", "==", user.uid),
          where("status", "==", "active")
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          // get latest subscription
          const subData = snapshot.docs[0].data();

          const expiryDate = new Date(
            subData.subscriptionExpiryDate
          );

          // check if still active
          if (expiryDate > new Date()) {
            setSubscription(subData);
          } else {
            setSubscription(null);
          }
        } else {
          setSubscription(null);
        }
      } catch (error) {
        console.error("Subscription fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSubscription();
  }, []);

  const hasActiveSubscription = !!subscription;

  return (
    <Wrapper>
      <Title>Subscriptions</Title>

      <Subtitle>
        Subscribe and start building unlimited professional portfolios
        that showcase your skills to the world.
      </Subtitle>

      <PriceBox>
        <Price>₦1000 per year or $2 per year</Price>

        <p>
          Full access to portfolio creation, editing and premium
          features.
        </p>
      </PriceBox>

      {loading ? (
        <Loader>Loading subscription...</Loader>
      ) : (
        <>
          <Status active={hasActiveSubscription}>
            {hasActiveSubscription ? (
              <>
                ✅ You have an active subscription.
                <br />
                Expires on{" "}
                <b>
                  {new Date(
                    subscription.subscriptionExpiryDate
                  ).toDateString()}
                </b>
              </>
            ) : (
              <>
                ❌ You have no active subscription at the moment.
              </>
            )}
          </Status>

          {!hasActiveSubscription && (
            <BtnRow>
              <Btn
                onClick={() =>
                  (window.location.href =
                    "/dashboard/paystackpayment")
                }
              >
                Subscribe with ₦1000 per year
              </Btn>

              <Btn
                $usd
                onClick={() =>
                  (window.location.href = "/pay-usd")
                }
              >
                Subscribe with $2 (USD) per year
              </Btn>
            </BtnRow>
          )}

          <CTA>
            Start your journey today — build your portfolio,
            land opportunities, and grow your personal brand 🚀
          </CTA>
        </>
      )}
    </Wrapper>
  );
}