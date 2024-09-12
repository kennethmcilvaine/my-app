import { useState, useEffect } from "react";
import { fetchAPI, submitAPI } from "./api";

function RegistrationPage(props) {

  const [availableTimes, setAvailableTimes] = useState([])

  const timeOptions = (x) => {
    return <option>{x}</option>;
  };

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [occasion, setOccasion] = useState("None");

  const getIsFormValid = () => {
    return (
      date && time && guests && occasion
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(submitAPI(e)){
      alert("Booking complete!");
    }else{
      alert("Booking not submitted!");
    }
  };

    return (
      <div className="registration">
      <form  onSubmit={handleSubmit}>
      <h1>Reserve a Table</h1>
        <label htmlFor="res-date">Choose date</label>
        <input type="date" id="res-date" name="res-date"
        value={date}
        onBlur={() =>{
          const times = fetchAPI(new Date(date))
          setAvailableTimes(times)
          setTime(times[0])
        }}
        onChange={(x) => {
          setDate(x.target.value)
        }}/>
        <label htmlFor="res-time">Choose time</label>
        <select id="res-time" name="res-time"
        onChange={(x)=> {
          setTime(x.target.value)
        }}>
          {availableTimes.map(timeOptions)}
        </select>
        <label htmlFor="guests">Number of guests</label>
        <input type="number" name="guests" placeholder="How many guests?" min="2" max="10" id="guests" onChange={(x)=>{
          setGuests(x.target.value)
        }}/>
        <label htmlFor="occasion">Occasion</label>
        <select id="occasion" name="occasion" onChange={(x)=>{
          setOccasion(x.target.value)
        }}>
            <option>None</option>
            <option>Birthday</option>
            <option>Anniversary</option>
        </select>
        <input type="submit" value="Book Your Reservation"  disabled={!getIsFormValid()}/>
      </form>
      </div>
    );
  }

export default RegistrationPage;