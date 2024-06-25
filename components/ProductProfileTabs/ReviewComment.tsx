import { Star } from "lucide-react";

export default function ReviewComment() {
  const rating = 3;

  return (
    <>
      {/* parent */}
      <div>
        {/* buyer name */}
        <div>
          <p>Jagath</p>
        </div>

        {/* rating */}
        <div>
          <div className="flex flex-row">
            {Array.from({ length: rating }, (_, index) => (
              <Star key={index} fill="#FFD254" strokeWidth={0} />
            ))}
            {Array.from({ length: 5 - rating }, (_, index) => (
              <Star
                key={5 * rating + index}
                fill="#111"
                strokeWidth={0}
              />
            ))}
          </div>
        </div>

        {/* date and text */}
        <div>
            <p>2024.06.24</p>
            <p>Good product</p>
        </div>
      </div>
    </>
  );
}
