import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditContact = ({ updateContactHandler, contacts }) => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();

  // Find the contact by ID
  const contact = contacts.find((contact) => contact.id === id) || { id: "", name: "", email: "" };

  // Initialize state with the contact data
  const [state, setState] = React.useState(contact);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const update = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (state.name === "" || state.email === "") {
      alert("All fields are mandatory!");
      return;
    }

    updateContactHandler(state); // Update the contact
    navigate("/"); // Navigate back to the contact list
  };

  if (!state.id) {
    return <div>Contact not found</div>; // Handle invalid ID
  }

  return (
    <div className="ui main container">
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={state.name}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={state.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="ui button blue">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditContact;
