import fetch from 'node-fetch'

export default async function handler(req, res) {
  try {
    const feed = 'https://deepaklearns.substack.com/feed'
    const r = await fetch(feed)
    if (!r.ok) return res.status(502).json({ error: 'Bad response from feed' })
    const text = await r.text()
    // very small XML parse to extract items
    const items = []
    const parser = new DOMParser() // not available in Node; simple regex fallback
    const parts = text.split('<item>').slice(1).slice(0,5)
    for (const p of parts) {
      const title = (p.match(/<title>(.*?)<\/title>/)||[])[1]||''
      const link = (p.match(/<link>(.*?)<\/link>/)||[])[1]||''
      const pub = (p.match(/<pubDate>(.*?)<\/pubDate>/)||[])[1]||''
      items.push({ title, link, pubDate: pub })
    }
    res.setHeader('Content-Type','application/json')
    return res.status(200).send(JSON.stringify({ items }))
  } catch (e) {
    return res.status(500).json({ error: String(e) })
  }
}
