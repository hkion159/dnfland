import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const suggestion = req.body;
  const content = JSON.stringify(suggestion);
  const session = await getSession({ req });
  const id = await session?.id;
  const result = await prisma.suggestion.create({
    data: {
      content: content,
      author: { connect: { id: id } },
    },
  });
  res.json(result);
}
