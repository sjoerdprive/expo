import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '#/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {

  try {

    const categories = await prisma.category.findMany()

    res.status(200).send(categories)

  } catch (err) {
    res.status(500).send(err)
  }
}
