import { useEffect, useState } from 'react';

export const useGeolocation = ({ enableHighAccuracy, maximumAge, timeout } = {}, callback) => {
  const [coordinates, setCoordinates] = useState({
    error: null,
    speed: null,
    heading: null,
    accuracy: null,
    altitude: null,
    latitude: null,
    longitude: null,
    timestamp: null,
    altitudeAccuracy: null
  });

  useEffect(() => {
    let didCancel;
    const updateCoordinates = ({ coords = {}, timestamp }) => {
      const { accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed } = coords;
      if (!didCancel) {
        setCoordinates({
          accuracy,
          altitude,
          altitudeAccuracy,
          heading,
          latitude,
          longitude,
          speed,
          timestamp,
          error: null
        });
        if (callback instanceof Function) {
          callback({
            accuracy,
            altitude,
            altitudeAccuracy,
            heading,
            latitude,
            longitude,
            speed,
            timestamp,
            error: null
          });
        }
      }
    };

    const setError = (error) => {
      if (!didCancel) {
        setCoordinates({
          speed: null,
          heading: null,
          accuracy: null,
          altitude: null,
          latitude: null,
          longitude: null,
          timestamp: null,
          altitudeAccuracy: null,
          error
        });
      }
    };

    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(updateCoordinates, setError, {
        enableHighAccuracy,
        maximumAge,
        timeout
      });
    }
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
      didCancel = true;
    };
  }, [callback, enableHighAccuracy, maximumAge, timeout]);

  return coordinates;
};
