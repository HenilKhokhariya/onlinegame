import React, { useEffect, useState } from "react";
import ClientNavbar from "./ClientNavbar";
import "./Client.css";

export default function Home() {
  const [date, setData] = useState([]);
  const getData = async () => {
    await fetch("https://online-q3u9.onrender.com/api/Allgame", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      const data = await res.json();
      setData(data);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  const dataShow = date.map((v, i) => {
    return <Card value={v} index={i} key={i} />;
  });
  return (
    <div className="container-fluid">
      <ClientNavbar />
      <div className="container-fluid" style={{}}>
        <div className="row">
          <h1 className="alert alert-dark pl-3">Best Game</h1>
          {dataShow}
        </div>
      </div>
    </div>
  );
}

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
        className="d-flex px-lg-5 px-3 py-3 py-lg-4 align-item-center shadow-lg justify-content-center"
        style={{ borderRadius: "15px", height: "310px" }}
      >
        <div className="" style={{ width: "25rem" }}>
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
              <h6 className="nav-link" style={{ color: "black" }}>
                {value.appname.substring(0, 7)}...
              </h6>
              <p className="" style={{ color: "gray" }}>
                {value.category}
              </p>
              <p className="" style={{ color: "gray" }}>
                {value.reating}
                <span
                  className="fa fa-star ms-1"
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
