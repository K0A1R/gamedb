"use client";
import { useState, useEffect } from "react";

export default function useStores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(
          "https://www.cheapshark.com/api/1.0/stores"
        );
        if (!response.ok) throw new Error("Failed to fetch stores");
        const data = await response.json();
        setStores(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  return { stores, loading, error };
}
