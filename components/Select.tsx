interface ISelectProps {
  label: string;
  name: string;
  opts: { label: string; value: any }[];
  value?: string;
}

export default function Select({ label, name, opts, value }: ISelectProps) {
  return (
    <label className="d-flex align-items-center m-0">
      <span className="me-2">{label}</span>
      <select name={name} className="form-select">
        {opts.map((opt) => (
          <option
            key={opt.value}
            defaultChecked={opt.label === value}
            value={opt.value}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
