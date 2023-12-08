import { useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import { Theme, alpha } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import { NAV } from "./layout-config";
import { useResponsive } from "../hooks/useResponsive";
import { usePathname } from "../routes/hooks/use-pathname";
import ScrollbarComponent from "../components/scrollbar/scrollbar";
import navConfig from "./nav-config";
import RouterLink from "src/routes/components/router-link";
import { Button } from "@mui/material";
import useAuth from "src/hooks/useAuth";

export default function Nav({
  openNav,
  onCloseNav,
}: {
  openNav: boolean;
  onCloseNav: () => void;
}) {
  const pathname = usePathname();
  const { signOutUser } = useAuth();

  const upLg = useResponsive({ query: "up", start: "lg" });

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderHeaderApp = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      Cinemo
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item: { title: string; path: string }) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const signOutButton = (
    <Box p={2}>
      <Button
        variant="outlined"
        sx={{ width: "100%" }}
        onClick={() => signOutUser()}
      >
        SignOut
      </Button>
    </Box>
  );

  const renderContent = (
    <ScrollbarComponent
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {renderHeaderApp}
      {renderMenu}
    </ScrollbarComponent>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            width: NAV.WIDTH,
            borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
          {signOutButton}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
          {signOutButton}
        </Drawer>
      )}
    </Box>
  );
}

function NavItem({
  item,
}: {
  item: {
    title: string;
    path: string;
  };
}) {
  const pathname = usePathname();
  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: "body2",
        color: "text.secondary",
        textTransform: "capitalize",
        fontWeight: "fontWeightMedium",
        ...(active && {
          color: "primary.main",
          fontWeight: "fontWeightSemiBold",
          bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.08),
          "&:hover": {
            bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
