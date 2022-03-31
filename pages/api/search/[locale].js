import * as Elastic from '@/lib/elasticsearch'

export default async function handler(req, res) {
  // No posts allowed
  const { q, from, locale } = Elastic.getSearchParamsFromQuery(req)
  if (req.method !== 'GET' || !q) {
    res.status(400).end()
    return
  }

  const size = 10
  let search = { results: {}, error: 'no search params given' }
  const elastic = Elastic.getSearchClient()

  let index = Elastic.getIndexName(locale)
  const indexExists = await elastic.indices.exists({ index })

  if (!indexExists) {
    console.warn(Elastic.getIndexWarning({ index, q }))
    index = undefined
  }

  search = await elastic.search({ q, size, from, index }).catch((e) => {
    console.error(
      Elastic.ERROR,
      e?.meta?.body?.error?.root_cause || e?.name || e
    )
    throw e
  })

  res.status(200).json({
    q,
    size,
    from,
    ...search,
  })
}
