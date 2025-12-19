import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { bookingsAPI } from '../services/api';
import SeatSelection from '../components/SeatSelection';
import SnacksSelection from '../components/SnacksSelection';
import PaymentMethod from '../components/PaymentMethod';
import './BookingPage.css';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie;

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTiming, setSelectedTiming] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSnacks, setSelectedSnacks] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect if no movie selected
    if (!movie) {
      navigate('/movies');
    }
  }, [movie, navigate]);

  const handleNext = () => {
    if (currentStep === 1) {
      if (!selectedLocation || !selectedTiming) {
        setError('Please select location and timing');
        return;
      }
      if (selectedSeats.length === 0) {
        setError('Please select at least one seat');
        return;
      }
    }
    setError('');
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setError('');
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation for final step
    if (!selectedPaymentMethod) {
      setError('Please select a payment method');
      return;
    }

    try {
      setLoading(true);
      const response = await bookingsAPI.createBooking(
        movie._id,
        selectedLocation,
        selectedTiming,
        selectedSeats,
        selectedSnacks,
        selectedPaymentMethod
      );

      // Navigate to confirmation page with booking details
      navigate('/confirmation', {
        state: {
          booking: response.data
        }
      });
    } catch (err) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  if (!movie) {
    return null;
  }

  return (
    <div className="booking-container">
      <div className="booking-card">
        <h1>Book Tickets</h1>

        <div className="movie-details">
          <h2>{movie.title}</h2>
        </div>

        {/* Step Indicator */}
        <div className="step-indicator">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1. Seats</div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2. Snacks</div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>3. Payment</div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={currentStep === 3 ? handleSubmit : (e) => e.preventDefault()}>
          {/* Step 1: Location, Timing & Seats */}
          {currentStep === 1 && (
            <>
              <div className="form-group">
                <label htmlFor="location">Select Location</label>
                <select
                  id="location"
                  value={selectedLocation}
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    setSelectedTiming(''); // Reset timing when location changes
                  }}
                  className="form-select"
                  required
                >
                  <option value="">Choose a location</option>
                  {movie.locations.map((loc, index) => (
                    <option key={index} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {selectedLocation && (
                <div className="form-group">
                  <label htmlFor="timing">Select Timing</label>
                  <select
                    id="timing"
                    value={selectedTiming}
                    onChange={(e) => setSelectedTiming(e.target.value)}
                    className="form-select"
                    required
                  >
                    <option value="">Choose a timing</option>
                    {movie.timings
                      .find(t => t.location === selectedLocation)
                      ?.times.map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {selectedTiming && (
                <SeatSelection
                  selectedSeats={selectedSeats}
                  onSeatSelect={setSelectedSeats}
                />
              )}
            </>
          )}

          {/* Step 2: Snacks */}
          {currentStep === 2 && (
            <SnacksSelection
              selectedSnacks={selectedSnacks}
              onSnacksChange={setSelectedSnacks}
            />
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <PaymentMethod
              selectedMethod={selectedPaymentMethod}
              onMethodChange={setSelectedPaymentMethod}
            />
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/movies')}
              className="cancel-btn"
            >
              Cancel
            </button>
            {currentStep > 1 && (
              <button type="button" onClick={handlePrevious} className="prev-btn">
                Previous
              </button>
            )}
            {currentStep < 3 && (
              <button type="button" onClick={handleNext} className="next-btn">
                Next
              </button>
            )}
            {currentStep === 3 && (
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Processing...' : 'Confirm Booking'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;

