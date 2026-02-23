const Label = ({ title, error }) => {
  return (
    <div className="flex justify-between items-end text-[1.5rem]">
      <label className="">{title}</label>
      {error && <div className="text-red-700 text-[1.3rem]">{error}</div>}
    </div>
  );
};

export default Label;
