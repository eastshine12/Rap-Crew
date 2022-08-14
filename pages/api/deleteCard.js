// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import { getSession } from "next-auth/react";

export default async function handler(req, res) {

  const session = await getSession({ req });
  if(!session) return res.send("LOGIN");

  BigInt.prototype.toJSON = function() {       
    return this.toString()
  }

  const cardId = Number(req.body.cardId);
  const userNo = Number(session.user.userNo);

  const prisma = new PrismaClient();
  
  try {
    if(req.method === 'DELETE') {
      
      const result =  await prisma.tb_card.updateMany({
        where: {
          cardId,
          userNo,
        },
        data: {
          valid: false,
        },
      });

      if(result.count > 0) {
        return res.send("OK");
      } else {
        return res.send("NOK");
      };

    }
  } catch(e) {
    console.log(e);
    return res.send("NOK");
  }

}
