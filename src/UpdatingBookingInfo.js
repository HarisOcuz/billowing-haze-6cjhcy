import { EditingGuestBooking } from "./EditingGuestBooking";
import { useState } from "react";

function UpdatingBookingInfo({
  setEditGuestBooking,
  selectedBookingEdit,
  setGuests,
}) {
  const [
    {
      adults,
      bookingAgent,
      children,
      arrivalDate,
      departureDate,
      firstName,
      id,
      inHouse,
      lastName,
      price,
      roomType,
    },
  ] = selectedBookingEdit;

  const [editedFirstName, setEditedFirstName] = useState(firstName);
  const [editedLastName, setEditedLastName] = useState(lastName);
  const [editedAdults, setEditedAdults] = useState(adults);
  const [editedChildren, setEditedChildren] = useState(children);
  const [editedBookingAgent, setEditedBookingAgent] = useState(bookingAgent);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedRoomType, setEditedRoomType] = useState(roomType);
  const [editedArrivalDate, setEditedArrivalDate] = useState(arrivalDate);
  const [editedDepartureDate, setEditedDepartureDate] = useState(departureDate);

  if (!selectedBookingEdit) return null;

  const arrival = new Date(editedArrivalDate);
  const departure = new Date(editedDepartureDate);
  const totalNights = Math.max(
    0,
    Math.round((departure - arrival) / (1000 * 60 * 60 * 24)),
  );

  function handleEditedGuestData() {
    const haris = {
      ...selectedBookingEdit,
      firstName: editedFirstName,
      lastName: editedLastName,
      adults: editedAdults,
      arrivalDate: editedArrivalDate,
      departureDate: editedDepartureDate,
      bookingAgent: editedBookingAgent,
      id: crypto.randomUUID(),
      inHouse: true,
      price: editedPrice,
      roomType: editedRoomType,
    };
    setGuests((prev) => prev.map((guest) => (guest.id === id ? haris : guest)));
    setEditGuestBooking(false);
  }

  console.log(firstName);

  console.log(selectedBookingEdit.firstName);
  return (
    <>
      <div className="overlay"></div>
      <div className="grid-container-add-guest-form">
        <div className="">
          <EditingGuestBooking
            description="Vorname"
            type="text"
            value={editedFirstName}
            onChange={(e) => setEditedFirstName(e.target.value)}
          />

          <EditingGuestBooking
            description="Nachname"
            placeHolder="Mustermann"
            type="text"
            value={editedLastName}
            onChange={(e) => setEditedLastName(e.target.value)}
          />
        </div>
        <div className="">
          <EditingGuestBooking
            description="Erwachsene"
            type="number"
            placeHolder={0}
            value={editedAdults}
            onChange={(e) => setEditedAdults(e.target.value)}
          />
          <EditingGuestBooking
            description="Kinder"
            placeHolder={0}
            type="number"
            value={editedChildren}
            onChange={(e) => setEditedChildren(e.target.value)}
          />
        </div>
        <div className="">
          <EditingGuestBooking
            description="Agent"
            placeHolder="Booking, Expedia..."
            type="text"
            value={editedBookingAgent}
            onChange={(e) => setEditedBookingAgent(e.target.value)}
          />
          <EditingGuestBooking
            description="Preis"
            placeHolder="0,00€"
            type="number"
            value={editedPrice}
            onChange={(e) => setEditedPrice(e.target.value)}
          />
        </div>
        <div>
          <p>Zimmertyp</p>
          <select
            className="input-add-guest input-add-guest-select"
            value={editedRoomType}
            onChange={(e) => setEditedRoomType(e.target.value)}
          >
            <option>SEZ</option>
            <option>CEZ</option>
            <option>SDZ</option>
            <option>CDZ</option>
            <option>LUDZ</option>
            <option>STWIN</option>
          </select>
          <p className="total-nights">Nächte insgesamt</p>
          <h3 className="number-of-nights">{totalNights}</h3>
        </div>
        <div>
          <p>Anreise</p>
          <input
            disabled={inHouse}
            className="input-add-guest"
            type="date"
            value={editedArrivalDate}
            onChange={(e) => setEditedArrivalDate(e.target.value)}
          />
          <p>Abreise</p>
          <input
            className="input-add-guest"
            type="date"
            value={editedDepartureDate}
            onChange={(e) => setEditedDepartureDate(e.target.value)}
          />
        </div>
        <div className="btns-add-new-guest">
          <button class="btn-add-cancel-guest" onClick={handleEditedGuestData}>
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
            onClick={() => setEditGuestBooking(false)}
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

export default UpdatingBookingInfo;
