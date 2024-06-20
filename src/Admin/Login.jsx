import React, { useState } from "react";
import "./Admin.css";
import { json } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export default function Login() {
  const [formData, setFormData] = useState({
    Aid: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("https://online-q3u9.onrender.com/api/AdminLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(async (res) => {
      const data = await res.json();
      if (data.msg === "Login Success") {
        NotificationManager.success("Login Successfully", "Done", 2000);
        window.sessionStorage.setItem("Admin", "true");
        setTimeout(() => {
          window.location.href = "/Admin/";
        }, 2000);
      } else if (data.msg === "Enter Valid Password") {
        NotificationManager.error("Enter Valid Password", "Not Valid", 2000);
      } else {
        NotificationManager.error("Enter Valid Id", "Not Valid", 2000);
      }
    });
  };
  return (
    <div className="container-fluid login-back ">
      <NotificationContainer />
      <div className="row w-100 login-box">
        <div className="col-lg-4 col-2"></div>
        <div
          className="col-lg-4 pb-5 col-8 text-light"
          style={{
            background: "#000e36e8",
            boxShadow: "black 12px 9px 20px 0px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 text-center p-5 fs-1 fw-bold">
                Admin Login
              </div>
            </div>
            <div className="row border pt-5  mx-5">
              <div className="col-12">
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-10  text-center px-lg-5">
                    <input
                      type="text"
                      className="form-control fs-5 fw-bold"
                      name="Aid"
                      value={formData.id}
                      onChange={handleChange}
                      placeholder="Enter ID"
                      required
                    />
                  </div>
                  <div className="col-1"></div>{" "}
                </div>
                <div className="row mt-4">
                  <div className="col-1"></div>
                  <div className="col-10  text-center px-lg-5">
                    <input
                      type="password"
                      className="form-control fs-5 fw-bold"
                      placeholder="Enter Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-1"></div>{" "}
                </div>
                <div className="row mt-4 mb-5">
                  <div className="col-1"></div>
                  <div className="col-10  text-center px-lg-5">
                    <button className="submit btn btn-success w-50 fs-5 fw-bold">
                      Login
                    </button>
                  </div>
                  <div className="col-1"></div>{" "}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-4 col-2"></div>
      </div>
    </div>
  );
}
