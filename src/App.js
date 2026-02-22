import { useState } from "react";
import Login from "./login";
import MainUi from "./mainUI";
import AddNewArrival from "./AddNewArrivals";

const date = new Date().toISOString().split("T")[0];

function App() {
  const guests2 = [
    {
      id: 1,
      firstName: "Maximilian",
      lastName: "Müller",
      arrivalDate: date,
      departureDate: "2026-05-22",
      bookingAgent: "Booking",
      adults: 2,
      children: 1,
      price: 119,
      inHouse: false,
      roomType: "CDZ",
    },
    {
      id: 2,
      firstName: "Max",
      lastName: "Mustermann",
      arrivalDate: "2026-05-22",
      departureDate: date,
      bookingAgent: "Expedia",
      adults: 1,
      children: 0,
      price: 99,
      inHouse: false,
      roomType: "SEZ",
    },
    {
      id: 3,
      firstName: "Erika",
      lastName: "Mustermann",
      arrivalDate: date,
      departureDate: "2026-05-03",
      bookingAgent: "Check24",
      adults: 2,
      children: 1,
      price: 119,
      inHouse: false,
      roomType: "STWIN",
    },
    {
      id: 4,
      firstName: "John",
      lastName: "Doe",
      arrivalDate: "2026-04-28",
      departureDate: "2026-05-05",
      bookingAgent: "Booking",
      adults: 1,
      children: 0,
      price: 99,
      inHouse: false,
      roomType: "CEZ",
    },
    {
      id: 5,
      firstName: "Jane",
      lastName: "Smith",
      arrivalDate: date,
      departureDate: "2026-09-07",
      bookingAgent: "HRS",
      adults: 1,
      children: 0,
      price: 69,
      inHouse: false,
      roomType: "SEZ",
    },
    {
      id: 6,
      firstName: "Jean",
      lastName: "Dupont",
      arrivalDate: "2026-02-12",
      departureDate: date,
      bookingAgent: "Booking",
      adults: 1,
      children: 0,
      price: 78,
      inHouse: false,
      roomType: "SDZ",
    },
    {
      id: 7,
      firstName: "Alessandro",
      lastName: "Rossi",
      arrivalDate: "2026-02-13",
      departureDate: date,
      bookingAgent: "HRS",
      adults: 2,
      children: 1,
      price: 119,
      inHouse: false,
      roomType: "STWIN",
    },
    {
      id: 8,
      firstName: "Elena",
      lastName: "Petrov",
      arrivalDate: date,
      departureDate: "2026-08-08",
      bookingAgent: "Tripadvisor",
      adults: 1,
      children: 0,
      price: 87,
      inHouse: true,
      roomType: "CEZ",
    },
    {
      id: 9,
      firstName: "Yuki",
      lastName: "Tanaka",
      arrivalDate: date,
      departureDate: "2026-05-05",
      bookingAgent: "Check24",
      adults: 1,
      children: 0,
      price: 69,
      inHouse: false,
      roomType: "SEZ",
    },
    {
      id: 10,
      firstName: "Mia",
      lastName: "Becker",
      arrivalDate: "2026-03-26",
      departureDate: "2026-03-30",
      bookingAgent: "Tripadvisor",
      adults: 2,
      children: 0,
      price: 149.36,
      inHouse: false,
      roomType: "LUDZ",
    },
    {
      id: 11,
      firstName: "Emma",
      lastName: "Wagner",
      arrivalDate: date,
      departureDate: "2026-03-01",
      bookingAgent: "HRS",
      adults: 1,
      children: 0,
      price: 89,
      inHouse: false,
      roomType: "SDZ",
    },
    {
      id: 12,
      firstName: "Jonas",
      lastName: "Weber",
      arrivalDate: "2026-05-16",
      departureDate: "2026-05-22",
      bookingAgent: "tripadvisor",
      adults: 1,
      children: 1,
      price: 122.36,
      inHouse: false,
      roomType: "SDZ",
    },
    {
      id: 13,
      firstName: "Lukas",
      lastName: "Fischer",
      arrivalDate: "2026-09-20",
      departureDate: "2026-09-23",
      bookingAgent: "Tripadvisor",
      adults: 2,
      children: 0,
      price: 136.78,
      inHouse: false,
      roomType: "CDZ",
    },
    {
      id: 14,
      firstName: "Sophie",
      lastName: "Schneider",
      arrivalDate: "2026-03-16",
      departureDate: "2026-03-18",
      bookingAgent: "Booking",
      adults: 1,
      children: 0,
      price: 89,
      inHouse: false,
      roomType: "SEZ",
    },
  ];

  // OVO KASNIJE PREBACITI NA FALSE

  const [authStatus, setAuthStatus] = useState(true);
  const [addNewArrivalBtn, setAddNewArrivalBtn] = useState(false);
  const [guests, setGuests] = useState([...guests2]);
  const [arrivalDate, setArrivalDate] = useState(date);
  const [departureDate, setDepartureDate] = useState(arrivalDate);

  function formatedDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // mjeseci od 0
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  }

  function handleAddGuest(newGuest) {
    setGuests((prevGuests) => [
      ...prevGuests,
      { ...newGuest, id: prevGuests.length + 1 },
    ]);
  }

  return (
    <div className="App">
      {authStatus ? (
        <MainUi
          setGuests={setGuests}
          guests={guests}
          authStatus={authStatus}
          setAuthStatus={setAuthStatus}
          addNewArrivalBtn={addNewArrivalBtn}
          setAddNewArrivalBtn={setAddNewArrivalBtn}
          arrivalDate={arrivalDate}
          departureDate={departureDate}
          formatedDate={formatedDate}
        />
      ) : (
        <Login authStatus={authStatus} setAuthStatus={setAuthStatus} />
      )}

      {addNewArrivalBtn ? (
        <AddNewArrival
          addNewArrivalBtn={addNewArrivalBtn}
          setAddNewArrivalBtn={setAddNewArrivalBtn}
          onAddGuest={handleAddGuest}
          arrivalDate={arrivalDate}
          departureDate={departureDate}
          setArrivalDate={setArrivalDate}
          setDepartureDate={setDepartureDate}
          formatedDate={formatedDate}
        />
      ) : null}
    </div>
  );
}

export default App;
