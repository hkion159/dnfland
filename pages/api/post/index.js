import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { title, html, markdown, authorId } = await req.body;
  const type = (await authorId) === 1 ? 'notice' : 'normal';
  const result = await prisma.post.create({
    data: {
      type: type,
      title: title,
      html: html,
      markdown: markdown,
      author: { connect: { id: authorId } },
    },
  });
  res.json(result);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
