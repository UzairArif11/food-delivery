import fs from 'fs'
import path from 'path'

// Route segment config
export const runtime = 'nodejs'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function AppleIcon() {
  const iconPath = path.join(process.cwd(), 'public', 'custom-icon.png')
  const imageBuffer = fs.readFileSync(iconPath)
  
  return new Response(imageBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
