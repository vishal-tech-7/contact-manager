import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {
  const inputEl = useRef(""); // useRef to handle the search input

  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  // Render the list of contacts
  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
      />
    );
  });

  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value); // Access value using useRef
  };

  return (
    <div
      style={{
        border: "2px solid #007BFF",
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: "#f9f9f9",
        maxWidth: "800px",
        width: "100%",
        margin: "0 auto",
        marginTop: "20px",
        textAlign: "center",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Contact List
      </h2>

      {/* Search Bar */}
      <div className="ui search" style={{ marginBottom: "16px" }}>
        <div className="ui icon input" style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
          <input
            ref={inputEl} // Bind the input to useRef
            type="text"
            placeholder="Search Contact"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm} // Call the function onChange
            style={{
              width: "100%",
              maxWidth: "400px",
            }}
          />
          <i className="search icon"></i>
        </div>
      </div>

      {/* Contact List */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px", // Spacing between each contact
        }}
      >
        {renderContactList.length > 0 ? renderContactList : <div>No Contacts Available</div>}
      </div>

      {/* Add Contact Button */}
      <div style={{ marginTop: "20px" }}>
        <Link to="/add">
          <button className="ui button blue">Add Contact</button>
        </Link>
      </div>
    </div>
  );
};

export default ContactList;
