import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Landing.css";

function Landing() {
  const [data, setData] = useState([]);
  const [editedIndex, setEditedIndex] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    email: "",
    phone: "",
    gender: "",
  });

  const retrieveRandomData = async () => {
    try {
      let response = await axios.get("https://randomuser.me/api/?results=5");
      setData(response?.data?.results || []);
      console.log("Retrieve 5 Random Data", response?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewRandomData = async () => {
    try {
      let response = await axios.get("https://randomuser.me/api/?results=5");
      setData((prevData) => [...prevData, ...response?.data?.results]);
    } catch (error) {
      console.log(error);
    }
  };

  const editData = (index) => {
    setEditedIndex(index);
    const selectedUserData = data[index];
    setEditedUserData({
      email: selectedUserData.email,
      phone: selectedUserData.phone,
      gender: selectedUserData.gender,
    });
  };

  const updateData = () => {
    if (editedIndex !== null) {
      const newData = [...data];
      const editedUser = newData[editedIndex];

      if (
        editedUserData.email !== "" &&
        editedUserData.email !== editedUser.email
      ) {
        editedUser.email = editedUserData.email;
      }
      if (
        editedUserData.phone !== "" &&
        editedUserData.phone !== editedUser.phone
      ) {
        editedUser.phone = editedUserData.phone;
      }
      if (
        editedUserData.gender !== "" &&
        editedUserData.gender !== editedUser.gender
      ) {
        editedUser.gender = editedUserData.gender;
      }

      setData(newData);
      setEditedIndex(null);
      setEditedUserData({
        email: "",
        phone: "",
        gender: "",
      });
    }
  };

  const deleteData = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const printData = () => {
    return data.map((user, index) => (
      <tr key={index} className="text-center gap-20">
        <td>{`${user.name.title} ${user.name.first} ${user.name.last}`}</td>
        <td>
          {editedIndex === index ? (
            <input
              type="text"
              value={editedUserData.email}
              onChange={(e) =>
                setEditedUserData({
                  ...editedUserData,
                  email: e.target.value,
                })
              }
            />
          ) : (
            user.email
          )}
        </td>
        <td>
          {editedIndex === index ? (
            <input
              type="text"
              value={editedUserData.phone}
              onChange={(e) =>
                setEditedUserData({
                  ...editedUserData,
                  phone: e.target.value,
                })
              }
            />
          ) : (
            user.phone
          )}
        </td>
        <td>
          {editedIndex === index ? (
            <input
              type="text"
              value={editedUserData.gender}
              onChange={(e) =>
                setEditedUserData({
                  ...editedUserData,
                  gender: e.target.value,
                })
              }
            />
          ) : (
            user.gender
          )}
        </td>
        <td>
          {editedIndex === index ? (
            <>
              <button className="bg-blue-500 rounded-md" onClick={updateData}>
                save
              </button>
              <button
                className="bg-gray-500 rounded-md"
                onClick={() => setEditedIndex(null)}
              >
                cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-yellow-500 rounded-md"
                onClick={() => editData(index)}
              >
                edit
              </button>
              <button
                className="bg-slate-500 rounded-md"
                onClick={() => deleteData(index)}
              >
                delete
              </button>
            </>
          )}
        </td>
      </tr>
    ));
  };

  useEffect(() => {
    retrieveRandomData();
  }, []);

  return (
    <div className="App">
      <h1>Random Data Generator</h1>
      <button
        onClick={() => {
          addNewRandomData();
        }}
      >
        Fetch New Data
      </button>

      <table className="table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Settings</th>
          </tr>
        </thead>
        <tbody>{printData()}</tbody>
      </table>
    </div>
  );
}

export default Landing;
