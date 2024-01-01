import React from "react";
import ProtectedRoute from "../src/ProtectedRoute";
import Cart from "../src/Cart/Cart"

function cartDetails() {
  return (
    <ProtectedRoute>
      <Cart/>
    </ProtectedRoute>
  );
}

export default cartDetails;
