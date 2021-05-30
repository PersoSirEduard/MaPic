
async function fetchPostData(url, data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: "no-cache",
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
      });
    return response.json();
}

async function fetchGetData(url) {
    const response = await fetch(url);
    return response.json();
}

export {fetchPostData, fetchGetData}