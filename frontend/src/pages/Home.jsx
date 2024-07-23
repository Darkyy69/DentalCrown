import { useState, useEffect, useRef } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [username, setUsername] = useState("");
  const ws = useRef(null); // Use useRef to maintain the WebSocket instance
  const ACCESS_TOKEN = "access";
  const token = localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    ws.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/notifications/?token=${token}`
    );
    console.log(ws.current);
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications((prev) => [...prev, data.message]);
    };
    ws.current.onopen = () => {
      console.log("WebSocket connection opened.");
      //   if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      //   ws.current.send(JSON.stringify({ message: "Hello from the client!" }));
      //   } else {
      // console.error("WebSocket is not open");
      //   }
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

  useEffect(() => {
    // when notification state changes (new notification is added), remove it after 3 seconds
    if (notifications.length > 0) {
      const timeout = setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [notifications]);

  const handleMessageSend = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ message: username }));
    } else {
      console.error("WebSocket is not open");
    }
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {notifications.map((notification, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#bebebe",
              borderRadius: "8px",
              padding: "24px",
              marginBottom: "10px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            {notification}
          </div>
        ))}
      </div>
      <label>Username</label>
      <input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        type="text"
        name="username"
      />
      <button onClick={() => handleMessageSend()}>Send Message</button>

      {/* {notifications.map((notification, index) => (
        <div key={index}>
          {notification}
          <button onClick={() => handlePaymentStatus("paid")}>
            Patient Paid
          </button>
          <button onClick={() => handlePaymentStatus("unpaid")}>
            Patient Didn't Pay
          </button>
        </div>
      ))} */}
    </div>
  );
};

const handlePaymentStatus = (status) => {
  fetch("/api/update_payment_status/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
};

function Home() {
  const [notes, setNotes] = useState([]);
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  // const for the authenticated user id
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/posts/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/posts/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const likeNote = (id) => {
    api
      .post(`/api/posts/${id}/like_post/`)
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          //   if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          //     ws.current.send(JSON.stringify({ message: username }));
          //   } else {
          //     console.error("WebSocket is not open");
          //   }
        } else alert("Failed to like note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/posts/", { body, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make note.");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <NotificationComponent />

      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note
            note={note}
            onDelete={deleteNote}
            onLike={likeNote}
            key={note.id}
          />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="body">body:</label>
        <br />
        <textarea
          id="body"
          name="body"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Home;
