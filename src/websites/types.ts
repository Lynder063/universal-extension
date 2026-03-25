export interface MediaContext {
  title: string
  tmdb_id: number | null
  imdb_id?: string | null
  type: "tv" | "movie"
  season: number | null
  episode: number | null
  episode_id: number | null
  currentTime: number
  year?: string
}
