import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const contentTypes =['tweet','reddit','youtube','document','link','article'];

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})

const tagsSchema=new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true
    }
})

const postSchema =new mongoose.Schema({
  link:{type:String,required:true},
  type:{type:String,enum:contentTypes,required:true},
  title:{type:String,required:true},
  tags:[{type: mongoose.Schema.Types.ObjectId, ref:'Tag'}],
  userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
})
const linkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});
const User = mongoose.model('User', userSchema);
const Tags = mongoose.model('Tags',tagsSchema);
const Post=mongoose.model('Post',postSchema);
const Link=mongoose.model('Link',linkSchema);

export {User,Tags,Post,Link};
