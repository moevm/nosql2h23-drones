import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(__dirname, 'src')

const PORT = 3000
const app = express()

app.use(express.static(SRC_DIR))

app.get('/', (req, res) => {
  res.sendFile('html/example.html', {root: SRC_DIR})
})

app.listen(PORT, () =>
  console.log(`App listening on port ${PORT}!`)
)