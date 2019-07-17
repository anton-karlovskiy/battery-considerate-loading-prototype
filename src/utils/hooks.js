
import { useState, useEffect } from 'react';

const unsupportMessage = 'The Battery Status API is not supported on this platform.';

const useBatteryStatus = () => {
  const [batteryStatus, setBatteryStatus] = useState(null);

  const updateBatteryStatus = battery => {
    setBatteryStatus(battery);
  };

  useEffect(() => {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        updateBatteryStatus(battery);
      });
    } else {
      setBatteryStatus(unsupportMessage);
    }
  }, []);

  useEffect(() => {
    console.log('ray : ***** listener effect watch');
    if(batteryStatus && batteryStatus !== unsupportMessage) {
      batteryStatus.addEventListener('levelchange', updateBatteryStatus.bind(null, batteryStatus));
      batteryStatus.addEventListener('chargingchange', updateBatteryStatus.bind(null, batteryStatus));
      batteryStatus.addEventListener('dischargingtimechange', updateBatteryStatus.bind(null, batteryStatus));
      batteryStatus.addEventListener('chargingtimechange', updateBatteryStatus.bind(null, batteryStatus));
      return () => {
        batteryStatus.removeEventListener('levelchange', updateBatteryStatus.bind(null, batteryStatus));
        batteryStatus.removeEventListener('chargingchange', updateBatteryStatus.bind(null, batteryStatus));
        batteryStatus.removeEventListener('dischargingtimechange', updateBatteryStatus.bind(null, batteryStatus));
        batteryStatus.removeEventListener('chargingtimechange', updateBatteryStatus.bind(null, batteryStatus));
      }
    }
  });

  return batteryStatus;
};

export { useBatteryStatus };
