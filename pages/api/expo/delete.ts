import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '#/prisma';


export default async function deleteExpo(req: NextApiRequest, res: NextApiResponse) {
  const id = req.body

  console.log({ id })

  try {

    const deletedExpo = await prisma.expo.delete({ where: { id: id } })

    res.status(200).redirect('/dashboard/expos')

  } catch (err) {

    res.status(500).send(err)
  }


}
