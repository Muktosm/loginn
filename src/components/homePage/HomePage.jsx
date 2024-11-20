import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { getAuth } from "firebase/auth";

const HomePage = () => {
  // ******* usestate part to store and update the state
  const [user, setUser] = useState();

  // ******* Firebas variable
  const auth = getAuth();
  // ******* function par
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      // ******* Save user to local storage
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
    // ******* Retrieve user from local storage and update state
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse JSON string to object
    }
  }, []); // Runs only on component mount

  return (
    <>
      <section className="homepage">
        <div className="profile">
          <div>
            <div className="profilePicture">
              <img src= {user?.photoURL || "No user to display" } alt= {user?.displayName || "No name to display"} />
            </div>
            <div className="username">
              <p>{user?.displayName || "Guest"}</p>
            </div>
          </div>
          <div>
            <p>{user?.email || "No email address"} </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
