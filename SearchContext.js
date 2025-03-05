import { createContext, useState, useEffect } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [allData, setAllData] = useState([]); // Store all products/pages

  // Fetch all website data (products, pages, etc.)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Example: Fetch data from an API or a JSON file
        const response = await fetch("/api/data"); // Replace with your actual API
        const data = await response.json();
        setAllData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle search logic
  const search = (query) => {
    if (!query.trim()) {
      setSearchResults([]); // Reset if empty
      return;
    }

    const filtered = allData.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );

    setSearchResults(filtered);
  };

  return (
    <SearchContext.Provider value={{ searchResults, search }}>
      {children}
    </SearchContext.Provider>
  );
};
