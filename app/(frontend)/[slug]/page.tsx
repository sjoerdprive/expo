import { Expo, Image } from '@prisma/client';
import { prisma } from '#/prisma';

interface IExpoPageProps {
  params: { slug: string };
}

async function getExpo(slug: string) {
  const expo: (Expo & { images: Image[] }) | null =
    await prisma.expo.findUnique({
      where: { slug: slug },
      include: { images: true },
    });

  return expo;
}

export default async function ExpoPage({ params }: IExpoPageProps) {
  const expo = await getExpo(params.slug);

  console.log(expo);

  return (
    <div className="expo-display">
      <h1>{expo?.title}</h1>
      <ul className="list-unstyled image-list">
        {expo?.images?.map((img, i) => (
          <li className="image-item" key={i}>
            <img {...img} />
          </li>
        ))}
      </ul>
    </div>
  );
}