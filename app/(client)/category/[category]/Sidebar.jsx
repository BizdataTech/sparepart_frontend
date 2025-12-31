"use client";

const Sidebar = ({ setter, filters }) => {
  const handleFilter = (e, label) => {
    let value = e.target.value;
    setter((prev) => {
      let filter_obj = { ...prev };
      if (!filter_obj[label]) filter_obj[label] = [];
      if (filter_obj[label].includes(value))
        filter_obj[label] = filter_obj[label].filter((fil) => fil !== value);
      else filter_obj[label] = [...filter_obj[label], value];
      if (!filter_obj[label].length) delete filter_obj[label];
      return filter_obj;
    });
  };

  return (
    <aside className="self-start w-[17rem] md:w-[30rem] bg-white p-2 md:p-6">
      {filters ? (
        <div className="text-[1.2rem] md:text-[1.6rem] space-y-8 md:space-y-12">
          {Object.entries(filters).map(([key, values], index) => (
            <div key={index} className=" space-y-2 md:space-y-4">
              <div className="font-medium capitalize">{key}</div>
              <div className="space-y-2">
                {values.map((value, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <label htmlFor={key}>{value.title}</label>
                    <input
                      type="checkbox"
                      name={key}
                      id=""
                      value={value.title}
                      className="w-[.9rem] md:w-auto h-[.9rem] md:h-auto"
                      onChange={(e) => handleFilter(e, key)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </aside>
  );
};

export default Sidebar;
