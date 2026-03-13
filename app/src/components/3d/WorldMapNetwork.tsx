import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

// ── Shared projection — imported by CyberAttackEngine ──────────────────────
export const mapProjection = d3
  .geoNaturalEarth1()
  .scale(220)
  .translate([480, 325])
  .center([0, 0])

interface HoveredCountry {
  name: string
  x: number
  y: number
}

const threatMap: Record<string, { level: string; attacks: number; color: string }> = {
  "Russia":           { level: "CRITICAL", attacks: 8923,  color: "#ff2222" },
  "China":            { level: "CRITICAL", attacks: 12450, color: "#ff2222" },
  "United States":    { level: "HIGH",     attacks: 2847,  color: "#ff8800" },
  "India":            { level: "HIGH",     attacks: 1923,  color: "#ff8800" },
  "Brazil":           { level: "MEDIUM",   attacks: 1203,  color: "#ffdd00" },
  "Iran":             { level: "HIGH",     attacks: 2100,  color: "#ff8800" },
  "North Korea":      { level: "CRITICAL", attacks: 4200,  color: "#ff2222" },
  "Germany":          { level: "LOW",      attacks: 523,   color: "#00ffaa" },
  "United Kingdom":   { level: "MEDIUM",   attacks: 876,   color: "#ffdd00" },
  "France":           { level: "LOW",      attacks: 654,   color: "#00ffaa" },
  "Japan":            { level: "MEDIUM",   attacks: 990,   color: "#ffdd00" },
  "Australia":        { level: "LOW",      attacks: 312,   color: "#00ffaa" },
  "Pakistan":         { level: "HIGH",     attacks: 1456,  color: "#ff8800" },
  "Nigeria":          { level: "MEDIUM",   attacks: 876,   color: "#ffdd00" },
  "South Korea":      { level: "MEDIUM",   attacks: 743,   color: "#ffdd00" },
  "Canada":           { level: "LOW",      attacks: 412,   color: "#00ffaa" },
  "Turkey":           { level: "MEDIUM",   attacks: 654,   color: "#ffdd00" },
  "Indonesia":        { level: "MEDIUM",   attacks: 534,   color: "#ffdd00" },
  "Ukraine":          { level: "CRITICAL", attacks: 5670,  color: "#ff2222" },
  "Israel":           { level: "HIGH",     attacks: 2340,  color: "#ff8800" },
  "Saudi Arabia":     { level: "HIGH",     attacks: 1890,  color: "#ff8800" },
  "Mexico":           { level: "MEDIUM",   attacks: 987,   color: "#ffdd00" },
  "South Africa":     { level: "LOW",      attacks: 345,   color: "#00ffaa" },
  "Argentina":        { level: "LOW",      attacks: 234,   color: "#00ffaa" },
  "Egypt":            { level: "MEDIUM",   attacks: 678,   color: "#ffdd00" },
}

export default function WorldMapNetwork() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [hovered, setHovered] = useState<HoveredCountry | null>(null)

  useEffect(() => {
    

  const svg = d3
  .select(svgRef.current)
  .attr("width", 1100)
  .attr("height", 700)
  .style("width", "1100px")
  .style("height", "700px")

    svg.selectAll("*").remove()
svg.style("transform", "none")
    const path = d3.geoPath().projection(mapProjection)

    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
      .then((data: any) => {

        svg
          .selectAll("path")
          .data(data.features.filter((d: any) => d.properties.name !== "Antarctica"))
          .enter()
          .append("path")
          .attr("d", path as any)
          .attr("fill", "#0a2a35")
          .attr("stroke", "#00f0ff")
          .attr("stroke-width", 0.8)
          .attr("opacity", 0.85)
          .style("cursor", "pointer")
          .style("transition", "fill 0.2s, opacity 0.2s")

          .on("mouseover", function (event: MouseEvent, d: any) {
            const countryName: string = d.properties.name
            const threat = threatMap[countryName]
            const fillColor = threat ? threat.color : "#00ffff"

            d3.select(this)
              .attr("fill", fillColor)
              .attr("opacity", 1)
              .style("filter", `drop-shadow(0 0 12px ${fillColor})`)

            const rect = containerRef.current?.getBoundingClientRect()
            setHovered({
              name: countryName,
              x: event.clientX - (rect?.left ?? 0),
              y: event.clientY - (rect?.top  ?? 0),
            })
          })

          .on("mousemove", function (event: MouseEvent) {
            const rect = containerRef.current?.getBoundingClientRect()
            setHovered(prev => prev ? {
              ...prev,
              x: event.clientX - (rect?.left ?? 0),
              y: event.clientY - (rect?.top  ?? 0),
            } : null)
          })

          .on("mouseout", function () {
            d3.select(this as any)
              .attr("fill", "#0a2a35")
              .attr("opacity", 0.85)
              .style("filter", "none")
            setHovered(null)
          })

        svg.style("filter", "drop-shadow(0 0 10px #00eaff)")
      })

  }, [])

  const threat = hovered
    ? (threatMap[hovered.name] ?? { level: "UNKNOWN", attacks: 0, color: "#00ffff" })
    : null

  return (
    <div ref={containerRef} className="relative w-full h-full">

      <svg ref={svgRef} style={{ width: "100%", height: "100%" }} />

      {hovered && threat && (
        <div
          className="absolute pointer-events-none z-30 font-mono text-xs"
          style={{
            left: hovered.x + 14,
            top:  hovered.y - 10,
            transform: hovered.x > 600 ? "translateX(-110%)" : "none",
          }}
        >
          <div
            className="rounded px-4 py-3 min-w-[190px]"
            style={{
              background: "rgba(0,0,0,0.92)",
              border: `1px solid ${threat.color}`,
              boxShadow: `0 0 24px ${threat.color}44`,
            }}
          >
            <div className="text-white font-bold text-sm mb-2 tracking-wider">
              🌐 {hovered.name.toUpperCase()}
            </div>

            <div className="flex justify-between mb-1">
              <span className="text-gray-400">THREAT LEVEL</span>
              <span className="font-bold" style={{ color: threat.color }}>
                {threat.level}
              </span>
            </div>

            <div className="flex justify-between mb-2">
              <span className="text-gray-400">ATTACKS</span>
              <span className="text-red-400 font-bold">
                {threat.attacks.toLocaleString()}
              </span>
            </div>

            <div className="w-full h-1 bg-gray-800 rounded overflow-hidden">
              <div
                className="h-full rounded"
                style={{
                  width: threat.level === "CRITICAL" ? "95%"
                       : threat.level === "HIGH"     ? "70%"
                       : threat.level === "MEDIUM"   ? "45%"
                       : "20%",
                  background: threat.color,
                  boxShadow: `0 0 8px ${threat.color}`,
                  transition: "width 0.3s",
                }}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}