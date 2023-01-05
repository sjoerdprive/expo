import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '#/prisma';

export default async function updateImage(req: NextApiRequest, res: NextApiResponse) {

  let expoId

  try {


    const fields = Object.entries(req.body);

    const updatedFiles: Record<string, any> = fields.reduce((current: Record<string, any>, [key, value]) => {
      const [fileId, fieldName] = key.split('.');

      const file = current[fileId] || { id: fileId };
      file[fieldName] = value

      return { ...current, [fileId]: file }

    }, {})

    const imgs = await prisma.$transaction(Object.values(updatedFiles).map((file) => prisma.image.update({ where: { id: file.id }, data: file })))

    res.status(200).redirect("/dashboard/expos/edit/" + imgs[0].expoId)
  } catch (err) {
    res.status(500).send(false)
  }

}
