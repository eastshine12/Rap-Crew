// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';


export default async function handler(req, res) {

  BigInt.prototype.toJSON = function() {       
    return this.toString()
  }

  const prisma = new PrismaClient();

  const card = {
    userNo: 1,
    title: "제목3",
    content: "내용3",
  }

  if(req.method === 'POST') {

    const cards =  await prisma.tb_card.create({
      data: card
    })

    if(cards) {
      return res.send("Card Created!");
    } else {
      return res.send("Card not Created.");
    }

  } else {
    return res.send("");
  }

}
