const clientId = '65e06a70acc44809ac58635c2e9eb624';
const redirectUri = 'http://localhost:3000/';
const scopes = 'user-read-private user-read-birthdate user-read-email playlist-modify-public playlist-modify-private';
let accessToken;
let headers;
const searchUrl = 'https://api.spotify.com/v1/search?q=';

function getToken() {
    if (!accessToken) {
        const currentUrl = window.location.href;
        const pattern = '#access_token=';
        const match = currentUrl.match(pattern);
        if (match) {
            accessToken = currentUrl.match(/access_token=([^&]*)/)[1];
            console.log('Access token in URL was "' + accessToken + '".');
            headers = new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            });
            console.log('Headers are ');
            for (var pair of headers.entries()) {
                console.log(pair[0]+ ': '+ pair[1]);
             }
            // window.location.replace(redirectUri);
        }
        else {
            // Send user to Spotify
            const prefix = 'https://accounts.spotify.com/authorize?';
            const url = prefix
                + 'client_id=' + clientId
                + '&response_type=token'
                + '&scope=' + (scopes ? encodeURIComponent(scopes) : '')
                + '&redirect_uri=' + encodeURIComponent(redirectUri);
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
        let url = searchUrl + encodeURIComponent(term) + '&type=track&market=US';
        console.log('URL: "' + url + '"');

        let results = await fetch(url, { headers: headers })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                console.log(response);
                throw new Error('response not ok');
            }
        }).then(jsonResponse => jsonResponse.tracks.items.map(item => {
            return {
                title: item.name,
                artist: item.artists[0].name,
                album: item.album.name,
                uri: item.uri
            };
        }));
        return results;
    },
    save(title, tracks) {
        if (title) {
            if (tracks && tracks.length) {
                console.log("Saving tracks to playlist '" + title + "'.");
                // GET current user id
                // POST new playlist
                // POST playlist tracks
                const userIdUrl = 'https://api.spotify.com/v1/me';
                console.log('Getting current user ID...');
                fetch(userIdUrl, { headers: headers })
                .then(response => {
                    return response.json();
                })
                .then(jsonResponse => {
                    const userId = jsonResponse.id;
                    const playlistUrl = 'https://api.spotify.com/v1/users/' + userId + '/playlists';
                    console.log('GET: "' + playlistUrl + '"');
                    fetch(playlistUrl, { headers: headers })
                    .then(response => {
                        return response.json();
                    })
                    .then(jsonResponse => {
                        const playlistId = jsonResponse.id;
                        const trackUris = encodeURIComponent(tracks.map(track => track.uri).join(','));
                        const tracksUrl = 'https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistId + '/tracks?uris=' + trackUris;
                        console.log('POST: "' + tracksUrl + '"');
                        fetch(tracksUrl, {
                            method: 'POST',
                            headers: headers
                        })
                        .then(response => {
                            return response.json();
                        })
                        .then(jsonResponse => {
                            console.log(jsonResponse);
                        })
                    });
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

/*

curl -X "POST" "https://api.spotify.com/v1/users/clorton/playlists"
--data "{\"name\":\"New Playlist\",\"description\":\"New playlist description\",\"public\":false}"
-H "Accept: application/json"
-H "Content-Type: application/json"
-H "Authorization: Bearer BQClmppgbiF-D_j4J5pnAYxx-I_wSWkzEwVfzyQfBw4806-5QOjkzPN0K_jv1rZ-jBevjHH73cZD_0_UoTU0zP3CsRLJX_nuUWAl69TKHrSRQjdS3dcTYkJss9RBzyphMbBH97p6YXjDV9B7puU0PJaJNcgw7rfb0bqFKbNLyvTPPuQUYqSIOoV9fJ-WUnv71FapTH7c5qeTKv0ipVUofl9oEogY"

curl -X "POST" "https://api.spotify.com/v1/users/user_id/playlists/playlist_id/tracks?uris=track1_uri%2Ctrack2_uri%2Ctrack3_uri%2C...%2Ctrackn_uri"
-H "Accept: application/json"
-H "Content-Type: application/json"
-H "Authorization: Bearer BQClmppgbiF-D_j4J5pnAYxx-I_wSWkzEwVfzyQfBw4806-5QOjkzPN0K_jv1rZ-jBevjHH73cZD_0_UoTU0zP3CsRLJX_nuUWAl69TKHrSRQjdS3dcTYkJss9RBzyphMbBH97p6YXjDV9B7puU0PJaJNcgw7rfb0bqFKbNLyvTPPuQUYqSIOoV9fJ-WUnv71FapTH7c5qeTKv0ipVUofl9oEogY"
*/