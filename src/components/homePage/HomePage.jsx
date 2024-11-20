import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { getAuth } from "firebase/auth";

const HomePage = () => {
  // ******* usestate part to store and update the state
  const [user, setUser] = useState("");

  // ******* Firebas variable
  const auth = getAuth();
  // ******* function par
  useEffect(() => {
    const user = auth.currentUser;
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      setUser(user);
      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;
    }
  }, []);


  return (
    <>
      <section className="homepage">
        <div className="profile">
          <div>
            <div className="profilePicture">
              <img src="" alt="" />
            </div>
            <div className="username">
              <p> {user?.displayName  || "user Name"} </p>
            </div>
          </div>
          <div>
            <p> </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
