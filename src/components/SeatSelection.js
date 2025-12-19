import React from 'react';
import './SeatSelection.css';

const SeatSelection = ({ selectedSeats, onSeatSelect }) => {
  // Generate seats: 5 rows, 10 seats per row
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 10;

  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      // Deselect seat
      onSeatSelect(selectedSeats.filter(seat => seat !== seatId));
    } else {
      // Select seat
      onSeatSelect([...selectedSeats, seatId]);
    }
  };

  const getSeatClass = (seatId) => {
    let classes = 'seat';
    if (selectedSeats.includes(seatId)) {
      classes += ' selected';
    }
    return classes;
  };

  return (
    <div className="seat-selection">
      <h3>Select Your Seats</h3>
      <div className="screen">SCREEN</div>
      <div className="seats-grid">
        {rows.map(row => (
          <div key={row} className="seat-row">
            <div className="row-label">{row}</div>
            <div className="seats-in-row">
              {Array.from({ length: seatsPerRow }, (_, i) => {
                const seatId = `${row}${i + 1}`;
                return (
                  <button
                    key={seatId}
                    className={getSeatClass(seatId)}
                    onClick={() => handleSeatClick(seatId)}
                    disabled={false}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="seat-info">
        <div className="seat-legend">
          <div className="legend-item">
            <div className="seat available"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="seat selected"></div>
            <span>Selected</span>
          </div>
        </div>
        <div className="selected-seats">
          Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;