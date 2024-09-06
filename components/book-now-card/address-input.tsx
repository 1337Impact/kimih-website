"use client";
import { useState } from "react";
import axios from "axios";

export default function AddressInput({
  setCoridinates,
}: {
  setCoridinates: (coordinates: {
    latitude: number;
    longitude: number;
  }) => void;
}) {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleAddressChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    setAddress(input);

    if (input.length > 1) {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            input
          )}.json?access_token=${
            process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
          }&limit=5`
        );
        // console.log("Suggestions:", response.data.features);
        setSuggestions(response.data.features);
      } catch (error) {
        console.log("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setAddress(suggestion.place_name);
    setCoridinates({
      latitude: suggestion.center[0],
      longitude: suggestion.center[1],
    });
    setSuggestions([]);
  };

  const handleBlur = () => {
    if (suggestions.length > 0) {
      setAddress(suggestions[0].place_name);
      setCoridinates({
        latitude: suggestions[0].center[0],
        longitude: suggestions[0].center[1],
      });
    }
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="Enter your address"
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="border-[2px] border-violet-400 font-semibold w-full pl-5 pr-3 py-2 text-gray-600 rounded-md focus:outline-none sm:text-sm"
      />
      {isFocused && suggestions.length > 0 && (
        <div className="absolute w-full bg-white border border-gray-200 rounded-lg mt-1 z-10">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              onMouseDown={() => handleSuggestionClick(suggestion)} // Use onMouseDown to prevent blur during click
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {suggestion.place_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
