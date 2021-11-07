import { getSession } from 'next-auth/client';
import prisma from '../../lib/prisma';

export default async function handle(req, res) {
  const session = await getSession({ req });
  const id = await session?.id;
  switch (req.method) {
    case 'GET':
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          adventure: {
            include: {
              characters: true,
              king: true,
            },
          },
        },
      });
      res.json(user);
      break;
  }
}
