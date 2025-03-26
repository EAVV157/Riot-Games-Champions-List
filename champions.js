var searchTag = "";
var searchChampName = "";

/* ----- Set search bar values  ----- */
function searchChampions() {
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
  const listChampions = await getChampions(currentVersion);
  const listHTML = createChampionList(listChampions);
  loadChampionList(listHTML);
}

async function filterChampionsByTags() {
  var role = document.getElementById("role").value;
  console.log(role);
  const currentVersion = await getVersion();
  const listChampions = await getChampions(currentVersion);
  console.log(listChampions);
  const filteredChampions = Object.create(null);
  if (role === "All") {
    Object.assign(filteredChampions, listChampions);
  } else {
    for (var key in listChampions) {
      if (listChampions[key].tags.includes(role)) filteredChampions[key] = listChampions[key];
    }
  }
  console.log(filteredChampions);
  const listHTML = createChampionList(filteredChampions);
  console.log(listHTML);
  loadChampionList(listHTML);
}

function searchChampionByName() {
  
}

/* ----- MAIN REGULAR FUNCTIONS ----- */
function createChampionList(list) {
  let championsHTML = ``;
  for (var key in list) {
    let tempName = list[key].name;
    let tempTitle = list[key].title;
    let tempTags = list[key].tags;

    championsHTML += `<div class="champions__list--wrapper">
  <a href="https://www.leagueoflegends.com/en-us/champions/${key.toLowerCase()}/" title="${
      tempTitle.charAt(0).toUpperCase() + tempTitle.slice(1)
    }">
    <img
      src="https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${key}_0.jpg"
      class="champions__list--img"
    />
    <div class="champions__list--description">
      <p class="champions__list--name">${tempName}</p>
      <div class="champions__list--tag-list">
        <img
          src="https://www.leagueoflegends.com/_next/static/node_modules/@riotgames/blades-ui/dist/skins/common/assets/role${
            tempTags[0]
          }.svg"
          class="champions__list--tag"
        />`;
    if (tempTags.length == 2) {
      championsHTML += `\n        <span class="tag-divider">/</span>
        <img
          src="https://www.leagueoflegends.com/_next/static/node_modules/@riotgames/blades-ui/dist/skins/common/assets/role${tempTags[1]}.svg"
          class="champions__list--tag"
        />`;
    }
    championsHTML += `\n      </div>
    </div>
  </a>
</div>\n`;
  }

  return championsHTML;
}

function loadChampionList(html) {
  const championsListDiv = document.querySelector(".champions__list");
  championsListDiv.innerHTML = "";
  championsListDiv.innerHTML = html;
}

/* ----- PAGE LOADING TIMERS ----- */
const fadeOutTime = 3000;
/* --- Preview Fadeout --- */
setTimeout(() => {
  const preview = document.querySelector(".champions__preview");
  preview.style.transition = "opacity 1s";
  preview.style.opacity = 0;

  setTimeout(() => {
    preview.style.display = "none";
  }, 750);
}, fadeOutTime);
/* --- Champion Loading */
setTimeout(() => {
  renderChampions();
}, Math.random() * 2000 + fadeOutTime + 500);
