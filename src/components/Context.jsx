// "use client";

// import { createContext, useContext, useState } from "react";

// export const Context = createContext(null);

// export function ContextProvider({ children }) {
//   const [showSubscriptionReminder, setShowSubscriptionReminder] = useState(false);
//   const [user, setUser] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [theme, setTheme] = useState("light");

//   return (
//     <Context.Provider
//       value={{
//         showSubscriptionReminder,
//         setShowSubscriptionReminder,
//         user,
//         setUser,
//         sidebarOpen,
//         setSidebarOpen,
//         theme,
//         setTheme,
//       }}
//     >
//       {children}
//     </Context.Provider>
//   );
// }

// export function useAppContext() {
//   const context = useContext(Context);

//   if (!context) {
//     throw new Error("useAppContext must be used within a ContextProvider");
//   }

//   return context;
// }


"use client";

import { createContext, useContext, useMemo, useState } from "react";

export const Context = createContext(null);

export function ContextProvider({ children }) {
  const [showSubscriptionReminder, setShowSubscriptionReminder] = useState(false);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Prevent unnecessary re-renders in consumers
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
    }),
    [showSubscriptionReminder, user, sidebarOpen, theme]
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