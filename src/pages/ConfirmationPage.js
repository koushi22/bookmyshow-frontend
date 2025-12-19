import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ConfirmationPage.css';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    // Redirect if no booking data
    if (!booking) {
      navigate('/movies');
    }

    // Hide notification after 5 seconds
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [booking, navigate]);

  const handlePrintMovieBill = () => {
    // Hide snacks section for movie bill print
    const snacksSection = document.querySelector('.snacks-bill');
    if (snacksSection) snacksSection.style.display = 'none';

    window.print();

    // Show snacks section again
    if (snacksSection) snacksSection.style.display = 'block';
  };

  const handlePrintSnacksBill = () => {
    // Hide movie section for snacks bill print
    const movieSection = document.querySelector('.movie-bill');
    if (movieSection) movieSection.style.display = 'none';

    window.print();

    // Show movie section again
    if (movieSection) movieSection.style.display = 'block';
  };

  const handlePrintFullBill = () => {
    window.print();
  };

  const handleBackToMovies = () => {
    navigate('/movies');
  };

  if (!booking) {
    return null;
  }

  return (
    <div className="confirmation-container">
      {showNotification && (
        <div className="success-notification">
          ✅ Booking confirmed successfully!
        </div>
      )}

      <div className="confirmation-card">
        <div className="success-icon">✓</div>
        <h1>Booking Confirmed!</h1>

        <div className="booking-details">
          <div className="movie-bill bill-section">
            <h3>🎬 Movie Tickets</h3>
            <div className="detail-row">
              <span className="detail-label">Booking ID:</span>
              <span className="detail-value">{booking.bookingId}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Movie:</span>
              <span className="detail-value">{booking.movie}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Location:</span>
              <span className="detail-value">{booking.location}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Timing:</span>
              <span className="detail-value">{booking.timing}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Seats:</span>
              <span className="detail-value">{Array.isArray(booking.seats) ? booking.seats.join(', ') : booking.seats}</span>
            </div>

            <div className="detail-row bill-total">
              <span className="detail-label">Tickets Amount:</span>
              <span className="detail-value">₹{booking.ticketsAmount || booking.totalAmount}</span>
            </div>
          </div>

          {booking.snacks && booking.snacks.length > 0 && (
            <div className="snacks-bill bill-section">
              <h3>🍿 Snacks & Beverages</h3>
              {booking.snacks.map((snack, index) => (
                <div key={index} className="detail-row">
                  <span className="detail-label">{snack.name} x {snack.quantity}:</span>
                  <span className="detail-value">₹{snack.price * snack.quantity}</span>
                </div>
              ))}

              <div className="detail-row bill-total">
                <span className="detail-label">Snacks Amount:</span>
                <span className="detail-value">₹{booking.snacksAmount || 0}</span>
              </div>
            </div>
          )}

          <div className="payment-bill bill-section">
            <h3>💳 Payment Details</h3>
            <div className="detail-row">
              <span className="detail-label">Payment Method:</span>
              <span className="detail-value">{booking.paymentMethod?.replace('_', ' ').toUpperCase()}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Payment Status:</span>
              <span className="detail-value">{booking.paymentStatus?.toUpperCase()}</span>
            </div>

            <div className="detail-row grand-total">
              <span className="detail-label">Total Amount:</span>
              <span className="detail-value">₹{booking.totalAmount}</span>
            </div>
          </div>

          <div className="detail-row">
            <span className="detail-label">Booking Date:</span>
            <span className="detail-value">
              {new Date(booking.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="confirmation-actions">
          <button onClick={handlePrintMovieBill} className="print-btn movie-print">
            Print Movie Bill
          </button>
          {booking.snacks && booking.snacks.length > 0 && (
            <button onClick={handlePrintSnacksBill} className="print-btn snacks-print">
              Print Snacks Bill
            </button>
          )}
          <button onClick={handlePrintFullBill} className="print-btn full-print">
            Print Full Receipt
          </button>
          <button onClick={handleBackToMovies} className="back-btn">
            Back to Movies
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;

