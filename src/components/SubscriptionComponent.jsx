


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

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(26, 115, 232, 0.6);
  }
  70% {
    box-shadow: 0 0 0 12px rgba(26, 115, 232, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(26, 115, 232, 0);
  }
`;

const float3d = keyframes`
  0%, 100% {
    transform: translateY(0px);
    filter: brightness(1);
  }
  50% {
    transform: translateY(-4px);
    filter: brightness(1.05);
  }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
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

const Subtitle = styled.div`
  color: rgba(0, 0, 0, 0.6);

  li{
  margin-left:20px;
  }
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


const Btn = styled.button`
  flex: 1;
  padding: 14px 16px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 800;
  color: white;
  font-size: 15px;

  background: linear-gradient(
    270deg,
    ${(p) => (p.$usd ? "#1a73e8" : "#0056b3")},
    #00c6ff,
    ${(p) => (p.$usd ? "#1a73e8" : "#0056b3")}
  );

  background-size: 600% 600%;

  /* 🔥 REALISTIC 3D SHADOW LAYER */
  box-shadow:
    0 6px 0 #003a80,                /* hard bottom depth */
    0 10px 18px rgba(0, 0, 0, 0.25), /* soft main shadow */
    0 -2px 8px rgba(255, 255, 255, 0.15) inset; /* TOP LIGHT GLOW */

  animation:
    ${gradientShift} 6s ease infinite,
    ${float3d} 2.5s ease-in-out infinite,
    ${pulse} 2s infinite;

  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  /* shine */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: rgba(255, 255, 255, 0.25);
    transform: skewX(-20deg);
    transition: 0.5s;
  }

  &:hover {
    transform: scale(1.05) translateY(-3px);
    box-shadow:
      0 8px 0 #003a80,
      0 16px 25px rgba(0, 0, 0, 0.35),
      0 -2px 10px rgba(255, 255, 255, 0.2) inset;
    animation-play-state: paused;
  }

  &:hover::before {
    left: 130%;
  }

  &:active {
    transform: translateY(2px) scale(0.98);
    box-shadow:
      0 3px 0 #003a80,
      0 8px 12px rgba(0, 0, 0, 0.2),
      0 -1px 6px rgba(255, 255, 255, 0.1) inset;
  }
`;

const CTA = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  // background: linear-gradient(135deg, #0056b3, #00aaff);
  color: #0056b3;
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
        <ul>
          <li>
Subscribe and be Visible.
          </li>
          <li>
 You can <b>BUILD</b> and <b>PREVIEW</b> your portfolio anytime but Your live link is not publicly visible until you subscribe.
          </li>
          <li>
        Your profile won't appear on our public directory without an active subscription.
          </li>
        </ul>
         
      
       

      </Subtitle>

      <PriceBox>
        <Price>₦1000 per year or $2 per year</Price>

        <p>
          Full portfolio visibility
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
              Click here to Subscribe with ₦1000 per year
              </Btn>

              <Btn
                $usd
                onClick={() =>
                  (window.location.href = "/dashboard/paypalpayment")
                }
              >
                Click here to Subscribe with $2 (USD) per year
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