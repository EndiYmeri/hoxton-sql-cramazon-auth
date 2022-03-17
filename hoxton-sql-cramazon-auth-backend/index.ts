import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma  = new PrismaClient({log:["query", "error", "warn", "info"]})

// type SortOrder = {
//   asc: 'asc'
//   desc: 'desc'
// }

// type ItemOrderByWithRelationInput ={
//   id?: SortOrder
//   title?: SortOrder
//   image?: SortOrder
//   price?: SortOrder
//   // orders?: OrderOrderByRelationAggregateInput
// }

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 4000


// function validate(token)

app.get('/items',async (req, res) => {
  const items = await prisma.item.findMany()
  res.send(items)
})

app.get('/item/:title',async (req,res) => {
    const title = req.params.title
    try  {
      const item = await prisma.item.findFirst({
        where:{title}
      })

      if(item){
        res.send(item)
      }else{
        res.status(404).send({error:"Item not found"})
      }
    } catch(err) {
      // @ts-ignore
      res.status(404).send(`<pre>${err.message}</pre>`)
    }
})  

app.post('/items',async (req,res) => {
    const {title, image, price} = req.body

    try {
        const createdItem = await prisma.item.create({
          data: {title, image, price},
        })

        res.send(createdItem)
    } catch(err){
      // @ts-ignore
      res.status(400).send(`<pre>${err.message}</pre>`)
    }
})

app.post('/order', async (req, res)=>{
  const {email, title, quantity} = req.body

  try{
    const createdOrder = await prisma.order.create({
      data:{
        quantity,
        user: {connect: {email}},
        item: {connect: {title}}
      },
      include:{
        user:true,
        item:true
      }
    })
    res.send(createdOrder)
  } catch(err) {
    // @ts-ignore
    res.status(400).send(err.message)
  }
})

app.patch('/order/:id',async (req, res) => {
  const id = Number(req.params.id)
  const quantity = req.body

  try{
    const updateOrder = await prisma.order.update({
      include:{
        user:true,
        item:true
      },
      where:{
        id:id
      },
      data:{
        quantity: quantity
      }
    })

    if(updateOrder){
      res.send(updateOrder)
    } else {
      res.status(404).send({error:"No order with that id"})
    }

  } catch(err) {
    // @ts-ignore
    res.status(400).send(err.message)
  }
})

app.delete('/order/:id',async (req, res) => {
    const id = Number(req.params.id)
    try{

      const order = await prisma.order.findUnique({where:{id}})
      if(order){
        const deletedOrder = await prisma.order.delete({ where: { id:id }})
        const updatedUser = await prisma.user.findUnique({where: {id: order.userId}})
        res.send(updatedUser)
      } else{
        res.send({error:"There is no order with that id"})
      }

    }catch(err){
      // @ts-ignore
      res.status(400).send(err.message)
    }
})

// Get detailed user
app.get('/users/:name',async (req,res) => {
   const name = req.params.name
   const userFound = await prisma.user.findFirst({
      where: {name: name},
      include: { 
        orders:{
         include: {item:true}
      }}
    })
    if(userFound){
      res.send(userFound)
    } else{
      res.status(404).send({message:"User not found"})
    }
  })

// Update User
app.patch('/users/:name',async (req,res) => {
  const name = req.params.name

  const userFound = await prisma.user.findFirst({
    where:{name: name}
  })
  if(userFound){
    const {newName = userFound.name, newEmail = userFound.email} = req.body
    const userUpdated = await prisma.user.update({
      where: {name: name},
      include: { 
        orders:{
          include: {item:true}
        }},
        data:{
          name: newName,
          email: newEmail
        }
      })
      
      if(userUpdated){
        res.send(userUpdated)
      } else{
        res.status(404).send({message:"User not found"})
      }
    }
  })
app.delete('/users/:name'   ,async (req, res) => {
  const name = req.params.name 
})


// Login user
app.post('/login',async (req,res) => {
    const {email, password} = req.body
    try{
      const user = await prisma.user.findUnique(
        {
          where:{email},
          include:{orders:true}
        }
        )
       if(user){
         const passwordMatch = bcrypt.compareSync(password, user.password )
         if(passwordMatch){
           res.send(user)  
          } else{
            res.status(404).send({message: "Password doesnt match"})
          }
      }else{
        res.status(404).send({message: "User doesnt match"})
      } 
    }catch(err){
      // @ts-ignore
      res.send(err.message)
    }
} )

// Register user
app.post('/register',async (req,res) => {
  const { name, email, password} = req.body 
  try{
    const hash = bcrypt.hashSync(password, 8)
    if(name && email && password){
      const createdUser = await prisma.user.create({
        data:{
          name, email, password:hash
        },
      })

      const token = jwt.sign(createdUser,"shhhh")
      res.send({createdUser, token})
    } else{
      res.status(404).send({message:"Name, Email or password is missing"}) 
    }
  } catch (err){
    // @ts-ignore
    res.status(400).send(err.message)
  }   
})





app.listen(PORT,()=>console.log(`Server up on http://localhost:${PORT}`))