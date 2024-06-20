import React from "react";
import { Link } from "react-router-dom";

export default function ClientNavbar() {
  return (
    <>
      {/* <nav className="navbar navbar-expand-lg my-3 fs-5 navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand" href="#home">
            Logo
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ marginLeft: "345px" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to={"/"}
                  className="nav-link active"
                  aria-current="page"
                  href="#home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/category"} className="nav-link" href="#category">
                  Category
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/search"} className="nav-link" href="#search">
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}

      <div className="container-fluid mb-4">
        {/* <Navbar /> */}

        <div
          className="row nav bg-dark text-light text-center pt-3"
          style={{ height: "50px" }}
        >
          <div className="col-2">logo</div>
          <div className="col-4 col-lg-7 col-md-6"></div>
          <div className="col-1 me-3 me-lg-0 me-md-0">
            <Link to={"/"} className="nav-link active" aria-current="page">
              Home
            </Link>
          </div>
          <div className="col-1 me-5 me-lg-0 me-md-3">
            <Link to={"/Category"} className="nav-link ">
              Category
            </Link>
          </div>
          <div className="col-1 me-3 me-lg-0 me-md-0">
            <Link to={"/search"} className="nav-link">
              Search
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
