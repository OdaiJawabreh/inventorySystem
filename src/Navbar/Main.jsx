import React, { useState } from "react";
import MiniDrawer from "./MiniDrawer";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

function Main() {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <CssBaseline />
      <ResponsiveAppBar openDrawer={open} setOpenDrawer={setOpen} />
      <MiniDrawer open={open} setOpen={setOpen} />
    </Box>
  );
}

export default Main;
