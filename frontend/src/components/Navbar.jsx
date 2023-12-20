import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../pages/Usercontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHome } from "@fortawesome/free-solid-svg-icons";
import { Usecart } from "../pages/Cartcontext";

const Navbar = () => {
  const [userauth, setuserauth] = useAuth();
  const[cart,setcart]=Usecart()

  // this is logOut function...++++
  const logout = () => {
    setuserauth({ ...userauth, user: null, token: "" });
    localStorage.removeItem("auth");
  };

  return (
    <main>
      <nav className="main-nav">
        <ul>
          <li>
            <Link to={"/"}>
              Ecommerce-Web <FontAwesomeIcon icon={faHome} />
            </Link>
          </li>

          {userauth?.user ? (
            <div>
              <li>
                <Link
                  to={`/dashboard/${
                    userauth?.user?.role === 1 ? "admin" : "user"
                  }`}
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link onClick={logout} to={"/login"}>
                  {" "}
                  Logout
                </Link>
              </li>

              <li>
                <Link to={"/cart"} className="bracket">
                  <FontAwesomeIcon icon={faCartShopping} className="chai" />
                  ({cart?.length})
                </Link>
              </li>
            </div>
          ) : (
            <div>
              <li>
                <Link to={"/register"}>Signup</Link>
              </li>

              <li>
                <Link to={"/login"}> Login</Link>
              </li>

              <li>
                <Link to={"/cart"} className="bracket">
                  <FontAwesomeIcon icon={faCartShopping} className="chai" />({cart?.length})
                  
                </Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </main>
  );
};

export default Navbar;
