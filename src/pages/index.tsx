import { useEffect, useState } from "react";
import axios from "axios";
import HotelCarousel from "@/components/HotelCarousel";
import Stars from "@/components/Stars";

type mealType = string | { code: number; text: string };

type Hotel = {
  hotelId: number;
  name: string;
  photos: string[];
  regionName: string;
  discounts: number[];
  mealType: mealType;
  stars: number;
  pricePerNight: number;
  originalHighestPrice: number;
  originalLowestPrice: number;
};

const Home = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(
          "https://api-dev.outletdehoteles.com/api/availability/public"
        );

        const hotelsData = response.data.data.map((hotel: Hotel) => ({
          hotelId: hotel.hotelId,
          name: hotel.name,
          photos: hotel.photos,
          regionName: hotel.regionName,
          discounts: hotel.discounts,
          mealType: hotel.mealType,
          stars: hotel.stars,
          pricePerNight: hotel.pricePerNight,
          originalHighestPrice: hotel.originalHighestPrice,
          originalLowestPrice: hotel.originalLowestPrice
        }));
        
        setHotels(hotelsData);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <p className="title">Available Hotels</p>
      <div className="cards">
        {hotels.map((hotel) => (
          <div className="card" key={hotel.hotelId}>
            <div className="card-img">
              <HotelCarousel photos={hotel.photos} />
            </div>
            <div className="card-content">
              <div className="information-hotel">
                <span className="name-hotel">{hotel.name}</span>
                <Stars stars={hotel.stars} />
                <span className="region-hotel">{hotel.regionName}</span>
                <span>{typeof hotel.mealType === "string" ?
                  hotel.mealType
                  : hotel.mealType.text}</span>
              </div>
              <div className="prices-hotel">
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button className="button-reserve">Reserve Now</button>
                    <span className="discounts-reserve"> -{hotel.discounts[0]}% </span>
                  </div>
                  <span className="regular-price">Regular Price: <span style={{ textDecoration: "line-through"}}>MXN {hotel.originalHighestPrice.toFixed(2)} </span> </span>
                  <span className="perNight-price">MXN {hotel.pricePerNight.toFixed(2)} per night</span>
                  <span className="included-price">MXN {hotel.originalLowestPrice.toFixed(2)} per stay, taxes and fees included</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
