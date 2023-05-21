export default function Input({
  icon,
  name,
  id,
  placeholder,
  type,
  onChange,
  required,
  value,
}) {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
        <i className={icon}></i>
      </span>
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        id={id}
        name={name}
        onChange={(e) => onChange(e)}
        required={required}
        defaultValue={value}
      />
    </div>
  );
}
