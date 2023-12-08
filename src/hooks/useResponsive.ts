import { useTheme, Breakpoint } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type MediaUpType = {
  query: "up";
  start: Breakpoint;
  end?: Breakpoint;
};

type MediaDownType = {
  query: "down";
  start: Breakpoint;
  end?: Breakpoint;
};

type MediaBetween = {
  query: "between";
  start: Breakpoint;
  end: Breakpoint;
};

type useResponsiceType = MediaUpType | MediaDownType | MediaBetween;

export function useResponsive({
  query,
  start,
  end,
}: useResponsiceType): boolean {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start));

  const mediaDown = useMediaQuery(theme.breakpoints.down(start));

  const mediaBetween = useMediaQuery(
    theme.breakpoints.between(start, end as Breakpoint)
  );

  const mediaOnly = useMediaQuery(theme.breakpoints.only(start));

  if (query === "up") {
    return mediaUp;
  }

  if (query === "down") {
    return mediaDown;
  }

  if (query === "between") {
    return mediaBetween;
  }

  return mediaOnly;
}

export function useWidth() {
  const theme = useTheme();

  const keys = [...theme.breakpoints.keys].reverse();

  return (
    keys.reduce((output: null | Breakpoint, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));

      return !output && matches ? key : output;
    }, null) || "xs"
  );
}
