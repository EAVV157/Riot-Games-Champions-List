var version = "15.5.1";

/* ----- Set search bar values from index/local storage ----- */
var role = document.getElementById("role").value;
var champName = document.getElementById("champ-name").value;

/* ----- Same function from Index ----- */
function storeSummonerInfo() {
  gameName = fullGameName.match(/\b(?<!#)[^#\s]+/g);
  tagLine = fullGameName.match(/(?<=#)\w+/gm);
}

class ChampionRoster {
  constructor(id, level, key, name, title) {
    this.id = id;
    this.level = level;
    this.key = key;
    this.name = name;
    this.title = title;
  }

  setChampId(id) {
    this.id = id;
  }
  setChampLevel(level) {
    this.level = level;
  }
  setChampKey(key) {
    this.key = key;
  }
  setChampName(name) {
    this.name = name;
  }
  setChampTitle(title) {
    this.title = title;
  }

  getChampId() {
    return this.id;
  }
  getChampLevel() {
    return this.level;
  }
  getChampKey() {
    return this.key;
  }
  getChampName() {
    return this.name;
  }
  getChampTitle() {
    return this.title;
  }
}

/* Change this later */ var filter = 3;

/* ----- API DATA AQUISITIONS ----- */
async function renderAPIs() {
  /* API to obtain the latest version of the game */
  const apiVersion = await fetch(
    `https://ddragon.leagueoflegends.com/api/versions.json`
  );
  const apiVersionData = await apiVersion.json();
  version = apiVersionData[0];
  console.log(version);

  /* API to obtain the names of the champions that exist in the game */
  const championListLive = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
  );
  const championListLiveData = await championListLive.json();
  const champInfo = championListLiveData.data;

  let championsLive = new Map();
  for (var key in champInfo) {
    let tempName = champInfo[key].name;
    let tempId = champInfo[key].key;
    let tempTitle = champInfo[key].title;
    /* console.log(tempName + ": " + tempId + "," + tempTitle); */

    dynamicChamps.set(tempId, tempName);

    for (var k in champInfo[key]) {
      console.log(`${k}: ${champInfo[key][k]}`)
    }
  }

  /* ----- Remove the Loading HTML from the webpage ----- */
  const summonerLoading = document.querySelector(".summoner");
  summonerLoading.classList.remove("summoner__loading");

  /* HTML TO CREATE THE SUMMONER PROFILE (Summoner.html has it) */
  /* `<div class="summoner__profile">
            <div class="summoner__profile--display">
              <div class="summoner__profile--wrapper">
                <img
                  src="https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${iconId}.png"
                  class="summoner__profile--img"
                />
              </div>
              <h1 class="summoner__profile--name">${gameName} <span class="silver">#${tagLine}</span></h1>
            </div>
            <div class="summoner__profile--filter">
              <h3 class="summoner__profile--filter-sub">Filter:</h3>
              <select id="filter" class="summoner__filter" onchange="filterChamps(event)">
                <option value="TOP_3" selected>Top 3 Champions</option>
                <option value="TOP_5">Top 5 Champions</option>
                <option value="TOP_10">Top 10 Champions</option>
                <option value="A_Z_10">Alphabetical Top 10</option>
              </select>
            </div>
          </div>` */
}



/* var championsLive = [];
function getChamps(champList) {
    return new Promise((resolve, reject) => {
        
    })
} */

setTimeout(() => {
  renderAPIs();
}, Math.random() * 1500 + 2500);

async function renderChampions1(status, filter) {
  var topChampsAmmount = filter;
  const summonerWrapper = document.querySelector(".summoner");
  console.log(summonerWrapper);
  const summoner = await getAccount();
  summonerWrapper.classList.remove(".summoner__loading");
  const summonerHTML = ``;

  if (status /* === '404' */) {
    summonerHTML = `<div class="summoner-champion__display">
            <div class="summoner-champion--wrapper">
              <img
              src="assets/null_champ-bg.jpg"
              class="summoner-champion--img"
              >
            </div>
            <div class="summoner-champion__info--container">
              <h3 class="summoner-champion__title">Summoner not found</h3>
              <p class="summoner-champion__description">
                Verify that the summoner name and/or the #TAG is correctly
                written.
              </p>
            </div>
          </div>`;
  } else {
    summonerHTML = summoner
      .map((champions) => {
        return ``;
      })
      .join("");
  }

  summonerWrapper.innerHTML = summonerHTML;
}
