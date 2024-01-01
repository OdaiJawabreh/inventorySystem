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
  IconButton,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import { useRouter } from "next/router";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import MenuIcon from "@mui/icons-material/Menu";
import ReceiptLongSharpIcon from '@mui/icons-material/ReceiptLongSharp';

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

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

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

function ResponsiveAppBar({ openDrawer, setOpenDrawer }) {
  // ----------------------- State -------------------------
  const [scrolled, setScrolled] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [openLogOut, setOpenLogOut] = useState(false)


  // ----------------- Methods ----------------------------
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const clickOnItem = (item) => {
    setAnchorElUser(null);
    if (item === "My Transaction") {
      console.log(item);
    } else if (item === "Log out") {
        console.log(item);
    } 
  };
  const handleScroll = () => {
    if (window.scrollY > 0 && !scrolled) {
      setScrolled(true);
    } else if (window.scrollY === 0 && scrolled) {
      setScrolled(false);
    }
  }
  const handleDrawerOpen = () => {
    setOpenDrawer(() => !openDrawer);
  };
  // ------------------- use Effect ----------------------
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

//   useEffect(() => {
//     checkActiveClient();
//   }, [clientsCont]);

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
          <Box sx={{ flexFlow: 1 }}>
            <IconButton
              size="large"
              color="black"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Container maxWidth="xl">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ flexFlow: 1 }}></Box>
              <CenteredLogoContainer>
                <div>soosososo</div>
              </CenteredLogoContainer>

              {leftSide(
                stringToColor,
                handleOpenUserMenu,
                setAnchorElUser,
                clickOnItem,
              )}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      {/* {open && <ChangePassword onClose={onClose} open={open} />}
      {openLogOut && <LogOut onClose={onCloseLogOut} open={openLogOut} />} */}
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
        <Tooltip arrow={true} title={'hhhhhhh'}>
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
              border: "1px solid #F7B958",
              borderRadius: "50%",
              padding: "10px",
              backgroundColor: anchorElUser && "#F7B958",
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
