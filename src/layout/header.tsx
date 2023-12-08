import { HEADER } from "src/layout/layout-config";
import { useResponsive } from "src/hooks/useResponsive";
import { Box, IconButton, Typography } from "@mui/material";
import Iconify from "src/components/Iconify/Iconify";

type headerProps = {
  onOpenNav: () => void;
};

export default function Header({ onOpenNav }: headerProps) {
  const lgUp = useResponsive({ query: "up", start: "lg" });
  const headerHeight = lgUp ? HEADER.H_DESKTOP : HEADER.H_MOBILE;

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}
    </>
  );

  return (
    <Box height={headerHeight} px={2} display={"flex"} alignItems={"center"}>
      {renderContent}
      <Typography variant="h4" color="black">
        Movies
      </Typography>
    </Box>
  );
}
