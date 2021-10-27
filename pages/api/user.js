import { getSession } from 'next-auth/client';
import prisma from '../../lib/prisma';

export default async function handle(req, res) {
  const session = await getSession({ req });
  const id = await session.id;

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      adventure: true,
    },
  });
  const result = await user;
  res.json(result);
}
