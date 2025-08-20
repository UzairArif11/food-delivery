import fs from 'fs'
import path from 'path'

// Route segment config
export const runtime = 'nodejs'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  const iconPath = path.join(process.cwd(), 'public', 'custom-icon.png')
  const imageBuffer = fs.readFileSync(iconPath)
  
  return new Response(imageBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
