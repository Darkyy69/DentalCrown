import React, { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";

const ACCESS_TOKEN = "access";

const PaymentForm = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setNotificationCount(0); // Reset the notification count when opening the notifications list
  };
  const [formData, setFormData] = useState({
    patient: "",
    dentist: "",
    treatment: "",
    current_user: "",
    date: Date.now(),
    amount: "",
  });
  const ws = useRef(null); // Use useRef to maintain the WebSocket instance
  const token = localStorage.getItem(ACCESS_TOKEN);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    api.post("/api/payments/", formData).then((response) => {
      console.log(response.data);
      setShowPaymentPopup(false);
      // append the new payment to the notifications state (notification array.payments)
      // setNotifications((prevNotifications) => {
      //   return {
      //     ...prevNotifications,
      //     payments: [...prevNotifications.payments, response.data],
      //   };
      // });
      fetchNotifications();
    });
  };

  useEffect(() => {
    ws.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/notifications/?token=${token}`
    );

    ws.current.onopen = () => {
      console.log("WebSocket connection opened.");
      //   if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      //   ws.current.send(JSON.stringify({ message: "Hello from the client!" }));
      //   } else {
      // console.error("WebSocket is not open");
      //   }
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);

      if (data.action === "enable" && data.target === "payment-popup") {
        setShowPaymentPopup(true);
        fetchNotifications();

        return;
      } else if (data.action === "disable" && data.target === "payment-popup") {
        setShowPaymentPopup(false);
        fetchNotifications();

        return;
      }
      // setNotifications((prevNotifications) => {
      //   if (prevNotifications.length > 0) {
      //     return [...prevNotifications, data];
      //   } else {
      //     return [data];
      //   }
      // });
      // setNotificationCount((prevCount) => prevCount + 1);
      fetchNotifications();
    };

    ws.current.onclose = () => {
      console.log("WebSocket closed.");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // fetch notifications from the server
  const fetchNotifications = () => {
    api.get("/api/notifications/").then((response) => {
      console.log(response.data);
      setNotifications(response.data);
      // Calculate the count of both arrays
      const paymentCount = response.data.payments.length;
      const appointmentCount = response.data.appointments.length;
      setNotificationCount(paymentCount + appointmentCount);
    });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleClick = () => {
    // Add your button click logic here
    // fake send POST to /api/payments

    // send the message to the websocket server
    try {
      const decodedToken = jwtDecode(token);
      const user_id = decodedToken.user_id;
      ws.current.send({
        type: "appointment_done",
        payment: {
          id: "1",
          patient: "1",
          dentist: "2",
          treatment: "1",
          currentUser: user_id,
          date: "2022-01-01T11:11:00Z",
          amount: "1000",
        },
      });
    } catch (error) {
      console.error("WebSocket is not open");
    }
  };

  const handleClickUpdateAppointment = (event) => {
    event.preventDefault();
    // Add your button click logic here
    // fake send POST to /api/payments

    // send the message to the websocket server
    try {
      // patch the appointment using api call
      api
        .patch(`/api/appointments/4/`, {
          status: "D",
        })
        .then((response) => {
          console.log(response.data);
        });
    } catch {
      console.error("errorrrrr");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const NotificationBell = () => {
    return (
      <div style={{ position: "relative" }}>
        <button
          style={{ marginLeft: "5rem" }}
          onClick={handleNotificationClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 2a9 9 0 0 0-9 9v6h18v-6a9 9 0 0 0-9-9zm7 9h-2v3.5a5.5 5.5 0 0 1-11 0V11H5a3 3 0 0 0-3 3v4h18v-4a3 3 0 0 0-3-3zm-9-7a7 7 0 0 1 7 7v1H5v-1a7 7 0 0 1 7-7zm-2 14h4a5 5 0 0 0 5-5v-1H5v1a5 5 0 0 0 5 5z" />
          </svg>
          {notificationCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                padding: "4px",
                fontSize: "12px",
              }}
            >
              {notificationCount}
            </span>
          )}
        </button>
        {showNotifications && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2>Payments</h2>
            <ul>
              {notifications.payments.map((payment) => (
                <li key={payment.id}>
                  ID: {payment.id}, Row ID: {payment.row_id}, Created At:{" "}
                  {payment.created_at}, Opened: {payment.opened ? "Yes" : "No"},
                  Model ID: {payment.model_id}
                  <br />
                  {payment.model_data.date}
                  <br />
                  {payment.model_data.amount} DA
                </li>
              ))}
            </ul>
            <h2>Appointments</h2>
            <ul>
              {notifications.appointments.map((appointment) => (
                <li key={appointment.id}>
                  ID: {appointment.id}, Row ID: {appointment.row_id}, Created
                  At: {appointment.created_at}, Opened:{" "}
                  {appointment.opened ? "Yes" : "No"}, Model ID:{" "}
                  {appointment.model_id}
                  <br />
                  {appointment.model_data.date}
                  <br />
                  {appointment.model_data.amount}
                  {/* <div> */}
                  {/* ID: {notification.appointment.id} */}
                  {/* <br /> */}
                  {/* Patient: {notification.appointment.patient} */}
                  {/* <br /> */}
                  {/* Dentist: {notification.appointment.dentist} */}
                  {/* <br /> */}
                  {/* Date: {notification.appointment.date} */}
                  {/* <br /> */}
                  {/* Diagnostic: {notification.appointment.diagnostic} */}
                  {/* <br /> */}
                  {/* Start Hour: {notification.appointment.start_hour} */}
                  {/* <br /> */}
                  {/* End hour: {notification.appointment.end_hour} */}
                  {/* <br /> */}
                  {/* Notes: {notification.appointment.notes} */}
                  {/* <br /> */}
                  {/* Price: {notification.appointment.price} */}
                  {/* <br /> */}
                  {/* Status: {notification.appointment.display_status} */}
                  {/* <br /> */}
                  {/* Comment: {notification.appointment.comment} */}
                  {/* <br /> */}
                  {/* Consumable: {notification.appointment.consumable} */}
                  {/* </div> */}
                  {/* {notification.appointment.target} */}
                  {/* {notification.appointment.action} */}
                  {/* </div> */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  // Replace the div with the NotificationBell component
  return (
    <>
      <NotificationBell />
      {showPaymentPopup && (
        <div>
          <form
            onSubmit={handleSubmit}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "20px",
              backgroundColor: "white",
              border: "1px solid",
              borderRadius: "5px",
            }}
          >
            <label>
              Patient:
              <input
                type="text"
                name="patient"
                value={formData.patient}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Dentist:
              <input
                type="text"
                name="dentist"
                value={formData.dentist}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Treatment:
              <input
                type="text"
                name="treatment"
                value={formData.treatment}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Current User:
              <input
                type="text"
                name="current_user"
                value={formData.current_user}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Date:
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Amount:
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </label>
            <br />
            <button type="submit">Submit</button>
            <button onClick={() => setShowPaymentPopup(false)}>Close</button>
          </form>
        </div>
      )}

      <button style={{ marginLeft: "5rem" }} onClick={handleClick}>
        Click me
      </button>
      <button
        style={{ marginLeft: "5rem" }}
        onClick={handleClickUpdateAppointment}
      >
        Update Appointment
      </button>
    </>
  );
};

export default PaymentForm;
