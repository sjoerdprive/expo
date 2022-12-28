import { PrismaClient, Image } from '@prisma/client'
const prisma = new PrismaClient();

const words = ["tangy", "large", "impolite", "rainstorm", "soap", "summer", "cultured", "spell", "person", "bless", "want", "dusty", "wooden", "utopian", "uttermost", "tested", "expand", "bumpy", "tasteless", "dramatic", "test", "meeting", "amused", "attract", "ruin", "cars", "belong", "skinny", "bite-sized", "size",]

async function main() {
  await prisma.user.upsert({
    where: { username: "admin" }, update: {}, create: {
      username: "admin",
      password: 'admin',
    }
  })

  await prisma.category.upsert({
    where: { id: "0" }, update: {}, create: {
      name: "Geen",
      slug: "none",
      id: "0"
    }
  })

  await prisma.category.upsert({
    where: { id: "1" }, update: {}, create: {
      name: "Commissies",
      slug: "commissies",
      id: "1"
    }
  })

  await prisma.category.upsert({
    where: { id: "2" }, update: {}, create: {
      name: "Experimenten",
      slug: "experimenten",
      id: "2"
    }
  })


  await prisma.image.deleteMany()
  await prisma.expo.deleteMany()

  await prisma.expo.upsert({
    where: { id: "1919051" }, update: {}, create: {
      title: "Arrangement of guitars",
      slug: 'arrangement-of-guitars',
      images: {
        create: [{
          filename: `nb`,
          alt: "",
          src: `/gitaren naar boven.jpg`,
          title: "Gitaren naar boven",
        }, {
          filename: `no`,
          alt: "",
          src: `/gitaren naar onder.jpg`,
          title: "Gitaren naar onder",
        }, {
          filename: `r`,
          alt: "",
          src: `/gitaren recht.jpg`,
          title: "Gitaren recht",
        }, {
          filename: `sc`,
          alt: "",
          src: `/gitaren schuin.jpg`,
          title: "Gitaren schuin",
        }, {
          filename: `np`,
          alt: "",
          src: `/gitaren spiraal.jpg`,
          title: "Gitaren spiraal",
        }]
      }
    }
  })

  for (let i = 0; i < 6; i++) {

    const title = words[Math.round(Math.random() * words.length)] + " " + words[Math.round(Math.random() * words.length)] + " " + words[Math.round(Math.random() * words.length)];
    let numImgs = Math.round(Math.random() * 6);

    let imgs: Image[] = []

    for (numImgs; numImgs > 0; numImgs--) {

      const w = Math.round(Math.random() * 700) + 100;
      const h = Math.round(Math.random() * 700) + 100;

      const img = {
        filename: `img`,
        alt: "",
        src: `https://picsum.photos/${w}/${h}`,
        title: words[numImgs],
      }
      imgs.push(img as any)
    }
    await prisma.expo.upsert({
      where: { id: i.toString() }, update: {}, create: {
        title: title,
        slug: 'expo-' + i,
        images: {
          create: imgs
        }

      }
    })
  }

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
