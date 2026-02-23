"use client";

import useUsers from "./useUsers";
import User from "./User";

export default function Users() {
  let { users, refetch } = useUsers();
  return (
    <main className="a-section--box">
      <div className="grid grid-cols-5 gap-8 border-0 border-neutral-200 text-[1.3rem] font-semibold text-neutral-700">
        {["Created Date", "Username", "Email", "Status", "Options"].map(
          (item, i) => (
            <div
              key={i}
              className="text-center first:text-start last:text-end px-4"
            >
              {item}
            </div>
          ),
        )}
      </div>
      {users === null && <div>Loading...</div>}
      {users && users.length === 0 && (
        <div className="a-text--body bg-neutral-100 text-center py-4">
          Couldn't find any users!
        </div>
      )}
      {users &&
        users.length >= 1 &&
        users.map((user) => (
          <User key={user._id} user={user} refetch={refetch} />
        ))}
    </main>
  );
}
