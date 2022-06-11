// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const {addr} = req.query
  console.log(addr)
  res.status(200).json({ address: addr })
}
