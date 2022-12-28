import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '#/prisma';
import multer from "multer";
import nc from "next-connect";
import { Image } from '@prisma/client';
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniquePrefix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

const handler = nc<NextApiRequest & { files: any }, NextApiResponse>({ onError: (err) => console.error(err.stack) });
handler.use(upload.array('media'))

handler.post(async (req: NextApiRequest & { files: any }, res: NextApiResponse) => {

  try {
    const { id, title, blurb, status, category } = req.body

    const { files } = req;

    const expoFiles: Image[] = files.map((file: any) => {
      return {
        filename: file.originalname,
        src: "/" + file.filename,
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
          create: expoFiles
        }
      }
    })

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
