const Label = ({ title, error }) => {
  return (
    <div className="flex justify-between items-center text-[1.6rem]">
      <label htmlFor="" className="uppercase">
        {title}
      </label>
      {error && <div className="text-red-700">{error}</div>}
    </div>
  );
};

export default Label;
