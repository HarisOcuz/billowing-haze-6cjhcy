export function EditingGuestBooking({
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
        defaultValue={value}
        onChange={onChange}
        type={type}
      />
    </>
  );
}
