import Box from "@mui/material/Box";
import { NAV } from "./layout-config";
import { useResponsive } from "../hooks/useResponsive";

export default function Main({
  children,
  sx,
  ...other
}: {
  children: React.ReactNode;
  sx?: object;
}) {
  const lgUp = useResponsive({ query: "up", start: "lg" });

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: "flex",
        flexDirection: "column",
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
