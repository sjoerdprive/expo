import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '#/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {

  try {
    const { id, title, blurb, status, category } = JSON.parse(req.body)

    console.log({ status })

    const expo = await prisma.expo.update({
      where: { id: id }, data: {
        id,
        title,
        blurb,
        categoryId: category,
        status
      }
    })

    res.status(200).send(expo)

  } catch (err) {
    res.status(500).send(err)
  }
}
