import "./App.scss";
import Login from "./features/auth/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import LoginMessage from "./components/LoginMessage/LoginMessage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route element={<PersistLogin />}>
            <Route
              element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
            >
              <Route path="login-message" element={<LoginMessage />} />
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.Moderator, ROLES.Admin]} />
                }
                //for selective roles (Moderator and admin)
              ></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
