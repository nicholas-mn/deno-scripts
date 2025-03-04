export async function updateTeableData(
  data: string,
  auth: string,
  IsoDate: string,
) {
  const req = await fetch(
    "https://db.nich.dk/api/table/tblmaZUnSDON0HRVqlA/record/recvEWdCJuANblWU7gC",
    {
      method: "PATCH",
      headers: {
        "Authorization": "Bearer " + auth,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "record": {
          "fields": {
            "Content": data,
            "Last changed": IsoDate,
            "Last checked": IsoDate,
          },
        },
      }),
    },
  )

  return req
}

export async function updateTeableLastChecked(auth: string, IsoDate: string) {
  const req = await fetch(
    "https://db.nich.dk/api/table/tblmaZUnSDON0HRVqlA/record/recvEWdCJuANblWU7gC",
    {
      method: "PATCH",
      headers: {
        "Authorization": "Bearer " + auth,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "record": {
          "fields": {
            "Last checked": IsoDate,
          },
        },
      }),
    },
  )

  return req
}

export async function updateRuns(currentRuns: number, auth: string) {
  const updatedRuns = currentRuns + 1

  const req = await fetch(
    "https://db.nich.dk/api/table/tblmaZUnSDON0HRVqlA/record/recvEWdCJuANblWU7gC",
    {
      method: "PATCH",
      headers: {
        "Authorization": "Bearer " + auth,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "record": {
          "fields": {
            "Runs": updatedRuns,
          },
        },
      }),
    },
  )

  return req
}
