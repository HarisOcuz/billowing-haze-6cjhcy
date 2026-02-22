export default Dashboard;

function Dashboard() {
  return (
    <div className="dashboard-container">
      <NavBar />

      <div className="main-window">
        <SideBar />
        <MainDashboard />
        <Footer />
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <nav className="navigation-bar">
      <h3>Wilkommen zurück Haris</h3>

      <img
        className="logo-header-footer"
        src="\Hotel_Flow__1_-removebg-preview.png"
        alt="Logo"
      />
    </nav>
  );
}

function SideBar() {
  return (
    <div className="side-bar">
      <Button children={"Anreisen"} />
      <Button children={"Abreisen"} />
      <Button children={"Im Haus"} />
      <Button children={"Mitarbeiter"} />
      <Button children={"Zimmer"} />
      <Widgets />
    </div>
  );
}

function Button({ children }) {
  return <button className="btn">{children}</button>;
}

function Widgets() {
  return (
    <div className="widget-container">
      <h4>Widgets</h4>
      <button className="btn">Rechner</button>
      <button className="btn">Kalendar</button>
      <button className="btn">Abmelden</button>
    </div>
  );
}

function MainDashboard() {
  return (
    <div className="main-dashboard">
      <DashboardSummary
        className="dashboard-info free-rooms-dashboard"
        text={"Freie Zimmer"}
        numbers={41}
      />
      <DashboardSummary
        className="dashboard-info arrivals-dashboard"
        text={"Heutige Anreisen"}
        numbers={22}
      />
      <DashboardSummary
        className="dashboard-info checkout-dashboard"
        text={"Heutige Abreisen"}
        numbers={16}
      />
      <DashboardSummary
        className="dashboard-info percentage-dashboard"
        text={"Belegt:"}
        numbers={"33%"}
      />
    </div>
  );
}

function DashboardSummary({ text, className, numbers }) {
  return (
    <div className={className}>
      <span>{text}</span>
      <span className="numbers">{numbers}</span>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <img
        className="logo-header-footer"
        src="\Hotel_Flow__1_-removebg-preview.png"
        alt="Logo"
      />
    </footer>
  );
}
