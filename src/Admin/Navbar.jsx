import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  const handleLogOut = () => {
    window.sessionStorage.clear();
    window.location.href = "/Admin/Login";
  };
  return (
    // <div className="container-fluid my-2">
    //   <nav className="navbar navbar-expand-lg fs-5 navbar-dark bg-dark">
    //     <div className="container-fluid">
    //       <Link to={"/"} className="navbar-brand" href="#home">
    //         Logo
    //       </Link>
    //       <button
    //         className="navbar-toggler"
    //         type="button"
    //         data-bs-toggle="collapse"
    //         data-bs-target="#navbarNavDropdown"
    //         aria-controls="navbarNavDropdown"
    //         aria-expanded="false"
    //         aria-label="Toggle navigation"
    //       >
    //         <span className="navbar-toggler-icon"></span>
    //       </button>
    //       <div
    //         className="collapse navbar-collapse justify-content-end"
    //         id="navbarNavDropdown"
    //       >
    //         <ul className="navbar-nav">
    //           <li className="nav-item">
    //             <Link
    //               to={"/"}
    //               className="nav-link active"
    //               aria-current="page"
    //               href="#home"
    //             >
    //               Home
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link
    //               to={"/Admin/Category"}
    //               className="nav-link"
    //               href="#category"
    //             >
    //               Category
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link
    //               to={"/Admin/GameShow"}
    //               className="nav-link"
    //               href="#search"
    //             >
    //               Game
    //             </Link>
    //           </li>

    //           <li className="nav-item">
    //             <Link
    //               to={"/Admin/DataScraping"}
    //               className="nav-link"
    //               href="#DataScraping"
    //             >
    //               DataScraping
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    // </div>
    <div className="container-fluid mb-4">
      {/* <Navbar /> */}

      <div
        className="row nav bg-dark text-light text-center pt-3"
        style={{ height: "50px" }}
      >
        <div className="col-2">logo</div>
        <div className="col-2 col-lg-5 col-md-4"></div>
        <div className="col-1 me-3 me-lg-0 me-md-0">
          <Link to={"/Admin"} className="nav-link " aria-current="page">
            Home
          </Link>
        </div>
        <div className="col-1 me-5 me-lg-0 me-md-3">
          <Link to={"/Admin/Category"} className="nav-link ">
            Category
          </Link>
        </div>
        <div className="col-1 me-3 me-lg-0 me-md-0">
          <Link to={"/Admin/GameShow"} className="nav-link">
            Game
          </Link>
        </div>
        <div className="col-1 me-lg-0 me-5">
          <Link to={"/Admin/DataScraping"} className="nav-link">
            DataScraping
          </Link>
        </div>
        <div className="col-1 ms-4 ms-lg-0 ms-md-0">
          <Link onClick={handleLogOut} className="nav-link">
            LogOut
          </Link>
        </div>
      </div>
    </div>
  );
}
