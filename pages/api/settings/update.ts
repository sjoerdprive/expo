
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '#/prisma';
import hexToRgb from '#/utils/hexToRGB';


export default async function updateSettings(req: NextApiRequest, res: NextApiResponse) {

  console.log(req.body)

  try {

    const { themeColorHex, ...settingsData } = req.body

    const { r, g, b } = hexToRgb(themeColorHex)

    const settings = await prisma.settings.findFirst();

    const updatedSettings = await prisma.settings.update({
      where: { id: settings?.id }, data: {
        themeColorRGB: `${r}, ${g}, ${b}`
      }
    })

    console.log({ updatedSettings })

    res.status(200).redirect('/dashboard/settings')
  } catch (err) {
    console.log(err)
    res.status(500).redirect('/dashboard/settings')

  }
}
