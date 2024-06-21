import React, { useEffect, useState } from "react";
import ClientNavbar from "./ClientNavbar";
import { useLocation } from "react-router-dom";
import "./Client.css";
import Loader from "./Loader";

export default function AppDetailes() {
  const location = useLocation();
  const [loader, setLoader] = useState(true);
  const Uid = location.pathname.split("/", 4)[2];
  const [similarGameData, setSimilarGameData] = useState([]);
  const [appData, setAppData] = useState({
    id: Uid,
    appname: "",
    appleUrl: "",
    googlePlayUrl: "",
    size: "",
    developer: "",
    icon: "",
    category: "",
    discription: "",
    version: "",
    lastup: "",
  });
  const getData = async () => {
    await fetch(`http://localhost:5000/api/findCate`, {
      method: "Post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id: Uid }),
    }).then(async (res) => {
      const data = await res.json();
      setAppData({
        id: Uid,
        icon: data[0].icon,
        post1: data[0].post1,
        post2: data[0].post2,
        post3: data[0].post3,
        post4: data[0].post4,
        age: data[0].age,
        platform: data[0].platform,
        appname: data[0].appname,
        appleUrl: data[0].appleUrl,
        googlePlayUrl: data[0].googlePlayUrl,
        size: data[0].size,
        developer: data[0].developer,
        category: data[0].category,
        discription: data[0].discription,
        version: data[0].version,
        lastup: data[0].lastup,
        reating: data[0].reating,
      });
    });
    setLoader(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getSimilarGame();
  }, [appData.category]);

  const getSimilarGame = async () => {
    await fetch("http://localhost:5000/api/SimilarGame", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: appData.category }),
    }).then(async (res) => {
      const data = await res.json();
      setSimilarGameData(data);
    });
  };

  const SimilarGame = similarGameData.map((v, i) => {
    return <SimilarCard value={v} index={i} key={i} />;
  });
  return (
    <div className="container-fluid">
      <ClientNavbar />
      <Loader loader={loader} />
      <div className="container">
        {/* Icon */}
        <div className="row mb-5">
          <div className="col-12 d-flex align-content-center justify-content-center mt-4 col-lg-2">
            <img
              src={appData.icon}
              className=""
              style={{ borderRadius: "20px", width: "120px" }}
            />
          </div>
          <div className="col-12  col-lg-10">
            <div className="row">
              <div className="col-12 d-flex align-content-center justify-content-center mt-4">
                <h1 className="kanit-thin">{appData.appname}</h1>
              </div>
              <div className="row w-100 d-flex align-content-center justify-content-center mt-4 mt-3 ">
                <div
                  className="col-4 w-25 pe-4 fs-6 "
                  style={{ borderRight: "2px solid gray" }}
                >
                  <b className="">{appData.category?.toUpperCase() || "N/A"}</b>
                  <br />
                  <span className="" style={{ fontSize: "12px" }}>
                    {" "}
                    CATEGORY
                  </span>
                </div>
                <div
                  className="col-4 w-25 text-center fs-6 fw-100"
                  style={{ borderRight: "2px solid gray" }}
                >
                  <b>{appData.reating?.toUpperCase() || "N/A"}</b>
                  <br />
                  <div className="">
                    <span
                      className="fa fa-star ms-1"
                      style={{ fontSize: "14px", color: "gray" }}
                    ></span>
                    <span
                      className="fa fa-star ms-1"
                      style={{ fontSize: "14px", color: "gray" }}
                    ></span>
                    <span
                      className="fa fa-star ms-1"
                      style={{ fontSize: "14px", color: "gray" }}
                    ></span>
                    <span
                      className="fa fa-star ms-1"
                      style={{ fontSize: "14px", color: "gray" }}
                    ></span>
                    <span
                      className="fa fa-star ms-1"
                      style={{ fontSize: "14px", color: "gray" }}
                    ></span>
                  </div>
                </div>
                <div className="col-4 text-center w-25 fs-6 fw-100">
                  <b>{appData.age?.toUpperCase() || "N/A"}</b>
                  <br />
                  <span className="pt-5" style={{ fontSize: "12px" }}>
                    {" "}
                    AGE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />

        {/* Information */}
        <div className="row mb-3 mt-5">
          <div className="row d-none d-lg-block d-md-block text-left">
            <div className="col-12 ps-5 gray">
              <h5>INFORMATION :</h5>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-center row">
              <div className="col-12 px-3 col-md-12 col-lg-4">
                <div className="row mt-2 appInfo-card py-3">
                  <div className="col-1 pe-4 ps-3">
                    <i className="fa fa-code" style={{ fontSize: "22px" }}></i>
                  </div>
                  <div className="col-3 appInfo-lable w-25">Developer</div>
                  <div className="col-8 w-50 fs-12 text-right pe-3 pt-1">
                    {appData.developer}
                  </div>
                </div>
              </div>
              <div className="col-12 mt-2 px-3 col-md-12 col-lg-4">
                <div className="row  appInfo-card py-3">
                  <div className="col-1 pe-4 ps-3">
                    <i
                      className="fa fa-gamepad"
                      style={{ fontSize: "22px" }}
                    ></i>
                  </div>
                  <div className="col-3 appInfo-lable w-25">Version</div>
                  <div className="col-8 fs-12 w-50 text-right pe-3 pt-1">
                    {appData.version}
                  </div>
                </div>
              </div>

              <div className="col-12 mt-2 px-3 col-md-12 col-lg-4">
                <div className="row  appInfo-card py-3">
                  <div className="col-1 pe-4 ps-3">
                    <i
                      className="fa fa-desktop"
                      style={{ fontSize: "22px" }}
                    ></i>
                  </div>
                  <div className="col-3 appInfo-lable w-25">Platform</div>
                  <div className="col-8 fs-12 w-50 text-right pe-3 pt-1">
                    {appData.platform}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center row">
              <div className="col-12 px-3 col-md-12 col-lg-4">
                <div className="row mt-2 appInfo-card py-3">
                  <div className="col-1 ps-3 pe-4">
                    <i className="fa fa-star" style={{ fontSize: "22px" }}></i>
                  </div>
                  <div className="col-3 appInfo-lable">Ratings</div>
                  <div className="col-8 w-50 fs-12 text-right pe-3 pt-1">
                    {appData.reating}
                  </div>
                </div>
              </div>
              <div className="col-12 mt-2 px-3 col-md-12 col-lg-4">
                <div className="row  appInfo-card py-3">
                  <div className="col-1 ps-3">
                    <i
                      className="fa fa-file-code-o"
                      style={{ fontSize: "22px" }}
                    ></i>
                  </div>
                  <div className="col-3 appInfo-lable w-25">Size</div>
                  <div className="col-8 fs-12 w-50 text-right pt-1">
                    {appData.size}
                  </div>
                </div>
              </div>

              <div className="col-12 mt-2 px-3 col-md-12 col-lg-4">
                <div className="row  appInfo-card py-3">
                  <div className="col-1 ps-3">
                    <i
                      className="fa fa-hourglass-end"
                      style={{ fontSize: "22px" }}
                    ></i>
                  </div>
                  <div className="col-3 appInfo-lable me-3">Updated</div>
                  <div className="col-8 fs-12 w-50 text-right pe-4 pt-1">
                    {appData.lastup}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />

        {/* Get Game */}
        <div className="row">
          <div className="col-12 fs-4 mx-0 my-4 my-lg-4 mx-lg-4 ">
            Get Game :
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-6 mt-3 mt-lg-0 pe-0 pe-md-3 pe-lg-3 col-md-6 col-12 ">
            <a
              className="row get-app-card"
              href={appData.googlePlayUrl}
              target="_blank"
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="col-2">
                <i
                  className="fa fa-google-play"
                  aria-hidden="true"
                  style={{ fontSize: "36px" }}
                ></i>
              </div>
              <div className="col-10 fs-3 fw-bold mt-2">Google Play</div>
            </a>
          </div>
          <div className="col-lg-6 mt-3 mt-lg-0 pe-0 ps-md-3 ps-lg-3 col-md-6 col-12 ">
            <a
              href={appData.appleUrl}
              className="row get-app-card"
              style={{
                textDecoration: "none",
                color: "black",
                target: "_blank",
              }}
            >
              <div className="col-2">
                <i className="fa fa-apple" style={{ fontSize: "38px" }}></i>
              </div>
              <div className="col-10 fs-3 fw-bold mt-2">App Store</div>
            </a>
          </div>
        </div>
        <hr />

        {/*Verified antivirus*/}
        <div className="row">
          <div className="col-12">
            <i
              className="fa fa-shield pe-3"
              aria-hidden="true"
              style={{ fontSize: "30px", color: "green" }}
            ></i>
            <span className="fw-bold fs-5 pe-2" style={{ color: "green" }}>
              Verified antivirus
            </span>
            <span>
              All download links on this website jump to official platforms such
              as App Store and Google Play. No viruses. No malware.
            </span>
          </div>
        </div>
        <hr />

        {/* DISCRIPTION */}
        <div className="row">
          <div className="col-12 fs-4 my-3 fw-bold">DESCRIPTION :</div>
        </div>

        <div className="row">
          <div className="col-12 fs-3 ">
            <pre className="app-discription">{appData.discription}</pre>
          </div>
        </div>
        <hr />
        {/* Post Image */}
        <PostImg appData={appData} />

        <hr />
        {/* Similar Game */}
        <br />
        <h1 className="mb-5">{appData.category} Game</h1>
        <div className="row">{SimilarGame}</div>
      </div>
    </div>
  );
}

const PostImg = ({ appData }) => {
  return (
    <div className="row my-3">
      <div id="myCarousel" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li
            data-target="#myCarousel"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
        </ol>

        <a
          className="left carousel-control"
          href="#myCarousel"
          data-slide="prev"
        >
          <span className="glyphicon glyphicon-chevron-left"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="right carousel-control"
          href="#myCarousel"
          data-slide="next"
        >
          <span className="glyphicon glyphicon-chevron-right"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
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
