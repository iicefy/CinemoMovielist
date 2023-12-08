import { RootState, useAppDispatch } from "src/store/store";
import { signIn, signOut } from "src/store/auth/authSlide";
import { useSelector } from "react-redux";
import { useRouter } from "src/routes/hooks/use-router";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const isLoggedin = useSelector((state: RootState) => state.auth.isLoggedin);

  const signInUser = () => {
    dispatch(signIn());
    navigate.push("/");
  };

  const signOutUser = () => {
    dispatch(signOut());
    navigate.push("/login");
  };

  return { signInUser, signOutUser, isLoggedin };
};

export default useAuth;
