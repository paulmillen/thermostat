'use strict';

function Thermostat() {
  this.DEFAULT_TEMP = 20;
  this.MINIMUM_TEMP = 10;
  this.MEDIUM_ENERGY_USAGE_LIMIT = 18;
  this.MAX_LIMIT_PSM_ON = 25;
  this.MAX_LIMIT_PSM_OFF = 32;
  this.powerSavingMode = true;
  this.temperature = this.DEFAULT_TEMP;
};

Thermostat.prototype.getTemperature = function() {
  return this.temperature;
};

Thermostat.prototype.isMinimumTemp = function() {
  return this.temperature === this.MINIMUM_TEMP;
};

Thermostat.prototype.isMaximumTemp = function() {
  if (this.isPowerSavingModeOn() === false) {
    return this.temperature === this.MAX_LIMIT_PSM_OFF;
  };
  return this.temperature === this.MAX_LIMIT_PSM_ON;
};

Thermostat.prototype.up = function() {
  if (this.isMaximumTemp()) { return };
  this.temperature += 1;
};

Thermostat.prototype.down = function() {
  if (this.isMinimumTemp()) { return };
  this.temperature -= 1;
};

Thermostat.prototype.isPowerSavingModeOn = function() {
  return this.powerSavingMode;
};

Thermostat.prototype.powerSavingModeSwitch = function() {
  this.powerSavingMode = !this.powerSavingMode;
};

Thermostat.prototype.reset = function() {
  this.temperature = this.DEFAULT_TEMP;
};

Thermostat.prototype.energyUsage = function() {
  if (this.temperature < this.MEDIUM_ENERGY_USAGE_LIMIT) { return "low-usage" };
  if (this.temperature < this.MAX_LIMIT_PSM_ON) { return "medium-usage" };
  return "high-usage";
};
