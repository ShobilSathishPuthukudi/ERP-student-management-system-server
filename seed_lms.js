import mongoose from 'mongoose';
import dotenv from 'dotenv';
import LmsCourse from './src/modules/lms/lmsCourse.model.js';
import Faculty from './src/modules/faculty/faculty.model.js';

dotenv.config();

const seedLms = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const faculty = await Faculty.findOne();
        if (!faculty) {
            console.error('No Faculty found in DB. Please run erpSeeder first.');
            process.exit(1);
        }
        console.log(`Using faculty: ${faculty.fullName} (${faculty.email})`);

        const dummyCourses = [
            // Computer Science (6 courses)
            {
                title: 'Full-Stack Web Development Bootcamp',
                slug: 'full-stack-web-development-bootcamp',
                description: 'A comprehensive journey through modern web architecture. Learn Node.js, React, Docker, and Kubernetes.',
                shortDescription: 'Master the full stack with modern tools.',
                category: 'Computer Science',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
                price: 99,
                level: 'Advanced',
                status: 'published',
                modules: [{ title: 'Module 1: Backend Foundations', order: 1, lessons: [{ title: 'Choosing the right database', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '15:00' }] }]
            },
            {
                title: 'Python for Data Science',
                slug: 'python-for-data-science',
                description: 'Master Python programming and data analysis with pandas, numpy, and matplotlib.',
                shortDescription: 'Learn Python for data analysis.',
                category: 'Computer Science',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
                price: 79,
                level: 'Intermediate',
                status: 'published',
                modules: [{ title: 'Module 1: Python Basics', order: 1, lessons: [{ title: 'Variables and Data Types', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '12:00' }] }]
            },
            {
                title: 'Machine Learning Fundamentals',
                slug: 'machine-learning-fundamentals',
                description: 'Dive into ML algorithms, neural networks, and AI applications.',
                shortDescription: 'Build intelligent systems.',
                category: 'Computer Science',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
                price: 129,
                level: 'Advanced',
                status: 'published',
                modules: [{ title: 'Module 1: ML Introduction', order: 1, lessons: [{ title: 'What is Machine Learning?', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '18:00' }] }]
            },
            {
                title: 'Mobile App Development with React Native',
                slug: 'mobile-app-development-react-native',
                description: 'Build cross-platform mobile apps for iOS and Android.',
                shortDescription: 'Create mobile apps efficiently.',
                category: 'Computer Science',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
                price: 89,
                level: 'Intermediate',
                status: 'published',
                modules: [{ title: 'Module 1: React Native Basics', order: 1, lessons: [{ title: 'Setting up environment', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '14:00' }] }]
            },
            {
                title: 'Cybersecurity Essentials',
                slug: 'cybersecurity-essentials',
                description: 'Learn ethical hacking, network security, and penetration testing.',
                shortDescription: 'Protect systems from threats.',
                category: 'Computer Science',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
                price: 109,
                level: 'Advanced',
                status: 'published',
                modules: [{ title: 'Module 1: Security Basics', order: 1, lessons: [{ title: 'Introduction to Cybersecurity', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '16:00' }] }]
            },
            {
                title: 'Cloud Computing with AWS',
                slug: 'cloud-computing-aws',
                description: 'Master Amazon Web Services, EC2, S3, Lambda, and cloud architecture.',
                shortDescription: 'Deploy scalable cloud solutions.',
                category: 'Computer Science',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
                price: 119,
                level: 'Intermediate',
                status: 'published',
                modules: [{ title: 'Module 1: AWS Fundamentals', order: 1, lessons: [{ title: 'Introduction to AWS', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '20:00' }] }]
            },

            // Business (5 courses)
            {
                title: 'Digital Marketing Mastery',
                slug: 'digital-marketing-mastery',
                description: 'Learn SEO, social media marketing, content strategy, and analytics.',
                shortDescription: 'Grow your online presence.',
                category: 'Business',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
                price: 69,
                level: 'Beginner',
                status: 'published',
                modules: [{ title: 'Module 1: Marketing Basics', order: 1, lessons: [{ title: 'Digital Marketing Overview', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '11:00' }] }]
            },
            {
                title: 'Financial Analysis and Investment',
                slug: 'financial-analysis-investment',
                description: 'Master financial modeling, stock analysis, and investment strategies.',
                shortDescription: 'Make informed investment decisions.',
                category: 'Business',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
                price: 99,
                level: 'Intermediate',
                status: 'published',
                modules: [{ title: 'Module 1: Finance Fundamentals', order: 1, lessons: [{ title: 'Understanding Financial Statements', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '17:00' }] }]
            },
            {
                title: 'Entrepreneurship and Startup Strategy',
                slug: 'entrepreneurship-startup-strategy',
                description: 'Build and scale your startup from idea to execution.',
                shortDescription: 'Launch your business successfully.',
                category: 'Business',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80',
                price: 0,
                level: 'Beginner',
                status: 'published',
                modules: [{ title: 'Module 1: Startup Basics', order: 1, lessons: [{ title: 'Finding Your Business Idea', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '13:00' }] }]
            },
            {
                title: 'Project Management Professional (PMP)',
                slug: 'project-management-professional',
                description: 'Prepare for PMP certification with Agile, Scrum, and project planning.',
                shortDescription: 'Lead projects effectively.',
                category: 'Business',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
                price: 149,
                level: 'Advanced',
                status: 'published',
                modules: [{ title: 'Module 1: PM Fundamentals', order: 1, lessons: [{ title: 'Project Management Overview', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '19:00' }] }]
            },
            {
                title: 'Business Analytics with Excel',
                slug: 'business-analytics-excel',
                description: 'Master Excel for data analysis, pivot tables, and business intelligence.',
                shortDescription: 'Analyze data like a pro.',
                category: 'Business',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
                price: 59,
                level: 'Beginner',
                status: 'published',
                modules: [{ title: 'Module 1: Excel Basics', order: 1, lessons: [{ title: 'Introduction to Excel', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '10:00' }] }]
            },

            // Art & Design (5 courses)
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
                modules: [{ title: 'Module 1: Design Principles', order: 1, lessons: [{ title: 'Color Theory 101', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '10:00' }] }]
            },
            {
                title: 'Graphic Design with Adobe Creative Suite',
                slug: 'graphic-design-adobe-creative-suite',
                description: 'Master Photoshop, Illustrator, and InDesign for professional design work.',
                shortDescription: 'Create stunning visuals.',
                category: 'Art',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
                price: 79,
                level: 'Intermediate',
                status: 'published',
                modules: [{ title: 'Module 1: Photoshop Basics', order: 1, lessons: [{ title: 'Getting Started with Photoshop', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '15:00' }] }]
            },
            {
                title: '3D Modeling and Animation with Blender',
                slug: '3d-modeling-animation-blender',
                description: 'Create 3D models, animations, and visual effects with Blender.',
                shortDescription: 'Bring your ideas to 3D life.',
                category: 'Art',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
                price: 89,
                level: 'Advanced',
                status: 'published',
                modules: [{ title: 'Module 1: Blender Introduction', order: 1, lessons: [{ title: 'Blender Interface', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '14:00' }] }]
            },
            {
                title: 'Photography Fundamentals',
                slug: 'photography-fundamentals',
                description: 'Learn composition, lighting, and post-processing for stunning photos.',
                shortDescription: 'Capture perfect moments.',
                category: 'Art',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=800&q=80',
                price: 69,
                level: 'Beginner',
                status: 'published',
                modules: [{ title: 'Module 1: Camera Basics', order: 1, lessons: [{ title: 'Understanding Exposure', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '12:00' }] }]
            },
            {
                title: 'Video Editing with Premiere Pro',
                slug: 'video-editing-premiere-pro',
                description: 'Edit professional videos with Adobe Premiere Pro and After Effects.',
                shortDescription: 'Create cinematic videos.',
                category: 'Art',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
                price: 99,
                level: 'Intermediate',
                status: 'published',
                modules: [{ title: 'Module 1: Premiere Basics', order: 1, lessons: [{ title: 'Introduction to Premiere Pro', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '16:00' }] }]
            },

            // Science (3 courses)
            {
                title: 'Introduction to Quantum Physics',
                slug: 'introduction-quantum-physics',
                description: 'Explore the fascinating world of quantum mechanics and particle physics.',
                shortDescription: 'Understand the quantum realm.',
                category: 'Science',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
                price: 0,
                level: 'Intermediate',
                status: 'published',
                modules: [{ title: 'Module 1: Quantum Basics', order: 1, lessons: [{ title: 'What is Quantum Physics?', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '18:00' }] }]
            },
            {
                title: 'Environmental Science and Sustainability',
                slug: 'environmental-science-sustainability',
                description: 'Learn about climate change, renewable energy, and sustainable practices.',
                shortDescription: 'Build a sustainable future.',
                category: 'Science',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
                price: 49,
                level: 'Beginner',
                status: 'published',
                modules: [{ title: 'Module 1: Environment Basics', order: 1, lessons: [{ title: 'Introduction to Environmental Science', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '11:00' }] }]
            },
            {
                title: 'Biotechnology and Genetic Engineering',
                slug: 'biotechnology-genetic-engineering',
                description: 'Discover CRISPR, gene therapy, and modern biotechnology applications.',
                shortDescription: 'Explore genetic innovation.',
                category: 'Science',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
                price: 139,
                level: 'Advanced',
                status: 'published',
                modules: [{ title: 'Module 1: Biotech Fundamentals', order: 1, lessons: [{ title: 'Introduction to Biotechnology', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '20:00' }] }]
            },

            // Mathematics (3 courses)
            {
                title: 'Calculus Mastery: From Basics to Advanced',
                slug: 'calculus-mastery',
                description: 'Master differential and integral calculus with real-world applications.',
                shortDescription: 'Conquer calculus concepts.',
                category: 'Mathematics',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
                price: 79,
                level: 'Intermediate',
                status: 'published',
                modules: [{ title: 'Module 1: Calculus Basics', order: 1, lessons: [{ title: 'Limits and Continuity', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '15:00' }] }]
            },
            {
                title: 'Statistics and Probability for Data Science',
                slug: 'statistics-probability-data-science',
                description: 'Learn statistical analysis, hypothesis testing, and probability theory.',
                shortDescription: 'Master statistical thinking.',
                category: 'Mathematics',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
                price: 89,
                level: 'Intermediate',
                status: 'published',
                modules: [{ title: 'Module 1: Stats Fundamentals', order: 1, lessons: [{ title: 'Introduction to Statistics', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '13:00' }] }]
            },
            {
                title: 'Linear Algebra for Machine Learning',
                slug: 'linear-algebra-machine-learning',
                description: 'Understand vectors, matrices, and linear transformations for AI applications.',
                shortDescription: 'Build ML foundations.',
                category: 'Mathematics',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
                price: 0,
                level: 'Advanced',
                status: 'published',
                modules: [{ title: 'Module 1: Linear Algebra Basics', order: 1, lessons: [{ title: 'Vectors and Matrices', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '17:00' }] }]
            },
            // Added 20 more courses
            {
                title: 'Blockchain and Cryptocurrency',
                slug: 'blockchain-cryptocurrency',
                description: 'Understand the technology behind Bitcoin, Ethereum, and smart contracts.',
                shortDescription: 'Master blockchain tech.',
                category: 'Computer Science',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=800&q=80',
                price: 109,
                level: 'Advanced',
                status: 'published',
                modules: [{ title: 'Module 1: Blockchain Basics', order: 1, lessons: [{ title: 'How Blockchain Works', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '18:00' }] }]
            },
            {
                title: 'Game Development with Unity',
                slug: 'game-development-unity',
                description: 'Create 2D and 3D games using Unity and C#.',
                shortDescription: 'Build your own games.',
                category: 'Computer Science',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&w=800&q=80',
                price: 89,
                level: 'Intermediate',
                status: 'published',
                modules: [{ title: 'Module 1: Unity Interface', order: 1, lessons: [{ title: 'Getting Started', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '20:00' }] }]
            },
            {
                title: 'DevOps Engineering',
                slug: 'devops-engineering',
                description: 'Learn CI/CD, Docker, Kubernetes, and Jenkins.',
                shortDescription: 'Automate software delivery.',
                category: 'Computer Science',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1607799279819-32866944fa9c?auto=format&fit=crop&w=800&q=80',
                price: 119,
                level: 'Advanced',
                status: 'published',
                modules: [{ title: 'Module 1: DevOps Culture', order: 1, lessons: [{ title: 'What is DevOps?', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '15:00' }] }]
            },
            {
                title: 'Swift iOS Development',
                slug: 'swift-ios-development',
                description: 'Build iPhone and iPad apps using Swift and SwiftUI.',
                shortDescription: 'Develop for Apple devices.',
                category: 'Computer Science',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1563206767-5b1d972e9fb9?auto=format&fit=crop&w=800&q=80',
                price: 99,
                level: 'Intermediate',
                status: 'published',
                modules: [{ title: 'Module 1: Swift Basics', order: 1, lessons: [{ title: 'Variables in Swift', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '12:00' }] }]
            },
            {
                title: 'Data Structures and Algorithms',
                slug: 'data-structures-algorithms-mastery',
                description: 'Ace your coding interviews with DSA mastery.',
                shortDescription: 'Crack coding interviews.',
                category: 'Computer Science',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80',
                price: 69,
                level: 'Intermediate',
                status: 'published',
                modules: [{ title: 'Module 1: Arrays', order: 1, lessons: [{ title: 'Introduction to Arrays', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '16:00' }] }]
            },
            {
                title: 'Leadership and Management',
                slug: 'leadership-management',
                description: 'Develop essential leadership skills for the modern workplace.',
                shortDescription: 'Become a great leader.',
                category: 'Business',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
                price: 59,
                level: 'Beginner',
                status: 'published',
                modules: [{ title: 'Module 1: Leadership Styles', order: 1, lessons: [{ title: 'Types of Leaders', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '14:00' }] }]
            },
            {
                title: 'Supply Chain Management',
                slug: 'supply-chain-management',
                description: 'Understand logistics, operations, and supply chain strategy.',
                shortDescription: 'Optimize business operations.',
                category: 'Business',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
                price: 89,
                level: 'Advanced',
                status: 'published',
                modules: [{ title: 'Module 1: SCM Basics', order: 1, lessons: [{ title: 'What is Supply Chain?', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '18:00' }] }]
            },
            {
                title: 'Human Resource Management',
                slug: 'human-resource-management',
                description: 'Learn about recruitment, employee relations, and HR strategy.',
                shortDescription: 'Manage human capital.',
                category: 'Business',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
                price: 69,
                level: 'Intermediate',
                status: 'published',
                modules: [{ title: 'Module 1: HR Fundamentals', order: 1, lessons: [{ title: 'Role of HR', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '11:00' }] }]
            },
            {
                title: 'E-commerce Strategies',
                slug: 'e-commerce-strategies',
                description: 'Build and grow a successful online store.',
                shortDescription: 'Sell online successfully.',
                category: 'Business',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80',
                price: 79,
                level: 'Beginner',
                status: 'published',
                modules: [{ title: 'Module 1: E-commerce Intro', order: 1, lessons: [{ title: 'Platforms Overview', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '13:00' }] }]
            },
            {
                title: 'Public Speaking Masterclass',
                slug: 'public-speaking-masterclass',
                description: 'Overcome fear and speak with confidence.',
                shortDescription: 'Speak like a pro.',
                category: 'Business',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1475721027767-f42a66039b56?auto=format&fit=crop&w=800&q=80',
                price: 49,
                level: 'Beginner',
                status: 'published',
                modules: [{ title: 'Module 1: Overcoming Fear', order: 1, lessons: [{ title: 'Handling Nerves', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '10:00' }] }]
            },
            {
                title: 'Music Production with Logic Pro',
                slug: 'music-production-logic-pro',
                description: 'Create professional music tracks using Logic Pro X.',
                shortDescription: 'Produce hit songs.',
                category: 'Art',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
                price: 99,
                level: 'Intermediate',
                status: 'published',
                modules: [{ title: 'Module 1: Interface Tour', order: 1, lessons: [{ title: 'Logic Pro Setup', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '15:00' }] }]
            },
            {
                title: 'Digital Illustration',
                slug: 'digital-illustration',
                description: 'Learn to draw and paint digitally with Procreate and Photoshop.',
                shortDescription: 'Create digital art.',
                category: 'Art',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
                price: 69,
                level: 'Beginner',
                status: 'published',
                modules: [{ title: 'Module 1: Sketching', order: 1, lessons: [{ title: 'Basics of Sketching', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '12:00' }] }]
            },
            {
                title: 'Interior Design Basics',
                slug: 'interior-design-basics',
                description: 'Transform spaces with color, layout, and lighting.',
                shortDescription: 'Design beautiful spaces.',
                category: 'Art',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
                price: 59,
                level: 'Beginner',
                status: 'published',
                modules: [{ title: 'Module 1: Color Schemes', order: 1, lessons: [{ title: 'Choosing Colors', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '14:00' }] }]
            },
            {
                title: 'Fashion Design Fundamentals',
                slug: 'fashion-design-fundamentals',
                description: 'Learn sketching, fabrics, and garment construction.',
                shortDescription: 'Create fashion trends.',
                category: 'Art',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&w=800&q=80',
                price: 89,
                level: 'Intermediate',
                status: 'published',
                modules: [{ title: 'Module 1: Fashion Sketching', order: 1, lessons: [{ title: 'Drawing Croquis', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '16:00' }] }]
            },
            {
                title: 'Calligraphy and Lettering',
                slug: 'calligraphy-lettering',
                description: 'Master the art of beautiful handwriting.',
                shortDescription: 'Art of writing.',
                category: 'Art',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1560130954-47f2db34b8c0?auto=format&fit=crop&w=800&q=80',
                price: 39,
                level: 'Beginner',
                status: 'published',
                modules: [{ title: 'Module 1: Basic Strokes', order: 1, lessons: [{ title: 'Understanding Pens', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '10:00' }] }]
            },
            {
                title: 'Astronomy: Exploring the Universe',
                slug: 'astronomy-exploring-universe',
                description: 'Discover stars, galaxies, black holes, and the cosmos.',
                shortDescription: 'Explore the stars.',
                category: 'Science',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
                price: 0,
                level: 'Beginner',
                status: 'published',
                modules: [{ title: 'Module 1: Solar System', order: 1, lessons: [{ title: 'Our Planets', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '20:00' }] }]
            },
            {
                title: 'Organic Chemistry Demystified',
                slug: 'organic-chemistry-demystified',
                description: 'Understand molecular structures and reactions.',
                shortDescription: 'Master organic chemistry.',
                category: 'Science',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
                price: 79,
                level: 'Advanced',
                status: 'published',
                modules: [{ title: 'Module 1: Hydrocarbons', order: 1, lessons: [{ title: 'Alkanes and Alkenes', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '18:00' }] }]
            },
            {
                title: 'Introduction to Psychology',
                slug: 'introduction-to-psychology',
                description: 'Explore human behavior, cognition, and emotion.',
                shortDescription: 'Understand the mind.',
                category: 'Science',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1507668077129-56e32880f2bf?auto=format&fit=crop&w=800&q=80',
                price: 49,
                level: 'Beginner',
                status: 'published',
                modules: [{ title: 'Module 1: Brain Basics', order: 1, lessons: [{ title: 'Neurons and Synapses', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '12:00' }] }]
            },
            {
                title: 'Geometry and Spatial Reasoning',
                slug: 'geometry-spatial-reasoning',
                description: 'Understand shapes, sizes, and relative positions of figures.',
                shortDescription: 'Master geometry.',
                category: 'Mathematics',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1509228627129-6690a87531f3?auto=format&fit=crop&w=800&q=80',
                price: 59,
                level: 'Intermediate',
                status: 'published',
                modules: [{ title: 'Module 1: Triangles', order: 1, lessons: [{ title: 'Properties of Triangles', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '14:00' }] }]
            },
            {
                title: 'Discrete Mathematics',
                slug: 'discrete-mathematics',
                description: 'Learn logic, set theory, and combinatorics essential for CS.',
                shortDescription: 'Math for computer science.',
                category: 'Mathematics',
                instructor: faculty._id,
                thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
                price: 79,
                level: 'Advanced',
                status: 'published',
                modules: [{ title: 'Module 1: Logic', order: 1, lessons: [{ title: 'Propositional Logic', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '16:00' }] }]
            }
        ];

        await LmsCourse.deleteMany({ status: 'published' });
        await LmsCourse.insertMany(dummyCourses);

        console.log('Successfully seeded 22 public courses!');
        await mongoose.disconnect();
    } catch (error) {
        console.error('Seeding failed:', error);
    }
};

seedLms();
