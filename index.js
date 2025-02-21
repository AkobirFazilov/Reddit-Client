const subredditValue = document.querySelector(".subredditValue");
const addSubredditValue = document.querySelector(".addSubredditValue");
const addSubreddit = document.querySelector(".addSubreddit");
const popup = document.querySelector(".popup");
const listContent = document.querySelector(".list-content");
const mainContent = document.querySelector(".main-content");
const mainContentText = document.querySelector(".main-content-text");
const subredditName = document.querySelector(".subredditName");
const dots = document.querySelector(".dots");
const dropDown = document.querySelector(".dropDown");
const deleteBtn = document.querySelector(".delete");
const refresh = document.querySelector(".refresh");

const handleState = (state) => {
  switch (state) {
    case "success":
      mainContentText.style.display = "flex";
      mainContentText.textContent = "Success. Choose reddit topic.";
      console.log("Success");
      break;
    case "loading":
      mainContentText.style.display = "flex";
      mainContentText.textContent = "Loading...";
      console.log("Loading...");
      break;
    case "error":
      mainContentText.style.display = "flex";
      mainContentText.textContent = "Error. Try again click plus icon.";
      console.log("Error");
      break;

    default:
      break;
  }
};


    refresh.addEventListener("click", () => {
      listContent.innerHTML = ""
      subredditClient()
      dropDown.style.display = "none"
      dropDown.style.color = "red"
    })
    deleteBtn.addEventListener("click", () => {
      listContent.innerHTML = ""
      dropDown.style.display = "none"
    })



addSubreddit.addEventListener("click", () => {
  if (addSubreddit.innerHTML === "+") {
    popup.style.display = "flex";
    listContent.innerHTML = "";
    mainContentText.style.display = "none";
    subredditName.textContent = "";
  } else {
    mainContentText.textContent = "";
    addSubreddit.innerHTML = "+";
  }
});

dots.addEventListener("click", () => {
  if (dropDown.style.display === "block") {
    dropDown.style.display = "none";
  } else {
    dropDown.style.display = "block";
  }
});

async function subredditClient() {
  popup.style.display = "none";
  handleState("loading");

  const url = `https://www.reddit.com/r/${subredditValue.value}.json`;
  try {
    handleState("success");
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    subredditName.textContent = "/r/" + subredditValue.value;

    const json = await response.json();
    console.log(json.data.children[1].data.score);
    
    json.data.children.map((el) => {
      let listContentItem = document.createElement("div");
      listContentItem.className = "list-content-item";
      listContentItem.style.borderBottom = "2px solid grey";
      listContentItem.textContent = el.data.title;
      listContent.appendChild(listContentItem);

      listContentItem.addEventListener("click", (e) => {
        if (e.target.textContent === el.data.title) {
          mainContentText.style.display = "block";
          mainContentText.textContent = el.data.selftext;
          addSubreddit.innerHTML = "-";
        }
      });
    });
  } catch (error) {
    console.error(error.message);
    handleState("error");
  }
}

addSubredditValue.addEventListener("click", () => subredditClient());
