export default async apiUrl => {
  const headers = {
    "Content-Type": "application/json"
  };

  let res = await fetch(apiUrl, { headers, mode: "cors" });
  return await res.json();
};
