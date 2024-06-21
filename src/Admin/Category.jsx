import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./Admin.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Loader from "../Client/Loader";
export default function Category() {
  if (!window.sessionStorage.getItem("Admin")) {
    window.location.href = "/Admin/Login";
  }
  const [category, setCategory] = useState("");
  const [cate, setCate] = useState([]);
  const [loader, setLoader] = useState(true);
  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    await fetch("http://localhost:5000/api/addCate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: category.trim() }),
    }).then(async (res) => {
      const data = await res.status;
      console.log(data);
      if (data === 400) {
        NotificationManager.error("Already Exist", "NOT ADD", 2000);
      } else {
        NotificationManager.success("Done", "ADD Category", 2000);
        setCategory("");
        getCategory();
      }
    });
    setLoader(false);
  };
  const getCategory = async (req, res) => {
    setLoader(true);
    await fetch("http://localhost:5000/api/allCate").then(async (res) => {
      const data = await res.json();

      setCate(data);
    });
    setLoader(false);
  };

  const handleCategroyRemove = async (id) => {
    setLoader(true);
    await fetch("http://localhost:5000/api/deleteCate", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ aid: id }),
    }).then(async (res) => {
      const data = await res.status;
      console.log(data);
      if (data === 400) {
        NotificationManager.error("Not Delete", "NOT ADD", 2000);
      } else {
        NotificationManager.success("Record Delete", "ADD Category", 2000);

        getCategory();
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
        <div className="alert alert-success fs-2 ">CATEGORY</div>
        <div className="row">
          <div className="col-4">Category Name</div>
          <div className="col-6">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-6">
                  {" "}
                  <input
                    type="text"
                    placeholder="Enter category"
                    className="form-control w-100"
                    name="category"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="submit"
                    name="submit"
                    value="ADD"
                    className="btn btn-success"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <table className="table mt-5 border border-3">
          <thead class="table-dark ">
            <tr className="">
              <td>No.</td>
              <td>Category.</td>
              <td>Delete</td>
            </tr>
          </thead>
          {cate.map((v, i) => {
            return (
              <tr key={i} className="">
                <td className="ps-3">{i + 1}</td>
                <td className="ps-3">{v.name}</td>
                <td className="">
                  <button
                    className="btn btn-danger my-1"
                    onClick={(e) => handleCategroyRemove(v._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
