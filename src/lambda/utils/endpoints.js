const token = process.env.DISCOGS_TOKEN;

export default {
  collection: (username) =>
    `https://api.discogs.com/users/${username}/collection?token=${token}`,
  wantlist: (username) =>
    `https://api.discogs.com/users/${username}/wants?token=${token}`,
  release: (id) =>
    `https://api.discogs.com/releases/${id}?token=${token}&curr_abbr=USD`,
  master: (id) => `https://api.discogs.com/masters/${id}?token=${token}`,
  versions: (id) =>
    `https://api.discogs.com/masters/${id}/versions?token=${token}`,
  marketplace: (id, master) => {
    if (!master) return `https://discogs.com/sell/release/${id}`;
    return `https://discogs.com/sell/list?master_id=${id}`;
  },
  ytThumbnail: (id) => `https://i.ytimg.com/vi/${id}/default.jpg`
};
