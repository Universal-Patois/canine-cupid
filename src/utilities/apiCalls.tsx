export const fetchDogData = async () => {
  const response = await fetch("https://api.thedogapi.com/v1/breeds", {
    method: "GET",
    headers: new Headers({
      "x-api-key":
        "live_nyndlWo6xS4OlXnfyjh3wossGpTP0EL3m5D24PUwvXibPzqbWeQ8vWrFSPsG0UgV",
    }),
  });
  if (!response.ok) {
    throw Error(response.status + ":" + response.text);
  }
  return await response.json();
};

export const fetchErrorImage = async (codeNumber: number) => {
  const response = await fetch(`https://justcors.com/l_j7i8ay4pgok/https://http.dog/${codeNumber}.jpg`)
  if(!response.ok) {
    throw Error(response.status + ":" + response.text);
  }
  return response.url
};
