import { useState } from "react";
import "../../styles/layer-searchbar-styles.css";

function LayerSearchbar({ options, onSelectionFunction, query, setQuery }) {
    // const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const filteredOptions =
        query.trim == ""
            ? options
            : options.filter((option) => {
                  const q = query.toLowerCase();

                  const labelMatch = option.label.toLowerCase().includes(q);
                  const termMatch = option.terms?.some((term) =>
                      term.toLowerCase().includes(q)
                  );

                  return labelMatch || termMatch;
              });

    return (
        <div className="layer-searchbar-container">
            <input
                type="text"
                placeholder="Search layers..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 100)}
            />

            {isFocused && (
                <div className="layer-search-results">
                    {filteredOptions.length === 0 && (
                        <div className="layer-search-item muted">
                            No matches
                        </div>
                    )}

                    {filteredOptions.map((option) => (
                        <div
                            key={option.label}
                            className="layer-search-item"
                            onClick={() => {
                                onSelectionFunction(option);
                            }}
                            onMouseDown={() => onSelectionFunction(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LayerSearchbar;
