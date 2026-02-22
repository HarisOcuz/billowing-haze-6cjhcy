import { useState } from "react";
import { todaysDate } from "./todaysDate";
import { DepartingGuests } from "./DepartingGuests";
import { InHouseGuests } from "./InHouseGuests";
import { ChangeNotification } from "./ChangeNotification";
import UpdatingBookingInfo from "./UpdatingBookingInfo";
import EmployeesUI from "./EmployeesUI";
// ! TODAYS DATE IN ISO FORMAT
const date = new Date().toISOString().split("T")[0];

function MainUi({
  setAuthStatus,
  addNewArrivalBtn,
  setAddNewArrivalBtn,
  guests,
  setGuests,
  formatedDate,
}) {
  const [siteOpen, setSiteOpen] = useState("");
  const [showAllArrivals, setShowAllArrivals] = useState(false);
  const [isOpenGuestCard, setIsOpenGuestCard] = useState(null);
  const [isOpenSidePanel, setIsOpenSidePanel] = useState(false);
  const [bookingCanceled, setBookingCanceled] = useState(null);
  const [guestCheckedIn, setGuestCheckedIn] = useState(null);
  const [guestCheckedOut, setGuestCheckedOut] = useState(false);
  const [editGuestBooking, setEditGuestBooking] = useState(false);

  // ! Stats for  today (In house, arrivals, departures)
  const totalArrivalsToday = guests.filter(
    (guest) => guest.arrivalDate === date && guest.inHouse === false
  );

  const totalDeparturesToday = guests.filter(
    (guest) => guest.departureDate === date
  ).length;
  console.log(totalArrivalsToday.length, totalDeparturesToday);

  const totalInHouseGuests = guests.filter(
    (guest) => guest.inHouse === true
  ).length;

  const totalOccupancyPercentage =
    ((totalArrivalsToday.length + totalInHouseGuests) / 12) * 100;

  const totalAdultsArrivals = totalArrivalsToday.reduce(
    (acc, guest) => acc + guest.adults,
    0
  );

  const totalKidsArrivals = totalArrivalsToday.reduce(
    (acc, guest) => acc + guest.children,
    0
  );

  const averagePricePerRoomArrivals =
    totalArrivalsToday.reduce((acc, guest) => acc + guest.price, 0) /
    totalArrivalsToday.length;

  // ! Stats for arrivals in total

  const totalAdults = guests.reduce((acc, guest) => acc + guest.adults, 0);
  const totalKids = guests.reduce((acc, guest) => acc + guest.children, 0);
  const averagePricePerRoom = (
    guests.reduce((acc, guest) => acc + guest.price, 0) / guests.length
  ).toFixed(2);

  function handleCancelGuestBooking() {
    if (isOpenGuestCard >= 1) {
      // 1. ukloni rezervaciju
      const bookingsUpdated = guests.filter(
        (guest) => guest.id !== isOpenGuestCard
      );
      setGuests(bookingsUpdated);

      setBookingCanceled(true);

      setIsOpenGuestCard(null);
    }
  }

  function handleOnClickOpenGuestCard(id) {
    console.log(id);
    if (isOpenGuestCard === id) setIsOpenGuestCard(null);
    else setIsOpenGuestCard(id);
  }

  function handleShowAllArrivals() {
    console.log(showAllArrivals);
    setShowAllArrivals((prev) => !prev);
  }
  function handleLogOut() {
    setAuthStatus((authStatus) => !authStatus);
  }

  function handleOnClick(text) {
    console.log(siteOpen);
    setSiteOpen(text);
  }

  return (
    <div className="MainUi-container">
      <div>
        <SideBar
          onClick={handleOnClick}
          setSiteOpen={setSiteOpen}
          sethAuthState={setAuthStatus}
          onSetAuthStatus={handleLogOut}
        />
      </div>

      <div className="dashboard-container">
        <NavBar />
        {siteOpen === "" ? (
          <MainWindowShortInfo
            formatedDate={formatedDate}
            totalArrivalsToday={totalArrivalsToday}
            totalDeparturesToday={totalDeparturesToday}
            totalInHouseGuests={totalInHouseGuests}
            setSiteOpen={setSiteOpen}
            totalOccupancyPercentage={totalOccupancyPercentage}
          />
        ) : siteOpen === "Anreisen" ? (
          <Arrivals
            editGuestBooking={editGuestBooking}
            setEditGuestBooking={setEditGuestBooking}
            formatedDate={formatedDate}
            guestCheckedIn={guestCheckedIn}
            setGuestCheckedIn={setGuestCheckedIn}
            setBookingCanceled={setBookingCanceled}
            bookingCanceled={bookingCanceled}
            handleCancelGuestBooking={handleCancelGuestBooking}
            setGuests={setGuests}
            handleOnClickOpenGuestCard={handleOnClickOpenGuestCard}
            isOpenSidePanel={isOpenSidePanel}
            setIsOpenSidePanel={setIsOpenSidePanel}
            isOpenGuestCard={isOpenGuestCard}
            setIsOpenGuestCard={setIsOpenGuestCard}
            addNewArrivalBtn={addNewArrivalBtn}
            setAddNewArrivalBtn={setAddNewArrivalBtn}
            guests={guests}
            showAllArrivals={showAllArrivals}
            onShowAllArrivals={handleShowAllArrivals}
            setShowAllArrivals={setShowAllArrivals}
            totalArrivalsToday={totalArrivalsToday}
            totalKidsArrivals={totalKidsArrivals}
            averagePricePerRoomArrivals={averagePricePerRoomArrivals}
            totalAdults={totalAdults}
            totalAdultsArrivals={totalAdultsArrivals}
            totalKids={totalKids}
            averagePricePerRoom={averagePricePerRoom}
          />
        ) : siteOpen === "Abreisen" ? (
          <Departures
            handleOnClickOpenGuestCard={handleOnClickOpenGuestCard}
            setGuests={setGuests}
            guests={guests}
            isOpenGuestCard={isOpenGuestCard}
            setIsOpenGuestCard={setIsOpenGuestCard}
            guestCheckedOut={guestCheckedOut}
            setGuestCheckedOut={setGuestCheckedOut}
            editGuestBooking={editGuestBooking}
            setEditGuestBooking={setEditGuestBooking}
            formatedDate={formatedDate}
          />
        ) : siteOpen === "Im Haus" ? (
          <InHaus
            formatedDate={formatedDate}
            editGuestBooking={editGuestBooking}
            setEditGuestBooking={setEditGuestBooking}
            isOpenGuestCard={isOpenGuestCard}
            setIsOpenGuestCard={setIsOpenGuestCard}
            guests={guests}
            setGuests={setGuests}
            guestCheckedOut={guestCheckedOut}
            setGuestCheckedOut={setGuestCheckedOut}
          />
        ) : siteOpen === "Zimmer Management" ? (
          <RoomMenagamenet />
        ) : siteOpen === "Mitarbeiter" ? (
          <CoWorkers />
        ) : siteOpen === "Verwaltung" ? (
          <Maintance />
        ) : (
          <MainWindowShortInfo />
        )}
      </div>
    </div>
  );
}

// SIDEBAR

function SideBar({
  onClick,
  setSiteOpen,
  setAuthState,
  authState,
  onSetAuthStatus,
}) {
  return (
    <div className="sidebar-container">
      <img
        onClick={() => setSiteOpen("")}
        className="logo-sidebar"
        src="/Hotel_Flow__1_-removebg-preview.png"
        alt="App Logo"
      />
      <ul className="ul-sidebar">
        <ListElement
          onClick={onClick}
          text="Anreisen"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              className="icons"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
          }
        />
        <ListElement
          onClick={onClick}
          text="Abreisen"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              className="icons"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
          }
        />
        <ListElement
          onClick={onClick}
          text="Im Haus"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              className="icons"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              />
            </svg>
          }
        />
        <ListElement
          onClick={onClick}
          text="Zimmer Management"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              className="icons"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
              />
            </svg>
          }
        />
        <ListElement
          onClick={onClick}
          text="Mitarbeiter"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              className="icons"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
          }
        />
        <ListElement
          onClick={onClick}
          text="Verwaltung"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              className="icons"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
              />
            </svg>
          }
        />
        <button className="log-out btn" onClick={onSetAuthStatus}>
          Auslogen
        </button>
      </ul>
    </div>
  );
}

function ListElement({ text, onClick, icon }) {
  return (
    <li onClick={() => onClick(text)} key={text}>
      <span>{icon}</span>
      {text}
    </li>
  );
}

// NAVBAR

function NavBar() {
  return (
    <div className="navbar-container">
      <h4>Wilkommen zurück Haris</h4>
      <p>{todaysDate(date)}</p>
    </div>
  );
}

// SHORT INFO - STATS

function MainWindowShortInfo({
  setSiteOpen,
  totalArrivalsToday,
  totalDeparturesToday,
  totalInHouseGuests,
  totalOccupancyPercentage,
}) {
  return (
    <div className="mainWindow-container">
      <ShortInfo
        setSiteOpen={setSiteOpen}
        className="mainWindow-short-info"
        text="Anreisen"
        nummer={totalArrivalsToday.length}
      />
      <ShortInfo
        setSiteOpen={setSiteOpen}
        className="mainWindow-short-info mainWindow-short-info-abreisen"
        text="Abreisen"
        nummer={totalDeparturesToday}
      />
      <ShortInfo
        setSiteOpen={setSiteOpen}
        className="mainWindow-short-info mainWindow-short-info-im-haus"
        text="Im Haus"
        nummer={totalInHouseGuests}
      />
      <ShortInfo
        setSiteOpen={setSiteOpen}
        className="mainWindow-short-info "
        text="Belegt"
        nummer={`${totalOccupancyPercentage.toFixed(1)}%`}
      />
    </div>
  );
}

function ShortInfo({ text, nummer, className, setSiteOpen }) {
  return (
    <div className={className} onClick={() => setSiteOpen(text)}>
      <span className="text">{text}</span>
      <span className="nummer">{nummer}</span>
    </div>
  );
}

// ARRIVALS

function Arrivals({
  addNewArrivalBtn,
  setAddNewArrivalBtn,
  setGuests,
  guests,
  showAllArrivals,
  onShowAllArrivals,
  isOpenGuestCard,
  setIsOpenSidePanel,
  isOpenSidePanel,
  handleOnClickOpenGuestCard,
  handleCancelGuestBooking,
  bookingCanceled,
  setBookingCanceled,
  guestCheckedIn,
  setGuestCheckedIn,
  totalAdults,
  totalAdultsArrivals,
  totalKids,
  totalKidsArrivals,
  averagePricePerRoom,
  averagePricePerRoomArrivals,
  formatedDate,
  setEditGuestBooking,
  editGuestBooking,
}) {
  function handleAddNewArrivalBtn() {
    setAddNewArrivalBtn(true);
  }

  function handleOpenSidePanel() {
    console.log("open");
    setIsOpenSidePanel(!isOpenSidePanel);
  }

  return (
    <>
      <SideShortInfoArrivals
        className={"btn-absolute-add-new-guest"}
        onAddNewArrival={handleAddNewArrivalBtn}
        addNewArrival={addNewArrivalBtn}
        guests={guests}
      />
      <button
        className="btn-absolute-show-all-guests"
        onClick={onShowAllArrivals}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#b7e4c7"
          class="stats-add-btn"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
        <span className="tooltip">Alle Anreisen/Heutige Anreisen</span>
      </button>

      <div className="ui-container arrivals-container">
        <GuestsArrivalToday
          isOpenGuestCard={isOpenGuestCard}
          editGuestBooking={editGuestBooking}
          setEditGuestBooking={setEditGuestBooking}
          formatedDate={formatedDate}
          setGuests={setGuests}
          onClick={handleOnClickOpenGuestCard}
          isOpen={isOpenGuestCard}
          guests={guests}
          showAllArrivals={showAllArrivals}
          handleCancelGuestBooking={handleCancelGuestBooking}
          bookingCanceled={bookingCanceled}
          setGuestCheckedIn={setGuestCheckedIn}
          guestCheckedIn={guestCheckedIn}
        />
        {bookingCanceled && (
          <ChangeNotification
            children="Buchung wurde storniert"
            setBookingCanceled={setBookingCanceled}
            onClose={() => setBookingCanceled(false)}
          />
        )}
        {guestCheckedIn && (
          <ChangeNotification
            children="Gast ist eingecheckt"
            setGuestCheckedIn={setGuestCheckedIn}
            onClose={() => setGuestCheckedIn(false)}
          />
        )}
      </div>
      <SideShortInfoArrivals
        className={"btn-absolute-statistics"}
        onOpenSidePanel={handleOpenSidePanel}
        isOpenSidePanel={isOpenSidePanel}
        guests={guests}
        totalAdultsArrivals={totalAdultsArrivals}
        totalKidsArrivals={totalKidsArrivals}
        averagePricePerRoomArrivals={averagePricePerRoomArrivals}
        showAllArrivals={showAllArrivals}
        totalAdults={totalAdults}
        totalKids={totalKids}
        averagePricePerRoom={averagePricePerRoom}
      />
    </>
  );
}

function SideShortInfoArrivals({
  onOpenSidePanel,
  isOpenSidePanel,
  className,
  addNewArrival,
  onAddNewArrival,
  totalAdultsArrivals,
  totalKidsArrivals,
  averagePricePerRoomArrivals,
  guests,
  showAllArrivals,
  totalAdults,
  totalKids,
  averagePricePerRoom,
}) {
  return (
    <>
      <button
        className={className}
        onClick={
          className === "btn-absolute-statistics"
            ? onOpenSidePanel
            : onAddNewArrival
        }
      >
        {className === "btn-absolute-statistics" ? (
          isOpenSidePanel ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="4"
              stroke="red"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#b7e4c7"
                class="stats-add-btn"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                />
              </svg>
              <span className="tooltip">Statistik</span>
            </div>
          )
        ) : addNewArrival ? (
          "O"
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#b7e4c7"
            class="stats-add-btn"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
        )}
      </button>
      {isOpenSidePanel && !showAllArrivals ? (
        <div className="flex-container">
          {isOpenSidePanel && (
            <>
              <div className="side-short-info">
                <span>Anreisen</span>
                <span>
                  {
                    guests.filter(
                      (guest) =>
                        guest.arrivalDate === date && guest.inHouse === false
                    ).length
                  }{" "}
                  /{" "}
                  {guests.filter((guest) => guest.arrivalDate === date).length}
                </span>
              </div>
              <div className="side-short-info">
                <span>⌀ Preis</span>

                <span>
                  {Number.isFinite(averagePricePerRoomArrivals) &&
                  averagePricePerRoomArrivals > 0
                    ? averagePricePerRoomArrivals.toFixed(2).replace(".", ",")
                    : "0,00"}
                  €
                </span>
              </div>
              <div className="side-short-info">
                <span>Erwachsene</span>
                <span>{totalAdultsArrivals}</span>
              </div>
              <div className="side-short-info">
                <span>Kinder</span>
                <span>{totalKidsArrivals}</span>
              </div>
            </>
          )}
        </div>
      ) : isOpenSidePanel && showAllArrivals ? (
        <div className="flex-container">
          <div className="side-short-info">
            <span>Anreisen</span>
            <span>{guests.length}</span>
          </div>
          <div className="side-short-info">
            <span>⌀ Preis</span>
            <span>{averagePricePerRoom}€</span>
          </div>
          <div className="side-short-info">
            <span>Erwachsene</span>
            <span>{totalAdults}</span>
          </div>
          <div className="side-short-info">
            <span>Kinder</span>
            <span>{totalKids}</span>
          </div>
        </div>
      ) : null}
    </>
  );
}

console.log(todaysDate());

function GuestsArrivalToday({
  isOpen,
  onClick,
  guests,
  showAllArrivals,
  setGuests,
  handleCancelGuestBooking,
  setGuestCheckedIn,
  formatedDate,
  setEditGuestBooking,
  editGuestBooking,
  isOpenGuestCard,
}) {
  const [selectedBookingEdit, setSelectedBookingEdit] = useState([]);

  function handleEditGuestBooking() {
    const BookingToBeEdited = guests.filter(
      (guest) => guest.id === isOpenGuestCard
    );
    setSelectedBookingEdit(BookingToBeEdited);
    setEditGuestBooking((prev) => !prev);
  }

  function handleCheckGuestIn() {
    setGuestCheckedIn((prev) => !prev);
    const updatedGuestsAfterCheckIn = guests.map((guest) =>
      guest.id === isOpen ? { ...guest, inHouse: true } : guest
    );
    setGuests(updatedGuestsAfterCheckIn);
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
      {showAllArrivals === false
        ? guests
            .filter(
              (guest) => guest.arrivalDate === date && guest.inHouse === false
            )
            .map((guest) => (
              <div
                key={guest.id}
                className="guest-card"
                // onClick={() => onClick(guest.id)}
                style={
                  isOpen === guest.id ? { backgroundColor: "#dde9e1" } : {}
                }
              >
                <div
                  className="guest-card-short-info"
                  onClick={() => onClick(guest.id)}
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

                {isOpen === guest.id && (
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
                        <strong>Preis:</strong>
                        {guest.price}€
                      </li>
                      <li>
                        <strong>Datum:</strong>
                        {formatedDate(guest.arrivalDate)} /{" "}
                        {formatedDate(guest.departureDate)}
                      </li>
                    </ul>
                    <div className="checkmarks">
                      <button
                        className="guest-card-btn"
                        onClick={handleCheckGuestIn}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="6"
                          stroke="green"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      </button>
                      <button
                        className="guest-card-btn"
                        onClick={handleCancelGuestBooking}
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
                )}
              </div>
            ))
        : guests.map((guest) => (
            <div
              key={guest.id}
              className="guest-card"
              // onClick={() => onClick(guest.id)}
              style={isOpen === guest.id ? { backgroundColor: "#dde9e1" } : {}}
            >
              <div
                className="guest-card-short-info"
                onClick={() => onClick(guest.id)}
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

              {isOpen === guest.id && (
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
                      <strong>Preis:</strong>
                      {guest.price}€
                    </li>
                    <li>
                      <strong>Datum:</strong>
                      {formatedDate(guest.arrivalDate)} /{" "}
                      {formatedDate(guest.departureDate)}
                    </li>
                  </ul>
                  <div className="checkmarks">
                    <button
                      className="guest-card-btn"
                      onClick={handleEditGuestBooking}
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
                      className="guest-card-btn"
                      onClick={handleCancelGuestBooking}
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
              )}
            </div>
          ))}
    </div>
  );
}

function Departures({
  guests,
  setGuests,
  handleOnClickOpenGuestCard,
  guestCheckedOut,
  setGuestCheckedOut,
  isOpenGuestCard,
  setEditGuestBooking,
  editGuestBooking,
  formatedDate,
}) {
  // ! Checking guests out

  return (
    <div className="ui-container departure-container">
      <DepartingGuests
        formatedDate={formatedDate}
        handleOnClickOpenGuestCard={handleOnClickOpenGuestCard}
        guests={guests}
        setGuests={setGuests}
        guestCheckedOut={guestCheckedOut}
        setGuestCheckedOut={setGuestCheckedOut}
        setEditGuestBooking={setEditGuestBooking}
        editGuestBooking={editGuestBooking}
      />
      {guestCheckedOut && (
        <ChangeNotification
          children={"Gast ist ausgecheckt"}
          onClose={() => setGuestCheckedOut((prev) => !prev)}
        />
      )}
    </div>
  );
}

function InHaus({
  guests,
  setGuests,
  guestCheckedOut,
  setGuestCheckedOut,
  isOpenGuestCard,
  setIsOpenGuestCard,
  editGuestBooking,
  setEditGuestBooking,
  formatedDate,
}) {
  return (
    <div className="ui-container in-house-container">
      {guestCheckedOut && (
        <ChangeNotification
          children={"Gast vorzeitig abgereist"}
          onClose={() => setGuestCheckedOut((prev) => !prev)}
        />
      )}
      <InHouseGuests
        formatedDate={formatedDate}
        setGuestCheckedOut={setGuestCheckedOut}
        setEditGuestBooking={setEditGuestBooking}
        editGuestBooking={editGuestBooking}
        setGuests={setGuests}
        guests={guests}
      />
      {/* <UpdatingBookingInfo
        guests={guests}
        setEditGuestBooking={setEditGuestBooking}
        isOpenGuestCard={isOpenGuestCard}
        setIsOpenGuestCard={setIsOpenGuestCard}
        setEditGuestBooking={setEditGuestBooking}
        editGuestBooking={editGuestBooking}
      /> */}
    </div>
  );
}

function RoomMenagamenet() {
  return (
    <div className="ui-container">
      <h1>Zimmer Management</h1>
    </div>
  );
}

function CoWorkers() {
  return (
    <div className="ui-container">
      <EmployeesUI />
    </div>
  );
}

function Maintance() {
  return (
    <div className="ui-container">
      <h1>Verwaltung</h1>
    </div>
  );
}

export default MainUi;
