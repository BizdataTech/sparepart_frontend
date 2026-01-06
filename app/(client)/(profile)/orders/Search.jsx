const Search = ({ input, setInput, submitQuery }) => {
  return (
    <form
      className="w-[55%] flex gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        submitQuery();
      }}
    >
      <input
        type="search"
        className="w-full text-[1.6rem] border border-neutral-400 outline-none p-3"
        placeholder="Search orders here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="w-[18rem] text-[1.6rem] bg-black text-white font-medium p-2">
        Search Order
      </button>
    </form>
  );
};

export default Search;
