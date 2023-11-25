import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isModerator = false;
  let isAdmin = false;
  let status = "Employee";

  if (token) {
    const decoded = jwtDecode(token);
    const { email, roles } = decoded.UserInfo;

    isModerator = roles.includes("Manager");
    isAdmin = roles.includes("Moderator");

    if (isModerator) status = "Moderator";
    if (isAdmin) status = "Admin";

    return { email, roles, status, isModerator, isAdmin };
  }

  return { email: "", roles: [], isModerator, isAdmin, status };
};
export default useAuth;
