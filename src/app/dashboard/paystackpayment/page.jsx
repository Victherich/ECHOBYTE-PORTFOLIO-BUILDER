"use client";

import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Swal from "sweetalert2";
import PaystackPop from "@paystack/inline-js";
import { auth } from "@/firebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db, paymentDb } from "@/firebaseConfig";
import { useRouter } from "next/navigation";

/* ===================== STYLES ===================== */

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  min-height: 100vh;
  background: #f6f9ff;
  // padding: 2rem;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  width: 100%;
  max-width: 700px;
  background: #fff;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #0056b3;
`;

const PriceBox = styled.div`
  background: #eaf2ff;
  padding: 1rem;
  border-radius: 12px;
  margin-top: 1rem;
  font-weight: 600;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  background: #0056b3;
  color: #fff;

  &:hover {
    background: #003f8a;
  }
`;

const SecondaryButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 0.8rem;
  border: 1px solid #0056b3;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  background: #fff;
  color: #0056b3;
`;

const Box = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 12px;
  background: #f8fbff;
  border: 1px solid #e6f0ff;
  h3{
  color:#0056b3;
  }
`;

const Spinner = styled.div`
  border: 4px solid #ddd;
  border-top: 4px solid #0056b3;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 1rem auto;
`;

const Center = styled.div`
  text-align: center;
`;

/* ===================== PAGE ===================== */

export default function SubscriptionPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle"); 
  // idle | pending | verifying | success
  const [countdown, setCountdown] = useState(0);
const [verifyDisplay, setVerifyDisplay]= useState("Verifying Payment...")
const router = useRouter();

const [redirectCountdown, setRedirectCountdown] = useState(10);
  const PRICE_NGN = 1000;


  /* ===================== INIT PAYMENT ===================== */
 const startPayment = (currency) => {
  const email = auth.currentUser?.email;

  if (!email) {
    Swal.fire("Error", "No logged in user found", "error");
    return;
  }

  const verificationNumber =
    Date.now() + "VX" + Math.floor(Math.random() * 999999);

  const pending = {
    email,
    currency,
    status: "pending",
    verificationNumber,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem("subscription_payment", JSON.stringify(pending));

  setStatus("pending");

  setTimeout(() => {
    startPolling(verificationNumber);
  }, 3000); // 3 seconds

  const paystack = new PaystackPop();

  paystack.newTransaction({
    // key: "pk_test_60e1f53bba7c80b60029bf611a26a66a9a22d4e4",
     key: "pk_live_afb3375b9a770a5a332904dcf1a26e77c2a5f170",
    email,
    amount: PRICE_NGN * 100,
    currency,
    metadata: {
      custom_payment_type: verificationNumber,
    },

    onSuccess: () => {
      setStatus("verifying");
      startPolling(verificationNumber);
    },

    onCancel: () => {
      Swal.fire("Cancelled", "Payment cancelled", "error");
      setStatus("idle");
      localStorage.removeItem("subscription_payment");
    },
  });
};
  

/* ===================== POLLING ===================== */
//   const startPolling = (verificationNumber) => {
//     setCountdown(120);
//     setStatus("verifying");

//     const interval = setInterval(async () => {
//       const res = await fetch(
//         `/api/verify-subscription?ref=${verificationNumber}`
//       );

//       const data = await res.json();

//       if (data?.status === "success") {
//         clearInterval(interval);
//         setStatus("success");
//         localStorage.removeItem("subscription_payment");

//         Swal.fire("Success", "Subscription activated!", "success");
//       }
//     }, 5000);


const startPolling = (verificationNumber) => {
  let attempts = 0;
  const maxAttempts = 18;
  const intervalTime = 5000;

  setCountdown(300);
  setStatus("verifying");

  const intervalId = setInterval(async () => {
    attempts++;

    try {
      const paymentsRef = collection(paymentDb, "paystack_webhooks");

      const q = query(
        paymentsRef,
        where("data.metadata.custom_payment_type", "==", verificationNumber)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const successDoc = snapshot.docs.find(
          (doc) => doc.data()?.data?.status === "success"
        );

        if (successDoc) {
          clearInterval(intervalId);

          const paymentData = successDoc.data();
          setVerifyDisplay("Saving Details...")

          // ✅ CLEAN CALL
          await saveSubscription(paymentData, verificationNumber);

          setStatus("success");
          localStorage.removeItem("subscription_payment");

//          Swal.fire(
//   "Success",
//   "Subscription activated successfully!",
//   "success"
// );

let seconds = 5;

setRedirectCountdown(seconds);

const redirectTimer = setInterval(() => {
  seconds--;

  setRedirectCountdown(seconds);

  if (seconds <= 0) {
    clearInterval(redirectTimer);

    router.push("/dashboard");
  }
}, 1000);


          return;
        }
      }

      if (attempts >= maxAttempts) {
        clearInterval(intervalId);

        Swal.fire(
          "Pending",
          "Payment not confirmed yet. If debited, contact support.",
          "warning"
        );

        setStatus("idle");
      }
    } catch (err) {
      console.error("Polling error:", err);
    }
  }, intervalTime);

  // countdown
  const timer = setInterval(() => {
    setCountdown((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
};





const saveSubscription = async (paymentData, verificationNumber) => {
  const now = new Date();

  // 1 year expiry
  const expiryDate = new Date();
  expiryDate.setFullYear(now.getFullYear() + 1);

  await addDoc(collection(db, "subscriptions"), {
    email: paymentData?.data?.customer?.email || null,
    userId: auth.currentUser?.uid,

    verificationNumber,
    transactionReference: paymentData?.data?.reference || null,

    amount: paymentData?.data?.amount || null,
    currency: paymentData?.data?.currency || "NGN",

    subscriptionStartDate: now.toISOString(),
    subscriptionExpiryDate: expiryDate.toISOString(),

    status: "active",
    createdAt: now.toISOString(),
  });
};






  /* ===================== RESUME ON REFRESH ===================== */
  useEffect(() => {
    const saved = localStorage.getItem("subscription_payment");

    if (saved) {
      const parsed = JSON.parse(saved);
      setStatus("verifying");
      startPolling(parsed.verificationNumber);
    }
  }, []);

  /* ===================== MANUAL CONFIRM ===================== */
  const confirmManual = () => {
    const saved = localStorage.getItem("subscription_payment");

    if (!saved) return Swal.fire("No payment found");

    const { verificationNumber } = JSON.parse(saved);

    setStatus("verifying");
    startPolling(verificationNumber);
  };

  const cancelVerification = ()=>{
     setStatus("idle");
      localStorage.removeItem("subscription_payment");
  }

  return (
    <Container>
      <Card>

        <Title>Portfolio Builder Subscription</Title>

        <p>
          Unlock unlimited portfolio creation and premium features for 1 year.
        </p>

        <PriceBox>
          ₦{PRICE_NGN.toLocaleString()} / year 
        </PriceBox>

        
        {/* ================= VERIFICATION STATE ================= */}
        {status === "verifying" && (
          <Box>
            <Center>
              <Spinner />
              <h3>{verifyDisplay}</h3>
              <p>Do not close this page</p>
              {/* <p>Auto-checking payment status</p> */}
              <h2>⏳ {countdown}s</h2>

              <Button onClick={confirmManual}>
                I Have Completed Payment
              </Button>
               <SecondaryButton onClick={cancelVerification}>
                Cancel
              </SecondaryButton>
            </Center>
          </Box>
        )}

        {/* ================= SUCCESS ================= */}

        {status === "success" && (
  <Box>
    <h2>🎉 Subscription Active</h2>
    <p>You now have full access to portfolio builder.</p>

    <h3>
      Redirecting to dashboard in {redirectCountdown}s...
    </h3>
  </Box>
)}

        {/* ================= IDLE MESSAGE ================= */}
        {status === "idle" && (
          <Box>
            <p>
              💡 Tip: Subscription activates instantly after payment confirmation.
              You can safely refresh this page anytime.
            </p>
          </Box>
        )}


        {/* ================= PAYMENT OPTIONS ================= */}
       {status!== "success"&& <Box>
          <h3>Click Proceed and then Select Your Preferred Payment Method</h3>
          <p>
           <b>NOTE:</b> If you choose bank transfer, then copy the account number that will be shown, go to your bank app and make the transfer, then ensure to come back to this page and click the <b>I HAVE COMPLETED PAYMENT</b> button.
          </p>

          <Button onClick={() => startPayment("NGN")}>
            Proceed with Paystack (₦{PRICE_NGN})
          </Button>

       

 
        </Box>}

        

      </Card>
    </Container>
  );
}