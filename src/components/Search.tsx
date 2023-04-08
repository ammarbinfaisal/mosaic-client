import React, { useState } from "react";

const Search = () => {
    const [search, setSearch] = useState("");
    // const [results, setResults] = useState([]);
    // const [loading, setLoading] = useState(false);

    const searchQuery = async () => {
        // setLoading(true);
        // const response = await fetch(`/api/search?q=${search}`);
        // const data = await response.json();
        // setResults(data);
        // setLoading(false);
    };

    const onChange = (e: any) => {
        setSearch(e.target.value);
        searchQuery();
    };

    return (
        <input
            type="text"
            value={search}
            onChange={onChange}
            className=" text-gray-700 placeholder-gray-400 rounded-full w-full pr-4 py-2 mx-24 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent border-2 border-stone-400 text-lg bg-stone-300"
        />
    );
};

export default Search;
