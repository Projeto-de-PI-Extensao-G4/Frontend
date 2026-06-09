import "../styles/InputField.css";

export default function InputField({
  label,
  type = "text",
  placeholder,
  icon,
  value
}) {
  return (
    <div className="input-group">

      <label>{label}</label>

      <div className="input-box">

        {icon && (
          <span className="input-icon">
            {icon}
          </span>
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
        />

      </div>

    </div>
  );
}