


// "use client";

// import { createContext, useContext, useMemo, useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import PaystackPop from "@paystack/inline-js";
// import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
// import {auth, db, paymentDb } from "@/firebaseConfig";


// export const Context = createContext(null);

// export function ContextProvider({ children }) {
//   const [showSubscriptionReminder, setShowSubscriptionReminder] = useState(false);
//   const [user, setUser] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [theme, setTheme] = useState("light");
  
//   const priceInNGN = { currency: "₦", amount: 100 };
//   const priceInUSD = { currency: "$", amount: 2 };

//   // 1. Initialize state safely for Next.js SSR
//   const [paymentSession, setPaymentSession] = useState(() => {
//     if (typeof window === "undefined") return false;
//     const savedSession = localStorage.getItem("paymentSession");
//     return savedSession ? JSON.parse(savedSession) : false;
//   });

//   // 2. Automatically save state changes to localStorage (browser-only)
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("paymentSession", JSON.stringify(paymentSession));
//     }
//   }, [paymentSession]);




// const payWithPaystack = async () => {
//     const email = auth.currentUser?.email;
//     const name = auth.currentUser?.displayName || "";
//     const nameParts = name.trim().split(/\s+/);
//     const firstName = nameParts[0] || "";
//     const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

//     // 1. Validation check for required data
//     if (!email || !priceInNGN.amount || !firstName || !lastName || !priceInNGN.currency) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Information",
//         text: "Please provide your first name, last name, email, currency, and a valid amount before proceeding with the payment.",
//       });
//       return;
//     }

//     // 2. SweetAlert confirmation prompt before starting
//     const confirmation = await Swal.fire({
//       title: "Start Payment",
//       text: `You are about to start the payment process of ${priceInNGN.currency || ""} ${priceInNGN.amount}. Do you wish to start Now?`,
//       showCancelButton: true,
//       confirmButtonText: "Start Now",
//       cancelButtonText: "Cancel",
//     });

//     if (!confirmation.isConfirmed) {
//       return;
//     }

//     // 3. Prepare data and save to localStorage FIRST (before UI loading states block the thread)
//     const verificationNumber = `${Date.now()}E${Math.floor(Math.random() * 1000000000)}`;
//     const source = "Echobyte Courses Website";
//     const purpose = "Purchase of Course";

//     const initialTransaction = {
//       status: "initialized",
//       amount: priceInNGN.amount,
//       email,
//       firstname: firstName,
//       lastname: lastName,
//       createdAt: new Date().toISOString(),
//       paymentMethod: "Paystack",
//       currency: priceInNGN.currency,
//       metadata: {
//         custom_payment_verification_number: verificationNumber,
//         source,
//         purpose,
//       },
//     };

//     try {
//       localStorage.setItem(
//         "pendingTransaction",
//         JSON.stringify({ transaction: initialTransaction })
//       );
//     } catch (err) {
//       console.error("Failed to save pending transaction to localStorage:", err);
//     }

//     // 4. Update session state & show loading
//     setPaymentSession(true);
//     Swal.fire({ text: "Please wait...", allowOutsideClick: false });
//     Swal.showLoading();

//     // 5. Initialize Paystack transaction popup
//     const paystack = new PaystackPop();
//     paystack.newTransaction({
//       key: "pk_live_afb3375b9a770a5a332904dcf1a26e77c2a5f170",
//       amount: priceInNGN.amount * 100,
//       email,
//       firstname: firstName,
//       lastname: lastName,
//       metadata: {
//         custom_payment_verification_number: verificationNumber,
//         source,
//         purpose,
//       },
//       onSuccess: (transaction) => {
//         Swal.fire({ text: "Payment processing..., Please wait", showConfirmButton: false });
//         Swal.showLoading();

//         // Ensure startPaymentPolling1 is defined in your scope
//         if (typeof startPaymentPolling1 === "function") {
//           startPaymentPolling1(verificationNumber);
//         }
//       },
//       onCancel: () => {
//          setPaymentSession(false);
//         localStorage.removeItem("pendingTransaction");
//         Swal.fire({ icon: "error", text: "Payment cancelled." });
       
//       },
//       onError: (error) => {
//           setPaymentSession(false);
//         localStorage.removeItem("pendingTransaction");
//         Swal.fire({ icon: "error", text: `Payment failed: ${error.message}` });
      
//       },
//     });
//   };


// const saveSubscription = async (paymentData, verificationNumber) => {
//   const now = new Date();

//   // 1 year expiry
//   const expiryDate = new Date();
//   expiryDate.setFullYear(now.getFullYear() + 1);

//   await addDoc(collection(db, "subscriptions"), {
//     email: paymentData?.data?.customer?.email || null,
//     userId: auth.currentUser?.uid,

//     verificationNumber,
//     transactionReference: paymentData?.data?.reference || null,

//     amount: paymentData?.data?.amount || null,
//     currency: paymentData?.data?.currency || "NGN",

//     subscriptionStartDate: now.toISOString(),
//     subscriptionExpiryDate: expiryDate.toISOString(),

//     status: "active",
//     createdAt: now.toISOString(),
//   });
// };


// // ============================================
// // 🔁 Poll Firestore for Payment Verification
// // ============================================
// const startPaymentPolling1 = (verificationNumber, options = {}) => {
//   const { setVerifyDisplay, setStatus, saveSubscription } = options;
  
//   let email = null;
//   try {
//     const pending = localStorage.getItem("pendingTransaction");
//     if (pending) {
//       const parsed = JSON.parse(pending);
//       email = parsed?.transaction?.email;
//     }
//   } catch (err) {
//     console.error("Failed to parse email from pendingTransaction:", err);
//   }

//   if (!verificationNumber || !email) {
//     console.warn("⚠️ Missing verification number or email for polling");
//     return;
//   }

//   let pollingActive = true;
//   let intervalId;

//   const fetchPayment = async () => {
//     if (!pollingActive) return;

//     try {
//       const paymentsRef = collection(paymentDb, "paystack_webhooks");
//       const q = query(
//         paymentsRef,
//         where("data.customer.email", "==", email),
//         where("data.metadata.custom_payment_verification_number", "==", verificationNumber)
//       );

//       const snapshot = await getDocs(q);

//       if (!snapshot.empty) {
//         const successfulDoc = snapshot.docs.find(
//           (doc) => doc.data()?.data?.status === "success"
//         );

//         if (successfulDoc) {
//           // 🛑 Stop polling immediately after success detection
//           pollingActive = false;
//           clearInterval(intervalId);

//           const paymentData = successfulDoc.data();

//           Swal.fire({
//             text: "...Please wait...",
//             allowOutsideClick: false,
//           });
//           Swal.showLoading();

//           console.log("✅ Verified payment:", paymentData);
     
//             await saveSubscription(paymentData, verificationNumber);
//           localStorage.removeItem("pendingTransaction");
//           setPaymentSession(false);
//           // Optional: Finish up or reload/redirect
//           Swal.fire({
//             icon: "success",
//             title: "Payment Successful!",
//             text: "Your subscription has been activated.",
//             timer: 2000,
//             showConfirmButton: false,
//             allowOutsideClick:false,
//           }).then(() => {
//             window.location.reload();
//           });
//         }
//       }
//     } catch (err) {
//       console.error("🔥 Firestore polling error:", err);
//     }
//   };

//   // Run immediately
//   fetchPayment();

//   // Continue polling every 10 seconds
//   intervalId = setInterval(fetchPayment, 10000);

//   // ✅ Return cleanup
//   return () => {
//     pollingActive = false;
//     clearInterval(intervalId);
//   };
// };


// useEffect(() => {
//   // 🔹 Retrieve the verification number from your correct localStorage structure
//   let savedVerificationNumber = null;
//   try {
//     const pending = localStorage.getItem("pendingTransaction");
//     if (pending) {
//       const parsed = JSON.parse(pending);
//       savedVerificationNumber = parsed?.transaction?.metadata?.custom_payment_verification_number;
//     }
//   } catch (err) {
//     console.error("Failed to parse verification number from pendingTransaction:", err);
//   }

//   // 🔹 Start polling using the retrieved verification number
//   const stopPolling = startPaymentPolling1(savedVerificationNumber);

//   // 🔹 Cleanup on unmount
//   return () => {
//     if (stopPolling) stopPolling();
//   };
// }, []);



















//   // Prevent unnecessary re-renders in consumers (Added paymentSession to dependency array)
//   const value = useMemo(
//     () => ({
//       showSubscriptionReminder,
//       setShowSubscriptionReminder,
//       user,
//       setUser,
//       sidebarOpen,
//       setSidebarOpen,
//       theme,
//       setTheme,
//       priceInNGN,
//       priceInUSD,
//       paymentSession,
//       setPaymentSession,
//       payWithPaystack,
//       startPaymentPolling1
//     }),
//     [showSubscriptionReminder, user, sidebarOpen, theme, paymentSession]
//   );

//   return <Context.Provider value={value}>{children}</Context.Provider>;
// }

// export function useAppContext() {
//   const context = useContext(Context);

//   if (context === null) {
//     throw new Error("useAppContext must be used within ContextProvider");
//   }

//   return context;
// }



"use client";

import { createContext, useContext, useMemo, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { auth, db, paymentDb } from "@/firebaseConfig";

export const Context = createContext(null);

export function ContextProvider({ children }) {
  const [showSubscriptionReminder, setShowSubscriptionReminder] = useState(false);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  
  const priceInNGN = { currency: "₦", amount: 1000 };
  const priceInUSD = { currency: "$", amount: 2 };

  const [paymentSession, setPaymentSession] = useState(false);

  // Load from localStorage only after client-side mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSession = localStorage.getItem("paymentSession");
      if (savedSession) {
        setPaymentSession(JSON.parse(savedSession));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("paymentSession", JSON.stringify(paymentSession));
    }
  }, [paymentSession]);

  const saveSubscription = async (paymentData, verificationNumber) => {
    const now = new Date();
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

  // ============================================
  // 🔁 Poll Firestore for Payment Verification
  // ============================================
  const startPaymentPolling1 = (verificationNumber) => {
    if (typeof window === "undefined") return;

    let email = null;
    try {
      const pending = localStorage.getItem("pendingTransaction");
      if (pending) {
        const parsed = JSON.parse(pending);
        email = parsed?.transaction?.email;
      }
    } catch (err) {
      console.error("Failed to parse email from pendingTransaction:", err);
    }

    if (!verificationNumber || !email) {
      console.warn("⚠️ Missing verification number or email for polling");
      return;
    }

    let pollingActive = true;
    let intervalId;

    const fetchPayment = async () => {
      if (!pollingActive) return;

      try {
        const paymentsRef = collection(paymentDb, "paystack_webhooks");
        const q = query(
          paymentsRef,
          where("data.customer.email", "==", email),
          where("data.metadata.custom_payment_verification_number", "==", verificationNumber)
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const successfulDoc = snapshot.docs.find(
            (doc) => doc.data()?.data?.status === "success"
          );

          if (successfulDoc) {
            pollingActive = false;
            clearInterval(intervalId);

            const paymentData = successfulDoc.data();

            Swal.fire({
              text: "...Please wait...",
              allowOutsideClick: false,
            });
            Swal.showLoading();
      
            await saveSubscription(paymentData, verificationNumber);
            localStorage.removeItem("pendingTransaction");
            setPaymentSession(false);
            
            Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              text: "Your subscription has been activated.",
              timer: 2000,
              showConfirmButton: false,
              allowOutsideClick: false,
            }).then(() => {
              window.location.reload();
            });
          }
        }
      } catch (err) {
        console.error("🔥 Firestore polling error:", err);
      }
    };

    fetchPayment();
    intervalId = setInterval(fetchPayment, 10000);

    return () => {
      pollingActive = false;
      clearInterval(intervalId);
    };
  };

  const payWithPaystack = async () => {
    const email = auth.currentUser?.email;
    const name = auth.currentUser?.displayName || "";
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

    if (!email || !priceInNGN.amount || !firstName || !lastName || !priceInNGN.currency) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please provide your first name, last name, email, currency, and a valid amount before proceeding with the payment.",
      });
      return;
    }

    const confirmation = await Swal.fire({
      title: "Start Payment",
      text: `You are about to start the payment process of ${priceInNGN.currency || ""} ${priceInNGN.amount}. Do you wish to start Now?`,
      showCancelButton: true,
      confirmButtonText: "Start Now",
      cancelButtonText: "Cancel",
    });

    if (!confirmation.isConfirmed) {
      return;
    }

    const verificationNumber = `${Date.now()}E${Math.floor(Math.random() * 1000000000)}`;
    const source = "Echobyte Courses Website";
    const purpose = "Purchase of Course";

    const initialTransaction = {
      status: "initialized",
      amount: priceInNGN.amount,
      email,
      firstname: firstName,
      lastname: lastName,
      createdAt: new Date().toISOString(),
      paymentMethod: "Paystack",
      currency: priceInNGN.currency,
      metadata: {
        custom_payment_verification_number: verificationNumber,
        source,
        purpose,
      },
    };

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "pendingTransaction",
          JSON.stringify({ transaction: initialTransaction })
        );
      }
    } catch (err) {
      console.error("Failed to save pending transaction to localStorage:", err);
    }

    setPaymentSession(true);
    Swal.fire({ text: "Please wait...", allowOutsideClick: false });
    Swal.showLoading();

    // Dynamically import PaystackPop inside the client execution block only
    try {
      const PaystackPopModule = (await import("@paystack/inline-js")).default;
      const paystack = new PaystackPopModule();
      
      paystack.newTransaction({
        key: "pk_live_afb3375b9a770a5a332904dcf1a26e77c2a5f170",
        amount: priceInNGN.amount * 100,
        email,
        firstname: firstName,
        lastname: lastName,
        metadata: {
          custom_payment_verification_number: verificationNumber,
          source,
          purpose,
        },
        onSuccess: () => {
          Swal.fire({ text: "Payment processing..., Please wait", showConfirmButton: false });
          Swal.showLoading();

          if (typeof startPaymentPolling1 === "function") {
            startPaymentPolling1(verificationNumber);
          }
        },
        onCancel: () => {
          setPaymentSession(false);
          if (typeof window !== "undefined") {
            localStorage.removeItem("pendingTransaction");
          }
          Swal.fire({ icon: "error", text: "Payment cancelled." });
        },
        onError: (error) => {
          setPaymentSession(false);
          if (typeof window !== "undefined") {
            localStorage.removeItem("pendingTransaction");
          }
          Swal.fire({ icon: "error", text: `Payment failed: ${error.message}` });
        },
      });
    } catch (error) {
      setPaymentSession(false);
      Swal.fire({ icon: "error", text: `Could not load Paystack: ${error.message}` });
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    let savedVerificationNumber = null;
    try {
      const pending = localStorage.getItem("pendingTransaction");
      if (pending) {
        const parsed = JSON.parse(pending);
        savedVerificationNumber = parsed?.transaction?.metadata?.custom_payment_verification_number;
      }
    } catch (err) {
      console.error("Failed to parse verification number from pendingTransaction:", err);
    }

    const stopPolling = startPaymentPolling1(savedVerificationNumber);

    return () => {
      if (stopPolling) stopPolling();
    };
  }, []);

  const value = useMemo(
    () => ({
      showSubscriptionReminder,
      setShowSubscriptionReminder,
      user,
      setUser,
      sidebarOpen,
      setSidebarOpen,
      theme,
      setTheme,
      priceInNGN,
      priceInUSD,
      paymentSession,
      setPaymentSession,
      payWithPaystack,
      startPaymentPolling1
    }),
    [showSubscriptionReminder, user, sidebarOpen, theme, paymentSession]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useAppContext() {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("useAppContext must be used within ContextProvider");
  }

  return context;
}