export async function updateTeableData(data: string, auth: string) {

  const rightNow = new Date().toISOString();

  const req = await fetch("https://db.nich.dk/api/table/tblmaZUnSDON0HRVqlA/record/recvEWdCJuANblWU7gC", {
    method: "PATCH",
    headers: {
      "Authorization": "Bearer " + auth,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      "record": {
        "fields": {
          "Content": data,
          "Last changed": rightNow,
          "Last checked": rightNow
        }
      }
    })
  });

  return req

}
