import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  let [allEmployees, setAllEmployees] = useState([]);

  let [employee, setEmployee] = useState({
    name: "",
    role: "",
    salary: "",
  });

  let [up, setUp] = useState(false);

  const loadAllEmployees = () => {
    axios
      .get("http://localhost:3000/employees")
      .then((response) => {
        console.log("Response :", response.data);
        setAllEmployees(response.data);
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  };

  useEffect(() => {
    loadAllEmployees();
  }, []);

  const deleteEmployee = (id) => {
    axios
      .delete("http://localhost:3000/employees/" + id)
      .then((response) => {
        console.log("Response :", response.data);
        loadAllEmployees();
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (employee.id) {
      await axios.put(
        `http://localhost:3000/employees/${employee.id}`,
        employee,
      );
      clearForm();
      loadAllEmployees();
      setUp(false);
    } else {
      await axios.post("http://localhost:3000/employees", employee);
    }
    clearForm();
    loadAllEmployees();
  };

  const clearForm = () => {
    setEmployee({
      name: "",
      role: "",
      salary: "",
    });
  };

  const updateEmployee = (emp) => {
    setEmployee(emp);
    setUp(true);
  };

  return (
    <div>
      <center>
        <h1>{up ? "Update Employee" : "Add Employee"}</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          Name :{" "}
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          Role :{" "}
          <input
            type="text"
            name="role"
            value={employee.role}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          Salary :{" "}
          <input
            type="text"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <button type="submit">
            {up ? "Update Employee" : "Add Employee"}
          </button>
        </form>

        <hr />
        <h1>Employee Table</h1>
        <hr />
        <br />
        <table border={2}>
          <thead>
            <tr>
              <th>NAME</th>
              <th>ROLE</th>
              <th>SALARY</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {allEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.role}</td>
                <td>{emp.salary}</td>
                <td>
                  <button type="button" onClick={() => deleteEmployee(emp.id)}>
                    Delete
                  </button>{" "}
                  |{" "}
                  <button
                    type="button"
                    onClick={() => updateEmployee(emp, emp.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </div>
  );
};

export default App;
