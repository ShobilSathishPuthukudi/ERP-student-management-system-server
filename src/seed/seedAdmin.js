import User from '../modules/auth/user.model.js';
import { hashPassword } from '../utils/hashPassword.js';

/**
 * seedAdmin - Idempotent function to ensure a default system administrator exists.
 * Reads credentials from environment variables: ADMIN_EMAIL, ADMIN_PASSWORD.
 */
export const seedAdmin = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@sms.com';
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminPassword) {
            console.error('[Seeder] ADMIN_PASSWORD is not defined in environment variables.');
            return;
        }

        // Check if any admin exists
        const adminExists = await User.findOne({ role: 'admin' });

        if (adminExists) {
            // Admin already exists, skip seeding
            return;
        }

        // Hash password
        const hashedPassword = await hashPassword(adminPassword);

        // Create Default Admin
        await User.create({
            name: 'System Admin',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
            isActive: true,
        });

        console.log(`[Seeder] Default Admin created successfully: ${adminEmail}`);
    } catch (error) {
        console.error('[Seeder] Error seeding admin:', error.message);
    }
};
