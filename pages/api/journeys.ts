import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllJourneys } from 'lib/db/journey'
import { BikeJourney } from 'lib/types/journey'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | BikeJourney[]>
) {
  if (req.method === 'GET') {
    const { skip, sortByHeader, filterBy } = req.query

    if (
      Array.isArray(skip) ||
      Array.isArray(sortByHeader) ||
      Array.isArray(filterBy)
    ) {
      return res.status(400).json({ message: 'Bad request.' })
    }

    const skipNumber = Number(skip)

    const journeys = await getAllJourneys({
      skip: skipNumber,
      sortByHeader,
      filterBy,
    })

    return res.status(200).json(journeys)
  }
}
