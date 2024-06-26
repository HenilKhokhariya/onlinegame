import React, { useEffect, useState } from "react";
import ClientNavbar from "./ClientNavbar";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

export default function Top() {
  const location = useLocation();
  const [cate, setCate] = useState(location.pathname.split("/")[2]);
  const [loader, setLoader] = useState(true);

  const [date, setData] = useState([]);
  const getData = async () => {
    await fetch("https://online-q3u9.onrender.com/api/top", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: cate }),
    }).then(async (res) => {
      const data = await res.json();
      setData(data);
    });
    setLoader(false);
  };
  useEffect(() => {
    getData();
  }, []);
  const dataShow = date.map((v, i) => {
    return <Card value={v} index={i} key={i} />;
  });

  const notGame = <NotAvailable />;
  return (
    <div className="container-fluid">
      <ClientNavbar />
      <Loader loader={loader} />
      <div className="container-fluid" style={{}}>
        <h1 className="alert alert-dark pl-3">{cate}</h1>
        <div className="row">{dataShow.length ? dataShow : notGame}</div>
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

const Card = ({ value, index }) => {
  const handleApp = () => {
    window.location.href = "/AppDetailes/" + value._id;
  };
  return (
    <div
      className="col-6   shdow col-lg-3 col-md-3 mt-5 mb-3 "
      onClick={handleApp}
      style={{ cursor: "pointer" }}
    >
      <div
        className="d-flex px-lg-5 px-2 py-2 py-lg-4 align-item-center shadow-lg justify-content-center"
        style={{ borderRadius: "15px", height: "300px" }}
      >
        <div class="" style={{ width: "25rem" }}>
          <img
            className="card-img-top"
            src={value.post1}
            height="200px"
            alt="Card image cap"
            style={{ border: "0px solid black", borderRadius: "12px" }}
          />
          <div className="row mt-3">
            <div className="col-lg-4 col-5">
              <img
                src={value.icon}
                className="app-card-icon"
                width="50px"
                height="50px"
              />
            </div>
            <div className="col-lg-6 col-7 ps-3">
              <h6 class="nav-link" style={{ color: "black" }}>
                {value.appname.substring(0, 7)}...
              </h6>
              <p class="" style={{ color: "gray" }}>
                {value.category}
              </p>
              <p class="" style={{ color: "gray" }}>
                {value.reating}
                <span
                  class="fa fa-star ms-1"
                  style={{ fontSize: "14px" }}
                ></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
