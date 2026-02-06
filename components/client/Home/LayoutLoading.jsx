const LayoutLoading = () => {
  return (
    <div className="space-y-[3rem]">
      <div className="loading--container w-full h-[30rem]">
        <div className="loading--mask loading--animation"></div>
      </div>

      <div className="space-y-6">
        <div className="loading--container w-[20rem] h-[5rem]">
          <div className="loading--mask loading--animation"></div>
        </div>
        <div className="grid grid-cols-5 gap-5">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="loading--container w-full h-[20rem]">
              <div className="loading--mask loading--animation"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="loading--container w-[20rem] h-[5rem]">
          <div className="loading--mask loading--animation"></div>
        </div>
        <div className="grid grid-cols-5 gap-5">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="loading--container w-full h-[20rem]">
              <div className="loading--mask loading--animation"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LayoutLoading;
