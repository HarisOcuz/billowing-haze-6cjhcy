import { useState } from "react";

const date = new Date().toISOString().split("T")[0];

console.log(typeof date);

function AddNewArrival({
  addNewArrivalBtn,
  setAddNewArrivalBtn,
  onAddGuest,
  guests,
  arrivalDate,
  setArrivalDate,
  departureDate,
  setDepartureDate,
  formatedDate,
}) {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [agent, setAgent] = useState("");
  const [price, setPrice] = useState("");
  const [roomType, setRoomType] = useState("SEZ");

  // Calculating the difference between arrival and departure (in # of nights)
  const arrival = new Date(arrivalDate);
  const departure = new Date(departureDate);
  const diffTime = departure - arrival;
  const totalNights = diffTime / (1000 * 60 * 60 * 24);

  function handleSetLastName(e) {
    setLastName(e.target.value);
  }
  function handleSetFirstName(e) {
    setFirstName(e.target.value);
  }
  function handleSetAdults(e) {
    setAdults(Number(e.target.value));
  }
  function handleSetChildren(e) {
    setChildren(Number(e.target.value));
  }
  function handleSetAgent(e) {
    setAgent(e.target.value);
  }
  function handleSetPrice(e) {
    setPrice(Number(e.target.value));
  }

  function handleSetRoomType(e) {
    setRoomType((prev) => e.target.value);
    console.log(roomType);
  }

  function handleSetNewGuest() {
    if (
      lastName.length > 0 ||
      firstName.length > 0 ||
      adults > 0 ||
      agent.length > 0 ||
      price > 0
    ) {
      const newGuest = {
        lastName: lastName[0].toUpperCase() + lastName.slice(1),
        firstName: firstName[0].toLocaleUpperCase() + firstName.slice(1),
        adults,
        children,
        bookingAgent: agent,
        price,
        arrivalDate: arrivalDate,
        departureDate: departureDate,
        inHouse: false,
        roomType: roomType,
        id: crypto.randomUUID,
      };

      onAddGuest(newGuest);
      console.log(newGuest);
      console.log(guests);

      setLastName("");
      setFirstName("");
      setAdults("");
      setChildren("");
      setPrice("");
      setAgent("");
      setAddNewArrivalBtn(false);
    } else {
      alert("Bitte alle Felder ausfüllen");
    }
  }

  function handleSetArrivalDate(e) {
    const selectedDate = e.target.value;
    console.log(e.target.value);
    // const guestDateFinal = new Date(guestDate).toLocaleDateString("de-DE");

    if (selectedDate < date) return;

    setArrivalDate(e.target.value);
    setDepartureDate(e.target.value);

    // setArrivalDate(guestDateFinal);
  }

  function handleSetDepartureDate(e) {
    if (departureDate < arrivalDate) return;
    setDepartureDate(e.target.value);
  }

  function handleCloseAddNewGuestForm() {
    setAddNewArrivalBtn(!addNewArrivalBtn);
  }

  return (
    <>
      <div className="overlay"></div>
      <div className="grid-container-add-guest-form">
        <div className="">
          <AddingNewGuestInputFields
            description="Vorname"
            placeHolder="Max"
            value={firstName}
            onChange={handleSetFirstName}
          />

          <AddingNewGuestInputFields
            description="Nachname"
            placeHolder="Mustermann"
            value={lastName}
            onChange={handleSetLastName}
          />
        </div>
        <div className="">
          <AddingNewGuestInputFields
            description="Erwachsene"
            type="number"
            placeHolder={0}
            value={adults}
            onChange={handleSetAdults}
          />
          <AddingNewGuestInputFields
            description="Kinder"
            placeHolder={0}
            type="number"
            value={children}
            onChange={handleSetChildren}
          />
        </div>
        <div className="">
          <AddingNewGuestInputFields
            description="Agent"
            placeHolder="Booking, Expedia..."
            value={agent}
            onChange={handleSetAgent}
          />
          <AddingNewGuestInputFields
            description="Preis"
            value={price}
            placeHolder="0,00€"
            onChange={handleSetPrice}
            type="number"
          />
        </div>
        <div>
          <p>Zimmertyp</p>
          <select
            className="input-add-guest input-add-guest-select"
            value={roomType}
            onChange={handleSetRoomType}
          >
            <option>SEZ</option>
            <option>CEZ</option>
            <option>SDZ</option>
            <option>CDZ</option>
            <option>LUDZ</option>
            <option>STWIN</option>
          </select>
          <p className="total-nights">Nächte insgesamt</p>
          <h3 className="number-of-nights"> {totalNights}</h3>
        </div>
        <div>
          <p>Anreise</p>
          <input
            className="input-add-guest"
            type="date"
            value={arrivalDate}
            onChange={handleSetArrivalDate}
          />
          <p>Abreise</p>
          <input
            className="input-add-guest"
            type="date"
            value={departureDate}
            onChange={handleSetDepartureDate}
          />
        </div>
        <div className="btns-add-new-guest">
          <button class="btn-add-cancel-guest" onClick={handleSetNewGuest}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="6"
              stroke="green"
              class="btn-add-guest"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </button>
          <button
            className="btn-add-cancel-guest"
            onClick={handleCloseAddNewGuestForm}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="6"
              stroke="red"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

function AddingNewGuestInputFields({
  description,
  placeHolder,
  value,
  onChange,
  type,
}) {
  return (
    <>
      <p>{description}</p>
      <input
        className="input-add-guest"
        placeHolder={placeHolder}
        value={value}
        onChange={onChange}
        type={type}
      />
    </>
  );
}
export default AddNewArrival;
