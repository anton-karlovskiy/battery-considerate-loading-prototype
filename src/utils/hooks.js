
import { useState, useEffect } from 'react';

const unsupportMessage = 'The Battery Status API is not supported on this platform.';

const useBatteryStatus = () => {
  const [batteryStatus, setBatteryStatus] = useState(null);

  const monitorBattery = battery => {
    // Update the initial UI
    updateBatteryStatus(battery);
  
    // Monitor for futher updates
    battery.addEventListener('levelchange', updateBatteryStatus.bind(null, battery));
    battery.addEventListener('chargingchange', updateBatteryStatus.bind(null, battery));
    battery.addEventListener('dischargingtimechange', updateBatteryStatus.bind(null, battery));
    battery.addEventListener('chargingtimechange', updateBatteryStatus.bind(null, battery));
  };

  const updateBatteryStatus = battery => {
    setBatteryStatus({
      chargingTime: battery.chargingTime + ' Seconds',
      dichargeTime: battery.dischargingTime + ' Seconds',
      level: (battery.level * 100) + '%'
    });

    if (battery.charging === true) {
      setBatteryStatus({chargingState: 'Charging'});
    } else if (battery.charging === false) {
      setBatteryStatus({chargingState: 'Discharging'});
    }
  };

  useEffect(() => {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(monitorBattery);
    } else {
      alert('The Battery Status API is not supported on this platform.');
    }
  }, []);

  return batteryStatus;
};

export { useBatteryStatus };
