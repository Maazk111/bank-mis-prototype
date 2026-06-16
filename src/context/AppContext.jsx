// src/context/AppContext.jsx
import { createContext, useContext, useState } from "react";
import { users } from "../data/dummyData";

const AppContext = createContext(null);

// Maps the login dropdown's role id -> the "role" field used in dummyData.users
const ROLE_TO_USER_ROLE = {
  teller: "Teller",
  "loan-officer": "Loan Officer",
  "branch-manager": "Branch Manager",
  executive: "Bank Executive",
};

// Fixed "demo day" so the Topbar date matches the hardcoded dates in dummyData.js
const DEMO_DATE = new Date("2026-06-14").toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function AppProvider({ children }) {
  // null = not logged in -> show LoginPage
  const [role, setRole] = useState(null);

  const currentUser = role
    ? users.find((u) => u.role === ROLE_TO_USER_ROLE[role]) || null
    : null;

  const login = (roleId) => setRole(roleId);
  const logout = () => setRole(null);

  const value = {
    role,
    currentUser,
    login,
    logout,
    today: DEMO_DATE,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp() must be used inside an <AppProvider>");
  }
  return ctx;
}