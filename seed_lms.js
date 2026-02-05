import mongoose from 'mongoose';
import dotenv from 'dotenv';
import LmsCourse from './src/modules/lms/lmsCourse.model.js';
import Faculty from './src/modules/faculty/faculty.model.js';

dotenv.config();

const seedLms = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const faculty = await Faculty.findOne({ email: 'faculty-x@mail.com' });
        if (!faculty) {
            console.error('Faculty-x not found. Please create faculty first.');
            process.exit(1);
        }

        const dummyCourses = [
            {
                title: 'Full-Stack Web Architect: From Zero to Pro',
                slug: 'full-stack-web-architect',
                description: 'A comprehensive journey through modern web architecture. Learn Node.js, React, Docker, and Kubernetes.',
                shortDescription: 'Master the full stack with modern tools.',
                category: 'Computer Science',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
                price: 99,
                level: 'Advanced',
                status: 'published',
                modules: [
                    {
                        title: 'Module 1: Backend Foundations',
                        order: 1,
                        lessons: [
                            { title: 'Choosing the right database', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '15:00' },
                            { title: 'System Design Interview Prep', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '25:00' }
                        ]
                    }
                ]
            },
            {
                title: 'UI/UX Design Masterclass',
                slug: 'ui-ux-design-masterclass',
                description: 'Learn the principles of beautiful design. From typography to color theory and prototyping in Figma.',
                shortDescription: 'Design like a professional in 2026.',
                category: 'Art',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
                price: 0,
                level: 'Beginner',
                status: 'published',
                modules: [
                    {
                        title: 'Module 1: Design Principles',
                        order: 1,
                        lessons: [
                            { title: 'Color Theory 101', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '10:00' }
                        ]
                    }
                ]
            }
        ];

        await LmsCourse.deleteMany({ status: 'published' });
        await LmsCourse.insertMany(dummyCourses);

        console.log('Successfully seeded 2 public courses!');
        await mongoose.disconnect();
    } catch (error) {
        console.error('Seeding failed:', error);
    }
};

seedLms();
