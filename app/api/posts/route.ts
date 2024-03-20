import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function GET(){
    try {
        // ลบโพสต์ทั้งหมด
        const getData = await prisma.post.findMany();

        return Response.json(getData)
    } catch (error) {
        return {
            status: 500,
            body: JSON.stringify({ error}),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
}

export async function POST(request:Request){
    const { title, content } = await request.json()

    const newPost = await prisma.post.create({
        data:{
            title,
            content
        }
    })
    return Response.json(newPost)
}

export async function DELETE(request: Request) {
    try {
        // ลบโพสต์ทั้งหมด
        const deleteAllPosts = await prisma.post.deleteMany();

        return Response.json(deleteAllPosts)
    } catch (error) {
        return {
            status: 500,
            body: JSON.stringify({ error}),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
}
