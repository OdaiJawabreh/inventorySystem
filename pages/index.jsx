import ProtectedRoute from "../src/ProtectedRoute";
import Products from "../src/Home/Product"
function Home() {
  return (
    <ProtectedRoute >
      <Products/>
    </ProtectedRoute>
  );
}

export default Home;
