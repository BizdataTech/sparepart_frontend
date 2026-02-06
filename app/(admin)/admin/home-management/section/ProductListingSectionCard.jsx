"use client";

import { useState } from "react";

const ProductListingSectionCard = ({ section }) => {
  const [edit, setEdit] = useState(false);

  let sectionData = {
    title: section.title,
    data_source: section.data_source,
    reference_id: section.reference_id,
    redirection: section.redirection,
    layout: section.layout,
    limit: section.limit,
  };
  let data_sources = [["category", "categories"]];
  let [newData, setNewData] = useState({});
  return (
    <section className="a-section--box !space-y-8">
      <div className="flex justify-between items-center">
        <div className="a-section--title capitalize">
          {section.section_type.split("_").join(" ")}
        </div>
        {edit && (
          <div
            className="a-text--button text-neutral-800 bg-neutral-200 flex items-center gap-2"
            onClick={() => setEdit(false)}
          >
            Cancel Editing{" "}
            <XCircle className="w-[1.5rem] h-[1.5rem]" weight="fill" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-8">
        <div className="w-1/2">
          <div className="a-text--label">Section Title</div>
          <input
            type="text"
            value={sectionData.title}
            className="a-input"
            disabled={!edit}
          />
        </div>
        <div className="flex gap-4">
          <div className="w-1/2 space-y-1">
            <div className="a-text--label">Data Source</div>
            <select className="a-input" disabled={!edit}>
              {data_sources.map(([key, value]) => (
                <option value={value} className="capitalize">
                  {key}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2 space-y-1"></div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="a-text--label">Section Item Limit</div>
          <div className="flex gap-[4rem] text-[1.4rem]">
            {["4", "6", "8", "10", "12"].map((count, i) => (
              <div className="flex items-center gap-2" key={i}>
                <input
                  type="radio"
                  name={`count-${section._id}`}
                  id={`count-${section._id}-${count}`}
                  value={count}
                  checked={String(sectionData.limit) == count}
                />
                <label htmlFor={`count-${section._id}-${count}`}>{count}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListingSectionCard;
