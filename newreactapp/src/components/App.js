import React, { useState, useEffect } from "react";
import Header from "./Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { v4 as uuidv4 } from "uuid";
import "../App.css";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";
import api from '../api/contacts';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchtTerm,setSearchTerm] = useState("");
  const [searchResults,setsearchResults] = useState([]);

  const retrieveContacts = async () => {
    try {
      const response = await api.get("/contacts");
      return response.data;
    } catch (error) {
      console.error("Error fetching contacts:", error.message);
    }
  };

  const addContactHandler = async (contact) => {
    const request = { id: uuidv4(), ...contact };
    try {
      const response = await api.post("/contacts", request);
      setContacts([...contacts, response.data]);
    } catch (error) {
      console.error("Error adding contact:", error.message);
    }
  };

  const removeContactHandler = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error.message);
    }
  };

  const updateContactHandler = async (contact) => {
    try {
      const response = await api.put(`/contacts/${contact.id}`, contact);
      setContacts(
        contacts.map((c) =>
          c.id === contact.id ? { ...response.data } : c
        )
      );
    } catch (error) {
      console.error("Error updating contact:", error.message);
    }
  };

  const searchHandler = (searchtTerm) => {
    setSearchTerm(searchtTerm);
    if(searchtTerm !== ""){
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join(" ").toLowerCase().includes(searchtTerm.toLowerCase());
      });
      setsearchResults(newContactList);
    } else {
      setsearchResults(contacts);
    }

  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts && Array.isArray(allContacts)) {
        setContacts(allContacts);
      }
    };

    getAllContacts();
  }, []);

  return (
    <div className="ui main container" style={{ marginTop: "70px" }}>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route
            path="/"
            element={
              <ContactList
                contacts={searchtTerm.length<1 ? contacts : searchResults}
                getContactId={removeContactHandler}
                term = {searchtTerm}
                searchKeyword= {searchHandler}
              />
            }
          />
          <Route
            path="/edit/:id" // Corrected path
            element={
              <EditContact
                updateContactHandler={updateContactHandler}
                contacts={contacts} // Pass contacts for EditContact to find the contact by ID
              />
            }
          />
          <Route
            path="/contact/:id"
            element={<ContactDetail />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
