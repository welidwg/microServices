export default function Input({
  icon,
  name,
  id,
  placeholder,
  type,
  onChange,
  required,
}) {
  return (
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">
        <i className={icon}></i>
      </span>
      <input
        type={type}
        class="form-control"
        placeholder={placeholder}
        id={id}
        name={name}
        onChange={(e) => onChange(e)}
        required={required}
      />
    </div>
  );
}
