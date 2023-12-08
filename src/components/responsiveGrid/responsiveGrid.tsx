import { useMemo } from "react";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import { useResponsive } from "src/hooks/useResponsive";
// import MovieCard from "../movie/movieCard";
// import Autosizer from "react-virtualized-auto-sizer";
import { IMovie } from "src/store/movie/movieSlide";

import { WindowScroller } from "react-virtualized";
import { HEADER, NAV } from "src/layout/layout-config";
import MovieCard from "../movie/movieCard";

type ResponsiveGridProps = {
  list: IMovie[];
};

const SCROLL_BAR_WIDTH = 20;
const ResponsiveGrid = ({ list }: ResponsiveGridProps) => {
  const sm = useResponsive({ query: "down", start: "sm" });
  const md = useResponsive({ query: "between", start: "sm", end: "md" });
  const lg = useResponsive({ query: "between", start: "md", end: "lg" });
  const xl = useResponsive({ query: "up", start: "lg" });

  const columnCount = useMemo(() => (sm ? 1 : md ? 2 : 3), [sm, md]);

  const Cell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
    const movie = list[rowIndex * columnCount + columnIndex];
    if (!movie) return null;

    return (
      <div style={style}>
        <MovieCard movie={movie} />
      </div>
    );
  };

  const headerHeight = xl ? HEADER.H_DESKTOP : HEADER.H_MOBILE;

  return (
    <WindowScroller>
      {({ width, height }) => {
        const rowCount = Math.ceil(list.length / columnCount);
        const columnWidth =
          (sm || md || lg
            ? width - SCROLL_BAR_WIDTH
            : width - NAV.WIDTH - SCROLL_BAR_WIDTH) / columnCount;
        const rowHeight = columnWidth * 1.5;
        return (
          <Grid
            columnWidth={columnWidth}
            columnCount={columnCount}
            height={height - headerHeight}
            rowHeight={rowHeight}
            rowCount={rowCount}
            width={sm || md || lg ? width : width - NAV.WIDTH}
          >
            {Cell}
          </Grid>
        );
      }}
    </WindowScroller>
  );
};

export default ResponsiveGrid;
