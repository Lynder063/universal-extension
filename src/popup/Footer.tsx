import { useEffect, useState } from "react"

import { api } from "./api"

export function Footer() {
  const version = api.runtime.getManifest().version ?? "0.0.0"
  const [isEnabled, setIsEnabled] = useState(true)
  const [hostname, setHostname] = useState("")

  useEffect(() => {
    api.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
      if (tab?.url) {
        const url = new URL(tab.url)
        const host = url.hostname.replace(/^www./, "")
        setHostname(host)
        api.storage.local.get(["disabled_sites"]).then(({ disabled_sites }) => {
          setIsEnabled(!(disabled_sites || []).includes(host))
        })
      }
    })
  }, [])

  const handleToggle = () => {
    api.storage.local.get(["disabled_sites"]).then(({ disabled_sites }) => {
      const sites = disabled_sites || []
      if (sites.includes(hostname)) {
        api.storage.local.set({
          disabled_sites: sites.filter((s) => s !== hostname)
        })
        setIsEnabled(true)
      } else {
        api.storage.local.set({ disabled_sites: [...sites, hostname] })
        setIsEnabled(false)
      }
    })
  }

  const linkStyle = {
    fontSize: 10,
    color: "#AAA",
    textDecoration: "none" as const,
    display: "inline-block" as const,
    transition: "color 0.2s"
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
        paddingTop: 8
      }}>
      <span style={linkStyle}>v{version}</span>
      <label
        style={{
          fontSize: 10,
          color: "#AAA",
          display: "flex",
          alignItems: "center"
        }}>
        Enable on {hostname}
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={handleToggle}
          style={{ marginLeft: 4, accentColor: "#00ff88" }}
        />
      </label>
      <a
        href="https://github.com/TheIntroDB/universal-extension"
        target="_blank"
        rel="noopener noreferrer"
        style={linkStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#DDD"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#AAA"
        }}>
        Github
      </a>
    </div>
  )
}
