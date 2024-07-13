import React,{useEffect,useState} from 'react'
import {blogOperations} from '../appwrite/config'
import {Container,PostForm} from '../components'
import { useParams,useNavigate } from 'react-router-dom'

function Edit() {
    const [post,setPost] = useState(null)
    const navigate = useNavigate()
    const slug = useParams()
    
    useEffect(()=>{
        if(slug){
            blogOperations.getBlog(slug.slug).then((post)=>{
                if(post)
                    setPost(post)
            })
        }
    },[slug,navigate])
    return (
        post?
        <>
        <Container>
            <div className='py-8'>
                <PostForm post={post}/>
            </div>
        </Container>
        </>
        :
        null
    )
}

export default Edit
