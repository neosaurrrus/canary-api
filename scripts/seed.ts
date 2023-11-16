import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
    const asos = await client.company.upsert({
        where: {id: 1},
        update: {},
        create: {
            number: 1234,
            name: 'ASOS',
            url: 'asos.com',
            supporting: 'conservatives'
        }
    })
    console.log(asos)
}

main().then(() => {
    client.$disconnect();
    process.exit(0);
})
.catch((e) => {
    console.log('ERROR')
    console.log(e)
    client.$disconnect()
    process.exit(1)
})