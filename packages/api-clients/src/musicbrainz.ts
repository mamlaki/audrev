import axios from 'axios'

const MB_BASE_URL = 'https://musicbrainz.org/ws/2'
const CAA_BASE_URL = 'https://coverartarchive.org/'


const mbClient = axios.create({
  baseURL: MB_BASE_URL,
  headers: {
    'User-Agent': 'audev/0.1 (melekredwan.dev@gmail.com)',
    'Accept': 'application/json',
  },
});

export async function searchArtists(query: string) {
  const response = await mbClient.get('/artist', {
    params: {
      query,
      limit: 10,
    },
  });
  return response.data.artists
}

export async function getArtist(mbId: string) {
  const response = await mbClient.get(`/artist/${mbId}`)
  return response.data
}

export async function searchReleaseGroups(query: string, artistMbId?: string) {
  let q = query
  if (artistMbId) {
    q += ` AND arid:${artistMbId}`
  }
  const response = await mbClient.get('/release-group', {
    params: {
      query: q,
      limit: 10,
    },
  })
  return response.data['release-grups']
}

export async function getReleaseGroup(mbId: string) {
  const response = await mbClient.get(`/release-group/${mbId}`, {
    params: {
      inc: 'releases+artist-credits',
    },
  })
  return response.data
}

export async function getReleasesForGroup(mbId: string) {
  const response = await mbClient.get(`/release`, {
    params: {
      release_group: mbId,
      limit: 10
    },
  });
  return response.data.releases
}

export async function getRelease(mbId: string) {
  const response = await mbClient.get(`/release/${mbId}`, {
    params: {
      inc: 'artist-credits+labels+recordings',
    },
  });
  return response.data
}

// CAA
export async function getCoverArt(mbReleaseId: string) {
  try {
    const response = await axios.get(`${CAA_BASE_URL}/release/${mbReleaseId}`, {
      headers: {
        'User-Agent': 'audev/0.1',
      },
    });
    return response.data.images
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null
    }
    throw error
  }
}