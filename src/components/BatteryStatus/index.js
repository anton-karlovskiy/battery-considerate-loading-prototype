
import React, { Component } from 'react';

import './battery-status.css'

class BatteryStatus extends Component {
  state = {
    chargingTime: null,
    chargingState: null,
    dichargeTime: null,
    level: null
  };

  componentDidMount() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(this.monitorBattery);
    } else {
      alert('The Battery Status API is not supported on this platform.');
    }
  }

  monitorBattery = battery => {
    // Update the initial UI.
    this.updateBatteryUI(battery);
  
    // Monitor for futher updates.
    battery.addEventListener('levelchange', this.updateBatteryUI.bind(null, battery));
    battery.addEventListener('chargingchange', this.updateBatteryUI.bind(null, battery));
    battery.addEventListener('dischargingtimechange', this.updateBatteryUI.bind(null, battery));
    battery.addEventListener('chargingtimechange', this.updateBatteryUI.bind(null, battery));
  };

  updateBatteryUI = battery => {
    this.setState({
      chargingTime: battery.chargingTime + ' Seconds',
      dichargeTime: battery.dischargingTime + ' Seconds',
      level: (battery.level * 100) + '%'
    });

    if (battery.charging === true) {
      this.setState({chargingState: 'Charging'});
    } else if (battery.charging === false) {
      this.setState({chargingState: 'Discharging'});
    }
  };

  render () {
    const { chargingTime, chargingState, dichargeTime, level } = this.state;
    return (
      <div className='list'>
        <div className='list-item'>
          <div>Charging:</div>
          <div>{chargingState}</div>
        </div>
        <div className='list-item'>
          <div>Time to charge:</div>
          <div>{chargingTime}</div>
        </div>
        <div className='list-item'>
          <div>Time to discharge:</div>
          <div>{dichargeTime}</div>
        </div>
        <div className='list-item'>
          <div>Battery Level:</div>
          <div>{level}</div>
        </div>
      </div>
    );
  }
}

export default BatteryStatus;
