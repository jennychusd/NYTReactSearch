var axios = require("axios");

// Geocoder API
var nytAPI = "c1114eaac44f47febb27db221eb577d3";

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(topic){
		var startYear = "19000101";
		var endYear = "20171231";
		//Figure out the geolocation
    
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q=" + topic + "&begin_date=" + startYear + "&end_date=" + endYear;  
		return axios.get(queryURL)
			.then(function(response){
				var response = response.data.response.docs;
				return response;
		})

	},

  // This function hits our own server to retrieve the record of query results
  getSaved: function () {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postSaved: function (article) {
    return axios.post("/api", {title: article.title, date: article.date, url: article.url});
  }
};

// We export the API helper
module.exports = helper;