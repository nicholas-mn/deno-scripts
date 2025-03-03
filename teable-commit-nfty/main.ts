import { updateTeableData } from "./functions.ts";


const reqGithubData = await fetch("https://github.com/teableio/teable/commits/develop.atom", {
  method: "GET"
})

const teableAuth = JSON.parse(await Deno.readTextFile(".env.json")).teableAuth
const reqTeableData = await fetch("https://db.nich.dk/api/table/tblmaZUnSDON0HRVqlA/record/recvEWdCJuANblWU7gC", {
  method: "GET",
  headers: {
    "Authorization": "Bearer " + teableAuth
  }
})

const githubData: string = await reqGithubData.text();
const teableData: string = JSON.parse(await reqTeableData.text()).fields.Content;

if (teableData.trim() !== githubData.trim()) {
  
  console.log("New commits detected. Sending notification and updating Teable data.")
  // TODO
  updateTeableData(githubData, teableAuth)

  // sendNotification(parseNewestcommit())

} else {
  console.log("No new commits detected.")
}
