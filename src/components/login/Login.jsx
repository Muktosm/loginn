import React, { useState } from "react";
import "./Login.css";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Flip, toast } from "react-toastify";

const Login = () => {
  // ********** usestate
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // ********** firebase variable
  const auth = getAuth();
  // ********** function part
  const handleSubmit = () => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        if (!user.emailVerified) {
          navigate("/login");
          toast.warn("Please verify email address", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
          });
        }
        if (user.emailVerified) {
          navigate("/");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ******* if an error occured
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
      });
  };

  return (
    <>
      <section
        className="login"
        style={{
          backgroundImage: `url(images/bg.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <form action="" className="form" onSubmit={handleSubmit}>
            <h1 className="formHeading">Log In</h1>
            <div className="input">
              <div className="email">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder={email ? { email } : "Your email"}
                  className="placeholder:font-medium placeholder:text-[18px] placeholder:leading-[26px] placeholder:text-[rgba(21,20,57,0.40)]"
                />
              </div>
              <div className="password flex justify-between pr-[20px] items-center">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder={password ? { password } : "Your password"}
                  className="placeholder:font-medium placeholder:text-[18px] placeholder:leading-[26px] placeholder:text-[rgba(21,20,57,0.40)]"
                />
                {showPassword ? (
                  <IoEyeOutline
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <IoEyeOffOutline
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>
            <div className="forgotPassword">
              <label htmlFor="test">
                Forgot password? <Link to={"/resetpassword"}> Reset</Link>
              </label>
            </div>
            <div className="btn">
              <button type="submit">Log In</button>
            </div>
            <div className="singUp">
              <p>
                Don't have an Account?
                <NavLink to={"/singup"}> Sign Up</NavLink>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
