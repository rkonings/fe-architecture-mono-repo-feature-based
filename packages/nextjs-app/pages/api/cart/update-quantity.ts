import type { NextApiRequest, NextApiResponse } from 'next'
import { addQuantity } from '@rkonings/cart'

export default async function updateQuantityHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  switch(method) {
    case 'PUT':
      const upatedCart = await addQuantity({id: 'id', name: 'name', price: 100, quantity: 3})
      res.status(200).json(upatedCart);
      break;
    default: 
      res.status(404).send('')
    break
  }
  
}