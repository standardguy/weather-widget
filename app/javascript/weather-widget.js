// use strict
var cv = cv || {};
cv.widget = {};

cv.widget = {
	getData: function(weatherApiUrl){
		//ie9  wants this if running from my filesystem
		$.support.cors = true;  

		var self = this;
		$.ajax({
			url: weatherApiUrl,
			success: function(data){
				self.renderTemplates(data.query.results.channel)
			},
			error: function(error){
				// add code to handle the error for now let's just show some text.
				self.showError()
			}
		})
	},

	renderTemplates: function(data){
		var context = {}
		// load up a context obj that will populate the templates
		context.current = data.item.condition
		context.location = data.location
		context.forecast = data.item.forecast.slice(0,5) //we only want the first five

		//console.log("context: %o", context)

		// generate the templates
	  var headerCompiled = this.generateTemplate($("#weather-header"), context.location)
		var currentCompiled = this.generateTemplate($("#weather-current"), context.current)
		var forecastCompiled = this.generateTemplate($("#weather-forecast-day"), context)

	  // Add the compiled html to the page
	  $("#cv-weather-widget img").remove()
	  $('.header').html(headerCompiled);
	  $('.current').html(currentCompiled);
	  $('.forecast').html(forecastCompiled);
	},

	showError: function(){
		$("#cv-weather-widget").html("<h1>There was an error.<br />Please try again.</h1>")
	},

	generateTemplate: function(template, data){
		// Grab the template script
		var currentTemplate = $(template).html();
	  // Compile the template
		var current = Handlebars.compile(currentTemplate);
	  // Pass our data to the template
	  return current(data);
	}
}

var weatherApiUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20%3D%202448240&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
cv.widget.getData(weatherApiUrl)
