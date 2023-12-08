import { ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import Header from "./header";
import Nav from "./nav";
import Main from "./main";

export default function AppLayout({ children }: { children: ReactNode }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
        <Main>
          <Header onOpenNav={() => setOpenNav(true)} />
          {children}
        </Main>
      </Box>
    </>
  );
}
