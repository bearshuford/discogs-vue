const BASE = "/.netlify/functions/";


const endpoints = {
  release: id => `${BASE}getRelease?releaseId=${id}`,
  collection: username => `${BASE}getCollection?username=${username}`
};

export default endpoints;
