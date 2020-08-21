import fetch from "node-fetch";
import { endpoints } from "./utils";

const token = process.env.DISCOGS_TOKEN;

const options = {
  headers: { "user-agent": "wantlist" },
};

const parseArtist = ({ id, name }) => ({ id, name });

const parseFormat = ({ descriptions, name, text, qty }) => ({
  media: name,
  special: text,
  descriptions,
  qty,
});

const parseRelease = ({ basic_information: info, date_added: dateAdded }) => ({
  id: info.id,
  title: info.title,
  dateAdded,
  genres: info.genres,
  styles: info.styles,
  year: info.year,
  thumb: info.thumb,
  marketUrl: endpoints.marketplace(info.id),
  formats: info.formats.map(parseFormat),
  artists: info.artists.map(parseArtist),
});

exports.handler = async (event) => {
  if (event.httpMethod !== "GET")
    return { statusCode: 405, body: "Method Not Allowed" };

  const { username } = event.queryStringParameters;

  try {
    let response = await fetch(endpoints.collection(username), options);
    let collection = await response.json();
    collection = collection?.releases.map(parseRelease);
    return { statusCode: 200, body: JSON.stringify(collection) };
  } catch (error) {
    console.log("getCollection error", error);
    return { statusCode: 404, body: "error getting collection" };
  }
};
