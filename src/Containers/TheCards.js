import React, { useState } from "react";

import {
  Card,
  Row,
  Col,
  //Divider,
  Modal,
  Popconfirm,
  Form,
  Input,
  message
  //Button
} from "antd";

//import { format, parseISO } from "date-fns";

import moment from "moment";

import axios from "axios";

import "../App.css";

const TheCards = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState({
    id: null,
    data: {},
    editing: false,
    deleting: false
  });
  //console.log("props.selectedDate", props.selectedDate);

  const showModal = data => {
    setEditingId({
      ...editingId,
      data: data,
      id: data.id,
      editing: true
    });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setEditingId({
      ...editingId,
      id: null,
      data: {},
      editing: false,
      deleting: false
    });

    setIsModalVisible(false);
  };

  const submitDelete = async e => {
    e.preventDefault();

    console.log("Deleing item with ID", editingId.id);

    try {
      const result = await axios({
        method: "DELETE",
        url: `http://detangled.in/develop/62dc75d7-e8cb-4d51-a609-307bc0d00493/events/${editingId.id}`
      });

      console.log("result.data", result.data);

      if (result.data) {
        setEditingId({
          ...editingId,
          id: null,
          data: {},
          editing: false,
          deleting: false
        });

        message.success("Successfully deleted Trip");

        setIsModalVisible(false);

        await props.updateTrips(editingId.data, "delete");
      } else {
        message.error("Sorry, something went wrong while deleting :-(");
      }
    } catch (error) {
      message.error("Sorry, something went wrong while deleting :-(");
    }
  };

  const submitEdit = async e => {
    e.preventDefault();

    console.log("Updating item ", editingId.data);

    try {
      const result = await axios({
        method: "PUT",
        url: `http://detangled.in/develop/62dc75d7-e8cb-4d51-a609-307bc0d00493/events/${editingId.id}`,
        data: editingId.data
      });

      console.log("result.data", result.data);

      if (result.data) {
        setEditingId({
          ...editingId,
          id: null,
          data: {},
          editing: false,
          deleting: false
        });

        message.success("Successfully updated Trip");

        setIsModalVisible(false);
        await props.updateTrips(editingId.data, "update");
      } else {
        message.error("Sorry, something went wrong while updating :-(");
      }
    } catch (error) {
      message.error("Sorry, something went wrong while updating :-(");
    }
  };

  const EditForm = () => {
    return (
      <Form layout="vertical" size="default" initialValues={editingId.data}>
        <Form.Item label="Destination">
          <Input
            value={editingId.data.destination}
            onChange={event =>
              setEditingId({
                ...editingId,
                data: {
                  ...editingId.data,
                  destination: event.target.value
                }
              })
            }
          />
        </Form.Item>
        <Form.Item label="Comments">
          <Input
            value={editingId.data.comment}
            onChange={event =>
              setEditingId({
                ...editingId,
                data: {
                  ...editingId.data,
                  comment: event.target.value
                }
              })
            }
          />
        </Form.Item>
        {/*<Row>
          <Col span={24}>
            <Button type="primary" size="small" onClick={submitEdit}>
              Submit
            </Button>
          </Col>
        </Row>*/}
      </Form>
    );
  };

  return (
    <Card className="TheCards" bordered={false}>
      <Row>
        <Col span={24}>
          <Card
            title={
              <div style={{ textAlign: "center" }}>
                Trips - {moment(props.selectedDate.value).format("MMM-YYYY")}{" "}
                <sup>({props.data.length})</sup>
              </div>
            }
            bordered={false}
          >
            <Row>
              {props.data && props.data.length > 0
                ? props.data
                    .sort(
                      (a, b) =>
                        new moment(a.start).format("YYYYMMDD") -
                        new moment(b.start).format("YYYYMMDD")
                    )
                    .map(d => (
                      <Col span={8} key={d.id}>
                        <Card
                          className="innerCard"
                          hoverable
                          title={
                            <div style={{ textAlign: "center" }}>
                              {d.destination}
                              <Popconfirm
                                title="Are you really sure？"
                                okText="Yesss!!!"
                                cancelText="Ooops, NO!"
                                onConfirm={submitDelete}
                                onCancel={() =>
                                  setEditingId({
                                    ...editingId,
                                    deleting: false,
                                    data: {},
                                    id: null
                                  })
                                }
                              >
                                <i
                                  className="far fa-trash-alt deleteIcon"
                                  style={{ float: "right", cursor: "pointer" }}
                                  onClick={() =>
                                    setEditingId({
                                      ...editingId,
                                      deleting: true,
                                      id: d.id,
                                      data: d
                                    })
                                  }
                                />
                              </Popconfirm>{" "}
                              <i
                                className="far fa-edit editIcon"
                                style={{ float: "right", cursor: "pointer" }}
                                onClick={() => showModal(d)}
                              />
                            </div>
                          }
                          style={{ borderTop: `0.8em solid ${d.color}` }}
                        >
                          <i className="far fa-calendar-alt innerIcon" />{" "}
                          {moment(d.start).format("D-MMM-YYYY")}
                          <br />
                          <i className="far fa-clock innerIcon" /> {d.duration}
                          {" m"}
                          <br />
                          <br />
                          <i className="far fa-comment-alt innerIcon" />{" "}
                          {d.comment}
                          <br />
                        </Card>
                      </Col>
                    ))
                : "No data detected"}
            </Row>
          </Card>
        </Col>
      </Row>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        okText="Update Trip"
        cancelText="Cancel"
        onOk={submitEdit}
        onCancel={handleCancel}
      >
        {EditForm()}
      </Modal>
    </Card>
  );
};

export default TheCards;
