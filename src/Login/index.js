import React from "react";
import LoginStyle from "./style";
import { Button, Form, Input, Spin } from "antd";

const Login = () => {
  return (
    <>
      <LoginStyle>
        <div className="container_wrap">
          {/* {loading && <Spin spinning={loading} fullscreen size="large" />} */}

          <div className="login_container">
            <div className="container_data">
              <h1 className="login_title">Sign In</h1>
              <div className="login_form">
                <Form
                //   onFinish={handleSubmit}
                //   form={form}
                  className=""
                  autoComplete="off"
                  layout="vertical"
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                >
                  <Form.Item
                    label="User ID"
                    className="mt-3 login_form_label"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "User Id is required!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter the user Id"
                      className="login_form_input"
                      maxLength={50}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    className="mt-3 login_form_label"
                    name="password"
                    rules={[
                      {
                        required: true,
                        // validator: handleValidatePassword,
                      },
                    ]}
                  >
                    <Input
                      type="password"
                      placeholder="Enter the password"
                      className="login_form_input"
                      maxLength={50}
                    />
                  </Form.Item>
                  {/* {errorMsg && (
                    <p className="error_msg text-danger text-left mb-0 ">
                      {errorMsg}
                    </p>
                  )} */}

                  <p className="signup_tag">
                    Don't have an account?{" "}
                    <span
                      className="signup_link"
                    //   onClick={() => navigate("/register")}
                    >
                      Create here.
                    </span>
                  </p>

                  <div className="text-center">
                    <Button
                      className="form_btn mt-4"
                      type="submit"
                      htmlType="submit"
                    >
                      {/* {loading ? (
                        <Spin spinning={loading} size="small" />
                      ) : (
                        "Sign in"
                      )} */}
                      Sign In
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </LoginStyle>
    </>
  );
};

export default Login;
