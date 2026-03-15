// components/CyberAttackEngine.ts

import { mapProjection } from "./3d/WorldMapNetwork"

interface City {
  name: string
  lat: number
  lon: number
}

function project(lat: number, lon: number) {
  const coords = mapProjection([lon, lat])
  if (!coords) return { x: 0, y: 0 }
  // Map renders 800x650, SVG viewBox is 1000x500
  return {
    x: coords[0],
    y: coords[1],
  }
}

const cities: City[] = [
  { name: "New York",      lat: 40.71,  lon: -74.01 },
  { name: "London",        lat: 51.51,  lon: -0.13  },
  { name: "Mumbai",        lat: 19.08,  lon: 72.88  },
  { name: "Singapore",     lat: 1.35,   lon: 103.82 },
  { name: "Tokyo",         lat: 35.68,  lon: 139.65 },
  { name: "Sao Paulo",     lat: -23.55, lon: -46.63 },
  { name: "Moscow",        lat: 55.75,  lon: 37.62  },
  { name: "Beijing",       lat: 39.91,  lon: 116.39 },
  { name: "Sydney",        lat: -33.87, lon: 151.21 },
  { name: "Dubai",         lat: 25.20,  lon: 55.27  },
  { name: "Johannesburg",  lat: -26.20, lon: 28.04  },
  { name: "Toronto",       lat: 43.65,  lon: -79.38 },
{ name: "Berlin",        lat: 52.52,  lon: 13.40  },
  { name: "Paris",         lat: 48.85,  lon: 2.35   },
  { name: "Seoul",         lat: 37.57,  lon: 126.98 },
  { name: "Jakarta",       lat: -6.21,  lon: 106.85 },
  { name: "Cairo",         lat: 30.04,  lon: 31.24  },
  { name: "Lagos",         lat: 6.52,   lon: 3.38   },
  { name: "Mexico City",   lat: 19.43,  lon: -99.13 },
  { name: "Buenos Aires",  lat: -34.61, lon: -58.38 },
  { name: "Istanbul",      lat: 41.01,  lon: 28.95  },
  { name: "Bangkok",       lat: 13.75,  lon: 100.52 },
  { name: "Nairobi",       lat: -1.29,  lon: 36.82  },
  { name: "Los Angeles",   lat: 34.05,  lon: -118.24},
  { name: "Delhi",         lat: 28.61,  lon: 77.21  },
  { name: "Riyadh",        lat: 24.69,  lon: 46.72  },
  { name: "Amsterdam",     lat: 52.37,  lon: 4.90   },
]

export function startCyberAttacks(svg: SVGSVGElement | null) {
  if (!svg) return

  svg.innerHTML = ""
  const MAX_ELEMENTS = 40

  // Draw static city nodes
  cities.forEach((city) => {
    const { x, y } = project(city.lat, city.lon)

    const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    ring.setAttribute("cx", x.toString())
    ring.setAttribute("cy", y.toString())
    ring.setAttribute("r", "4")
    ring.setAttribute("fill", "none")
    ring.setAttribute("stroke", "#00ffff")
    ring.setAttribute("stroke-width", "1")
    ring.style.opacity = "0.6"
    ring.style.filter = "drop-shadow(0 0 4px #00ffff)"
    ring.innerHTML = `
      <animate attributeName="r" values="3;8;3" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite"/>
    `
    svg.appendChild(ring)

    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    dot.setAttribute("cx", x.toString())
    dot.setAttribute("cy", y.toString())
    dot.setAttribute("r", "2.5")
    dot.setAttribute("fill", "#00ffff")
    dot.style.filter = "drop-shadow(0 0 6px #00ffff)"
    svg.appendChild(dot)
  })

  function createAttack() {
    const allPaths = svg!.querySelectorAll("path")
    if (allPaths.length > MAX_ELEMENTS) allPaths[0].remove()

    const from = cities[Math.floor(Math.random() * cities.length)]
    let to = cities[Math.floor(Math.random() * cities.length)]
    while (to === from) to = cities[Math.floor(Math.random() * cities.length)]

    const start = project(from.lat, from.lon)
    const end   = project(to.lat,   to.lon)

    const midX = (start.x + end.x) / 2
    const midY = (start.y + end.y) / 2 - Math.abs(end.x - start.x) * 0.35

    const roll  = Math.random()
    const type  = roll < 0.5 ? "attack" : roll < 0.75 ? "defend" : "critical"

    const color = type === "attack"   ? "#ff3b3b"
                : type === "defend"   ? "#00ff88"
                : "#ffcc00"

 const glow  = type === "attack"   ? "drop-shadow(0 0 6px #ff3b3b)"
            : type === "defend"   ? "drop-shadow(0 0 6px #00ff88)"
            : "drop-shadow(0 0 10px #ffcc00)"

    const strokeW = type === "critical" ? "1.4" : "0.8"
    const speed   = type === "critical" ? 0.014 : 0.008

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    const d = `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`
    path.setAttribute("d", d)
    path.setAttribute("stroke", color)
    path.setAttribute("stroke-width", strokeW)
    path.setAttribute("fill", "none")
    path.style.filter = glow

    const dx = end.x - start.x
    const dy = end.y - start.y
    const length = Math.sqrt(dx * dx + dy * dy) * 1.2

    path.setAttribute("stroke-dasharray", `${length}`)
    path.setAttribute("stroke-dashoffset", `${length}`)
    svg!.appendChild(path)

    path.animate(
      [{ strokeDashoffset: length }, { strokeDashoffset: 0 }],
      { duration: 1200, easing: "linear", fill: "forwards" }
    )

    const packet = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    packet.setAttribute("r", type === "critical" ? "5" : "3")
    packet.setAttribute("fill", color)
    packet.style.filter = glow
    svg!.appendChild(packet)

    let progress = 0

    function quadBezier(t: number) {
      const mt = 1 - t
      return {
        x: mt * mt * start.x + 2 * mt * t * midX + t * t * end.x,
        y: mt * mt * start.y + 2 * mt * t * midY + t * t * end.y,
      }
    }

    function animate() {
      progress += speed

      if (progress > 1) {
        const flash = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        flash.setAttribute("cx", end.x.toString())
        flash.setAttribute("cy", end.y.toString())
        flash.setAttribute("r", "6")
        flash.setAttribute("fill", color)
        flash.style.opacity = "0.9"
        svg!.appendChild(flash)

        flash.animate(
          [{ r: "6", opacity: "0.9" }, { r: "18", opacity: "0" }],
          { duration: 500, easing: "ease-out" }
        ).onfinish = () => flash.remove()

        packet.remove()

        path.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 400 }
        ).onfinish = () => path.remove()

        const counterId = type === "attack"   ? "attack-counter"
                        : type === "defend"   ? "defend-counter"
                        : "critical-counter"

        const el = document.getElementById(counterId)
        if (el) {
          const current = parseInt(el.innerText.replace(/,/g, "") || "0")
          el.innerText = (current + 1).toLocaleString()
        }

        return
      }

      const pt = quadBezier(progress)
      packet.setAttribute("cx", pt.x.toString())
      packet.setAttribute("cy", pt.y.toString())
      requestAnimationFrame(animate)
    }

    animate()
  }

  setTimeout(() => createAttack(), 2000)
setTimeout(() => createAttack(), 3000)
setInterval(createAttack, 2500)
}