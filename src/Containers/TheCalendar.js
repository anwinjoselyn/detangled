import React, { useState, useEffect } from "react";

import { Calendar, Card, Row, Col, Tag, Space, Tooltip } from "antd";

//import axios from "axios";
import moment from "moment";

import "../App.css";

const TheCalendar = props => {
  const [something, setSomething] = useState(props.something);

  useEffect(() => {
    setSomething(something);
  }, [something]);

  const newGetList = day => {
    //console.log("day", day);
    //console.log("props.selectedDate.month", props.selectedDate.month);
    if (moment(day).format("MM") !== props.selectedDate.month) return [];
    day = day.date();
    let listData = props.data.filter(
      d => parseInt(moment(d.start).format("D")) === day
    );

    return listData || [];
  };

  function dateCellRender(value) {
    const listData = newGetList(value);
    return (
      <Space>
        {listData.map((item, key) => (
          <Tooltip title={item.destination} key={key}>
            <Tag color={item.color} className="calendarTag">
              {item.destination}
            </Tag>
          </Tooltip>
        ))}
      </Space>
    );
  }

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  const onSelect = value => {
    //console.log("value", value);
    props.setSelectedDate({
      ...props.selectedDate,
      value: value,
      selectedValue: value,
      month: moment(value).format("MM")
    });
  };

  const onPanelChange = value => {
    //console.log("value", value);
    props.setSelectedDate({
      ...props.selectedDate,
      value: value,
      month: moment(value).format("MM")
    });
  };

  return (
    <Card className="TheCalendar" bordered={false}>
      <Row>
        <Col span={24}>
          <Calendar
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
            value={props.selectedDate.value}
            onSelect={onSelect}
            onPanelChange={onPanelChange}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default TheCalendar;
