const clientId = '9d7cb0c7e99445ba83f1bb7b64bda9f1'
const redirectUri = 'https://localhost:3000/'
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
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=playlist-modify-public`;
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
  }
};

export default Spotify

