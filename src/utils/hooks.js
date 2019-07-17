
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
    if(batteryStatus && batteryStatus !== unsupportMessage) {
      batteryStatus.addEventListener('levelchange', updateBatteryStatus);
      batteryStatus.addEventListener('chargingchange', updateBatteryStatus);
      batteryStatus.addEventListener('dischargingtimechange', updateBatteryStatus);
      batteryStatus.addEventListener('chargingtimechange', updateBatteryStatus);
      return () => {
        batteryStatus.removeEventListener('levelchange', updateBatteryStatus);
        batteryStatus.removeEventListener('chargingchange', updateBatteryStatus);
        batteryStatus.removeEventListener('dischargingtimechange', updateBatteryStatus);
        batteryStatus.removeEventListener('chargingtimechange', updateBatteryStatus);
      }
    }
  }, [batteryStatus]);

  return batteryStatus;
};

export { useBatteryStatus };
