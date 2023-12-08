import { Ref, forwardRef } from "react";
import { Link } from "react-router-dom";

const RouterLink = forwardRef(
  (
    {
      href,
      ...other
    }: {
      href: string;
    },
    ref: Ref<HTMLAnchorElement>
  ) => <Link ref={ref} to={href} {...other} />
);
export default RouterLink;
