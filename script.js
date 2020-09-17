$(document).ready(function () {
  console.log("The document is ready");

  var myName = "Jonathan";

  function callGiphy(searchTerm) {
    var giphyAPIKey = "FwN7nCdL4yA9BMFCc7q5OnTvBbt6jU0s";
    var giphyQueryUrl =
      "http://api.giphy.com/v1/gifs/search?api_key=" +
      giphyAPIKey +
      "&limit=10&q=" +
      searchTerm;
    $.ajax({
      url: giphyQueryUrl,
      method: "GET",
    }).then(function (giphySearchResponse) {
      console.log(giphySearchResponse);
      if (Array.isArray(giphySearchResponse.data)) {
        displayResultsToPage(giphySearchResponse.data);
      }
    });
  }

  function displayResultsToPage(array) {
    for (var i = 0; i < array.length; i++) {
      if (
        array[i] &&
        array[i].images &&
        array[i].images.original &&
        array[i].images.original.url
      ) {
        $("body").append("<img src='" + array[i].images.original.url + "'/>");
      }
    }
  }

  function getRandomWord() {
    $.ajax({
      url: "https://random-word-api.herokuapp.com/word?number=1",
      method: "GET",
    })
      .then(function (randomWordResponse) {
        console.log(randomWordResponse[0]);
        console.log(randomWordResponse[0].includes("r"));
        if (randomWordResponse[0].includes("r")) {
          callGiphy(randomWordResponse[0]);
        } else {
          getRandomWord();
        }
      })
      .fail(function (err) {
        console.log("Something went wrong calling the random word api.");
        console.log(err);
      });
  }

  getRandomWord();
});
