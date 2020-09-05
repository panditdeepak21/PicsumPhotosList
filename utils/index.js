export function getImageList() {
  return fetch(`https://picsum.photos/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

export function getImageURL (id) {
  console.log(`https://picsum.photos/200/300?image=${id}`)
  return fetch(`https://picsum.photos/200/300?image=${id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
  })
  .then(response => response.json())
}
