import React, { useState, useEffect } from "react";

import { Layout, Row, Col, message } from "antd";

//import { format } from "date-fns";
import axios from "axios";
import moment from "moment";

import "./App.css";

import TheCards from "./Containers/TheCards";
import TheCalendar from "./Containers/TheCalendar";

import { isEmpty } from "./libs/validators";

const data = require("./libs/data.json");

const { Header, Footer, Content } = Layout;

const initialValues = {
  value: moment("2020-02"),
  selectedValue: moment("2020-02"),
  month: moment("2020-02").format("MM")
};

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [trips, setTrips] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      try {
        const result = await axios({
          method: "GET",
          url: `http://detangled.in/develop/62dc75d7-e8cb-4d51-a609-307bc0d00493/events`
        });

        //console.log("result.data", result.data);

        if (result.data) setTrips(result.data);
        else setTrips(data);
      } catch (e) {
        setTrips(data);
        message.error("Error retrieving data from server. Using local copy");
        setLoading(false);
      }
    }

    if (trips === null) onLoad();

    if (selectedDate === null) {
      setSelectedDate({
        value: initialValues.value,
        selectedValue: initialValues.selectedValue,
        month: initialValues.month
      });
    }

    if (!isEmpty(selectedDate) && trips) setLoading(false);
  }, [selectedDate, trips]);

  const updateTrips = (data, type) => {
    setLoading(true);

    //console.log("data", data);
    //console.log("type", type);
    let tempTrips = trips;

    if (type === "update") {
      tempTrips = tempTrips.map(t => {
        if (t.id === data.id) {
          return data;
        } else {
          return t;
        }
      });
    }

    if (type === "delete") {
      tempTrips = tempTrips.filter(t => t.id !== data.id);
    }
    //console.log("tempTrips", tempTrips);
    setTrips(tempTrips);
  };

  return (
    <Layout className="MainApp">
      <Header className="MainAppHeader">Trip Cards (Detangled)</Header>
      <Content className="MainAppContent">
        <Row>
          <Col span={12}>
            {!loading && (
              <TheCards
                data={trips.filter(
                  d =>
                    moment(d.start).format("MM-YYYY") ===
                    moment(selectedDate.value).format("MM-YYYY")
                )}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                updateTrips={updateTrips}
              />
            )}
          </Col>
          <Col span={12}>
            {!loading && (
              <TheCalendar
                data={trips.filter(
                  d =>
                    moment(d.start).format("MM-YYYY") ===
                    moment(selectedDate.value).format("MM-YYYY")
                )}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            )}
          </Col>
        </Row>
      </Content>
      <Footer className="MainAppFooter">
        Sample made for @Detangled.in by Anwin Joselyn
      </Footer>
    </Layout>
  );
};

export default App;
