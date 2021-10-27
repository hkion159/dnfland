import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { title, html, markdown } = req.body;

  const session = await getSession({ req });
  const id = await session?.id;
  const type = (await id) === 1 ? 'notice' : 'normal';
  const result = await prisma.post.create({
    data: {
      type: type,
      title: title,
      html: html,
      markdown: markdown,
      author: { connect: { id: id } },
    },
  });
  res.json(result);
}
