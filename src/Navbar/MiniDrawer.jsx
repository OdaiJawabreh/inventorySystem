import React, { useState, useEffect } from "react";
import {
  styled,
  Box,
  MuiDrawer,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material/styles";
import { useRouter } from "next/router";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Style.module.css";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  zIndex: theme.zIndex.drawer,

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function MiniDrawer({ open, setOpen }) {

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [drawerListItem, setDrawerListItem] = useState([
    {
      name: "Contacts",
      path: "Contacts",
      active: false,
    },
    {
      name: "CIAM",
      path: "Ciam",
      active: true,
    },
    {
      name: "Upload",
      path: "Upload",
      active: false,
    },
    {
      name: "Task",
      path: "Task",
      active: false,
    },
  ])

  // ----------------------- State -------------------------
  const router = useRouter();

  // ----------------- Methods ----------------------------
  const handleDrawerOpen = () => {
    setOpen(() => !open);
  };
  const handleDrawerList = (ClickedIndex, path) => {
    updateDrawerItems(ClickedIndex, role);
    router.push(path);
  };
  const handleCloseDrawer = (event) => {
    const drawerElement = document.querySelector(".MuiDrawer-paper");
    if (drawerElement && !drawerElement.contains(event.target)) {
      setOpen(false);
    }
  };
  const updateDrawerItems = (activeIndex) => {
    const currentURL = window.location.href;
    const pathSegments = currentURL.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];

    const updatedDrawerList = drawerListItem.map((el, index) => {
      return {
        ...el,
        active: index === activeIndex || el.path === lastSegment,
      };
    });
    setDrawerListItem(updatedDrawerList)
  };
  const getIcon = (value) => {
    return value === "Contacts" ? (
      <PeopleAltOutlinedIcon />
    ) : value === "Ciam" ? (
      <PersonAddAltOutlinedIcon />
    ) : value === "Task" ? (
      <AssignmentTurnedInIcon />
    ) : (
      <CloudUploadOutlinedIcon />
    );
  };

  // ----------------- use Effect ----------------------------
  useEffect(() => {
    document.addEventListener("mousedown", handleCloseDrawer);
    return () => {
      document.removeEventListener("mousedown", handleCloseDrawer);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

//   useEffect(() => {
//     updateDrawerItems(-1, role);
//   }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {(!isSmallScreen || (isSmallScreen && open)) && (
        <Drawer
          variant="permanent"
          open={open}
          className={
            !isSmallScreen || (isSmallScreen && open) ? "" : styles.hide_list
          }
        >
          <DrawerHeader
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <IconButton
              sx={{ backgroundColor: open && "#F7B958" }}
              size="large"
              color="black"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List className={styles.list}>
            {drawerListItem.map((text, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{ display: "block" }}
                size="large"
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  autoFocus={true}
                  dense={true}
                  onClick={() => {
                    handleDrawerList(index, text.path);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : "auto",
                      justifyContent: "center",
                      border: "1px solid #F7B958",
                      borderRadius: "50%",
                      padding: "10px",
                      backgroundColor: text.active && "#F7B958",
                    }}
                  >
                    {getIcon(text.path)}
                  </ListItemIcon>

                  {open && (
                    <ListItemText
                      primary={
                        <Typography
                          variant="span"
                          color="initial"
                          sx={{ fontSize: "15px" }}
                        >
                          {text.name}
                        </Typography>
                      }
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </Box>
  );
}

export default MiniDrawer;
