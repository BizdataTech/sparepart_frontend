"use client";

import useUsers from "./useUsers";
import User from "./User";
import SearchSection from "@/components/admin/SearchSection";
import EmptyRow from "@/components/admin/EmptyRow";

export default function Users() {
  let { users, setResults, refetch } = useUsers();
  return (
    <main className="flex flex-col gap-4">
      <SearchSection
        placeholder="Search for users"
        type="users"
        setResults={setResults}
      />
      <div className="a-section--box a-text--body !p-0">
        <div className="grid grid-cols-6 gap-8 border-0 border-neutral-200 font-semibold text-neutral-700">
          {[
            "Username",
            "Email",
            "Status",
            "Created Date",
            "Created Time",
            "Options",
          ].map((item, i) => (
            <div
              key={i}
              className="text-center first:text-start last:text-end px-4 py-4"
            >
              {item}
            </div>
          ))}
        </div>
        {users === null && <div>Loading...</div>}
        {users && users.length === 0 && <EmptyRow text="No result found" />}
        {users &&
          users.length >= 1 &&
          users.map((user) => (
            <User key={user._id} user={user} refetch={refetch} />
          ))}
      </div>
    </main>
  );
}
