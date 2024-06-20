import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./Admin.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
export default function GameShow() {
  if (!window.sessionStorage.getItem("Admin")) {
    window.location.href = "/Admin/Login";
  }
  const [searchData, setSearchData] = useState("");
  const [data, setData] = useState([]);
  const getData = async (req, res) => {
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

  const getSerachData = async (e) => {
    await fetch(`https://online-q3u9.onrender.com/api/serachgame`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: searchData }),
    }).then(async (res) => {
      const data = await res.json();
      setData(data);
    });
  };
  useEffect(() => {
    getSerachData();
  }, [searchData]);

  const handleSerach = (e) => {
    e.preventDefault();
    getSerachData();
  };

  let dataList = data.map((v, i) => {
    return <ShowData key={i} value={v} index={i} />;
  });
  return (
    <div className="container-fluid">
      <NotificationContainer />
      <Navbar />
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
        <div className="gameShow">
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Category</th>
                <th scope="col">Developer</th>
                <th scope="col">Size</th>
                <th scope="col">Version</th>
                <th scope="col">Age</th>
                <th scope="col">Last Update</th>
                <th scope="col">Platform</th>
                <th scope="col">Opration</th>
              </tr>
            </thead>
            <tbody>{data.length > 0 ? dataList : `Data Not Found`}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const ShowData = ({ value, index }) => {
  const gameRemove = async (id) => {
    await fetch("https://online-q3u9.onrender.com/api/deletegame", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ aid: id }),
    }).then(async (res) => {
      const data = await res.status;
      console.log(data);
      if (data === 400) {
        NotificationManager.error("Not Delete", "NOT ADD", 2000);
      } else {
        NotificationManager.success("Record Delete", 2000);
        setTimeout(() => {
          window.location.href = "/Admin/GameShow";
        }, 1000);
      }
    });
  };

  const getUpdate = (i) => {
    window.location.href = `/Admin/UpdateGame/${i}`;
  };
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{value.appname}</td>
      <td>
        <img
          src={value.icon ? value.icon : ""}
          alt="Not"
          style={{ width: "50px", height: "50px" }}
        />
      </td>
      <td>{value.category}</td>
      <td>{value.developer}</td>
      <td>{value.size}</td>
      <td>{value.version}</td>
      <td>{value.age}</td>
      <td>{value.lastup}</td>
      <td>{value.platform}</td>
      <td>
        <button
          className="btn btn-dark me-2 w-100"
          onClick={(e) => getUpdate(value._id)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger mt-2 w-100"
          onClick={(e) => gameRemove(value._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
