import prisma from "@/prisma/client"

async function main(){
    const genres: string[] = [
        'Action',
        'Adventure',
        'Animation',
        'Biography',
        'Comedy',
        'Crime',
        'Documentary',
        'Drama',
        'Family',
        'Fantasy',
        'History',
        'Horror',
        'Music',
        'Mystery',
        'Romance',
        'Sci-Fi',
        'Sport',
        'Superhero',
        'Thriller',
        'War',
        'Western'
    ];

    for(const genre of genres){
        const inserted = await prisma.genre.create({
            data: {
                genreName: genre
            }
        })

        if(inserted){
            console.log(`Created genre: ${genre}`)
        }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })