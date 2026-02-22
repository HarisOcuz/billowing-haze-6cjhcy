import { useState } from "react";

const employees = [
  {
    name: "Haris Ocuz",
    available: true,
    birthday: "20.09.1994",
    startDate: "01.05.2024",
    mobile: "015713557931786",
    email: "saeaesaer@gmx.de",
    id: 1,
  },
  {
    name: "Fatima Ocuz",
    available: false,
    birthday: "20.09.1994",
    startDate: "01.05.2024",
    mobile: "015713557931786",
    email: "saeaesaer@gmx.de",
    id: 2,
  },
  {
    name: "Ali Ocuz",
    available: true,
    birthday: "20.09.1994",
    startDate: "01.05.2024",
    mobile: "015713557931786",
    email: "saeaesaer@gmx.de",
    id: 3,
  },
];

function EmployeesUI() {
  const [isOpen, setIsOpen] = useState(null);

  function handleIsOpen(id) {
    if (isOpen === id) setIsOpen(null);
    else setIsOpen(id);
  }

  return (
    <div className="employeesUI-grid">
      {employees.map((employee) => (
        <div className="employee-card">
          <h3 onClick={(id) => handleIsOpen(employee.id)}>{employee.name}</h3>
          {isOpen === employee.id && (
            <ul>
              <li>Frei: {employee.available ? "Ja" : "Nein"}</li>
              <li>Geburtstag:{employee.birthday}</li>
              <li>Start Datum:{employee.startDate}</li>
              <li>{employee.mobile}</li>
              <li>{employee.email}</li>
            </ul>
          )}
        </div>
      ))}
      <div>
        <h4>Zimmer sauber</h4>
        <h2>
          <strong>6</strong>
        </h2>
      </div>
      <div>
        <h4>Zimmer schmutzig</h4>
        <h2>
          <strong>6</strong>
        </h2>
      </div>
      <div>
        <h4>Zimmer gesperrt</h4>
        <h2>
          <strong>6</strong>
        </h2>
      </div>
    </div>
  );
}

export default EmployeesUI;
