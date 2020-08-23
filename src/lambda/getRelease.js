import fetch from "node-fetch";

import { endpoints } from "./utils";

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

const parseVideo = ({ description, duration, title, uri }) => {
  const id = uri.split("watch?v=")[1];
  const thumb = endpoints.ytThumbnail(id);
  return {
    id,
    uri,
    thumb,
    title,
    description,
    duration,
  };
};

const getRelease = async (releaseId) => {
  try {
    let request = await fetch(endpoints.release(releaseId), options);
    let release = await request.json();

    const { have, want } = release.community || {};
    const info = {
      releaseId: release.id,
      title: release.title,
      artists: release.artists.map(parseArtist),
      formattedArtists: release.artists.map(({ name }) => name).join(", "),
      genres: release.genres,
      formats: release.formats && release.formats.map(parseFormat),
      images: release.images,
      videos: release.videos.map(parseVideo),
      cover: release.thumb,
      masterId: release.master_id,
      marketUrl: endpoints.marketplace(releaseId),
      numberAvailable: release.num_for_sale,
      lowestPrice: release.lowest_price,
      notes: release.notes,
      country: release.country,
      released: release.released,
      year: release.year,
      have,
      want,
    };
    return info;
  } catch (error) {
    throw error;
  }
};

exports.handler = async (event) => {
  if (event.httpMethod !== "GET")
    return { statusCode: 405, body: "Method Not Allowed" };

  const { releaseId } = event.queryStringParameters;

  try {
    let release = await getRelease(releaseId);
    return { statusCode: 200, body: JSON.stringify(release) };
  } catch (error) {
    return { statusCode: 404, body: "error getting release" };
  }
};
