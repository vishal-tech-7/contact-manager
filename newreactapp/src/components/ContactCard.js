import React from "react";
import { Link } from "react-router-dom";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div>
        <h3 style={{ margin: 0 }}>{name}</h3>
        <p style={{ margin: 0, color: "#666" }}>{email}</p>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <i
          className="trash alternate outline icon"
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => props.clickHandler(id)}
        ></i>
        <Link to={`/edit`} state={{ contact: { id, name, email } }}>
          <i
            className="edit alternate outline icon"
            style={{ color: "blue", cursor: "pointer" }}
          ></i>
        </Link>
      </div>
    </div>
  );
};

export default ContactCard;
