const Search = ({ input, setInput, submitQuery }) => {
  return (
    <form
      className="w-full md:w-[55%] flex gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        submitQuery();
      }}
    >
      <input
        type="search"
        className="w-full text-[1.2rem] md:text-[1.6rem] border border-neutral-300 bg-white rounded-[.5rem] outline-none p-2 md:p-3"
        placeholder="Search orders here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
};

export default Search;
