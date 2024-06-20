import React, { useEffect, useState } from "react";
import ClientNavbar from "./ClientNavbar";
import "./Client.css";

export default function Category() {
  const [catData, setCateData] = useState([]);
  const getCategory = async () => {
    await fetch("https://online-q3u9.onrender.com/api/allCate").then(
      async (res) => {
        const data = await res.json();
        setCateData(data);
      }
    );
  };
  useEffect(() => {
    getCategory();
  }, []);
  const categorylist = catData.map((v, i) => {
    return <CatCard v={v} key={i} />;
  });
  const handleHot = () => {
    window.location.href = "/Hot/Top/Hot";
  };
  const handleTop = () => {
    window.location.href = "/Hot/Top/Tot";
  };
  return (
    <div className="container-fluid">
      <ClientNavbar />
      <div className="container">
        <h1 className="category-title">Category</h1>
        <div className="row mt-5">{categorylist}</div>
        <div className="row my-5">
          <div className="col-12">
            <button
              onClick={handleTop}
              className="btn btn-success w-100 fs-1 fw-bold"
              style={{
                height: "60px",
                boxShadow: "#000000bd 13px 14px 20px 0px",
              }}
            >
              TOP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const CatCard = ({ v }) => {
  const handleCat = () => {
    window.location.href = "/showcategorygame/" + v.name;
  };
  return (
    <div
      onClick={handleCat}
      className="col-lg-3 col-md-6 col-12"
      style={{ cursor: "pointer" }}
    >
      <div
        className="bg-primary d-flex align-content-center justify-content-left mx-3 my-3 fs-2 text-light px-5 py-4  "
        style={{
          height: "100px",
          boxShadow: "#000000bd 13px 14px 20px 0px",
        }}
      >
        <div className="row">
          <div className="col-6">
            <img
              className="w-100"
              src={v.icon ? require(`../Image/Icon/${v.icon}`) : ""}
            />
          </div>
          <div className="col-6 mt-4">{v.name}</div>
        </div>
      </div>
    </div>
  );
};
