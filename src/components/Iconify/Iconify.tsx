import { ReactElement, forwardRef } from "react";
import { Icon, IconifyIcon } from "@iconify/react";

import Box, { BoxProps } from "@mui/material/Box";

interface IconifyProps {
  icon: string | IconifyIcon;
  sx?: Record<string, unknown>;
  width?: number;
}

const Iconify = forwardRef<ReactElement, IconifyProps & BoxProps>(
  ({ icon, width = 20, sx, ...other }, ref) => (
    <Box
      ref={ref}
      component={Icon}
      className="component-iconify"
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  )
);

export default Iconify;
