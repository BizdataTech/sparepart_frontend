const InputLabel = ({ title, error = null }) => {
  return (
    <div className="flex justify-between items-end">
      <label className="text-[1.6rem] font-medium uppercase">{title}</label>
      {error && (
        <div className="text-red-600 text-[1.5rem] leading-[2rem]">{error}</div>
      )}
    </div>
  );
};

export default InputLabel;
