import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import axios from "axios";
import Loader from "../Client/Loader";
export default function Game() {
  if (!window.sessionStorage.getItem("Admin")) {
    window.location.href = "/Admin/Login";
  }
  const [appData, setAppData] = useState({
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

  const [cate, setCate] = useState([]);
  const [file1, setFile1] = useState({});
  const [loader, setLoader] = useState(true);

  const handleChange = (e) => {
    setAppData({ ...appData, [e.target.name]: e.target.value });
  };
  const getCategory = async (req, res) => {
    setLoader(true);
    await fetch("http://localhost:5000/api/allCate").then(async (res) => {
      const data = await res.json();

      setCate(
        data.map((v, i) => {
          return v.name;
        })
      );
    });
    setLoader(false);
  };
  const handleImageChange = (e) => {
    setFile1(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", file1);
    formdata.append("appleUrl", appData.appleUrl);
    formdata.append("category", appData.category);
    formdata.append("developer", appData.developer);
    formdata.append("discription", appData.discription);
    formdata.append("googlePlayUrl", appData.googlePlayUrl);
    formdata.append("appname", appData.appname);
    formdata.append("size", appData.size);
    formdata.append("version", appData.version);
    formdata.append("lastup", appData.lastup);
    await axios
      .post("http://localhost:5000/api/AddGame", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(async (res) => {
        const data = await res;
        console.log(data);
        if (data.status === 200) {
          NotificationManager.success("Game Upload", "Save", 2000);
          setTimeout(() => {
            window.location.href = "/Admin/GameShow";
          }, 1000);
        } else {
          NotificationManager.error("Not Upload", "Cancle", 2000);
        }
      });
    setLoader(false);
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div className="container-fluide">
      <NotificationContainer />
      <Navbar />
      <Loader loader={loader} />
      <div className="container">
        <div className="alert alert-success fs-2">Game</div>
        <form onSubmit={handleSubmit}>
          <div className="row mt-4">
            <div className="col-2">Name</div>
            <div className="col-10">
              <input
                type="text"
                name="appname"
                placeholder="Enter Name"
                className="form-control"
                value={appData.appname}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-2">Category</div>
            <div className="col-10">
              <select
                name="category"
                className="form-control"
                onChange={handleChange}
                required
              >
                <option value="" selected>
                  -- select --
                </option>
                {cate.map((v, i) => {
                  return (
                    <option key={i} value={v}>
                      {v}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-2">Size</div>
            <div className="col-10">
              <input
                type="text"
                name="size"
                placeholder="Enter Size"
                className="form-control"
                value={appData.size}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-2">Discription</div>
            <div className="col-10">
              <textarea
                type="text"
                name="discription"
                placeholder="Enter Name"
                className="form-control"
                value={appData.discription}
                onChange={handleChange}
                row="5"
                cols="100"
                height="20"
              ></textarea>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-2">AppStor URL</div>
            <div className="col-10">
              <input
                type="text"
                name="appleUrl"
                placeholder="Enter App Stor URL"
                className="form-control"
                value={appData.appleUrl}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-2">Google Play Stor URL</div>
            <div className="col-10">
              <input
                type="text"
                name="googlePlayUrl"
                placeholder="Enter Play Stor URL"
                className="form-control"
                value={appData.googlePlayUrl}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-2">Developer</div>
            <div className="col-10">
              <input
                type="text"
                name="developer"
                placeholder="Enter Developer"
                className="form-control"
                value={appData.developer}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-2">Last Update</div>
            <div className="col-10">
              <input
                type="text"
                name="lastup"
                placeholder="Enter Last Update"
                className="form-control"
                value={appData.lastup}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-2">Version</div>
            <div className="col-10">
              <input
                type="text"
                name="version"
                placeholder="Enter Version"
                className="form-control"
                value={appData.developer}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-2">App Icon</div>
            <div className="col-10">
              <input
                type="file"
                name="file"
                placeholder="Enter Play Stor URL"
                className="form-control"
                required
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-2"></div>
            <div className="col-10">
              <input type="submit" className="btn btn-success" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
