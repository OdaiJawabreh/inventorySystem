import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import jwtDecode from 'jwt-decode';
import style from "./style.module.css";
import AppAndDrawer from "./Navbar/Main";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

const ProtectedRoute = ({ children, checkedRole }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [setseePage, setSetseePage] = useState(true);

  const router = useRouter();

  const checkLoginStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      setIsLoading(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      console.log("decodedToken", decodedToken);
      const { id, name, email, role } = decodedToken;

      if (checkedRole) {
        if (role !== checkedRole) {
          setSetseePage(false);
        }
      }
      setIsLoggedIn(true);
    } catch (error) {
        console.log("Odai Taha eror");
        console.log(error);
      console.error("Error decoding the token:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window?.innerWidth <= 1280);
    };

    window?.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) {
    return (
      <Box className={style.loader}>
        <CircularProgress />
      </Box>
    );
  }

  return isLoggedIn ? (
    <div className={style.app_container}>
      <AppAndDrawer />
      <Container maxWidth={isSmallScreen ? "lg" : "xl"}>
        <Box className={isSmallScreen ? style.container_padding : ""} sx={{ marginTop: "70px" }}>
          {setseePage ? children : <h1>You don't have access to see this page</h1>}
        </Box>
      </Container>
    </div>
  ) : null;
};

export default ProtectedRoute;
