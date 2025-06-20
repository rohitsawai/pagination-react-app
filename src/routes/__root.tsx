import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Button, Typography } from "@mui/material";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  if (window.location.pathname === "/") {
    window.location.pathname = "/character/page/1";
  }
  return (
    <React.Fragment>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Rick and Morty Characters
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{
          mt: 2,
          mb: 2,
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        onClick={() => window.location.reload()}
      >
        Refresh
      </Button>
      <Outlet />
    </React.Fragment>
  );
}
