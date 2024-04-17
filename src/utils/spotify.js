const clientId = '9d7cb0c7e99445ba83f1bb7b64bda9f1'
const redirectUri = 'http://localhost:3000/'
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const scope = 'playlist-modify-public user-read-playback-state'
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
      window.location.href = accessUrl;
    }
  },

  async search(term) {
    const accessToken = this.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const jsonResponse = await response.json();
    if (!jsonResponse.tracks) {
      return [];
    }
    return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    }));
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = this.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    const userId = await this.getUserID(accessToken);
    const playlistId = await this.createPlaylist(userId, name, headers);
    await this.addTracksToPlaylist(playlistId, trackUris, headers);
  },

  async getUserID(accessToken) {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await fetch('https://api.spotify.com/v1/me', { headers: headers });
    const jsonResponse = await response.json();
    return jsonResponse.id;
  },

  async createPlaylist(userId, name, headers) {
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ name: name })
    });

    const jsonResponse = await response.json();
    return jsonResponse.id;
  },

  async addTracksToPlaylist(playlistId, trackUris, headers) {
    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ uris: trackUris })
    });
  },

  async getCurrentTrack() {
    const accessToken = this.getAccessToken();
    if (!accessToken) return;

    return fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(response => {
      if (response.status === 204 || response.status > 400) {
        return {}; // No track is playing, or an error occurred
      }
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.item) return {}; // No track data available

      return {
        id: jsonResponse.item.id,
        name: jsonResponse.item.name,
        artist: jsonResponse.item.artists.map(artist => artist.name).join(', '),
        album: jsonResponse.item.album.name,
        uri: jsonResponse.item.uri
      };
    });
  }
};

export default Spotify

