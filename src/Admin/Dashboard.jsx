import { useEffect, useState } from "react";
import "./Admin.css";
import Navbar from "./Navbar";
import Loader from "../Client/Loader";

export default function Dashboard() {
  if (!window.sessionStorage.getItem("Admin")) {
    window.location.href = "/Admin/Login";
  }
  const [bordData, setBordData] = useState({
    game: "",
    cat: "",
    top: "",
  });
  const [loader, setLoader] = useState(true);
  const getData = async (req, res) => {
    await fetch("https://online-q3u9.onrender.com/api/Dashbord", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      const data = await res.json();
      setBordData(data);
    });
    setLoader(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="container-fluid">
        <Navbar />
        <Loader loader={loader} />
        <div className="container">
          <h1 className="alert alert-success fs-1 fw-bold text-center ">
            Dashboard
          </h1>
          <div className="row mt-5">
            <div className="col-6 col-lg-4 col-md-4">
              <div className="d-flex align-content-center justify-content-center">
                <div class="card text-white w-100 bg-success mb-3">
                  <div class="card-header fs-1">Game</div>
                  <div class="card-body">
                    <h5 class="card-title fs-2">{bordData.game}</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-4 col-md-4">
              <div className="d-flex align-content-center justify-content-center">
                <div class="card text-white w-100 bg-primary mb-3">
                  <div class="card-header fs-1">Category</div>
                  <div class="card-body">
                    <h5 class="card-title fs-2">{bordData.cat}</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-4 col-md-4">
              <div className="d-flex align-content-center justify-content-center">
                <div class="card text-white w-100 bg-danger mb-3">
                  <div class="card-header fs-1">Top</div>
                  <div class="card-body">
                    <h5 class="card-title fs-2">{bordData.top}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
