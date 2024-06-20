import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
export default function UpdateGame() {
  if (!window.sessionStorage.getItem("Admin")) {
    window.location.href = "/Admin/Login";
  }
  const location = useLocation();
  const Uid = location.pathname.split("/", 4)[3];
  const [cate, setCate] = useState([]);
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
    top: "",
  });
  const getData = async () => {
    await fetch(`https://online-q3u9.onrender.com/api/findCate`, {
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
        top: data[0].top,
      });
      console.log(await data);
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("https://online-q3u9.onrender.com/api/updategame", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appData),
    })
      .then(async (res) => {
        const data = await res.status;
        if (data === 200) {
          NotificationManager.success("Update Record");
          setTimeout(() => {
            window.location.href = "/Admin/GameShow";
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    setAppData({ ...appData, [e.target.name]: e.target.value });
    console.log(appData);
  };

  const getCategory = async (req, res) => {
    await fetch("https://online-q3u9.onrender.com/api/allCate").then(
      async (res) => {
        const data = await res.json();

        setCate(
          data.map((v, i) => {
            return v.name;
          })
        );
      }
    );
  };
  useEffect(() => {
    getData();
    getCategory();
  }, []);

  return (
    <div className="container-fluid">
      <NotificationContainer />
      <Navbar />
      <div className="container">
        <div className="row alert alert-success">
          <div className="col-lg-11 pt-2 col-8">
            <h1 className="">UPDATE</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row mt-4">
            <div className="col-2">Icon</div>
            <div className="col-10">
              <input
                type="text"
                name="icon"
                placeholder="Enter Icon Url"
                className="form-control"
                value={appData.icon}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-2">Post 1</div>
            <div className="col-10">
              <input
                type="text"
                name="post1"
                placeholder="Enter Post Url"
                className="form-control"
                value={appData.post1}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-2">Post 2</div>
            <div className="col-10">
              <input
                type="text"
                name="post2"
                placeholder="Enter Post Url"
                className="form-control"
                value={appData.post2}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-2">Post 3</div>
            <div className="col-10">
              <input
                type="text"
                name="post3"
                placeholder="Enter Post Url"
                className="form-control"
                value={appData.post3}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-2">Post 4</div>
            <div className="col-10">
              <input
                type="text"
                name="post4"
                placeholder="Enter Post Url"
                className="form-control"
                value={appData.post4}
                onChange={handleChange}
                required
              />
            </div>
          </div>

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
                <option value={appData.category} selected>
                  {appData.category}
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
                className="form-control fs-5"
                value={appData.discription}
                onChange={handleChange}
                row="5"
                cols="100"
                style={{ height: "200px" }}
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
            <div className="col-2">Platform</div>
            <div className="col-10">
              <input
                type="text"
                name="platfrom"
                placeholder="Enter Developer"
                className="form-control"
                value={appData.platform}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-2">Reating</div>
            <div className="col-10">
              <input
                type="text"
                name="reating"
                placeholder="Enter Version"
                className="form-control"
                value={appData.reating}
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
                value={appData.version}
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
            <div className="col-2">TOP </div>
            <div className="col-10">
              <input
                type="radio"
                name="top"
                placeholder="Enter Top"
                className="me-3"
                value="Top"
                onChange={handleChange}
              />
              <span className="fs-5">Top</span>

              <input
                type="radio"
                name="top"
                placeholder="Enter Top"
                className="me-3 ms-5"
                value="None"
                onChange={handleChange}
              />
              <span className="fs-5">None</span>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-2"></div>
            <div className="col-10">
              <input
                type="submit"
                className="btn btn-success w-25 me-3"
                value="Update"
              />
              <input
                type="submit"
                className="btn btn-danger w-25"
                value="Back"
                onClick={() => {
                  window.location.href = "/Admin/GameShow";
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
