$(function () {

	var context = {}
	var weatherApiUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20%3D%202448240&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
	$.ajax({
		url: weatherApiUrl,
		success: function(data){
			renderTemplates(data)
		},
		error: function(error){
			// add code to handle the error for now let's just show some text.
			showError()
		}
	})


	function renderTemplates(data){
		// load up a contect obj that will populate the templates
		context.current = data.query.results.channel.item.condition
		$.extend(context.current, {location: data.query.results.channel.location} )
		context.forecast = data.query.results.channel.item.forecast.slice(0,5) //we only want the first five

		//console.log("context: %o", context)

		// Grab the template script
		var currentTemplate = $("#weather-current").html();
	  var forecastTemplate = $("#weather-forecast-day").html();

	  // Compile the template
		var current = Handlebars.compile(currentTemplate);
	  var forecast = Handlebars.compile(forecastTemplate);

	  // Pass our data to the template
	  var currentCompiled = current(context.current);
	  var forecastCompiled = forecast(context);

	  // Add the compiled html to the page
	  $("#cv-weather-widget img").remove()
	  $('.current').html(currentCompiled);
	  $('.forecast').html(forecastCompiled);
	}

	function showError(){
		$("#cv-weather-widget").html("<h1>There was an error.<br />Please try again.</h1>")
	}

});