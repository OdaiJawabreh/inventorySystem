import React, { useState, useEffect } from "react";
import {
  styled,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Badge,
  Toolbar,
  Box,
  Typography,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import ReceiptLongSharpIcon from "@mui/icons-material/ReceiptLongSharp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/router";
const settings = [
  {
    name: "My Transaction",
    icon: <ReceiptLongSharpIcon />,
  },
  {
    name: "Log out",
    icon: <LogoutTwoToneIcon />,
  },
];
import {  useSelector } from "react-redux";
import Swal from "sweetalert2"

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const CenteredLogoContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

function ResponsiveAppBar() {
  const {cartItem} = useSelector((state) => state.productStore);

  // ----------------------- State -------------------------
  const [scrolled, setScrolled] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [openLogOut, setOpenLogOut] = useState(false);
  const router = useRouter();
  // ----------------- Methods ----------------------------
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const clickOnItem = async (item) => {
    setAnchorElUser(null);
    if (item === "My Transaction") {
      router.push('/transactions')
    } else if (item === "Log out") {
      const confirm = await Swal.fire({
        title: `Are you sure you Want to Log out?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
      });
      if (confirm.isConfirmed) { 
        localStorage.removeItem("token")
        router.push('/login')
      }

    }
  };
  const handleScroll = () => {
    if (window.scrollY > 0 && !scrolled) {
      setScrolled(true);
    } else if (window.scrollY === 0 && scrolled) {
      setScrolled(false);
    }
  };

  // ------------------- use Effect ----------------------
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "White",
          zIndex: 1000,
          boxShadow: scrolled ? "0px 4px 4px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >

          <Container maxWidth="xl">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ flexFlow: 1 }}></Box>
              <CenteredLogoContainer>
              <img
              onClick={()=>{router.push("/")}}
              src="https://media.licdn.com/dms/image/D4D0BAQG5G2eWQn4Ybg/company-logo_200_200/0/1681635517512/nardpos_logo?e=2147483647&v=beta&t=-RK4XaNrylazkgh0w1jAZLpZTrGbj_KI4LL-xcCv0N4"// Replace with the actual path to your logo
              alt="Logo"
              style={{ width: '70px', height: '80px', cursor:"pointer" }} // Adjust the width and margin as needed
            />
              </CenteredLogoContainer>

              <Box display="flex" alignItems="center" gap={1}>
                <Tooltip arrow={true} title="Shopping Cart">
                  <Badge
                    color="primary"
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    badgeContent={cartItem.length}
                    onClick={()=>{router.push('/cartDetails')}}
                  >
                      <ShoppingCartIcon sx={{color:"green", fontSize: "35px", cursor: "pointer"}} />
                  </Badge>
                </Tooltip>
                <Typography variant="body1" component="span">
        |
      </Typography>
      <Tooltip arrow={true} title="Profile setting">
        <ListItemButton disableGutters={true} onClick={handleOpenUserMenu}>
          <ListItemIcon
            sx={{
              minWidth: 0,
              justifyContent: "center",
              border: "1px solid darkgreen",
              borderRadius: "50%",
              padding: "10px",
              color: anchorElUser && "green",
            }}
          >
            <PermIdentityRoundedIcon />
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElUser)}
        onClose={() => setAnchorElUser(null)}
      >
        {settings.map((setting, index) => (
          <MenuItem key={index} onClick={() => clickOnItem(setting.name)}>
            <ListItemIcon>{setting.icon}</ListItemIcon>
            <Typography textAlign="center">{setting.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
              </Box>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

    </div>
  );
}

export default ResponsiveAppBar;

const leftSide = (
  handleOpenUserMenu,
  anchorElUser,
  setAnchorElUser,
  clickOnItem,
  activeClient
) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      {/* Avatar */}
      {activeClient && (
        <Tooltip arrow={true} title={"hhhhhhh"}>
          <Badge
            color="primary"
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            badgeContent={clientsCont?.length}
            onClick={handelOpenClick}
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                sx={{
                  width: 35,
                  height: 35,
                  bgcolor: stringToColor(activeClient.name),
                  cursor: "pointer",
                }}
              >
                <Typography component="span" noWrap={true}>
                  {activeClient.name}
                </Typography>
              </Avatar>
            </StyledBadge>
          </Badge>
        </Tooltip>
      )}

      {/* Separator */}
      <Typography variant="body1" component="span">
        |
      </Typography>

      {/* IconButton */}
      <Tooltip arrow={true} title="Profile setting">
        <ListItemButton disableGutters={true} onClick={handleOpenUserMenu}>
          <ListItemIcon
            sx={{
              minWidth: 0,
              justifyContent: "center",
              border: "1px solid darkgreen",
              borderRadius: "50%",
              padding: "10px",
              color: anchorElUser && "green",
            }}
          >
            <PermIdentityRoundedIcon />
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElUser)}
        onClose={() => setAnchorElUser(null)}
      >
        {settings.map((setting, index) => (
          <MenuItem key={index} onClick={() => clickOnItem(setting.name)}>
            <ListItemIcon>{setting.icon}</ListItemIcon>
            <Typography textAlign="center">{setting.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
