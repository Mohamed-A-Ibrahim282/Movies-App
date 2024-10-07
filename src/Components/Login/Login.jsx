import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "../../Context/authContext";

const Login = () => {
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(authContext);

  const userData = {
    email: "",
    password: "",
  };

  const userSchima = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  async function signin(values) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      setSuccessMsg(data.message);
      setErrorMsg(null);
      setLoading(false);
      setTimeout(() => {
        setSuccessMsg(null);
        localStorage.setItem("movieToken", data.token);
        setToken(data.token);
        navigate("/");
      }, 2000);
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setSuccessMsg(null);
      setLoading(false);
    }
  }

  useEffect(() => {
    document.getElementById("email").addEventListener("focus", () => {
      setErrorMsg(null);
    });

    document.getElementById("password").addEventListener("focus", () => {
      setErrorMsg(null);
    });
  }, []);

  const formikData = useFormik({
    initialValues: userData,
    onSubmit: signin,
    validationSchema: userSchima,
  });

  return (
    <>
      <div className="w-75 m-auto p-5">
        <h2>Login now:</h2>

        {successMsg ? (
          <div className="alert alert-success">{successMsg}</div>
        ) : errorMsg ? (
          <div className="alert alert-danger">{errorMsg}</div>
        ) : (
          ""
        )}

        <form onSubmit={formikData.handleSubmit}>
          <label className="mt-3" htmlFor="email">
            Email
          </label>
          <input
            value={formikData.values.email}
            onChange={formikData.handleChange}
            onBlur={formikData.handleBlur}
            id="email"
            type="email"
            className="form-control"
          />
          {formikData.errors.email && formikData.touched.email ? (
            <p className="text-danger mb-0 fw-semibold">
              {formikData.errors.email}
            </p>
          ) : (
            ""
          )}

          <label className="mt-3" htmlFor="password">
            Password
          </label>
          <input
            value={formikData.values.password}
            onChange={formikData.handleChange}
            onBlur={formikData.handleBlur}
            id="password"
            type="password"
            className="form-control"
          />
          {formikData.errors.password && formikData.touched.password ? (
            <p className="text-danger mb-0 fw-semibold">
              {formikData.errors.password}
            </p>
          ) : (
            ""
          )}

          <div className="d-flex justify-content-end">
            <button
              style={{ width: "100px", height: "40px" }}
              type="submit"
              className="btn btnBg text-white fw-semibold mt-3 d-flex align-items-center justify-content-center"
            >
              {loading ? (
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
