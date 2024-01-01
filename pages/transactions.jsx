import React from "react";
import ProtectedRoute from "../src/ProtectedRoute";
import Transactions from "../src/Transactions/Transactions";
function transactions() {
  return (
    <ProtectedRoute>
      <Transactions />
    </ProtectedRoute>
  );
}

export default transactions;
