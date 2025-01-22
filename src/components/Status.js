import React from 'react';
import { useLocation } from 'react-router-dom';
import video1 from '../assets/Video2.mp4';

const Status = () => {
  const location = useLocation();
  const { flightData } = location.state || {};
  
  // Make sure flightData is available
  if (!flightData || !flightData.data) {
    return <p>No flight data available</p>;
  }

  const flight = flightData.data[0];

  return (
    <div>
      <section style={{ height: '100vh', width: '100%' }}>
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -1,
            }}
          >
            <source src={video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Flight Status Container */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              background: 'rgba(0, 0, 0, 0.7)',
              padding: '20px',
              borderRadius: '10px',
              maxWidth: '600px',
              margin: 'auto',
              textAlign: 'center',
              color: 'white',
            }}
          >
            <h1 style={{ color: '#FE561A' }}>Flight Status <i class="bi bi-airplane"></i></h1>
            <p><strong>Carrier:</strong> {flight.flightDesignator.carrierCode}</p>
            <p><strong>Flight Number:</strong> {flight.flightDesignator.flightNumber}</p>
            <p><strong>Scheduled Departure:</strong> {flight.scheduledDepartureDate}</p>
            
            {/* Flight Points */}
            <div>
              {flight.flightPoints.map((point, index) => (
                <div key={index} style={{ marginBottom: '15px' }}>
                  <h3>{point.iataCode}</h3>
                  {point.departure && (
                    <p>
                      <strong>Departure Time:</strong>{' '}
                      {point.departure.timings.map((time, i) => (
                        <span key={i}>{new Date(time.value).toLocaleString()}</span>
                      ))}
                    </p>
                  )}
                  {point.arrival && (
                    <p>
                      <strong>Arrival Time:</strong>{' '}
                      {point.arrival.timings.map((time, i) => (
                        <span key={i}>{new Date(time.value).toLocaleString()}</span>
                      ))}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Flight Segments */}
            <div>
              <h3>Flight Segments</h3>
              {flight.segments.map((segment, index) => (
                <div key={index}>
                  <p>
                    <strong>From:</strong> {segment.boardPointIataCode} <strong>To:</strong> {segment.offPointIataCode}
                  </p>
                  <p><strong>Duration:</strong> {segment.scheduledSegmentDuration}</p>
                </div>
              ))}
            </div>

            {/* Flight Legs */}
            <div>
              <h3>Flight Legs</h3>
              {flight.legs.map((leg, index) => (
                <div key={index}>
                  <p>
                    <strong>From:</strong> {leg.boardPointIataCode} <strong>To:</strong> {leg.offPointIataCode}
                  </p>
                  <p><strong>Aircraft Type:</strong> {leg.aircraftEquipment.aircraftType}</p>
                  <p><strong>Scheduled Duration:</strong> {leg.scheduledLegDuration}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Status;
