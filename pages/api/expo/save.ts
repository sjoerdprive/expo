import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '#/prisma';
import multer from "multer";
import { s3 } from "#/aws/s3";
import { DeleteObjectsCommand, DeleteObjectsCommandInput } from '@aws-sdk/client-s3'
import multerS3 from 'multer-s3'
import nc from "next-connect";
import { Image } from '@prisma/client';
import * as path from "path";

const storage = multerS3({
  s3: s3,
  bucket: 'expoisure-dev',
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, Date.now().toString() + path.extname(file.originalname))
  },
})

const upload = multer({ storage: storage })

const handler = nc<NextApiRequest & { files: any }, NextApiResponse>({ onError: (err) => console.error(err.stack) });
handler.use(upload.array('media'))

handler.post(async (req: NextApiRequest & { files: any }, res: NextApiResponse) => {

  try {
    const { id, title, blurb, status, category, fileIdsToRemove } = req.body as { [key: string]: string }

    const fileIdsToRemoveArray = fileIdsToRemove === '' ? [] : fileIdsToRemove.split(';')
    const filesKeysToRemove = await prisma.image.findMany({ where: { id: { in: fileIdsToRemoveArray } }, select: { key: true } })

    console.log({ fileIdsToRemoveArray })

    const { files } = req;

    console.log({ files })

    const expoFiles: Image[] = files.map((file: any) => {
      return {
        key: file.key,
        src: file.location,
        title: file.originalname
      } as Image
    })

    const expo = await prisma.expo.update({
      where: { id: id }, data: {
        id,
        title,
        blurb,
        categoryId: category,
        status,
        images: {
          create: expoFiles,
          deleteMany: { id: { in: fileIdsToRemoveArray } }
        }
      }, include: {
        images: true
      }
    })

    if (filesKeysToRemove.length > 0) {
      await s3.send(new DeleteObjectsCommand({ Bucket: process.env.AWS_BUCKET_NAME, Delete: { Objects: filesKeysToRemove.map(key => ({ Key: key.key })) } }))
    }

    res.status(200).send(expo)

  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

export default handler


export const config = {
  api: {
    bodyParser: false
  }
}
