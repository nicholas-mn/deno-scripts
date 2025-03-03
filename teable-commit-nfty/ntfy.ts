import xml2js from "npm:xml2js"

function getLatestCommit(data: string) {
  let output: string = ""

  xml2js.parseString(
    data,
    // deno-lint-ignore no-explicit-any
    (_err: any, result: { feed: { entry: { title: string[] }[] } }) => {
      output = result.feed.entry[0].title[0].trim()
    },
  )

  return output
}

export async function sendNotification(data: string) {
  const ntfyLink = JSON.parse(await Deno.readTextFile(".env.json")).ntfyLink

  const req = await fetch(ntfyLink, {
    method: "POST",
    body: getLatestCommit(data),
    headers: {
      "Title": "New Teable Commit",
      "Click": "https://github.com/teableio/teable/commits/develop/",
    },
  })

  return req
}
