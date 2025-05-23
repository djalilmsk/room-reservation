import { useState } from "react";

export function StarRating({
  totalStars = 5,
  value = 0,
  onChange,
  width = 20,
  height = 20,
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center justify-between gap-1">
      <div className="space-x-1">
        {[...Array(totalStars)].map((_, idx) => {
          const starValue = idx + 1;
          return (
            <button
              key={starValue}
              type="button"
              onClick={() => onChange && onChange(starValue)}
              onMouseEnter={() => setHovered(starValue)}
              onMouseLeave={() => setHovered(0)}
              aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
              className="cursor-pointer border-none bg-transparent p-0"
            >
              <svg
                width={width}
                height={height}
                fill={starValue <= (hovered || value) ? "#fbbf24" : "#e5e7eb"}
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>
          );
        })}
      </div>
      <span className="text-muted-foreground ml-2 text-sm">
        {value ? `You rated ${value} star${value > 1 ? "s" : ""}` : "No rating"}
      </span>
    </div>
  );
}
