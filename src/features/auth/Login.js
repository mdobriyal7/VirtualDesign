import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import BeatLoader from "react-spinners/PulseLoader";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      navigate("/login-message")
      console.log("inside");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing email or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <BeatLoader color={"green"} />
      </div>
    );

  const content = (
    <div className="flex items-center justify-center h-screen">
      <section
        className="public w-full max-w-md border-1 border-gray-800 p-5 rounded"
        style={{ border: "1px solid black" }}
      >
        <header>
          <h1 className="text-2xl font-bold text-center"> Login</h1>
        </header>
        <main className="login mt-4">
          <p
            ref={errRef}
            className={`text-red-500 ${errClass}`}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <form className="form mt-4" onSubmit={handleSubmit}>
            <label htmlFor="email" className="text-lg font-medium">
              Email:
            </label>
            <input
              className="form__input mt-1 p-2 border border-gray-300 rounded w-full"
              type="text"
              id="email"
              ref={userRef}
              value={email}
              onChange={handleUserInput}
              autoComplete="true"
              required
            />

            <label htmlFor="password" className="text-lg font-medium mt-4">
              Password:
            </label>
            <input
              className="form__input mt-1 p-2 border border-gray-300 rounded w-full"
              type="password"
              id="password"
              onChange={handlePwdInput}
              value={password}
              autoComplete="current-password"
              required
            />
            <button className="form__submit-button mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full">
              Sign In
            </button>

            <label
              htmlFor="persist"
              className="form__persist mt-2 flex items-center"
            >
              <input
                type="checkbox"
                className="form__checkbox mr-2"
                id="persist"
                onChange={handleToggle}
                checked={persist}
              />
              <span className="text-base font-medium">Keep me logged in</span>
            </label>
            <div className="flex justify-between mt-5">
              <p className="text-sm font-bold">New User?</p>
              <button className="font-bold bg-blue-800 text-white px-3 py-1">SignUp</button>
            </div>
          </form>
        </main>
        {/* <footer className="mt-4">
        </footer> */}
      </section>
    </div>
  );

  return content;
};

export default Login;
