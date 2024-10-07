import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Register = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const userData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };

  const userSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be more than 3 characters")
      .max(20, "Name must be less than 20 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number")
      .required("Phone is required"),
    password: Yup.string()
      .min(8, "Password must be more than 8 letter")
      .max(30, "Password must be less than 30 latter")
      .matches(
        /^[A-Z][a-zA-Z0-9]{7,}$/,
        "The password must start with capital letter and at least 8 characters"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Re-password is required"),
  });

  async function signup(values) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      setSuccessMsg(data.message);
      setErrorMsg(null);
      setLoading(false);
      setTimeout(() => {
        setSuccessMsg(null);
        navigate('/login')
      }, 2000);
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setSuccessMsg(null);
      setLoading(false);
    }
  }

  const formikData = useFormik({
    initialValues: userData,
    onSubmit: signup,
    validationSchema: userSchema,
  });

  useEffect(() => {
    document.getElementById("email").addEventListener("focus", function () {
      setErrorMsg(null);
    });
  }, []);

  return (
    <>
      <div className="w-75 m-auto p-5">
        <h2 className="fw-semibold mb-3">Register now:</h2>

        {errorMsg ? (
          <div className="alert alert-danger">{errorMsg}</div>
        ) : successMsg ? (
          <div className="alert alert-success">{successMsg}</div>
        ) : (
          ""
        )}

        <form onSubmit={formikData.handleSubmit}>
          <label className="mt-3" htmlFor="name">
            Name
          </label>
          <input
            value={formikData.values.name}
            onChange={formikData.handleChange}
            onBlur={formikData.handleBlur}
            id="name"
            type="text"
            className="form-control"
          />
          {formikData.errors.name && formikData.touched.name ? (
            <p className="text-danger fw-bold mb-0">{formikData.errors.name}</p>
          ) : (
            ""
          )}

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
            <p className="text-danger fw-bold mb-0">
              {formikData.errors.email}
            </p>
          ) : (
            ""
          )}

          <label className="mt-3" htmlFor="phone">
            Phone
          </label>
          <input
            value={formikData.values.phone}
            onChange={formikData.handleChange}
            onBlur={formikData.handleBlur}
            id="phone"
            type="tel"
            className="form-control"
          />
          {formikData.errors.phone && formikData.touched.phone ? (
            <p className="text-danger fw-bold mb-0">
              {formikData.errors.phone}
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
            <p className="text-danger fw-bold mb-0">
              {formikData.errors.password}
            </p>
          ) : (
            ""
          )}

          <label className="mt-3" htmlFor="rePassword">
            Re-password
          </label>
          <input
            value={formikData.values.rePassword}
            onChange={formikData.handleChange}
            onBlur={formikData.handleBlur}
            id="rePassword"
            type="password"
            className="form-control"
          />
          {formikData.errors.rePassword && formikData.touched.rePassword ? (
            <p className="text-danger fw-bold mb-0">
              {formikData.errors.rePassword}
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
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
