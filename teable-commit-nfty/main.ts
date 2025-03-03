import {
  updateRuns,
  updateTeableData,
  updateTeableLastChecked,
} from "./teable.ts";
import { sendNotification } from "./ntfy.ts";

const reqGithubData = await fetch(
  "https://github.com/teableio/teable/commits/develop.atom",
  {
    method: "GET",
  },
);

const teableAuth = JSON.parse(await Deno.readTextFile(".env.json")).teableAuth;
const reqTeableData = await fetch(
  "https://db.nich.dk/api/table/tblmaZUnSDON0HRVqlA/record/recvEWdCJuANblWU7gC",
  {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + teableAuth,
    },
  },
);

const teableDataComplete = JSON.parse(await reqTeableData.text());
const teableData: string = teableDataComplete.fields.Content;
const githubData: string = await reqGithubData.text();

// Update Runs each time
const previousRun = teableDataComplete.fields.Runs;
updateRuns(previousRun, teableAuth);

if (teableData.trim() !== githubData.trim()) {
  console.log(
    "New commits detected. Sending notification and updating Teable data.",
  );

  updateTeableData(githubData, teableAuth);

  sendNotification(githubData);
} else {
  console.log("No new commits detected.");
  updateTeableLastChecked(teableAuth);
}
