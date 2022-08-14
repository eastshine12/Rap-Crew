// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';


export default async function handler(req, res) {
  const { id } = req.query;

  BigInt.prototype.toJSON = function() {       
    return this.toString()
  }

  const prisma = new PrismaClient();

  if(req.method === 'GET') {
    const card =  await prisma.tb_card.findMany({
      where: {
        cardId: Number(id),
        valid: true,
      },
      include: {
        tb_user: {
          select: {
            userId: true,
          },
        },
      },
    });
    if(card.length > 0) {
      return res.send({
        ...card[0],
        userId: card[0].tb_user.userId,
      });
    } else {
      return res.send("card not exist");
    }
  } else {
    return res.send("");
  }
  
}
