import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import cors from "cors"
import { User,Tags,Post,Link} from "./db.js"
import { z } from "zod";
import { expressRateLimitter } from "./customRateLimitter.js"
import auth from "./Auth.js"
import config from "./config/index.js"
import type { Request, Response } from "express";
import { nanoid } from "nanoid";

interface AuthenticatedRequest extends Request{
     user?:{
        id:string,
        username:string
     }
}

const app = express();
const contentTypes =['tweet','reddit','youtube','document','link','article'];

// CORS configuration
app.use(cors({
  origin: config.corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

async function connectToDB(){
    try {
        await mongoose.connect(config.mongodbUri);
        app.listen(config.port,()=>{
    console.log(`Server is running on port ${config.port} and DB connected`);
})        
 }
 catch(error){
    console.log("Error connecting to DB:",error);
 }
}
const usernameSchema = z
  .string()
  .min(3, { message: "Username must be at least 3 characters" })
  .max(32, { message: "Username must be at most 32 characters" })

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(20,{message:"Password must be at most 20 characters long"})
  .refine(val => /[A-Z]/.test(val), { message: "Must include an uppercase letter" })
  .refine(val => /[a-z]/.test(val), { message: "Must include a lowercase letter" })
  .refine(val => /[0-9]/.test(val), { message: "Must include a number" })
  .refine(val => /[!@#$%^&*]/.test(val), { message: "Must include a special character" });

  const formSchema = z.object({
    username: usernameSchema,
    password: passwordSchema
  })

app.post("/api/v1/signup", async (req,res)=>{
    const {username,password}=req.body;
    const validation =formSchema.safeParse(req.body);
    if (!validation.success) {
        const errorMessage = validation.error && validation.error.issues && validation.error.issues[0]
            ? validation.error.issues[0].message
            : "Invalid input";
        return res.status(411).json({ error: errorMessage });
    }
    const existingUser = await User.findOne({username});
    if(existingUser){
       return res.status(403).json({"error":"Username already exists"});
    }

    try{
        const salt = await bcrypt.genSalt(10);
        const hash= await bcrypt.hash(password,salt);
        const user= new User({username, password: hash});
        await user.save();
        res.status(200).json({message :"User created successfully"})
    }
    catch(error){
        res.status(500).json({"error":"Error creating user", "details": error})
    }
})

app.post('/api/v1/signin',expressRateLimitter,async (req,res)=>{
    const{username,password} = req.body;
    const validation = formSchema.safeParse(req.body);
      if (!validation.success) {
        const errorMessage = validation.error && validation.error.issues && validation.error.issues[0]
            ? validation.error.issues[0].message
            : "Invalid input";
        return res.status(411).json({ error: errorMessage });
    }
  
    try{
          const user = await User.findOne({username});
    if(!user || !await bcrypt.compare(password, user.password)){
        return res.status(404).json({error : "Invalid username or password"});
    }
        const payload ={
            sub: user._id, username: user.username
        }
        const token = jwt.sign(payload,config.jwtSecret,{expiresIn:'1h'} );
        res.status(200).json({message:"Login succesful",jwt:token});
    }
    catch(error){
        res.status(500).json({error:"Error something is wrong"});
    }

})

app.post('/api/v1/content',auth,async (req: AuthenticatedRequest,res: Response)=>{
    const {link,type,title,tags} =req.body;
     if (!link || typeof link !== "string" || !link.startsWith("https")) {
    return res.status(400).json({ error: "Invalid or missing 'link'" });
  }
   if (!type || !contentTypes.includes(type)) {
    return res.status(400).json({ error: "Invalid or missing 'type'" });
  }
  if (!title || typeof title !== "string" || title.trim().length < 1) {
    return res.status(400).json({ error: "Invalid or missing 'title'" });
  }

  if (!Array.isArray(tags)) {
    return res.status(400).json({ error: "'tags' must be an array" });
  }
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  const tagsId=[];
  for(let i=0;i<tags.length;i++){
    try{
        const existingTag = await Tags.findOne({title:tags[i]});
        if(existingTag){
            tagsId.push(existingTag._id);
            continue;
        }
        const newTag = new Tags({title:tags[i]});
    const savedTag = await newTag.save();
    const objectId = newTag._id;
    tagsId.push(objectId);
    }
    catch(error){
        return res.status(500).json({ error: "Error saving tag", details: error });
    }
  }
  try{
    const newContent = new Post({link:link,type:type,title:title,tags:tagsId,userId:userId});
  const savedContent = await newContent.save();
  res.status(200).json({message:"Content Saved Succesfully"});
  }
  catch(error){
    return res.status(500).json({ error: "Error saving content", details: error });
  }
})

app.delete('/api/v1/content/:id', auth, async (req: AuthenticatedRequest, res: Response) => {
  const contentId = req.params.id;

  // 1️⃣ Check if ID is provided and valid MongoDB ObjectId
  if (!contentId || !mongoose.Types.ObjectId.isValid(contentId)) {
    return res.status(400).json({ error: "Valid content ID is required" });
  }

  try {
    // 2️⃣ Find content first
    const content = await Post.findById(contentId);
    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    // 3️⃣ Ownership check (convert ObjectId to string)
    if (content.userId.toString() !== req.user?.id) {
      return res.status(403).json({ error: "You can delete only your own content" });
    }

    // 4️⃣ Delete the content
    await Post.findByIdAndDelete(contentId);

    res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting", details: error });
  }
});

app.get('/api/v1/content', auth, async (req:AuthenticatedRequest,res:Response)=>{
    const userId = req.user?.id;
    
    if (!userId) {
        return res.status(401).json({error: "User not authenticated"});
    }
    
    const content=[];
    try{
       const result = await Post.find({userId});
       
       for(let i=0;i<result.length;i++){
        const temp= result[i];
        const tagId = temp?.tags;
        const tags=[];
       
      if (!Array.isArray(temp?.tags)) {
  // No tags for this post
} else {
  for (const id of temp.tags) {
            const t=id.toString();
            const tag= await Tags.findById(t);
            tags.push(tag?.title);
  }
}
        const obj={
            id: temp?._id?.toString(),
            title:temp?.title,
            type:temp?.type,
            link:temp?.link,
            tags:tags,
            username:req.user?.username
        }
        content.push(obj);
       }
       res.status(200).json({message:"The fetch was succesful",content:content});
    }
    catch(error){
        res.status(500).json({error:"Invalid UserId or bad Login", details: error});
    }
    

})

app.patch('/api/v1/content/:id', auth, async (req: AuthenticatedRequest, res: Response) => {
  const contentId = req.params.id;

  // Validate contentId
  if (!contentId || !mongoose.Types.ObjectId.isValid(contentId)) {
    return res.status(400).json({ error: "Valid content ID is required" });
  }

  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  // Allow partial updates: only these keys are allowed
  const { link, type, title, tags } = req.body;

  // Validate fields if provided
  if (link !== undefined) {
    if (typeof link !== "string" || !link.startsWith("https")) {
      return res.status(400).json({ error: "If provided, 'link' must be a https string" });
    }
  }

  if (type !== undefined) {
    if (typeof type !== "string" || !contentTypes.includes(type)) {
      return res.status(400).json({ error: "If provided, 'type' is invalid" });
    }
  }

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length < 1) {
      return res.status(400).json({ error: "If provided, 'title' must be a non-empty string" });
    }
  }

  if (tags !== undefined) {
    if (!Array.isArray(tags)) {
      return res.status(400).json({ error: "If provided, 'tags' must be an array" });
    }
    // optionally ensure every tag is a non-empty string
    for (const t of tags) {
      if (typeof t !== "string" || t.trim().length === 0) {
        return res.status(400).json({ error: "Each tag must be a non-empty string" });
      }
    }
  }

  try {
    // Find the post and ownership check
    const post = await Post.findById(contentId);
    if (!post) {
      return res.status(404).json({ error: "Content not found" });
    }
    if (post.userId.toString() !== userId) {
      return res.status(403).json({ error: "You can update only your own content" });
    }

    const update: any = {};

    if (link !== undefined) update.link = link;
    if (type !== undefined) update.type = type;
    if (title !== undefined) update.title = title;

    // If tags provided, ensure tag documents exist and replace with their ObjectIds
    if (tags !== undefined) {
      const tagIds: mongoose.Types.ObjectId[] = [];
      for (const tagTitle of tags) {
        const trimmed = tagTitle.trim();
        // try find existing tag
        let tagDoc = await Tags.findOne({ title: trimmed });
        if (!tagDoc) {
          tagDoc = new Tags({ title: trimmed });
          await tagDoc.save();
        }
        tagIds.push(tagDoc._id);
      }
      update.tags = tagIds;
    }

    // Perform update and return the new document
    const updated = await Post.findByIdAndUpdate(contentId, { $set: update }, { new: true });

    if (!updated) {
      // Shouldn't hit because we checked earlier, but safe-guard
      return res.status(500).json({ error: "Failed to update content" });
    }

    // Build response with tag titles for convenience (same shape your GET returns)
    const resTags: string[] = [];
    if (Array.isArray(updated.tags)) {
      for (const tid of updated.tags) {
        const t = tid.toString();
        const tagDoc = await Tags.findById(t);
        if (tagDoc) resTags.push(tagDoc.title);
      }
    }

    const responseObj = {
      id: updated._id,
      title: updated.title,
      type: updated.type,
      link: updated.link,
      tags: resTags,
      username: req.user?.username
    };

    return res.status(200).json({ message: "Content updated successfully"});
  } catch (error) {
    return res.status(500).json({ error: "Error updating content", details: error });
  }
});

app.post('/api/v1/brain/share',auth,async (req:AuthenticatedRequest,res:Response)=>{
      const bol=req.body.share;
      const userId = req.user?.id;
      if(bol=="true"){
          
             const exist = await Link.findOne({userId});
      if(exist){
         res.status(200).json({message: exist?.hash});
      }
      else{
           const hash=nanoid(20);
           const store = new Link({hash:hash,userId:userId});
           await store.save();
           res.status(200).json({message:hash});
      }
      }
      else{
        res.status(401).json({error:"Wrong input"});
      }
})

app.get('/api/v1/brain/:shareLink', async (req: Request, res: Response)=>{
    const hash = req.params.shareLink;
    
    try{
        const exist = await Link.findOne({hash});
        if(!exist){
            return res.status(403).json({error:"Link is invalid"});
        }
        
        try{
            const result = await Post.find({userId: exist.userId});
            
            const content=[];
            for(let i=0;i<result.length;i++){
                const temp= result[i];
                const tagId = temp?.tags;
                const tags=[];
       
                if (!Array.isArray(temp?.tags)) {
                    // No tags for this post
                } else {
                    for (const id of temp.tags) {
                        const t=id.toString();
                        const tag= await Tags.findById(t);
                        tags.push(tag?.title);
                    }
                }
                
                // Get the username of the brain owner
                const owner = await User.findById(exist.userId);
                
                const obj={
                    id: temp?._id?.toString(),
                    title:temp?.title,
                    type:temp?.type,
                    link:temp?.link,
                    tags:tags,
                    username: owner?.username || 'Unknown'
                }
                content.push(obj);
            }
            res.status(200).json({message:"The fetch was succesful",content:content});
        }
        catch(error){
            res.status(500).json({error:"Error loading shared brain content"});
        }
    }
    catch(error){
        res.status(500).json({error:"Error finding shared link"});
    }
})


connectToDB();





