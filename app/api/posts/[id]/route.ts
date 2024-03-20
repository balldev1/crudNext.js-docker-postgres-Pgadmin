import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// next js
// export default function Page({ params }: { params: { slug: string } }) {
//     return <div>My Post: {params.slug}</div>
// }

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const postId = Number(params.id);
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            return Response.json({ error: 'Post not found' }, { status: 404 });
        }

        return Response.json(post);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const postId = Number(params.id);
        const post = await prisma.post.delete({
            where: {
                id: postId
            }
        });

        if (!post) {
            return Response.json({ error: 'Post not found' }, { status: 404 });
        }

        return Response.json(post);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { title, content } = await request.json();
        const updatedPost = await prisma.post.update({
            where: { id: Number(params.id) },
            data: { title, content },
        });

        return  Response.json(updatedPost);

    } catch (error) {
        return {
            status: 500,
            body: JSON.stringify({ error }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
}



