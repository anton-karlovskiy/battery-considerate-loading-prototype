
import React, { Component, Fragment } from 'react';

import './battery-ui.css'

class BatteryUI extends Component {
  state = {
    chargingTime: null,
    chargingState: null,
    dichargeTime: null,
    level: null,
    unsupportMessage: null
  };

  componentDidMount() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(this.monitorBattery);
    } else {
      this.setState({unsupportMessage: 'The Battery Status API is not supported on this platform.'});
    }
  }

  // ray test touch <
  monitorBattery = battery => {
    const updateChargeInfo = () => {
      console.log("Battery charging? " + (battery.charging ? "Yes" : "No"));
      this.setState({
        chargingState: battery.charging === true ? 'Charging' : 'Discharging'
      });
    };
    battery.addEventListener('chargingchange', battery => updateChargeInfo(battery));
  
    const updateLevelInfo = () => {
      console.log("Battery level: " + battery.level * 100 + "%");
      this.setState({
        level: `${battery.level * 100}%`,
      });
    };
    battery.addEventListener('levelchange', battery => updateLevelInfo(battery));
  
    const updateChargingInfo = () => {
      console.log("Battery charging time: " + battery.chargingTime + " seconds");
      this.setState({
        chargingTime: `${battery.chargingTime} Seconds`,
      });
    };
    battery.addEventListener('chargingtimechange', battery => updateChargingInfo(battery));
  
    const updateDischargingInfo = () => {
      console.log("Battery discharging time: " + battery.dischargingTime + " seconds");
      this.setState({
        dichargeTime: `${battery.dischargingTime} Seconds`,
      });
    };
    battery.addEventListener('dischargingtimechange', battery => updateDischargingInfo(battery));

    const updateAllBatteryInfo = () => {
      updateChargeInfo(battery);
      updateLevelInfo(battery);
      updateChargingInfo(battery);
      updateDischargingInfo(battery);
    };
    updateAllBatteryInfo();
  };
  // ray test touch >

  render () {
    const { chargingTime, chargingState, dichargeTime, level, unsupportMessage } = this.state;
    return (
      <div className='list'>
        { unsupportMessage ? (
          <div>{unsupportMessage}</div>
        ) : (
          <Fragment>
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
          </Fragment>
        ) }
      </div>
    );
  }
}

export default BatteryUI;
