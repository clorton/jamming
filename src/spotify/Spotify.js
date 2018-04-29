const clientId = '65e06a70acc44809ac58635c2e9eb624';
const redirectUri = 'http://localhost:3000/';
const scopes = 'user-read-private user-read-birthdate user-read-email playlist-modify-public playlist-modify-private';
let accessToken = null;
let headers = null;
const searchUrl = 'https://api.spotify.com/v1/search?q=';

export const Spotify = {

    getToken() { return accessToken },

    authorize() {
        const prefix = 'https://accounts.spotify.com/authorize?';
        const url = prefix
            + 'client_id=' + clientId
            + '&response_type=token'
            + '&scope=' + (scopes ? encodeURIComponent(scopes) : '')
            + '&redirect_uri=' + encodeURIComponent(redirectUri);
        console.log('Redirecting user to Spotify: ' + url);
        window.location.replace(url);
    },

    setToken(token) {
        accessToken = token;
        headers = new Headers({
            'Accept':        'application/json',
            'Content-Type':  'application/json',
            'Authorization': 'Bearer ' + token
        });
    },

    search(term) {
        let results = null;
        if (term) {
            console.log("Searching for '" + term + "'.");
            let url = searchUrl + encodeURIComponent(term) + '&type=track&market=US';
            console.log('URL: "' + url + '"');

            results = fetch(url, { headers: headers })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response);
                    throw new Error('response not ok');
                }
            })
            .then(jsonResponse => {
                console.log(jsonResponse);
                return jsonResponse.tracks.items.map(item => {
                    return {
                        title: item.name,
                        artist: item.artists[0].name,
                        album: item.album.name,
                        uri: item.uri
                    };
                })
            });
        }

        return results;
    },

    save(title, tracks) {
        let userId;
        if (title) {
            if (tracks && tracks.length) {
                console.log("Saving tracks to playlist '" + title + "'.");
                // GET current user id
                // POST new playlist name
                // POST playlist track uris
                const userIdUrl = 'https://api.spotify.com/v1/me';
                console.log('Getting current user ID...: ' + userIdUrl);
                fetch(userIdUrl, { headers: headers })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.log(response);
                        throw new Error('response not ok');
                    }
                })
                .then(jsonResponse => {
                    console.log(jsonResponse);
                    userId = jsonResponse.id;
                    const playlistUrl = 'https://api.spotify.com/v1/users/' + userId + '/playlists';
                    console.log('POST: "' + playlistUrl + '"');
                    return fetch(playlistUrl, { method: 'POST', headers: headers, body: JSON.stringify({ name: title }) });
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.log(response);
                        throw new Error('response not ok');
                    }
                })
                .then(jsonResponse => {
                    console.log(jsonResponse);
                    const playlistId = jsonResponse.id;
                    const trackUris = encodeURIComponent(tracks.map(track => track.uri).join(','));
                    const tracksUrl = 'https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistId + '/tracks?uris=' + trackUris;
                    console.log('POST: "' + tracksUrl + '"');
                    return fetch(tracksUrl, {
                        method: 'POST',
                        headers: headers
                    });
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.log(response);
                        throw new Error('response not ok');
                    }
                })
                .then(jsonResponse => {
                    console.log(jsonResponse);
                });
            }
            else {
                alert('Track list is empty.');
            }
        }
        else {
            alert('Title is empty.');
        }
    }
};
