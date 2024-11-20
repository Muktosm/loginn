import React, { useState } from "react";
import "./ResetPassword.css";
import { NavLink } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Flip, toast } from "react-toastify";
const ResetPassword = () => {
  // ******* usestate to store the default value and update the value
  const [email, setEmail] = useState("");
  const [mailError, setMailError] = useState("");
  // ******* firebase variable 
  const auth = getAuth();

 // ******* function part here
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      setMailError("Email can't be blank");
    } else {
      setMailError("");
    }
    console.log(`Email: ${email} , MailError: ${mailError}`);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        toast.info("Password reset email sent!!", {
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
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
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
          <form action="" onSubmit={handleSubmit} className="form">
            <h1 className="formHeading">Reset password</h1>
            <div className="input">
              <div className="email">
                <input
                  type="text"
                  placeholder="Your Email"
                  className="placeholder:font-medium placeholder:text-[18px] placeholder:leading-[26px] placeholder:text-[rgba(21,20,57,0.40)]"
                  onChange={(e) => {
                    {
                      setEmail(e.target.value), setMailError("");
                    }
                  }}
                  onClick={(e) => {
                    setMailError("");
                  }}
                />
              </div>
            </div>
            <div className="error min-h-[26px] font-DM_sans mt-[-20px] font-medium text-[16px] leading-[26px] text-red-400 ">
              {mailError && <p> {mailError} </p>}
            </div>
            <div className="btn">
              <button>Reset password</button>
            </div>
            <div className="singUp">
              <p>
                Go back to the <NavLink to="/logIn"> Log In</NavLink> page
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
