const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTestUser() {
    try {
        const hashedPassword = await bcrypt.hash('admin123', 10);

        const user = await prisma.root_admins.create({
            data: {
                email: 'admin@skillforge.com',
                password_hash: hashedPassword,
                full_name: 'Root Administrator'
            }
        });

        console.log('✅ Test root_admin created:', user);
    } catch (error) {
        console.error('❌ Error creating test user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createTestUser();
