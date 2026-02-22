import { useState } from "react";
import UpdatingBookingInfo from "./UpdatingBookingInfo";

export function InHouseGuests({
  guests,
  setGuests,
  setGuestCheckedOut,
  setEditGuestBooking,
  editGuestBooking,
  formatedDate,
}) {
  const [isOpenGuestCard, setIsOpenGuestCard] = useState(null);
  const [selectedBookingEdit, setSelectedBookingEdit] = useState([]);

  function handleEarlyCheckOut() {
    const InHouseGuestsAfterEarlyCheckOut = guests.filter(
      (guest) => isOpenGuestCard !== guest.id
    );
    setGuests(InHouseGuestsAfterEarlyCheckOut);
    setGuestCheckedOut(true);
  }

  function handleEditGuestBooking() {
    const BookingToBeEdited = guests.filter(
      (guest) => guest.id === isOpenGuestCard
    );
    setSelectedBookingEdit(BookingToBeEdited);
    setEditGuestBooking(true);
  }

  function handleOnClickOpenGuestCard(id) {
    console.log(id);
    if (isOpenGuestCard === id) setIsOpenGuestCard(null);
    else setIsOpenGuestCard(id);
  }

  return editGuestBooking ? (
    <UpdatingBookingInfo
      setEditGuestBooking={setEditGuestBooking}
      selectedBookingEdit={selectedBookingEdit}
      setSelectedBookingEdit={setSelectedBookingEdit}
      guests={guests}
      setGuests={setGuests}
    />
  ) : (
    <div className="guest-flex">
      {guests
        .filter((guest) => guest.inHouse === true)
        .map((guest) => (
          <div
            key={guest.id}
            className="guest-card"
            style={
              isOpenGuestCard === guest.id ? { backgroundColor: "#dde9e1" } : {}
            }
          >
            <div
              className="guest-card-short-info"
              onClick={() => handleOnClickOpenGuestCard(guest.id)}
            >
              <div>
                <h3>{guest.firstName + " " + guest.lastName}</h3>
              </div>
              <div className="center-el">
                <h3>{formatedDate(guest.arrivalDate)}</h3>
                <h3>{formatedDate(guest.departureDate)}</h3>
              </div>
              <div className="center-el">
                <h3>Agent</h3>
                <h3>{guest.bookingAgent}</h3>
              </div>
              <div className="center-el">
                <h3>Zimmertyp</h3>
                <h3>{guest.roomType}</h3>
              </div>
              <div className="center-el">
                <h3>Preis</h3>
                <h3>{guest.price} €</h3>
              </div>
            </div>
            {isOpenGuestCard === guest.id && (
              <div className="guest-card-open">
                <ul>
                  <li>
                    <strong>Erwachsene:</strong> {guest.adults}
                  </li>
                  <li>
                    <strong>Kinder:</strong> {guest.children}
                  </li>
                  <li>
                    <strong>Zimmertyp:</strong> {guest.roomType}
                  </li>
                </ul>
                <ul>
                  <li>
                    <strong>Zahlungsart:</strong> KK
                  </li>
                  <li>
                    <strong>Preis:</strong> {guest.price}€
                  </li>
                  <li>
                    <strong>Datum:</strong> {formatedDate(guest.arrivalDate)} /{" "}
                    {formatedDate(guest.departureDate)}
                  </li>
                </ul>
                <div className="checkmarks">
                  <button
                    onClick={handleEditGuestBooking}
                    className="guest-card-btn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      // class="lucide lucide-calendar-cog-icon lucide-calendar-cog"
                      className="size-6"
                      color="red"
                    >
                      <path d="m15.228 16.852-.923-.383" />
                      <path d="m15.228 19.148-.923.383" />
                      <path d="M16 2v4" />
                      <path d="m16.47 14.305.382.923" />
                      <path d="m16.852 20.772-.383.924" />
                      <path d="m19.148 15.228.383-.923" />
                      <path d="m19.53 21.696-.382-.924" />
                      <path d="m20.772 16.852.924-.383" />
                      <path d="m20.772 19.148.924.383" />
                      <path d="M21 10.592V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
                      <path d="M3 10h18" />
                      <path d="M8 2v4" />
                      <circle cx="18" cy="18" r="3" />
                    </svg>
                  </button>

                  <button
                    onClick={handleEarlyCheckOut}
                    className="guest-card-btn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      // class="lucide lucide-log-out-icon lucide-log-out"
                      className="size-6"
                      color="red"
                    >
                      <path d="m16 17 5-5-5-5" />
                      <path d="M21 12H9" />
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
