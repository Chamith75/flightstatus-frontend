import React, {  useState } from "react";
import "../App.css";
import { NavLink, useNavigate } from "react-router-dom";
import plan1 from "../assets/plan-1.jpg";
import plan2 from "../assets/plan-2.jpg";
import plan3 from "../assets/plan-3.jpg";
import header from "../assets/header.jpg";
import axios from "axios";

const Home = () => {
  const [formData, setformData] = useState({
    carrierCode: "",
    flightNumber: "",
    scheduledDepartureDate: "",
  });
  const navigate = useNavigate();

  const [flightData, setFlightData] = useState(null); // To store fetched data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { carrierCode, flightNumber, scheduledDepartureDate } = formData;
  
    // Validate inputs
    if (!carrierCode || !flightNumber || !scheduledDepartureDate) {
      alert("Please fill all the fields before submitting.");
      return;
    }
  
    console.log("Sending request with params:", {
      carrierCode,
      flightNumber,
      scheduledDepartureDate,
    });
  
    try {
      const response = await axios.get(
        `http://api.flights.bobros.in/flightshedule/v2/schedule/flights`,
        {
          params: {
            carrierCode,
            flightNumber,
            scheduledDepartureDate,
          },
        }
      );
  
      // Log the response data
      console.log("Fetched flight data:", response.data);
      setFlightData(response.data);
      navigate("/status", { state: { flightData: response.data } });
    } catch (e) {
      console.error("Error fetching flight status:", e);
      alert("Failed to fetch flight status. Please try again.");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav>
        <div
          className="nav__logo"
          style={{ color: "#FE561A", fontSize: "30px", fontWeight: "bolder" }}
        >
          BOBROS
        </div>
        <ul className="nav__links">
          <li className="link">
            <NavLink>Home</NavLink>
          </li>
          <li className="link">
            <NavLink>About</NavLink>
          </li>
          <li className="link">
            <NavLink>Offers</NavLink>
          </li>
          <li className="link">
            <NavLink>Seats</NavLink>
          </li>
          <li className="link">
            <NavLink>Destinations</NavLink>
          </li>
        </ul>
        <button className="btn">Contact</button>
      </nav>

      {/* Header Section */}
      <header className="section__container header__container">
        <h1 className="section__header">
          Find And Book
          <br />
          A Great Experience with <span  style={{ color: "#FE561A", fontSize: "50px", fontWeight: "bolder" }}>BOBROS</span>
        </h1>
        <img src={header} alt="header" />
      </header>

      {/* Booking Section */}
      <section className="section__container booking__container">
        <div className="booking__nav">
          <span>Economy Class</span>
          <span>Flight status</span>
          <span>First Class</span>
        </div>
        <form>
          <div className="form__group">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div className="input__content">
              <div className="input__group"  >
                <input
                  type="text"
                  name="carrierCode"
                  value={formData.carrierCode}
                  onChange={handleChange}
                />
                <label>Carrier</label>
              </div>
              <p>Where are you going?</p>
            </div>
          </div>
          <div className="form__group">
            <span>
              <i className="ri-user-3-line"></i>
            </span>
            <div className="input__content">
              <div className="input__group">
                <input
                  type="number"
                  name="flightNumber"
                  value={formData.flightNumber}
                  onChange={handleChange}
                />
                <label>Flight Number</label>
              </div>
              <p>Add guests</p>
            </div>
          </div>
          <div className="form__group">
            <span>
              <i className="ri-calendar-line"></i>
            </span>
            <div className="input__content">
              <div className="input__group">
                <input
                  type="text"
                  name="scheduledDepartureDate"
                  value={formData.scheduledDepartureDate}
                  onChange={handleChange}
                />
                <label>Scheduled Departure</label>
              </div>
              <p>Add date</p>
            </div>
          </div>
          <button className="btn" onClick={handlesubmit}>
           Search<i class="bi bi-airplane"></i>
          </button>
        </form>
      </section>


      {/* Plan Section */}
      <section className="section__container plan__container">
        <p className="subheader">TRAVEL SUPPORT</p>
        <h2 className="section__header">Plan your travel with confidence</h2>
        <p className="description">
          Find help with your bookings and travel plans, and see what to expect
          along your journey.
        </p>
        <div className="plan__grid">
          <div className="plan__content">
            <span className="number">01</span>
            <h4>Travel Requirements for Dubai</h4>
            <p>
              Stay informed and prepared for your trip to Dubai with essential
              travel requirements, ensuring a smooth and hassle-free experience
              in this vibrant and captivating city.
            </p>
            <span className="number">02</span>
            <h4>Multi-risk travel insurance</h4>
            <p>
              Comprehensive protection for your peace of mind, covering a range
              of potential travel risks and unexpected situations.
            </p>
            <span className="number">03</span>
            <h4>Travel Requirements by destinations</h4>
            <p>
              Stay informed and plan your trip with ease, as we provide
              up-to-date information on travel requirements specific to your
              desired destinations.
            </p>
          </div>
          <div className="plan__image">
            <img src={plan1} alt="plan" />
            <img src={plan2} alt="plan" />
            <img src={plan3} alt="plan" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
