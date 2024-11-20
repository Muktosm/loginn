import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { Flip, toast } from "react-toastify";
import { Audio, Blocks } from "react-loader-spinner";

export const Singup = () => {
  // ********** declered variable part
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [mailError, setMailError] = useState("");
  const [passwordError, setPassworError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  // ******** firbase variable
  const auth = getAuth();
  // ******** function part start
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (userName === "") {
      setUserNameError("User name can't be blank");
      setIsSubmitting(false);
    }
    if (email === "") {
      setMailError("Email can't be blank");
      setIsSubmitting(false);
    }
    console.log(`Email: ${email}, Password: ${password}`);
    if (password === "") {
      setPassworError("Password can't be blank!");
      setIsSubmitting(false);
    }
    if (!agreed) {
      toast.error("You must agree to the Terms of Service", {
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
      setIsSubmitting(false);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // ********* setting up the user name and photo ID
          console.log(user);
          toast.success("Registration successful", {
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
          sendEmailVerification(auth.currentUser).then(() => {
            // Email verification sent!
            toast.success("verification sent to email", {
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

          updateProfile(auth.currentUser, {
            displayName: userName,
            photoURL:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          })
            .then(() => {
              toast.success("User updated ", {
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
              navigate("/login");
            })
            .catch((error) => {
              toast.error("An error ocurred! ", {
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
        })

        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage, errorCode);
          if (errorCode === "auth/invalid-email") {
            console.log("auth/invalid-email");
            toast.error("Invalid Email address", {
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
          if (errorCode === "auth/weak-password") {
            console.log("auth/weak-password");
            toast.error("auth/weak-password", {
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
          if (errorCode === "auth/email-already-in-use") {
            toast.error("email-already-in-use", {
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
        })
        .finally(() => setIsSubmitting(false));
    }
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
            <h1 className="formHeading">Sign Up Now</h1>

            <div className="input">
              <div className="userName">
                <input
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  htmlFor="name"
                  type="text"
                  placeholder={userNameError ? `${userNameError}` : "User Name"}
                  className={
                    userNameError
                      ? " placeholder:text-red-300"
                      : `placeholder:font-medium placeholder:text-[18px] placeholder:leading-[26px] placeholder:text-[rgba(21,20,57,0.40)]`
                  }
                />
              </div>
              <div className="email">
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  htmlFor="email"
                  type="email"
                  placeholder={mailError ? `${mailError}` : "Your Email"}
                  className={
                    mailError
                      ? " placeholder:text-red-300"
                      : `placeholder:font-medium placeholder:text-[18px] placeholder:leading-[26px] placeholder:text-[rgba(21,20,57,0.40)]`
                  }
                />
              </div>
              <div className="password flex justify-between pr-[20px] items-center">
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type={showPassword ? "text" : "password"}
                  placeholder={
                    passwordError ? `${passwordError}` : "Your password"
                  }
                  className={
                    passwordError
                      ? " placeholder:text-red-300"
                      : `placeholder:font-medium placeholder:text-[18px] placeholder:leading-[26px] placeholder:text-[rgba(21,20,57,0.40)]`
                  }
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
            <div className="terms">
              <input
                type="checkbox"
                name="test"
                id="test"
                value={agreed}
                onChange={() => setAgreed(!agreed)}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 checked:bg-blue-500 checked:border-transparent"
              />
              <label htmlFor="test"> I agree to the Terms of Service.</label>
            </div>
            <div className="btn">
              <button disabled={isSubmitting}>
                {isSubmitting ? (
                  <Blocks
                    height="25"
                    width="25"
                    color="#4fa94d"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    visible={true}
                  />
                ) : (
                  "Create an Account"
                )}
              </button>
            </div>
            <div className="singUp">
              <p>
                Do you have an Account? <NavLink to="/logIn"> Log In</NavLink>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
