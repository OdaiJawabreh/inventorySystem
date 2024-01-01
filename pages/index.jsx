import Button from "@mui/material/Button";
import ProtectedRoute from "../src/ProtectedRoute";
function Home() {
  return (
    <ProtectedRoute checkedRole={"admin"}>
      <Button variant="contained">Hello world</Button>
    </ProtectedRoute>
  );
}

export default Home;
