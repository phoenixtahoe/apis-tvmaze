/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  let response = await axios.get("http://api.tvmaze.com/search/shows?q=:" + query);
  return(response.data)
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(show) {
  const $showsList = $("#shows-list");
  $showsList.empty();
  for (shows of show) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${shows.show.id}">
         <div class="card" id="show-id" data-show-id="${shows.show.id}">
           <div class="card-body">
             <h5 class="card-title">${shows.show.name}</h5>
             <p class="card-text">${shows.show.summary}</p>
             <img class="img-fluid card-img-top" src="${shows.show.image.original}">
           </div>
           <button href="#" id="episode-btn" class="btn btn-danger">Episodes</button>
         </div>
       </div>
      `);
    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});

$("body").on("click", "#episode-btn", async function handleEpisodeClick () {
  if ($("#episodes-area").is(':visible'))
  {
    $("#episodes-area").hide();
  }
  else
  {
    $('#episodes-area').show();
  }
  let episodes = await getEpisodes($("#show-id").attr("data-show-id"))
  populateEpisodes(episodes)
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  // TODO: return array-of-episode-info, as described in docstring above
  let response = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);

  let episodes = response.data.map(episode => ({id: episode.id, name: episode.name, season: episode.season, number: episode.number}));
  return(episodes)
}

function populateEpisodes(show) {
  const $episodesList = $("#episodes-list");
  $episodesList.empty();
  for (let episode of show) {
    let $item = $(
      `<li>
         ${episode.name}
         (season ${episode.season}, episode ${episode.number})
      </li>
      `);
    $episodesList.append($item);
  }
}