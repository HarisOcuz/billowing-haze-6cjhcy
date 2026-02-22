export function ChangeNotification({ onClose, children }) {
  return (
    <>
      <div className="overlay-notification"></div>
      <div className="change-log">
        <h3>{children}</h3>
        <button onClick={onClose} className="btn">
          OK
        </button>
      </div>
    </>
  );
}
