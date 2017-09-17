$(document).ready(function() {

  var thermostat = new Thermostat();

  getSettings();

  $('#select-city').submit(function(event) {
    event.preventDefault();
    var city = $('#current-city').val();
    $('#location').text(city);
    displayWeather(city);
    saveSettings();
  });

  $('#temperature-up').on('click', function() {
    thermostat.up();
    updateTemperature();
  });

  $('#temperature-down').click(function() {
    thermostat.down();
    updateTemperature();
  });

  $('#temperature-reset').click(function() {
    thermostat.reset();
    updateTemperature();
  });

  $('#powersaving-switch').click(function() {
    thermostat.powerSavingModeSwitch();
    updateTemperature();
  });

  function updateTemperature() {
    $('#temperature').text(thermostat.temperature);
    $('#temperature').attr('class', thermostat.energyUsage());
    $('#powersaving-switch').attr('class', thermostat.isPowerSavingModeOn());
    saveSettings();
  };

  function displayWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var token = '&appid=0eeeee95c9cc00d9de63d29a770a3ca7&units=metric';
    var units = '&units=metric';
    $.get(url + token + units, function(data) {
      $('#current-temperature').text(data.main.temp);
    });
  };

  function saveSettings() {
    var url = 'http://localhost:9292/thermostat';
    var api_key = 'apikey12345'
    var data = { temperature: thermostat.getTemperature(), psm: thermostat.isPowerSavingModeOn(), city: $('#location').text(), api_key: api_key };
    $.post(url, data);
  };

  function getSettings() {
    var url = 'http://localhost:9292/thermostat';
    var api_key = 'apikey12345'
    var data = { api_key: api_key };
    $.get(url, data).done(function(data) {
      settings = JSON.parse(data);
      thermostat.temperature = settings.temperature;
      console.log(thermostat.temperature);
      thermostat.poweSavingMode = settings.psm;
      displayWeather(settings.city);
      $('#location').text(settings.city);
    });
  };

});
