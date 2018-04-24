const clientId = '65e06a70acc44809ac58635c2e9eb624';
let accessToken;
const searchUrl = 'https://api.spotify.com/v1/search?q=';

function getToken() {
    if (!accessToken) {
        const currentUrl = window.location.href;
        const pattern = '#access_token=';
        const match = currentUrl.match(pattern);
        if (match) {
            accessToken = currentUrl.match(/access_token=([^&]*)/)[1];
            console.log('Access token in URL was "' + accessToken + '".');
        }
        else {
            // Send user to Spotify
            const prefix = 'https://accounts.spotify.com/authorize';
            const url = prefix + '?client_id=' + clientId + '&response_type=token&redirect_uri=http://localhost:3000/';
            console.log('Redirecting user to Spotify: ' + url);
            window.location.replace(url);
        }
    }
    else {
        console.log('Access token is "' + accessToken + '".');
    }
};

export const Spotify = {
    async search(term) {
        getToken();
        console.log("Searching for '" + term + "'.");
        let url = searchUrl + term + '&type=track&market=US';
        console.log('URL: "' + url + '"');

        let results = await fetch(url, { Headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        } })
        .then(response => response.json())
        .then(jsonResponse => jsonResponse.tracks.items.map(item => {
            return {
                title: item.name,
                artist: item.artists[0].name,
                album: item.album.name
            };
        }));
        return results;
/*
        let response = await fetch(url, { Headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        } });
        if (response.ok) {
            let jsonResponse = await response.json();
            console.log(jsonResponse);
            let tracks = jsonResponse.tracks.items.map(item => {
                return {
                    title: item.name,
                    artist: item.artists[0].name,
                    album: item.album.name
                };
            });
            console.log(tracks);
            return tracks;
        }
        else {
            console.log('search(): response not ok');
            console.log(response);
        }
*/
    },
    async save(title, tracks) {
        console.log("Saving tracks to playlist '" + title + "'.");
    }
};
