import React from "react";
import { Form, Input, Col, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../../slices/authSlice";
import moment from "moment";
import Layout from "../../Common/Layout";
import { apiConnector } from "../../../services/apiConnector";
import { userEndpoints } from "../../../services/apis";
const { APPLY_DOCTOR } = userEndpoints;

const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      dispatch(setLoading(true));

      // Format timings correctly before sending to the server
      const formattedTimings = values.timings.map((time) =>
        moment(time).format("HH:mm")
      );

      const res = await apiConnector(
        "POST",
        APPLY_DOCTOR,
        {
          ...values,
          userId: user._id,
          timings: formattedTimings,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      dispatch(setLoading(false));

      if (res.data.success) {
        message.success(res.data.message);
        navigate("/dashboard/home-page");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
      message.error("Something went wrong.");
    }
  };

  return (
    <Layout>
      <h1 className="text-center">Apply doctor</h1>
      <h5>Personal details: </h5>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true, message: 'Please enter your first name!' }]}
            >
              <Input placeholder="Your First Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true, message: 'Please enter your last name!' }]}
            >
              <Input placeholder="Your Last Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone"
              name="phone"
              required
              rules={[{ required: true, message: 'Please enter your phone number!' }]}
            >
              <Input placeholder="Phone" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Please enter a valid email address!' }
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website" name="website">
              <Input placeholder="Website" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true, message: 'Please enter your address!' }]}
            >
              <Input placeholder="Address" />
            </Form.Item>
          </Col>
        </Row>

        <h5>Professional details: </h5>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true, message: 'Please enter your specialization!' }]}
            >
              <Input placeholder="Your Specialization" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true, message: 'Please enter your experience!' }]}
            >
              <Input placeholder="Your Experience" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees"
              name="fees"
              required
              rules={[{ required: true, message: 'Please enter your fees!' }]}
            >
              <Input placeholder="Fees" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Timings"
              name="timings"
              required
              rules={[{ type: 'array', required: true, message: 'Please select timings!' }]}
            >
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
