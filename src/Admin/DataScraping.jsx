import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export default function DataScraping() {
  if (!window.sessionStorage.getItem("Admin")) {
    window.location.href = "/Admin/Login";
  }
  const [data, setData] = useState({
    icon: "",
    appname: "",
    category: "",
    reating: "",
    age: "",
    lastupdate: "",
    currentVersion: "",
    platform: "",
    developer: "",
    size: "",
    top: "",
    googleplay: "",
    appstor: "",
    discription: "",
    postimg1: "",
    postimg2: "",
    postimg3: "",
    postimg4: "",
    top: "",
  });
  const [Url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("https://online-q3u9.onrender.com/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: Url }),
    }).then(async (res) => {
      const datalist = await res.json();
      setData({
        icon: datalist.data[0].img.trim(),
        appname: datalist.data[0].appname.trim(),
        category: datalist.data[0].category.trim(),
        reating: datalist.data[0].reating.trim(),
        age: datalist.data[0].Age.trim(),
        lastupdate: datalist.data[1].lastupdate.trim(),
        version: datalist.data[1].currentversion.trim(),
        developer: datalist.data[1].developer.trim(),
        size: datalist.data[1].size.trim(),
        platform: datalist.data[1].platform.trim(),
        googleplay: datalist.data[2].googleplay.trim(),
        appstor: datalist.data[3].appstor.trim(),
        discription: datalist.data[4].discription.trim(),
        postimg1: datalist.data[5],
        postimg2: datalist.data[6],
        postimg3: datalist.data[7],
        postimg4: datalist.data[8],
        top: "None",
      });
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await fetch("https://online-q3u9.onrender.com/api/addscrapdata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        appname: data.appname,
        category: data.category,
        size: data.size,
        discription: data.discription,
        appleUrl: data.appstor,
        googlePlayUrl: data.googleplay,
        developer: data.developer,
        platform: data.platform,
        icon: data.icon,
        age: data.age,
        reating: data.reating,
        version: data.version,
        lastupdate: data.lastupdate,
        post1: data.postimg1.postimg1,
        post2: data.postimg2.postimg2,
        post3: data.postimg3.postimg3,
        post4: data.postimg4.postimg4,
        top: data.top,
      }),
    })
      .then(async (res) => {
        let a = await res.status;
        if (a === 200) {
          NotificationManager.success("Done", "Save", 200);
          setData({
            icon: "",
            appname: "",
            category: "",
            reating: "",
            age: "",
            lastupdate: "",
            currentVersion: "",
            platform: "",
            developer: "",
            size: "",
            version: "",
            googleplay: "",
            appstor: "",
            discription: "",
            postimg1: "",
            postimg2: "",
            postimg3: "",
            postimg4: "",
            top: "",
          });
        } else if (a === 400) {
          NotificationManager.error("This Game Already Add", "Cancel", 2000);
        }
      })
      .catch((e) => console.error(e));
  };
  const handleFormdata = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  return (
    <div className="container-fulid">
      <NotificationContainer />
      <Navbar />
      <div className="container">
        {/* Link  */}
        <div className="alert alert-success fs-2 ">
          <h3 className="">LINK TO ADD APP </h3>
          <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-11 col-9 pt-2">
                <input
                  className="form-control mr-sm-2 w-100"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={Url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="col-lg-1 col-3">
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* Data Show */}
        <form onSubmit={handleFormSubmit}>
          <div className="row">
            <div className="col-lg-4 col-12 ">
              <h4 className="mt-3">Icon</h4>
              <hr />
              <img src={data.icon} className="w-50" />
              <h4 className="mt-3">Post</h4>
              <hr />

              <img src={data.postimg1.postimg1} className="w-50" />
              <img src={data.postimg2.postimg2} className="w-50" />
              <img src={data.postimg3.postimg3} className="w-50" />
              <img src={data.postimg4.postimg4} className="w-50" />
              {/* <img src={data.postimg5.postimg5} className="w-50" />
              {/* <img src={data.postimg6.postimg6} className="w-50" />
              <img src={data.postimg7.postimg7} className="w-50" />
              <img src={data.postimg8.postimg8} className="w-50" /> */}
            </div>
            <div className="col-lg-8 col-12">
              <div className="row fs-5 mt-5 mt-lg-2">
                <div className="col-lg-3 col-4 ">Name :</div>
                <div className="col-lg-9 col-8">
                  <input
                    type="text"
                    name="appname"
                    value={data.appname}
                    onChange={handleFormdata}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <hr />
              <div className="row fs-5 mt-5 mt-lg-0">
                <div className="col-lg-3 col-4 ">Category :</div>
                <div className="col-lg-9 col-8">
                  <input
                    type="text"
                    name="category"
                    className="form-control"
                    value={data.category}
                    onChange={handleFormdata}
                    required
                  />
                </div>
              </div>

              <hr />
              <div className="row fs-5 mt-5 mt-lg-0">
                <div className="col-lg-3 col-4 ">Reating :</div>
                <div className="col-lg-9 col-8">
                  <input
                    type="text"
                    name="reating"
                    value={data.reating}
                    onChange={handleFormdata}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <hr />
              <div className="row fs-5 mt-5 mt-lg-0">
                <div className="col-lg-3 col-4 ">Size :</div>
                <div className="col-lg-9 col-8">
                  {" "}
                  <input
                    type="text"
                    name="size"
                    value={data.size}
                    onChange={handleFormdata}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <hr />
              <div className="row fs-5 mt-5 mt-lg-0">
                <div className="col-lg-3 col-4 ">Version :</div>
                <div className="col-lg-9 col-8">
                  {" "}
                  <input
                    type="text"
                    name="version"
                    value={data.version}
                    onChange={handleFormdata}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <hr />
              <div className="row fs-5 mt-5 mt-lg-0">
                <div className="col-lg-3 col-4 ">Last Update :</div>
                <div className="col-lg-9 col-8">
                  {" "}
                  <input
                    type="text"
                    name="lastupdate"
                    value={data.lastupdate}
                    onChange={handleFormdata}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <hr />
              <div className="row fs-5 mt-5 mt-lg-0">
                <div className="col-lg-3 col-4 ">Age :</div>
                <div className="col-lg-9 col-8">
                  {" "}
                  <input
                    type="text"
                    name="age"
                    value={data.age}
                    onChange={handleFormdata}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <hr />
              <div className="row fs-5 mt-5 mt-lg-0">
                <div className="col-lg-3 col-4 ">Platform :</div>
                <div className="col-lg-9 col-8">
                  {" "}
                  <input
                    type="text"
                    name="platform"
                    value={data.platform}
                    onChange={handleFormdata}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <hr />
              <div className="row fs-5 mt-5 mt-lg-0">
                <div className="col-lg-3 col-4 ">Developer :</div>
                <div className="col-lg-9 col-8">
                  {" "}
                  <input
                    type="text"
                    name="developer"
                    value={data.developer}
                    onChange={handleFormdata}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <hr />
              <div className="row fs-5 mt-5 mt-lg-0">
                <div className="col-lg-3 col-4 ">Google Play:</div>
                <div className="col-lg-9 col-8">
                  {" "}
                  <input
                    type="text"
                    name="googleplay"
                    value={data.googleplay}
                    onChange={handleFormdata}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <hr />
              <div className="row fs-5 mt-5 mt-lg-0">
                <div className="col-lg-3 col-4 ">App Store :</div>
                <div className="col-lg-9 col-8">
                  {" "}
                  <input
                    type="text"
                    name="appstor"
                    value={data.appstor}
                    onChange={handleFormdata}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <hr />
              <div className="row fs-5 mt-5 mt-lg-0">
                <div className="col-lg-3 col-4 ">Discription :</div>
                <div className="col-lg-9 col-8">
                  <textarea
                    type="text"
                    name="discription"
                    value={data.discription}
                    onChange={handleFormdata}
                    className="form-control fs-5"
                    rows="5"
                    style={{ height: "200px" }}
                  />
                </div>
              </div>

              <hr />
              <div className="row fs-5 mt-5 mt-lg-0">
                <div className="col-lg-3 col-4 ">Top :</div>
                <div className="col-lg-9 col-8">
                  <input
                    type="radio"
                    name="top"
                    value="Top"
                    onChange={handleFormdata}
                    className="me-2"
                  />
                  <span className="fs-4">TOP</span>
                  <input
                    type="radio"
                    name="top"
                    value="None"
                    onChange={handleFormdata}
                    className="ms-5 me-2"
                    checked
                  />
                  <span className="fs-4">NONE</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row m-5">
            <div className="col-6">
              <input
                type="submit"
                value="ADD"
                className="btn btn-success  w-100"
              />
            </div>
            <div className="col-6">
              <Link to={"/Admin/GameShow"} className="btn btn-danger w-100">
                Back
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
