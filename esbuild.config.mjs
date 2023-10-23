import { build } from 'esbuild'

const esbuildConfig = {
  entryPoints: ['src/main.ts'],
  bundle: true,
  minify: true,
  target: 'node18',
  platform: 'node',
  outfile: 'dist/app.js'
}

async function runBuild () {
  try {
    await build(esbuildConfig)
    console.log('¡Construcción exitosa!')
  } catch (error) {
    console.error('Error en la construcción:', error)
    process.exit(1)
  }
}

runBuild()
