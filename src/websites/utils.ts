export function parseSeasonEpisodeFromBody(bodyText: string): {
  season: number | null
  episode: number | null
} {
  const patterns = [
    /S(\d+)\s*[E:]\s*E?(\d+)/i,
    /S(\d+)\s*,\s*E(\d+)/i,
    /(\d+)x(\d+)/i,
    /Season\s+(\d+)[,\s]+Episode\s+(\d+)/i
  ]

  for (const pattern of patterns) {
    const match = bodyText.match(pattern)
    if (match) {
      return { season: parseInt(match[1], 10), episode: parseInt(match[2], 10) }
    }
  }

  return { season: null, episode: null }
}

export function extractMetaTitle(): string {
  const og = document
    .querySelector('meta[property="og:title"]')
    ?.getAttribute("content")
  const tw = document
    .querySelector('meta[name="twitter:title"]')
    ?.getAttribute("content")
  return og || tw || ""
}

export function getFirstBodyLine(bodyText: string): string | null {
  const match = bodyText.match(/^(?:#\s*)?(.+?)(?:\s*\n|$)/)
  return match ? match[1].trim() : null
}
