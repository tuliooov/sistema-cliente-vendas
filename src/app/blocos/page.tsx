import prismaClient from '@/lib/prisma';
import Image from 'next/image'
import Link from 'next/link'


import styles from './blocksListStyles.module.scss'

export const dynamic='force-dynamic';



export default async function BlocksList({ searchParams }: any) {

    const blocks = await prismaClient.carnivalBlock.findMany({
        orderBy: {
            createdAt: 'asc'
        },
        where: searchParams.estado !== '' && searchParams.nome !== '' ? {
            state: searchParams.estado,
            name: {
                contains: searchParams.nome
            }
        } : (
            searchParams.estado !== '' ? {
                state: searchParams.estado
            } : (searchParams.nome !== '' ? {
                name: {
                    contains: searchParams.nome
                }
            } : {})
        )
    })

    console.log(blocks);
    
    
    return (
        <>

            <main>
                {
                    blocks.length >= 1 ? (

                        blocks.map((block) => {
                            return (
                                <Link 
                                    key={block.id} 
                                    className={styles.blockCard}
                                    href={`/blocos/${block.id}`}
                                >
                                    <Image
                                        src={`https://firebasestorage.googleapis.com/v0/b/search-of-carnival-7-boracodar.appspot.com/o/bora-codar-7%2F${block.imageName}?alt=media&token=409c594e-019a-484b-a19d-9588c310e730`}
                                        alt={block.description}
                                        className={styles.blockBanner}
                                        width={500}
                                        height={500}
                                    />
                                    <div className={styles.blockContent}>

                                        <h1>
                                            {block.name}
                                        </h1>
                                        <p>{block.description}</p>
                                        <div className={styles.blockLocation}>
                                            <Image
                                                src="/location.png"
                                                alt="Icone de localização"
                                                height={24}
                                                width={24}
                                            />
                                            <p>{block.state}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    ): (
                        <div id={styles.noBlocksContainer}>
                            <Image
                                src="/sad.png"
                                alt='sad image'
                                height={500}
                                width={500}
                            />
                            <h1>Sem festas por hoje... </h1>
                            <p>Não foi encontrado nenhum bloco <span>{searchParams.nome&& `"${searchParams.nome}"`} {searchParams.estado&& `em ${searchParams.estado}`} </span></p>
                            
                        </div>
                    )
                }
            </main>
        </>
    )
}