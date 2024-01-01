import ProtectedRoute from "../src/ProtectedRoute";
import Products from "../src/Home/Product"
import { useSelector } from "react-redux";

function Home() {
  const {products} = useSelector((state) => state.productStore);

  return (
    <ProtectedRoute >
      <Products/>
    </ProtectedRoute>
  );
}

export default Home;
