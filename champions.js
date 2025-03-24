var searchTag = "";
var searchChampName = "";

/* ----- Set search bar values  ----- */
function searchChampions(){
  searchTag = document.getElementById("role").value;
  searchChampName = document.getElementById("champ-name").value;
  console.log(searchChampName + ", " + searchTag);
}

/* ----- API DATA AQUISITIONS ----- */
async function getVersion() {
  const apiVersion = await fetch(
    `https://ddragon.leagueoflegends.com/api/versions.json`
  );
  const apiVersionData = await apiVersion.json();
  version = apiVersionData[0];
  return version;
}

async function getChampions(version) {
  const championListLive = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
  );
  const championListLiveData = await championListLive.json();
  const champInfo = championListLiveData.data;
  return champInfo;
}

/* ----- MAIN ASYNC LOADING FUNCTION ----- */
async function renderChampions() {
  const currentVersion = await getVersion();
  console.log(currentVersion);
  const existingChampions = await getChampions(currentVersion);
  console.log(existingChampions);

  for (var key in existingChampions) {
    let tempName = existingChampions[key].name;
    let tempId = existingChampions[key].key;
    let tempTitle = existingChampions[key].title;
    let tempTags = existingChampions[key].tags;
    console.log("(" + key.toLowerCase() + ") "+ tempName + ": " + tempId + ", " + tempTitle + ", " + tempTags.join('/'));


  }

  

  /* if (role === "Assassin") {
    champs.sort(
      (a, b) =>
        
    );
  }
  else if(role === "All") {
    champs.sort(
      (a, b) => a.name
    );
  } */
}

/* ----- PAGE LOADING TIMERS ----- */
const fadeOutTime = 2500;
/* --- Preview Fadeout --- */
setTimeout(() => {
  const preview = document.querySelector(".champions__preview");
  preview.style.transition = 'opacity 1s';
  preview.style.opacity = 0;

  setTimeout(() => {
    preview.style.display = 'none';
  }, 750);

}, fadeOutTime);
/* --- Champions Fadein */
setTimeout(() => {
  renderChampions();
}, Math.random() * 2000 + fadeOutTime);











/* ----- Remove the Loading HTML from the webpage ----- */
/* const summonerLoading = document.querySelector(".summoner");
summonerLoading.classList.remove("summoner__loading"); */

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
