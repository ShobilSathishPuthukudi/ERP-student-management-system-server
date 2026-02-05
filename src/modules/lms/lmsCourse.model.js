import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    order: { type: Number, required: true },
    lessons: [{
        title: { type: String, required: true },
        videoUrl: { type: String }, // URL to video hosting (e.g., Cloudinary, S3, YouTube)
        content: { type: String }, // Rich text or markdown
        resources: [{
            name: { type: String },
            url: { type: String }
        }],
        isFreePreview: { type: Boolean, default: false },
        duration: { type: String } // e.g., "12:45"
    }]
});

const lmsCourseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            required: true
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Faculty',
            required: true,
        },
        thumbnail: {
            type: String,
            default: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'
        },
        description: {
            type: String,
            required: true,
        },
        shortDescription: {
            type: String,
            maxLength: 200
        },
        category: {
            type: String,
            required: true,
            enum: ['Engineering', 'Business', 'Art', 'Computer Science', 'Language', 'Science', 'Mathematics', 'Other']
        },
        price: {
            type: Number,
            required: true,
            default: 0, // 0 means free
        },
        isFree: {
            type: Boolean,
            default: true
        },
        level: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced'],
            default: 'Beginner'
        },
        status: {
            type: String,
            enum: ['draft', 'pending', 'published', 'rejected'],
            default: 'draft',
        },
        modules: [moduleSchema],
        enrollmentCount: {
            type: Number,
            default: 0
        },
        rating: {
            type: Number,
            default: 0
        },
        totalReviews: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

// Auto-generate slug before saving
lmsCourseSchema.pre('validate', function () {
    if (this.title && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
});

const LmsCourse = mongoose.model('LmsCourse', lmsCourseSchema);

export default LmsCourse;
