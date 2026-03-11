export function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
}

export function parseTimeToSeconds(timeStr: string) {
  if (!timeStr || !timeStr.includes(":")) return parseFloat(timeStr) || 0
  return timeStr.split(":").reduce((a, v) => a * 60 + parseFloat(v), 0)
}

export function formatSeconds(seconds: number): string {
  if (!seconds) return "a few moments"
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `about ${hours} hour${hours > 1 ? "s" : ""}`
  } else if (minutes > 0) {
    return `about ${minutes} minute${minutes > 1 ? "s" : ""}`
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""}`
  }
}
