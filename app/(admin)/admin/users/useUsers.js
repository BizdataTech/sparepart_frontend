import { useEffect, useState } from "react";

const useUsers = () => {
  const [users, setUsers] = useState(null);
  const [results, setResults] = useState(null);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setResults(users);
  }, [users]);

  const getUsers = async () => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/users?search=`, {
        method: "GET",
        credentials: "include",
      });
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setUsers(result.result);
    } catch (error) {
      console.log(error.message);
    }
  };

  return { users: results, setResults, refetch: getUsers };
};

export default useUsers;
