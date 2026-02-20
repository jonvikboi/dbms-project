const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🖼️ Updating broken image URLs...');

    // Update Headset
    await prisma.product.update({
        where: { slug: 'hyperx-cloud-ii' },
        data: { imageUrl: 'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?q=80&w=1500&auto=format&fit=crop' }
    });

    // Update Vase
    await prisma.product.update({
        where: { slug: 'minimalist-ceramic-vase' },
        data: { imageUrl: 'https://images.unsplash.com/photo-1578500484748-4852e824cd26?q=80&w=1500&auto=format&fit=crop' }
    });

    console.log('✅ Images updated!');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
