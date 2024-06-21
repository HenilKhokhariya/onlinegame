import React, { useEffect, useState } from "react";
import ClientNavbar from "./ClientNavbar";
import Loader from "./Loader";

export default function Search() {
  const [searchData, setSearchData] = useState("");
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const getSerachData = async (e) => {
    await fetch(`https://online-q3u9.onrender.com/api/serachgame`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: searchData }),
    }).then(async (res) => {
      const data = await res.json();
      setData(data);
      console.log(data);
    });
    setLoader(false);
  };
  useEffect(() => {
    getSerachData();
  }, [searchData]);

  const handleSerach = (e) => {
    e.preventDefault();
    getSerachData();
  };
  const SimilarGame = data.map((v, i) => {
    return <SimilarCard value={v} index={i} key={i} />;
  });

  return (
    <div className="container-fluid">
      <ClientNavbar />
      <Loader loader={loader} />
      <div className="container">
        <div className="alert alert-success fs-2 ">
          APP
          <form className="form-inline my-2 my-lg-0">
            <div className="row">
              <div className="col-lg-11 col-9 pt-2">
                <input
                  className="form-control mr-sm-2 w-100"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                />
              </div>
              <div className="col-lg-1 col-3">
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                  onClick={handleSerach}
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          {SimilarGame.length ? SimilarGame : <NotAvailable />}
        </div>
      </div>
    </div>
  );
}
const NotAvailable = () => {
  return (
    <>
      <div>
        <h1 className="alert alert-dark">NOT GAME AVAILABLE </h1>
      </div>
    </>
  );
};
const SimilarCard = ({ value, index }) => {
  const handleApp = () => {
    window.location.href = "/AppDetailes/" + value._id;
  };
  return (
    <div className="col-md-3  col-6 col-lg-2  " style={{}}>
      <div
        className="  mt-5 p-5 m-0 m-lg-4"
        style={{
          boxShadow: "2px 10px 20px 2px",
          borderRadius: "20px",
          background: "white",
          height: "280px",
        }}
      >
        <div className="text-center">
          <img
            src={value.icon}
            style={{ borderRadius: "20px" }}
            className="w-75"
          />
        </div>
        <div className="text-center">
          <p className="fs-4 fw-bold my-5">
            {value.appname.substring(0, 14)}...
          </p>
        </div>
        <div className="text-center">
          <button
            onClick={handleApp}
            className="btn btn-outline-dark fw-bold fs-5 w-100"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};
