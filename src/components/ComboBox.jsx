export default function ComboBox ({ options, handle}) {
  const handleChange = (e) => {
    const selectedItem = e.target.value;
    handle(selectedItem);
  }

  return (
    <select className="combo-box" onChange={(e) => handleChange(e)}>
      {options.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

