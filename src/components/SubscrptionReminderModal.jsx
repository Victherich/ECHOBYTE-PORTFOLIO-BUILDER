"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled, { keyframes, css } from "styled-components";
import { auth, db } from "@/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

/* ─────────────────────────────────────────
   ANIMATIONS
───────────────────────────────────────── */
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(40px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
`;

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0   0   rgba(0,86,179,0.35); }
  50%       { box-shadow: 0 0 18px 6px rgba(0,86,179,0.18); }
`;

const floatBadge = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-5px); }
`;

/* ─────────────────────────────────────────
   STYLED COMPONENTS
───────────────────────────────────────── */

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 20, 60, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: ${fadeIn} 0.3s ease forwards;
`;

const Modal = styled.div`
  background: #ffffff;
  border-radius: 24px;
  max-width: 480px;
//   height:90%;
  width: 100%;
  overflow: hidden;
  position: relative;
  animation: ${slideUp} 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  box-shadow:
    0 32px 64px rgba(0, 40, 120, 0.22),
    0 0 0 1px rgba(0, 86, 179, 0.08);
`;

/* top gradient banner */
const Banner = styled.div`
  background: linear-gradient(135deg, #0056b3 0%, #1a8fe3 60%, #00c6ff 100%);
  padding: 10px 20px;
  position: relative;
  overflow: hidden;
  text-align:center;

  /* decorative circles */
  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
  }
  &::before {
    width: 220px;
    height: 220px;
    top: -60px;
    right: -60px;
  }
  &::after {
    width: 130px;
    height: 130px;
    bottom: -30px;
    left: -30px;
  }
`;

const BannerIcon = styled.div`
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.18);
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  margin-bottom: 1rem;
  animation: ${floatBadge} 3s ease-in-out infinite;
`;

const BannerTitle = styled.h2`
//   margin: 0 0 0.4rem;
  color: #ffffff;
  font-size: 1.45rem;
  font-family: "Georgia", serif;
  font-weight: 700;
  letter-spacing: -0.3px;
  position: relative;
  z-index: 1;
`;

const BannerSub = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.88rem;
  line-height: 1.5;
  position: relative;
  z-index: 1;
`;

/* floating price badge */
const PriceBadge = styled.div`
  position: absolute;
  bottom: -22px;
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
  border: 2.5px solid #e8f0fe;
  border-radius: 50px;
  padding: 0.45rem 1.4rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  box-shadow: 0 8px 24px rgba(0, 86, 179, 0.14);
  white-space: nowrap;
  z-index: 2;
  animation: ${pulse} 2.5s ease-in-out infinite;
`;

const PricePill = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  color: #0056b3;
  background: ${(p) => (p.$usd ? "#e8f4ff" : "#fff3e0")};
  border-radius: 20px;
  padding: 0.15rem 0.6rem;
`;

const Divider = styled.span`
  font-size: 0.75rem;
  color: #aaa;
`;

/* body */
const Body = styled.div`
  padding: 20px 20px;
`;

const FeatureList = styled.ul`
  list-style: none;
  margin: 0 0 1.6rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.88rem;
  color: #444;
  line-height: 1.5;
`;

const FeatureIcon = styled.span`
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  background: ${(p) => (p.$warn ? "#fff4e5" : "#e8f5e9")};
  color: ${(p) => (p.$warn ? "#e07b00" : "#2e7d32")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  margin-top: 1px;
`;

/* shimmer CTA strip */
const ShimmerStrip = styled.div`
  background: linear-gradient(
    90deg,
    #f4f8ff 0%,
    #ddeeff 40%,
    #f4f8ff 80%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 2.4s linear infinite;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  text-align: center;
  font-size: 0.82rem;
  color: #0056b3;
  font-weight: 600;
  margin-bottom: 1.4rem;
`;

/* buttons */
const BtnStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const SubBtn = styled.button`
  width: 100%;
  padding: 0.85rem 1rem;
  border: none;
  border-radius: 12px;
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s, box-shadow 0.2s;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  letter-spacing: 0.2px;

  ${(p) =>
    p.$naira &&
    css`
      background: linear-gradient(135deg, #0056b3, #0072e5);
      box-shadow: 0 6px 18px rgba(0, 86, 179, 0.35);
    `}

  ${(p) =>
    p.$usd &&
    css`
      background: linear-gradient(135deg, #1a73e8, #00aaff);
      box-shadow: 0 6px 18px rgba(26, 115, 232, 0.3);
    `}

  &:hover {
    transform: translateY(-2px);
    opacity: 0.93;
    box-shadow: 0 10px 24px rgba(0, 86, 179, 0.3);
  }
  &:active {
    transform: translateY(0);
  }
`;

const RemindBtn = styled.button`
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1.5px solid #e0e8f5;
  border-radius: 12px;
  background: transparent;
  font-size: 0.85rem;
  font-weight: 600;
  color: #7a90b0;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  margin-top: 0.2rem;

  &:hover {
    background: #f4f8ff;
    color: #0056b3;
    border-color: #b3cde8;
  }
`;

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function SubscriptionReminderModal() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const checkAndShow = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(
          collection(db, "subscriptions"),
          where("userId", "==", user.uid),
          where("status", "==", "active")
        );

        const snapshot = await getDocs(q);

        if (cancelled) return;

        // check for a truly unexpired subscription
        const hasActive = snapshot.docs.some((doc) => {
          const data = doc.data();
          const expiry = new Date(data.subscriptionExpiryDate);
          return expiry > new Date();
        });

        if (!hasActive) {
          setVisible(true);
        }
      } catch (err) {
        console.error("Subscription modal check error:", err);
      }
    };

    checkAndShow();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!visible) return null;

  const close = () => setVisible(false);

  const goNaira = () => {
    close();
    router.push("/dashboard/paystackpayment");
  };

  const goUSD = () => {
    close();
    router.push("/pay-usd");
  };

  return (
    <Backdrop onClick={close}>
      <Modal onClick={(e) => e.stopPropagation()}>
        {/* ── TOP BANNER ── */}
        <Banner>
          {/* <BannerIcon>🚀</BannerIcon> */}
          <BannerTitle>Go Live with Your Portfolio</BannerTitle>
          {/* <BannerSub>
            You&apos;re building something great. Subscribe to publish it to
            the world and appear on the public directory.
          </BannerSub> */}

          {/* floating price badge */}
          {/* <PriceBadge>
            <PricePill>₦1,000&nbsp;/&nbsp;yr</PricePill>
            <Divider>or</Divider>
            <PricePill $usd>$2&nbsp;/&nbsp;yr</PricePill>
          </PriceBadge> */}
        </Banner>

        {/* ── BODY ── */}
        <Body>
          <FeatureList>
            <FeatureItem>
              <FeatureIcon>✓</FeatureIcon>
              Continue creating and editing your portfolio freely — no limits.
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>✓</FeatureIcon>
              Preview your portfolio anytime before publishing.
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon $warn>!</FeatureIcon>
              Your live link is&nbsp;<strong>not publicly visible</strong>&nbsp;
              until you subscribe.
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon $warn>!</FeatureIcon>
              Your profile won&apos;t appear on the public directory without an
              active subscription.
            </FeatureItem>
          </FeatureList>

          <ShimmerStrip>
            ✨ Unlock full visibility for less than a cup of coffee per year
          </ShimmerStrip>

          <BtnStack>
            <SubBtn $naira onClick={goNaira}>
              <span>₦</span> Subscribe with ₦1,000&nbsp;/&nbsp;year
            </SubBtn>

            <SubBtn $usd onClick={goUSD}>
              <span>$</span> Subscribe with $2 USD&nbsp;/&nbsp;year
            </SubBtn>

            <RemindBtn onClick={close}>🔔 Remind me later</RemindBtn>
          </BtnStack>
        </Body>
      </Modal>
    </Backdrop>
  );
}
