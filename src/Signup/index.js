import React, { useState } from "react";
import LoginStyle from "../Login/style";
import { Form, Input, Button, Spin, Select } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [roleName, setRoleName] = useState({ value: "", label: "" });
  const [orgName, setOrgName] = useState({ value: "", label: "" });
  // const [roleName, setRoleName] = useState()
  let baseUrl = "http://localhost:8080/";

  const options = [
    {
      value: "2",
      label: "Organization",
    },
    {
      value: "3",
      label: "User",
    },
  ];

  const options1 = [
    {
      value: "0",
      label: "Organization A",
    },
    {
      value: "1",
      label: "Organization B",
    },
    {
      value: "2",
      label: "Organization C",
    },
  ];

  const handleSelectRole = (value) => {
    const selectedOption = options.find((option) => option.value === value);
    setRoleName({
      value: value,
      label: selectedOption ? selectedOption.label : "",
    });
  };
  const handleSelectOrg = (value) => {
    const selectedOption = options1.find((option) => option.value === value);
    setOrgName({
      value: value,
      label: selectedOption ? selectedOption.label : "",
    });
  };
  console.log("roleName--->", roleName);
  const handleSubmit = async (values) => {
    const { firstName, email, password, role_id, org_id, userId } = values;
    let obj = {
      user_id: userId,
      userName: firstName,
      emailId: email,
      password: password,
      role_id: role_id,
      org_id: org_id,
      org_name: orgName.label,
      role_name: roleName.label,
    };
    console.log("submitted!!", obj);
    setLoading(true);
    try {
      let response = await axios.post(`${baseUrl}sign-up`, obj);
      console.log("response==>", response);
      if (response.data.status) {
        setLoading(false);
        navigate("/login");
      }
    } catch (error) {
      console.log("error while making api call..", error);
      let message = error?.response?.data?.message || "Error while login!!";
      setErrorMsg(message);
      setLoading(false);
      return false;
    }
  };

  const handleValidatePassword = (rule, value) => {
    if (!value) {
      return Promise.reject("Password is required!");
    } else if (value.length < 8) {
      return Promise.reject("Password must be at least 8 characters long!");
    } else {
      return Promise.resolve();
    }
  };

  return (
    <LoginStyle>
      <div className="container_wrap">
        {loading && <Spin spinning={loading} fullscreen size="large" />}

        <div className="login_container">
          <div className="signup_container_data">
            <h1 className="login_title">Sign Up</h1>
            <div className="signup_form">
              <Form
                onFinish={handleSubmit}
                form={form}
                className="payment_form"
                layout="vertical"
                initialValues={{
                  firstName: "",
                  userId: "",
                  email: "",
                  password: "",
                  role_id: "",
                  org_Id: "",
                }}
              >
                <Form.Item
                  label="Full Name"
                  className="signup_form_label mb-1"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "First Name is required!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter First Name"
                    className="login_form_input"
                    maxLength={50}
                  />
                </Form.Item>
                <Form.Item
                  label="User ID"
                  className="signup_form_label mb-1"
                  name="userId"
                  rules={[
                    {
                      required: true,
                      type: "text",
                      message: "userId Id is required!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your userId Id"
                    className="login_form_input"
                    maxLength={50}
                  />
                </Form.Item>
                <Form.Item
                  label="User ID"
                  className="signup_form_label mb-1"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Email Id is required!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your Email Id"
                    className="login_form_input"
                    maxLength={50}
                  />
                </Form.Item>
                {/* <Form.Item
                  label="Phone number"
                  className="signup_form_label mb-1"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Contact Number is required!",
                    },
                    {
                      pattern: /^[0-9]*$/,
                      message: "Please enter a valid contact number.",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter the user Id"
                    className="login_form_input"
                    maxLength={10}
                  />
                </Form.Item> */}

                <Form.Item
                  label="Password"
                  className="registerpassword_field mb-1"
                  name="password"
                  rules={[
                    {
                      required: true,
                      validator: handleValidatePassword,
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
                <Form.Item
                  label="Select Role"
                  className="signup_form_label mb-1"
                  name="role_id"
                  rules={[
                    {
                      required: true,
                      message: "Role is required!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    className="login_form_input"
                    onChange={handleSelectRole}
                    placeholder="Search to Select"
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={options}
                  />
                </Form.Item>
                {roleName.label === "Organization" &&
                    <Form.Item
                    label="Select Organization"
                    className="signup_form_label mb-1"
                    name="org_id"
                    rules={[
                        {
                        required: true,
                        message: "Organization is required!",
                        },
                    ]}
                    >
                    <Select
                        showSearch
                        className="login_form_input"
                        onChange={handleSelectOrg}
                        placeholder="Search to Select"
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        options={options1}
                    />
                    </Form.Item>
                }
                <div className="existing_content mt-1">
                    <p className="signup_tag">
                    Already have an account?{" "}
                    <span
                        className="signup_link"
                        onClick={() => navigate("/login")}
                    >
                        Login here.
                    </span>
                    </p>
                </div>
                
                <div className="text-center register_button_section">
                  <Button
                    className="form_btn mt-4"
                    type="submit"
                    htmlType="submit"
                  >
                    {loading ? (
                      <Spin spinning={loading} size="small" />
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </LoginStyle>
  );
};
