import { useState, useEffect } from "react";
import { getCurrentUser } from "../api/users";

export default function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    getUser();
  }, []);

  return { user, loading };
}
