import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { backendPortURL } from "../../confiq";

const ForgotPassword = () => {
  const forgotPasswordValidation = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
  });

  const handleForgotPassword = async (values) => {
    const { email } = values;

    try {
      const forgot = await axios.post(
        `${backendPortURL}user/forgotPassword`,
        { email },
        { withCredentials: true }
      );
      if (forgot) {
        toast.success("Email has sended to your account, Please check.", {
          theme: "dark",
        });
      }
    } catch (error) {
        console.log("Error in sending Forgot Password email.",error)
    }
  };

  return (
    <div className="flex flex-col items-center pt-14 min-h-screen px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4 text-[#144EE3]">
          Forgot Password
        </h1>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={forgotPasswordValidation}
          onSubmit={handleForgotPassword}
        >
          {() => (
            <Form className="rounded-lg shadow-md p-6">
              <Field
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 mb-1 bg-transparent text-white ring-1 ring-[#144EE3] rounded-lg focus:outline-none focus:border-indigo-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-400"
              />
              <div className="flex items-center justify-between gap-8 mt-3 mb-4"></div>
              <button
                type="submit"
                className="w-full px-4 py-3 mt-3 text-lg text-white bg-[#144EE3] rounded-lg hover:bg-[#D75495] focus:outline-none"
              >
                Send Email
              </button>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgotPassword;
