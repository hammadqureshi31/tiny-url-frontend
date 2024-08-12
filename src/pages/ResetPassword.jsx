import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { backendPortURL } from '../../confiq';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const resetPasswordValidation = Yup.object().shape({
    password: Yup.string()
      .required("Strong password is Required")
      .min(8, "Password is too short")
      .max(16, "Password is too long"),
  });

  const handleResetPassword = async (values) => {
    const { password } = values;

    try {
      const response = await axios.post(`${backendPortURL}user/resetPassword/${id}`, { password }, { withCredentials: true });
      if (response.status === 200) {
        // toast.success("Password reset successful");
        navigate('/login');
      }
    } catch (error) {
      console.error("Error in resetting password:", error);
      // toast.error("Error in resetting password");
    }
  };

  return (
    <div className="flex flex-col items-center pt-14 min-h-screen px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4 text-[#144EE3]">
          Reset Password
        </h1>
        <Formik
          initialValues={{ password: "" }}
          validationSchema={resetPasswordValidation}
          onSubmit={handleResetPassword}
        >
          {({ isSubmitting }) => (
            <Form className="rounded-lg shadow-md p-6">
              <Field type="password" name="password" placeholder="Your Password" className="w-full px-4 py-3 mt-3 mb-1 bg-transparent text-white ring-1 ring-[#144EE3] rounded-lg focus:outline-none focus:border-indigo-500" />
              <ErrorMessage name="password" component="div" className="text-red-400" />
              <div className="flex items-center justify-between gap-8 mt-3 mb-4"></div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-3 mt-3 text-lg text-white bg-[#144EE3] rounded-lg hover:bg-[#D75495] focus:outline-none"
              >
                Create New Password
              </button>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ResetPassword;
