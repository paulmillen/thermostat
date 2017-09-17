'use strict';

describe("Thermostat", function() {

  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  describe(".temperature", function() {

    it("is 20 by default", function() {
      expect(thermostat.getTemperature()).toEqual(thermostat['DEFAULT_TEMP']);
    });

    it("has a maxium of 25 when PSM is off", function() {
      for (var i = 0; i < 6; i++) {
        thermostat.up();
      };
      expect(thermostat.getTemperature()).toEqual(thermostat['MAX_LIMIT_PSM_ON']);
    });

    it("has a maximum of 32 when PSM is off", function() {
      thermostat.powerSavingModeSwitch();
      for (var i = 0; i < 13; i++) {
        thermostat.up();
      }
      expect(thermostat.getTemperature()).toEqual(thermostat['MAX_LIMIT_PSM_OFF'])
    })
  });

  describe("Power Saving Mode", function() {

    it("is true by default", function() {
      expect(thermostat.isPowerSavingModeOn()).toEqual(true);
    });

    it("can be switched off", function() {
      thermostat.powerSavingModeSwitch();
      expect(thermostat.powerSavingMode).toEqual(false);
    });

    it("can be switched on", function() {
      thermostat.powerSavingModeSwitch();
      thermostat.powerSavingModeSwitch();
      expect(thermostat.powerSavingMode).toEqual(true);
    });
  });

  describe(".up", function() {

    it("increases the temperature", function() {
      thermostat.up(1);
      expect(thermostat.getTemperature()).toEqual(thermostat['DEFAULT_TEMP'] + 1);
    });
  });

  describe(".down", function() {

    it("decreases the temperature", function() {
      thermostat.down(1);
      expect(thermostat.getTemperature()).toEqual(thermostat['DEFAULT_TEMP'] - 1);
    });

    it("cannot set temperature lower than 10", function() {
      for (var i = 11; i > 0; i--) {
        thermostat.down();
      };
      expect(thermostat.getTemperature()).toEqual(10);
    });
  });

  describe(".reset temperature", function() {

    it("set the temperature to 20", function() {
      thermostat.tempertaure = 25;
      thermostat.reset();
      expect(thermostat.getTemperature()).toEqual(20);
    });
  });

  describe(".energyUsage", function() {

    it("returns 'low-usage' if .temperature < 18", function() {
      thermostat.temperature = 10
      expect(thermostat.energyUsage()).toEqual("low-usage");
    });

    it("returns 'medium-usage' if .temperature < 25", function() {
      thermostat.temperature = 24
      expect(thermostat.energyUsage()).toEqual("medium-usage");
    });

    it("returns 'high-usage' if .temperature > 24", function() {
      thermostat.temperature = 25
      expect(thermostat.energyUsage()).toEqual("high-usage");
    });
  });

});
