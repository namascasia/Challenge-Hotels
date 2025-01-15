import { FaStar, FaRegStar } from "react-icons/fa";

type StarRatingProps = {
  stars: number;
};

const StarRating = ({ stars }: StarRatingProps) => {
  return (
    <div style={{ display: "flex" }}>
      {[...Array(5)].map((_, index) => (
        <span key={index} style={{ color: "#FFD700", fontSize: "1.2rem" }}>
          {index < stars ? <FaStar /> : <FaRegStar />}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
