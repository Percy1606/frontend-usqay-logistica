const fs = require('fs')
const path = require('path')

const dir = './src/components/servicios' // ← Ajusta esta ruta si es necesario
const hooksRegex = /\b(useState|useEffect|useContext|useReducer|useRef)\b/
const useClientLine = "'use client'\n"

fs.readdirSync(dir).forEach(file => {
  const fullPath = path.join(dir, file)

  if (file.endsWith('.tsx')) {
    let content = fs.readFileSync(fullPath, 'utf8')

    const usesHook = hooksRegex.test(content)
    const hasUseClient = content.startsWith("'use client'") || content.startsWith('"use client"')

    if (usesHook && !hasUseClient) {
      content = useClientLine + content
      fs.writeFileSync(fullPath, content, 'utf8')
      console.log(`✅ Añadido 'use client' a ${file}`)
    } else if (usesHook) {
      console.log(`🔹 Ya tiene 'use client': ${file}`)
    } else {
      console.log(`➖ No usa hooks: ${file}`)
    }
  }
})
