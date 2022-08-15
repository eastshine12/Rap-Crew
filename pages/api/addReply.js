// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import { getSession } from "next-auth/react";

export default async function handler(req, res) {

  const session = await getSession({ req });

  if(!session) return res.send("LOGIN");

  BigInt.prototype.toJSON = function() {       
    return this.toString()
  }

  const prisma = new PrismaClient();

  try {
    if(req.method === 'POST') {

      const result =  await prisma.tb_reply.create({
        data: {
          cardId: Number(req.body.cardId),
          content: req.body.content,
          userNo: Number(session.user.userNo),
        },
      });
  
      if(result) {
        return res.send("OK");
      };

    }
  } catch(e) {
    console.log(e);
    return res.send("NOK");
  }

}
