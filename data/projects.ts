import type { IProject } from "../types";
 
export const projects: IProject[] = [
    {
        id: "ai-chatbot",
        title: "AI-Powered Chatbot Platform",
        description: "Intelligent chatbot platform with natural language processing, multi-channel support, and analytics.",
        fullDescription: "A sophisticated AI chatbot platform that leverages advanced natural language processing to provide intelligent conversational experiences. The platform supports multiple communication channels (website, WhatsApp, Messenger), includes a powerful admin dashboard for bot training and analytics, and features seamless integration with various APIs. Built with cutting-edge AI technologies, it enables businesses to automate customer support and engagement efficiently.",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "Next.js 14",
            "TypeScript",
            "Python",
            "FastAPI",
            "OpenAI GPT-4",
            "LangChain",
            "Pinecone",
            "Redis",
            "Docker",
            "PostgreSQL",
            "WebSockets",
            "Tailwind CSS",
            "Shadcn UI",
        ],
        features: [
            "Natural Language Processing (NLP)",
            "Multi-channel Integration",
            "Custom AI Model Training",
            "Real-time Conversation Analytics",
            "Sentiment Analysis",
            "Knowledge Base Integration",
            "Multi-language Support",
            "Conversation History",
            "Admin Training Interface",
            "API Integration Hub",
            "Automated Workflows",
            "User Behavior Tracking",
            "Performance Analytics",
            "Custom Bot Personalities",
        ],
        githubUrl: "https://github.com/sorujmahmud/ai-chatbot",
        liveUrl: "https://ai-chatbot-soruj.vercel.app",
        category: "AI",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
        ],
        challenges: [
            "Implementing accurate natural language understanding and context retention",
            "Managing real-time conversations across multiple channels simultaneously",
            "Training and fine-tuning AI models for specific use cases",
            "Handling large-scale vector database operations for knowledge retrieval",
            "Ensuring low-latency responses for seamless user experience",
            "Implementing proper conversation memory and context management",
        ],
        solutions: [
            "Used LangChain for advanced conversation chains and memory management",
            "Implemented Redis for real-time session management and caching",
            "Fine-tuned GPT models with custom datasets and prompt engineering",
            "Utilized Pinecone for efficient vector similarity search and retrieval",
            "Optimized API responses with streaming and WebSocket connections",
            "Designed hierarchical memory system for short-term and long-term context",
        ],
        featured: true,
        difficulty: "advanced",
        duration: "4 months",
        teamSize: "3 developers",
        completionDate: "2024-04-20",
        createdAt: "2024-01-10",
        updatedAt: "2024-05-01",
        tags: ["ai", "chatbot", "nlp", "machine-learning", "automation"],
        emoji: "🤖",
        stats: {
            completionTime: "4 months",
            teamSize: "3 developers",
            complexity: "Very High",
            views: 2100,
            likes: 156
        },
        architecture: "Microservices architecture with Next.js frontend, FastAPI backend, Python AI services, Vector database for knowledge retrieval, Redis for caching",
        developmentHighlights: [
            {
                title: "AI Model Integration",
                description: "Successfully integrated and fine-tuned multiple AI models including GPT-4 and custom transformers"
            },
            {
                title: "Real-time Processing",
                description: "Built low-latency real-time conversation system with WebSocket connections"
            },
            {
                title: "Multi-channel Support",
                description: "Implemented unified interface for multiple communication platforms with consistent experience"
            }
        ],
        lessonsLearned: [
            "Complexities of natural language understanding and context management",
            "Importance of proper training data and model fine-tuning",
            "Challenges of real-time AI inference at scale",
            "Security considerations for AI-powered applications"
        ],
        futureImprovements: [
            "Implement voice recognition and speech synthesis",
            "Add emotion detection and response adaptation",
            "Integrate with more enterprise systems and CRMs",
            "Develop mobile SDK for native app integration"
        ],
        metaDescription: "AI-powered chatbot platform with natural language processing, multi-channel support, and advanced analytics. Built with OpenAI and LangChain.",
        seoTitle: "AI Chatbot Platform | Natural Language Processing",
        performance: {
            loadTime: 87,
            accessibility: 93,
            bestPractices: 91,
            seo: 94
        }
    },
    {
        id: "ecommerce-platform",
        title: "Modern E-Commerce Platform",
        description: "Full-featured e-commerce solution with admin dashboard, payment integration, and inventory management.",
        fullDescription: "A comprehensive e-commerce platform built with modern technologies featuring user authentication, product management, shopping cart, payment processing, order management, and admin dashboard. The platform supports multiple payment methods, real-time inventory tracking, and responsive design for optimal user experience across all devices. Includes advanced features like wishlists, product reviews, inventory management, and analytics dashboard.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "Next.js 14",
            "TypeScript",
            "Tailwind CSS",
            "Node.js",
            "Express",
            "MongoDB",
            "Mongoose",
            "Stripe",
            "NextAuth",
            "Cloudinary",
            "Shadcn UI",
            "Zod",
            "React Hook Form",
            "Chart.js",
        ],
        features: [
            "User Authentication & Authorization",
            "Product Catalog with Search & Filters",
            "Shopping Cart & Wishlist",
            "Secure Payment Processing (Stripe)",
            "Order Management System",
            "Admin Dashboard with Analytics",
            "Real-time Inventory Management",
            "Customer Reviews & Ratings",
            "Responsive Mobile-First Design",
            "Image Upload & Management with Cloudinary",
            "Email Notifications",
            "Order Tracking System",
            "Multi-vendor Support",
            "Discount & Coupon System",
        ],
        githubUrl: "https://github.com/sorujmahmud/ecommerce-app",
        liveUrl: "https://ecommerce-soruj.vercel.app",
        category: "Fullstack",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1556742044-3f034b6d94c1?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1556742042-5e4b5b5b5b5b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1556742041-5e4b5b5b5b5b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1556742040-5e4b5b5b5b5b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1556742039-5e4b5b5b5b5b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
        ],
        challenges: [
            "Implementing secure payment processing with Stripe and handling webhooks",
            "Managing real-time inventory updates across multiple concurrent users",
            "Handling user sessions and authentication securely with role-based access",
            "Optimizing product search and filtering performance with large datasets",
            "Ensuring responsive design and cross-browser compatibility",
            "Managing file uploads and image optimization at scale",
        ],
        solutions: [
            "Integrated Stripe webhooks for secure payment verification and status updates",
            "Implemented MongoDB transactions and atomic operations for inventory management",
            "Used NextAuth with JWT tokens and middleware for secure authentication",
            "Optimized database queries with indexing and implemented search with regex and filters",
            "Utilized Tailwind CSS with mobile-first responsive design approach",
            "Integrated Cloudinary for efficient image upload, transformation, and delivery",
        ],
        featured: true,
        difficulty: "advanced",
        duration: "3 months",
        teamSize: "Solo",
        completionDate: "2024-01-15",
        createdAt: "2023-10-01",
        updatedAt: "2024-01-20",
        tags: ["ecommerce", "fullstack", "payments", "dashboard", "mongodb"],
        emoji: "🛒",
        stats: {
            completionTime: "3 months",
            teamSize: "1 developer",
            complexity: "High",
            views: 1250,
            likes: 89
        },
        architecture: "MERN Stack with Next.js App Router, Microservices architecture for payment processing, CDN for static assets",
        developmentHighlights: [
            {
                title: "Payment Integration",
                description: "Successfully integrated Stripe with webhook handling for secure payment processing and subscription management"
            },
            {
                title: "Admin Dashboard",
                description: "Built comprehensive admin panel with real-time analytics, order management, and inventory tracking"
            },
            {
                title: "Performance Optimization",
                description: "Achieved 95+ Lighthouse scores through code splitting, image optimization, and efficient database queries"
            }
        ],
        lessonsLearned: [
            "Importance of proper error handling in payment processing",
            "Value of comprehensive testing for e-commerce flows",
            "Benefits of using TypeScript for large-scale applications",
            "Need for proper inventory management strategies"
        ],
        futureImprovements: [
            "Implement AI-powered product recommendations",
            "Add multi-language and currency support",
            "Integrate with more payment providers",
            "Develop mobile app with React Native"
        ],
        metaDescription: "Modern e-commerce platform built with Next.js, TypeScript, and MongoDB. Features include payment processing, admin dashboard, and inventory management.",
        seoTitle: "Modern E-Commerce Platform | Full-Stack Development",
        performance: {
            loadTime: 92,
            accessibility: 98,
            bestPractices: 95,
            seo: 96
        }
    },
    {
        id: "fitness-tracker",
        title: "AI Fitness Tracker & Coach",
        description: "Intelligent fitness tracking application with AI-powered workout plans, progress analytics, and virtual coaching.",
        fullDescription: "A comprehensive fitness tracking application that combines AI-powered workout recommendations with detailed progress tracking and virtual coaching. The app creates personalized workout plans based on user goals, fitness level, and available equipment. Features include exercise demonstration videos, nutrition tracking, social challenges, and advanced analytics to help users achieve their fitness goals effectively.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "React Native",
            "TypeScript",
            "Node.js",
            "Express",
            "MongoDB",
            "TensorFlow.js",
            "Redis",
            "AWS S3",
            "Firebase",
            "Apple HealthKit",
            "Google Fit API",
            "Chart.js",
            "Stripe",
        ],
        features: [
            "AI-Powered Workout Plans",
            "Exercise Demonstration Videos",
            "Progress Tracking & Analytics",
            "Nutrition & Calorie Tracking",
            "Virtual Personal Coach",
            "Social Challenges & Leaderboards",
            "Integration with Health Apps",
            "Personalized Recommendations",
            "Workout Reminders & Scheduling",
            "Body Measurements Tracking",
            "Achievement System",
            "Community Features",
            "Premium Coaching Programs",
            "Offline Workout Mode",
        ],
        githubUrl: "https://github.com/sorujmahmud/fitness-tracker",
        liveUrl: "https://fitness-soruj.vercel.app",
        category: "Mobile",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1571019614245-c6e2c8b1d0b7?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1571019614245-c6e2c8b1d0b7?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1571019614245-c6e2c8b1d0b7?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
        ],
        challenges: [
            "Creating accurate AI models for personalized workout recommendations",
            "Implementing real-time exercise form analysis and feedback",
            "Synchronizing data across multiple health platforms and devices",
            "Building engaging social features and community interactions",
            "Optimizing mobile app performance with large media files",
            "Implementing secure payment processing for premium features",
        ],
        solutions: [
            "Used TensorFlow.js for exercise classification and recommendation algorithms",
            "Implemented computer vision with pose estimation for form analysis",
            "Built unified data synchronization layer for health platform integrations",
            "Created gamification system with challenges and social features",
            "Optimized media delivery with CDN and progressive loading",
            "Integrated Stripe with subscription management and trial periods",
        ],
        featured: true,
        difficulty: "advanced",
        duration: "6 months",
        teamSize: "4 developers",
        completionDate: "2024-05-10",
        createdAt: "2023-11-01",
        updatedAt: "2024-05-20",
        tags: ["fitness", "mobile", "ai", "health", "react-native"],
        emoji: "💪",
        stats: {
            completionTime: "6 months",
            teamSize: "4 developers",
            complexity: "High",
            views: 1650,
            likes: 198
        },
        architecture: "React Native cross-platform mobile app, Node.js backend with microservices, MongoDB for user data, Redis for caching, AWS for media storage",
        developmentHighlights: [
            {
                title: "AI Personalization",
                description: "Developed sophisticated AI algorithms for personalized fitness recommendations"
            },
            {
                title: "Cross-platform Development",
                description: "Built seamless experience across iOS and Android with React Native"
            },
            {
                title: "Health Integrations",
                description: "Integrated with major health platforms for comprehensive data tracking"
            }
        ],
        lessonsLearned: [
            "Complexities of AI model training for fitness applications",
            "Importance of user engagement and motivation in fitness apps",
            "Challenges of cross-platform mobile development",
            "Data privacy considerations in health applications"
        ],
        futureImprovements: [
            "Add augmented reality for exercise guidance",
            "Implement more advanced AI coaching features",
            "Add integration with smart home gym equipment",
            "Develop wearable device integration"
        ],
        metaDescription: "AI-powered fitness tracker with personalized workout plans, progress analytics, and virtual coaching. Cross-platform mobile app.",
        seoTitle: "AI Fitness Tracker | Personalized Workout Plans",
        performance: {
            loadTime: 85,
            accessibility: 96,
            bestPractices: 92,
            seo: 89
        }
    },
    {
        id: "crypto-dashboard",
        title: "Cryptocurrency Trading Dashboard",
        description: "Real-time cryptocurrency trading platform with portfolio tracking, analytics, and automated trading.",
        fullDescription: "A comprehensive cryptocurrency trading dashboard that provides real-time market data, portfolio management, advanced charting tools, and automated trading capabilities. The platform integrates with multiple exchanges, offers sophisticated technical analysis tools, and includes risk management features. Built for both novice and experienced traders, it provides insights and tools to make informed trading decisions in the volatile crypto market.",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "React",
            "TypeScript",
            "Node.js",
            "Express",
            "WebSocket",
            "PostgreSQL",
            "Redis",
            "D3.js",
            "Chart.js",
            "Binance API",
            "Coinbase API",
            "JWT",
            "Docker",
            "AWS Lambda",
        ],
        features: [
            "Real-time Market Data & Charts",
            "Multi-exchange Integration",
            "Portfolio Tracking & Analytics",
            "Technical Analysis Tools",
            "Automated Trading Bots",
            "Price Alerts & Notifications",
            "Risk Management Tools",
            "Trade History & Performance",
            "Mobile Responsive Design",
            "Dark/Light Theme",
            "API Key Management",
            "Social Trading Features",
            "News & Sentiment Analysis",
            "Tax Reporting Tools",
        ],
        githubUrl: "https://github.com/sorujmahmud/crypto-dashboard",
        liveUrl: "https://crypto-soruj.vercel.app",
        category: "Fullstack",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1620321023372-61f2b36b5b5b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1620321023372-61f2b36b5b5b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1620321023372-61f2b36b5b5b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
        ],
        challenges: [
            "Handling real-time WebSocket data streams from multiple exchanges",
            "Implementing accurate and performant financial charting",
            "Managing secure API key storage and encryption",
            "Building reliable automated trading strategies",
            "Ensuring data consistency across multiple data sources",
            "Implementing proper risk management and trading safeguards",
        ],
        solutions: [
            "Used Redis pub/sub for efficient real-time data distribution",
            "Implemented D3.js for custom, high-performance financial charts",
            "Built secure vault system with encryption for API key storage",
            "Developed backtesting framework for trading strategy validation",
            "Implemented data reconciliation system for exchange discrepancies",
            "Created comprehensive risk management rules and circuit breakers",
        ],
        featured: true,
        difficulty: "advanced",
        duration: "5 months",
        teamSize: "2 developers",
        completionDate: "2024-03-15",
        createdAt: "2023-10-01",
        updatedAt: "2024-04-01",
        tags: ["cryptocurrency", "trading", "finance", "realtime", "analytics"],
        emoji: "₿",
        stats: {
            completionTime: "5 months",
            teamSize: "2 developers",
            complexity: "Very High",
            views: 1800,
            likes: 134
        },
        architecture: "Real-time WebSocket architecture, Microservices for exchange integrations, Redis for caching and pub/sub, PostgreSQL for transactional data",
        developmentHighlights: [
            {
                title: "Real-time Data Processing",
                description: "Built scalable real-time data pipeline processing thousands of market events per second"
            },
            {
                title: "Advanced Charting",
                description: "Created custom financial charts with technical indicators and drawing tools"
            },
            {
                title: "Trading Automation",
                description: "Implemented reliable automated trading system with backtesting capabilities"
            }
        ],
        lessonsLearned: [
            "Complexities of financial data processing and visualization",
            "Importance of security in financial applications",
            "Challenges of multi-exchange data synchronization",
            "Risk management in automated trading systems"
        ],
        futureImprovements: [
            "Add more advanced trading algorithms and AI strategies",
            "Implement social trading and copy trading features",
            "Add derivatives and futures trading support",
            "Develop mobile trading application"
        ],
        metaDescription: "Real-time cryptocurrency trading dashboard with portfolio tracking, advanced charts, and automated trading. Multi-exchange support.",
        seoTitle: "Cryptocurrency Trading Dashboard | Real-time Analytics",
        performance: {
            loadTime: 89,
            accessibility: 91,
            bestPractices: 93,
            seo: 90
        }
    },
    {
        id: "learning-platform",
        title: "Interactive Learning Management System",
        description: "Modern LMS with video courses, interactive quizzes, progress tracking, and AI-powered recommendations.",
        fullDescription: "A cutting-edge learning management system that provides an engaging and interactive educational experience. The platform features high-quality video courses, interactive coding exercises, AI-powered learning path recommendations, and comprehensive progress tracking. Built for both individual learners and educational institutions, it supports multiple learning formats and provides tools for instructors to create and manage educational content effectively.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "Next.js 14",
            "TypeScript",
            "NestJS",
            "PostgreSQL",
            "Redis",
            "AWS S3",
            "FFmpeg",
            "WebRTC",
            "Socket.io",
            "Stripe",
            "OpenAI API",
            "Docker",
            "Kubernetes",
        ],
        features: [
            "Interactive Video Courses",
            "Live Coding Environment",
            "AI-Powered Learning Paths",
            "Progress Tracking & Analytics",
            "Interactive Quizzes & Assessments",
            "Certificate Generation",
            "Discussion Forums",
            "Live Classes with WebRTC",
            "Course Creation Tools",
            "Multi-language Support",
            "Mobile Learning App",
            "Gamification & Badges",
            "Corporate Training Features",
            "API for Integrations",
        ],
        githubUrl: "https://github.com/sorujmahmud/learning-platform",
        liveUrl: "https://learn-soruj.vercel.app",
        category: "Fullstack",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
        ],
        challenges: [
            "Implementing scalable video streaming and processing infrastructure",
            "Building interactive coding environments with real-time execution",
            "Creating accurate AI models for personalized learning recommendations",
            "Managing complex course structures and learning paths",
            "Implementing secure payment and subscription management",
            "Ensuring platform accessibility for diverse learning needs",
        ],
        solutions: [
            "Used AWS MediaConvert and CloudFront for scalable video delivery",
            "Built Docker-based code execution environment for safe code running",
            "Implemented collaborative filtering and content-based recommendation systems",
            "Designed flexible course schema with prerequisites and learning objectives",
            "Integrated Stripe with complex pricing models and enterprise features",
            "Followed WCAG guidelines and implemented accessibility features throughout",
        ],
        featured: true,
        difficulty: "advanced",
        duration: "7 months",
        teamSize: "5 developers",
        completionDate: "2024-06-15",
        createdAt: "2023-11-01",
        updatedAt: "2024-07-01",
        tags: ["education", "lms", "video", "ai", "learning"],
        emoji: "🎓",
        stats: {
            completionTime: "7 months",
            teamSize: "5 developers",
            complexity: "Very High",
            views: 1950,
            likes: 167
        },
        architecture: "Microservices architecture with Next.js frontend, NestJS backend, PostgreSQL for data, Redis for caching, Kubernetes for orchestration",
        developmentHighlights: [
            {
                title: "Video Processing Pipeline",
                description: "Built scalable video processing and streaming infrastructure supporting thousands of concurrent users"
            },
            {
                title: "Interactive Learning",
                description: "Created immersive learning experience with live coding and interactive exercises"
            },
            {
                title: "AI Recommendations",
                description: "Implemented sophisticated AI system for personalized learning path recommendations"
            }
        ],
        lessonsLearned: [
            "Complexities of building scalable video platforms",
            "Importance of engagement in online learning",
            "Challenges of personalized education at scale",
            "Security considerations in code execution environments"
        ],
        futureImprovements: [
            "Add virtual reality learning experiences",
            "Implement more advanced AI tutoring features",
            "Add integration with corporate HR systems",
            "Develop offline learning capabilities"
        ],
        metaDescription: "Interactive learning management system with video courses, AI recommendations, and live coding. Built for modern education.",
        seoTitle: "Learning Management System | Interactive Online Education",
        performance: {
            loadTime: 88,
            accessibility: 97,
            bestPractices: 94,
            seo: 95
        }
    },
    {
        id: "social-network",
        title: "Developer Social Network",
        description: "Professional social network for developers with code sharing, collaboration tools, and job matching.",
        fullDescription: "A specialized social network designed exclusively for developers and tech professionals. The platform enables code sharing, technical discussions, project collaboration, and career opportunities. Features include integrated code editors, real-time collaboration, technical blog publishing, and intelligent job matching based on skills and interests. Built to foster community and professional growth in the developer ecosystem.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "React",
            "TypeScript",
            "Node.js",
            "GraphQL",
            "PostgreSQL",
            "Redis",
            "WebSocket",
            "Docker",
            "Elasticsearch",
            "AWS S3",
            "OAuth",
            "Jest",
            "Cypress",
        ],
        features: [
            "Code Sharing & Collaboration",
            "Technical Discussion Forums",
            "Real-time Messaging",
            "Project Showcase",
            "Job Board & Matching",
            "Skill-based Networking",
            "Code Review Tools",
            "Technical Blog Platform",
            "Event Management",
            "Mentorship Program",
            "Open Source Project Discovery",
            "Learning Resources",
            "Company Profiles",
            "Recruitment Tools",
        ],
        githubUrl: "https://github.com/sorujmahmud/dev-network",
        liveUrl: "https://dev-network-soruj.vercel.app",
        category: "Fullstack",
        status: "in-progress",
        screenshots: [
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
        ],
        challenges: [
            "Building real-time collaboration features for code editing",
            "Implementing efficient search across code, posts, and profiles",
            "Managing complex social graph relationships and notifications",
            "Ensuring platform scalability with high user engagement",
            "Implementing secure code execution and sharing",
            "Creating accurate job and connection recommendations",
        ],
        solutions: [
            "Used Operational Transforms for real-time code collaboration",
            "Implemented Elasticsearch for fast and relevant search results",
            "Designed efficient graph database schema for social relationships",
            "Built microservices architecture with horizontal scaling",
            "Created secure sandboxed environment for code execution",
            "Developed machine learning models for personalized recommendations",
        ],
        featured: false,
        difficulty: "advanced",
        duration: "8 months",
        teamSize: "6 developers",
        completionDate: "2024-08-30",
        createdAt: "2024-01-15",
        updatedAt: "2024-06-01",
        tags: ["social", "developers", "collaboration", "career", "community"],
        emoji: "👨‍💻",
        stats: {
            completionTime: "8 months (ongoing)",
            teamSize: "6 developers",
            complexity: "Very High",
            views: 1250,
            likes: 89
        },
        architecture: "GraphQL API with React frontend, Microservices for different features, PostgreSQL with graph extensions, Elasticsearch for search, Redis for caching",
        developmentHighlights: [
            {
                title: "Real-time Collaboration",
                description: "Built advanced real-time code collaboration system with conflict resolution"
            },
            {
                title: "Search Infrastructure",
                description: "Created comprehensive search system indexing code, discussions, and profiles"
            },
            {
                title: "Social Features",
                description: "Implemented sophisticated social networking features tailored for developers"
            }
        ],
        lessonsLearned: [
            "Complexities of real-time collaborative editing",
            "Importance of community moderation in social platforms",
            "Challenges of building engaged technical communities",
            "Scalability considerations for social networks"
        ],
        futureImprovements: [
            "Add video interview and screening features",
            "Implement more advanced code analysis tools",
            "Add integration with popular developer tools",
            "Develop mobile application with push notifications"
        ],
        metaDescription: "Developer social network with code sharing, collaboration tools, and job matching. Built for the developer community.",
        seoTitle: "Developer Social Network | Code Collaboration Platform",
        performance: {
            loadTime: 86,
            accessibility: 92,
            bestPractices: 91,
            seo: 93
        }
    },
    {
        id: "task-manager",
        title: "Advanced Task Management System",
        description: "Productivity application with task management, team collaboration, and time tracking features.",
        fullDescription: "A comprehensive task management system designed for both individual productivity and team collaboration. Features include project organization, task assignments, time tracking, progress monitoring, and team communication. Built with a focus on user experience and productivity, the app helps teams stay organized and meet deadlines efficiently with intuitive drag-and-drop interfaces and real-time updates.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "React",
            "Redux Toolkit",
            "TypeScript",
            "Node.js",
            "Express",
            "PostgreSQL",
            "Socket.io",
            "JWT",
            "React DnD",
            "Chart.js",
            "Jest",
            "Cypress",
        ],
        features: [
            "Project & Task Management",
            "Drag & Drop Interface",
            "Team Collaboration",
            "Time Tracking & Reporting",
            "Progress Monitoring",
            "File Attachments",
            "Comment System",
            "Due Date Reminders",
            "Kanban & List Views",
            "User Role Management",
            "Real-time Updates",
            "Export & Reporting",
            "Mobile Responsive",
            "Offline Support",
        ],
        githubUrl: "https://github.com/sorujmahmud/task-manager",
        liveUrl: "https://taskmanager-soruj.vercel.app",
        category: "Fullstack",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
        ],
        challenges: [
            "Implementing real-time synchronization across multiple users",
            "Managing complex state with drag-and-drop functionality",
            "Handling file uploads and storage efficiently",
            "Creating responsive design that works for complex interactions",
            "Implementing comprehensive testing for user interactions",
        ],
        solutions: [
            "Used Socket.io for real-time updates and conflict resolution",
            "Implemented React DnD with optimized re-renders and state management",
            "Integrated cloud storage with compression and caching",
            "Designed mobile-first with touch-friendly interactions",
            "Wrote comprehensive unit and E2E tests with Jest and Cypress",
        ],
        featured: false,
        difficulty: "advanced",
        duration: "4 months",
        teamSize: "2 developers",
        completionDate: "2023-11-20",
        createdAt: "2023-07-15",
        updatedAt: "2023-12-01",
        tags: ["productivity", "collaboration", "tasks", "team", "realtime"],
        emoji: "📊",
        stats: {
            completionTime: "4 months",
            teamSize: "2 developers",
            complexity: "High",
            views: 720,
            likes: 45
        },
        architecture: "React frontend with Redux state management, Node.js backend with WebSocket support, PostgreSQL for data persistence with complex relationships",
        developmentHighlights: [
            {
                title: "Real-time Collaboration",
                description: "Implemented conflict-free real-time synchronization for multiple users"
            },
            {
                title: "Drag & Drop System",
                description: "Built performant drag-and-drop interface with smooth animations"
            },
            {
                title: "Testing Strategy",
                description: "Created comprehensive test suite covering 95% of user interactions"
            }
        ],
        lessonsLearned: [
            "Complexity of real-time data synchronization",
            "Importance of proper state management in complex applications",
            "Value of comprehensive testing in productivity apps",
            "User experience considerations for drag-and-drop interfaces"
        ],
        futureImprovements: [
            "Add AI-powered task suggestions",
            "Implement calendar integration",
            "Add more visualization options",
            "Develop mobile applications"
        ],
        metaDescription: "Advanced task management system with team collaboration, time tracking, and real-time updates. Built with React and Node.js.",
        seoTitle: "Task Management System | Team Collaboration Tool",
        performance: {
            loadTime: 85,
            accessibility: 92,
            bestPractices: 90,
            seo: 88
        }
    },
    {
        id: "weather-app",
        title: "Weather Forecast Application",
        description: "Beautiful weather application with detailed forecasts, maps, and severe weather alerts.",
        fullDescription: "A modern weather application that provides accurate weather forecasts, interactive maps, and severe weather alerts. Features include location-based weather, 7-day forecasts, hourly predictions, weather maps with multiple layers, and customizable notifications. The app focuses on providing a beautiful, intuitive interface while delivering comprehensive weather information from reliable sources.",
        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "React",
            "TypeScript",
            "OpenWeather API",
            "Mapbox GL JS",
            "Chart.js",
            "PWA",
            "Service Workers",
            "IndexedDB",
            "Geolocation API",
            "Tailwind CSS",
        ],
        features: [
            "Current Weather & Forecasts",
            "Interactive Weather Maps",
            "Location-based Services",
            "Severe Weather Alerts",
            "7-Day & Hourly Forecasts",
            "Weather Charts & Graphs",
            "PWA with Offline Support",
            "Push Notifications",
            "Multiple Location Support",
            "Dark/Light Theme",
            "Accessibility Features",
            "Weather History",
            "Share Weather Reports",
            "Customizable Dashboard",
        ],
        githubUrl: "https://github.com/sorujmahmud/weather-app",
        liveUrl: "https://weather-soruj.vercel.app",
        category: "Frontend",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
        ],
        challenges: [
            "Handling API rate limits and optimizing API calls",
            "Implementing offline functionality with cached data",
            "Creating responsive maps that work on mobile devices",
            "Managing geolocation permissions and fallbacks",
            "Optimizing performance with large weather datasets",
        ],
        solutions: [
            "Implemented efficient caching strategy with service workers",
            "Used IndexedDB for offline data storage and synchronization",
            "Optimized Mapbox integration with mobile touch controls",
            "Provided graceful fallbacks for denied geolocation",
            "Lazy-loaded map components and optimized data fetching",
        ],
        featured: false,
        difficulty: "intermediate",
        duration: "1.5 months",
        teamSize: "Solo",
        completionDate: "2023-09-10",
        createdAt: "2023-07-20",
        updatedAt: "2023-09-15",
        tags: ["weather", "maps", "pwa", "api", "mobile"],
        emoji: "🌤️",
        stats: {
            completionTime: "1.5 months",
            teamSize: "1 developer",
            complexity: "Medium",
            views: 560,
            likes: 38
        },
        architecture: "React PWA with service workers, OpenWeather API integration, Mapbox for interactive maps, IndexedDB for offline storage",
        developmentHighlights: [
            {
                title: "Offline Functionality",
                description: "Implemented robust offline support with cached forecasts and maps"
            },
            {
                title: "Map Integration",
                description: "Created interactive weather maps with multiple data layers"
            },
            {
                title: "PWA Features",
                description: "Built full PWA with install prompt and push notifications"
            }
        ],
        lessonsLearned: [
            "API rate limiting and quota management strategies",
            "Offline-first development approaches",
            "Mobile map interaction patterns",
            "Progressive enhancement techniques"
        ],
        futureImprovements: [
            "Add more weather data sources",
            "Implement social weather sharing",
            "Add weather photography integration",
            "Develop native mobile versions"
        ],
        metaDescription: "Beautiful weather application with forecasts, interactive maps, and PWA features. Built with React and OpenWeather API.",
        seoTitle: "Weather Forecast Application | React PWA",
        performance: {
            loadTime: 90,
            accessibility: 95,
            bestPractices: 92,
            seo: 91
        }
    },
    {
        id: "portfolio-website",
        title: "Personal Portfolio Website",
        description: "Modern, responsive portfolio website with project showcase, blog, and contact integration.",
        fullDescription: "A cutting-edge personal portfolio website built with Next.js 14 and modern web technologies. Features a stunning design with smooth animations, project showcase, blog integration, and contact forms. The website is optimized for performance, accessibility, and SEO, with perfect Lighthouse scores. Includes dark mode, internationalization support, and a fully functional admin dashboard for content management.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "Next.js 14",
            "TypeScript",
            "Tailwind CSS",
            "Framer Motion",
            "NextAuth",
            "MongoDB",
            "React Hook Form",
            "Shadcn UI",
            "Vercel Analytics",
            "Resend",
        ],
        features: [
            "Responsive Design with Mobile-First Approach",
            "Dark/Light Mode Toggle",
            "Smooth Animations & Page Transitions",
            "Project Showcase with Filtering",
            "Blog with Markdown Support",
            "Contact Form with Email Integration",
            "Admin Dashboard for Content Management",
            "SEO Optimized with Meta Tags",
            "Performance Monitoring with Analytics",
            "Accessibility Compliant (WCAG 2.1)",
            "Internationalization Support",
            "PWA Ready with Offline Support",
        ],
        githubUrl: "https://github.com/sorujmahmud/portfolio",
        liveUrl: "https://sorujmahmud.vercel.app",
        category: "Frontend",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
        ],
        challenges: [
            "Achieving perfect Lighthouse scores across all metrics",
            "Implementing smooth animations without performance impact",
            "Creating responsive design that works perfectly on all devices",
            "Optimizing images and assets for fast loading times",
            "Implementing accessible design patterns and keyboard navigation",
        ],
        solutions: [
            "Used Next.js Image component with optimized formats and lazy loading",
            "Implemented Framer Motion with will-change and transform properties",
            "Adopted mobile-first responsive design with Tailwind CSS breakpoints",
            "Configured proper caching strategies and CDN delivery",
            "Followed WCAG guidelines and tested with screen readers",
        ],
        featured: true,
        difficulty: "intermediate",
        duration: "1 month",
        teamSize: "Solo",
        completionDate: "2024-03-05",
        createdAt: "2024-02-01",
        updatedAt: "2024-03-10",
        tags: ["portfolio", "nextjs", "responsive", "seo", "animation"],
        emoji: "🌟",
        stats: {
            completionTime: "1 month",
            teamSize: "1 developer",
            complexity: "Medium",
            views: 1500,
            likes: 120
        },
        architecture: "Next.js App Router with static generation, MongoDB for dynamic content, Vercel for deployment with edge functions",
        developmentHighlights: [
            {
                title: "Performance Excellence",
                description: "Achieved 100/100 Lighthouse scores through optimized images, code splitting, and efficient bundling"
            },
            {
                title: "Animation System",
                description: "Created smooth, performant animations using Framer Motion with gesture support"
            },
            {
                title: "SEO Optimization",
                description: "Implemented comprehensive SEO strategy with structured data and meta tags"
            }
        ],
        lessonsLearned: [
            "Importance of performance optimization from day one",
            "Value of accessibility in modern web development",
            "Benefits of static generation for portfolio sites",
            "Effective use of animations for user engagement"
        ],
        futureImprovements: [
            "Add more interactive 3D elements",
            "Implement blog commenting system",
            "Add portfolio analytics dashboard",
            "Integrate with more social platforms"
        ],
        metaDescription: "Modern portfolio website built with Next.js and TypeScript. Features projects showcase, blog, and responsive design.",
        seoTitle: "Personal Portfolio | Soruj Mahmud - Full Stack Developer",
        performance: {
            loadTime: 100,
            accessibility: 100,
            bestPractices: 100,
            seo: 100
        }
    },
    {
        id: "chat-app",
        title: "Real-time Chat Application",
        description: "Real-time messaging application with rooms, file sharing, and live notifications.",
        fullDescription: "A real-time chat application that enables instant messaging, group conversations, file sharing, and live notifications. Built with Socket.io for real-time communication, the app supports multiple chat rooms, user presence indicators, message history, and secure file uploads. Features include typing indicators, message reactions, user profiles, and comprehensive moderation tools. Perfect for team collaboration or social messaging with enterprise-grade reliability.",
        image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "React",
            "TypeScript",
            "Socket.io",
            "Node.js",
            "Express",
            "MongoDB",
            "JWT",
            "Cloudinary",
            "Tailwind CSS",
            "Redis",
            "Framer Motion",
            "React Query",
        ],
        features: [
            "Real-time Messaging with Socket.io",
            "Multiple Chat Rooms & Direct Messages",
            "File & Image Sharing with Preview",
            "User Presence Indicators",
            "Message History with Pagination",
            "Typing Indicators",
            "Online/Offline Status",
            "Push Notifications",
            "User Authentication & Profiles",
            "Message Reactions & Replies",
            "Message Search & Filtering",
            "Admin Moderation Tools",
            "Responsive Mobile Design",
            "Dark/Light Theme",
        ],
        githubUrl: "https://github.com/sorujmahmud/chat-app",
        liveUrl: "https://chat-soruj.vercel.app",
        category: "Fullstack",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
        ],
        challenges: [
            "Managing real-time connections and handling disconnections gracefully",
            "Handling large-scale message broadcasting to multiple rooms efficiently",
            "Implementing secure file uploads and sharing with proper validation",
            "Maintaining message history consistency and synchronization across clients",
            "Optimizing performance for multiple concurrent users and large message volumes",
            "Implementing reliable delivery receipts and read status",
        ],
        solutions: [
            "Used Socket.io rooms and namespaces for efficient message broadcasting",
            "Implemented Redis for session management, caching, and pub/sub functionality",
            "Integrated Cloudinary with file type validation and virus scanning",
            "Designed efficient MongoDB schema with indexing for message history queries",
            "Optimized frontend with React.memo, useCallback, and virtual scrolling",
            "Implemented message queue system for reliable delivery and status tracking",
        ],
        featured: true,
        difficulty: "advanced",
        duration: "2 months",
        teamSize: "Solo",
        completionDate: "2024-02-10",
        createdAt: "2023-12-01",
        updatedAt: "2024-02-15",
        tags: ["realtime", "websockets", "chat", "collaboration", "nodejs"],
        emoji: "💬",
        stats: {
            completionTime: "2 months",
            teamSize: "1 developer",
            complexity: "High",
            views: 890,
            likes: 67
        },
        architecture: "React frontend with Node.js/Express backend, Socket.io for real-time communication, Redis for session storage, MongoDB for data persistence",
        developmentHighlights: [
            {
                title: "Real-time Architecture",
                description: "Designed scalable real-time architecture supporting thousands of concurrent connections"
            },
            {
                title: "File Handling",
                description: "Implemented secure file upload system with preview capabilities and storage optimization"
            },
            {
                title: "User Experience",
                description: "Created smooth animations and intuitive interface with Framer Motion"
            }
        ],
        lessonsLearned: [
            "WebSocket connection management and error handling",
            "Importance of proper message queuing and delivery guarantees",
            "Security considerations for real-time applications",
            "Performance optimization for high-frequency updates"
        ],
        futureImprovements: [
            "Add video and voice call functionality",
            "Implement end-to-end encryption",
            "Add chatbot integration",
            "Develop mobile applications"
        ],
        metaDescription: "Real-time chat application with Socket.io, React, and Node.js. Features include group chats, file sharing, and live notifications.",
        seoTitle: "Real-time Chat Application | Socket.io & React",
        performance: {
            loadTime: 88,
            accessibility: 94,
            bestPractices: 92,
            seo: 89
        }
    },
    {
        id: "healthcare-platform",
        title: "Telemedicine Healthcare Platform",
        description: "Comprehensive telemedicine platform with video consultations, EHR, and patient management.",
        fullDescription: "A full-featured telemedicine platform that connects patients with healthcare providers through secure video consultations. Includes electronic health records, appointment scheduling, prescription management, and real-time health monitoring. Built with HIPAA compliance and security as top priorities, ensuring patient data protection and privacy throughout the platform.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "React",
            "Node.js",
            "WebRTC",
            "MongoDB",
            "Redis",
            "Docker",
            "AWS",
            "TypeScript",
            "Socket.io",
            "JWT",
            "Stripe",
            "Twilio",
            "Chart.js"
        ],
        features: [
            "Secure Video Consultations",
            "Electronic Health Records (EHR)",
            "Appointment Scheduling",
            "Prescription Management",
            "Real-time Health Monitoring",
            "Patient Portal",
            "Doctor Dashboard",
            "Medical Billing",
            "Health Analytics",
            "Medication Reminders",
            "Lab Results Integration",
            "Multi-language Support",
            "Mobile App",
            "Emergency Services"
        ],
        githubUrl: "https://github.com/sorujmahmud/healthcare-platform",
        liveUrl: "https://healthcare-soruj.vercel.app",
        category: "Fullstack",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1584467735871-8db9ac8e5e3a?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Ensuring HIPAA compliance and data security",
            "Implementing reliable WebRTC video connections",
            "Managing real-time health data synchronization",
            "Handling emergency service integrations",
            "Building intuitive user interfaces for all age groups",
            "Ensuring platform reliability for critical healthcare services"
        ],
        solutions: [
            "Implemented end-to-end encryption and HIPAA-compliant data storage",
            "Used WebRTC with STUN/TURN servers for reliable video calls",
            "Built real-time data sync with conflict resolution mechanisms",
            "Integrated with emergency services APIs with fallback options",
            "Designed accessible UI with large fonts and clear navigation",
            "Implemented comprehensive monitoring and alerting systems"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "9 months",
        teamSize: "8 developers",
        completionDate: "2024-07-20",
        createdAt: "2023-10-15",
        updatedAt: "2024-08-01",
        tags: ["healthcare", "telemedicine", "webRTC", "security", "real-time"],
        emoji: "🏥",
        stats: {
            completionTime: "9 months",
            teamSize: "8 developers",
            complexity: "Very High",
            views: 2200,
            likes: 178
        },
        architecture: "Microservices architecture with React frontend, Node.js backend, WebRTC for video, MongoDB for EHR, Redis for caching, HIPAA-compliant infrastructure",
        developmentHighlights: [
            {
                title: "HIPAA Compliance",
                description: "Successfully built HIPAA-compliant platform with end-to-end encryption and secure data handling"
            },
            {
                title: "Video Infrastructure",
                description: "Implemented reliable WebRTC video consultation system with 99.9% uptime"
            },
            {
                title: "Real-time Monitoring",
                description: "Built comprehensive real-time health monitoring and alert system"
            }
        ],
        lessonsLearned: [
            "Critical importance of data security in healthcare applications",
            "Complexities of building reliable real-time video systems",
            "Regulatory compliance requirements in healthcare technology",
            "Importance of accessibility in healthcare applications"
        ],
        futureImprovements: [
            "Add AI-powered diagnosis assistance",
            "Implement IoT device integration",
            "Add mental health support features",
            "Develop predictive health analytics"
        ],
        metaDescription: "HIPAA-compliant telemedicine platform with video consultations, electronic health records, and real-time health monitoring.",
        seoTitle: "Telemedicine Healthcare Platform | HIPAA Compliant",
        performance: {
            loadTime: 86,
            accessibility: 98,
            bestPractices: 94,
            seo: 92
        }
    },
    {
        id: "food-delivery",
        title: "AI-Powered Food Delivery Platform",
        description: "Intelligent food delivery platform with real-time tracking and personalized recommendations.",
        fullDescription: "A comprehensive food delivery platform that uses AI to provide personalized restaurant recommendations, optimize delivery routes, and enhance user experience. Features include real-time order tracking, multiple payment options, restaurant management dashboard, and intelligent delivery coordination. The platform serves both customers and restaurant partners with seamless operations.",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "React Native",
            "Node.js",
            "MongoDB",
            "Redis",
            "Google Maps API",
            "Stripe",
            "Socket.io",
            "AWS Lambda",
            "TensorFlow.js",
            "Firebase",
            "TypeScript",
            "Docker"
        ],
        features: [
            "AI-Powered Restaurant Recommendations",
            "Real-time Order Tracking",
            "Multiple Payment Options",
            "Restaurant Management Dashboard",
            "Intelligent Delivery Routing",
            "Order History & Analytics",
            "Push Notifications",
            "Multi-language Support",
            "Loyalty Program",
            "Group Ordering",
            "Schedule Orders",
            "Driver Performance Analytics",
            "Customer Support Chat",
            "Food Quality Ratings"
        ],
        githubUrl: "https://github.com/sorujmahmud/food-delivery",
        liveUrl: "https://food-delivery-soruj.vercel.app",
        category: "Mobile",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Optimizing delivery routes in real-time",
            "Handling peak hour order volumes",
            "Managing restaurant and driver coordination",
            "Ensuring accurate delivery time predictions",
            "Implementing reliable payment processing",
            "Maintaining food quality during delivery"
        ],
        solutions: [
            "Implemented Dijkstra's algorithm for optimal route planning",
            "Used Redis for caching and queue management",
            "Built real-time coordination system with Socket.io",
            "Developed ML models for delivery time prediction",
            "Integrated multiple payment gateways with fallback",
            "Created quality assurance protocols and tracking"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "7 months",
        teamSize: "6 developers",
        completionDate: "2024-05-15",
        createdAt: "2023-10-01",
        updatedAt: "2024-06-01",
        tags: ["food-delivery", "mobile", "ai", "real-time", "maps"],
        emoji: "🍕",
        stats: {
            completionTime: "7 months",
            teamSize: "6 developers",
            complexity: "Very High",
            views: 1900,
            likes: 145
        },
        architecture: "React Native mobile app, Node.js microservices, MongoDB for data, Redis for caching and queues, Google Maps for navigation, AWS for scaling",
        developmentHighlights: [
            {
                title: "Route Optimization",
                description: "Built intelligent route optimization system reducing delivery times by 35%"
            },
            {
                title: "Real-time Tracking",
                description: "Implemented accurate real-time order tracking with live updates"
            },
            {
                title: "AI Recommendations",
                description: "Developed personalized restaurant recommendation engine"
            }
        ],
        lessonsLearned: [
            "Importance of real-time coordination in delivery platforms",
            "Challenges of scaling during peak hours",
            "Value of accurate ETA predictions for customer satisfaction",
            "Complexities of multi-party coordination systems"
        ],
        futureImprovements: [
            "Add drone delivery capabilities",
            "Implement voice ordering",
            "Add AR restaurant previews",
            "Develop subscription-based delivery plans"
        ],
        metaDescription: "AI-powered food delivery platform with real-time tracking, intelligent routing, and personalized restaurant recommendations.",
        seoTitle: "Food Delivery Platform | AI-Powered Delivery",
        performance: {
            loadTime: 84,
            accessibility: 94,
            bestPractices: 91,
            seo: 89
        }
    },
    {
        id: "real-estate",
        title: "Smart Real Estate Platform",
        description: "Advanced real estate platform with virtual tours, AI valuation, and property matching.",
        fullDescription: "A comprehensive real estate platform that revolutionizes property search and transactions. Features include 360° virtual tours, AI-powered property valuation, intelligent matching algorithms, and secure transaction management. The platform connects buyers, sellers, and agents with advanced tools for property discovery, valuation, and transaction completion.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "Next.js 14",
            "Three.js",
            "Node.js",
            "PostgreSQL",
            "Redis",
            "AWS",
            "TensorFlow",
            "WebGL",
            "Stripe",
            "Mapbox",
            "TypeScript",
            "Docker"
        ],
        features: [
            "360° Virtual Property Tours",
            "AI-Powered Property Valuation",
            "Intelligent Property Matching",
            "Mortgage Calculator",
            "Neighborhood Analytics",
            "Property Comparison Tools",
            "Document Management",
            "Secure Transaction System",
            "Agent Management Portal",
            "Market Trend Analysis",
            "Property Alerts",
            "Investment Analysis",
            "Legal Document Generation",
            "Mobile Responsive Design"
        ],
        githubUrl: "https://github.com/sorujmahmud/real-estate",
        liveUrl: "https://real-estate-soruj.vercel.app",
        category: "Fullstack",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Creating immersive 360° virtual tours",
            "Building accurate property valuation models",
            "Handling large-scale property data",
            "Ensuring secure transaction processing",
            "Optimizing 3D rendering performance",
            "Integrating with multiple MLS systems"
        ],
        solutions: [
            "Used Three.js and WebGL for high-performance 3D rendering",
            "Trained ML models on historical property data",
            "Implemented efficient data caching and CDN delivery",
            "Built secure escrow and document management",
            "Optimized 3D assets and used lazy loading",
            "Created unified API for MLS system integration"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "8 months",
        teamSize: "7 developers",
        completionDate: "2024-06-30",
        createdAt: "2023-10-20",
        updatedAt: "2024-07-15",
        tags: ["real-estate", "3d", "ai", "virtual-tours", "property"],
        emoji: "🏠",
        stats: {
            completionTime: "8 months",
            teamSize: "7 developers",
            complexity: "Very High",
            views: 1750,
            likes: 132
        },
        architecture: "Next.js frontend with Three.js for 3D, Node.js backend, PostgreSQL for transactions, Redis for caching, AWS for media storage, ML models for valuation",
        developmentHighlights: [
            {
                title: "Virtual Tours",
                description: "Built immersive 360° virtual tours with smooth navigation and interactive elements"
            },
            {
                title: "AI Valuation",
                description: "Developed accurate property valuation models with 95% prediction accuracy"
            },
            {
                title: "Transaction Security",
                description: "Implemented secure transaction system with escrow and document verification"
            }
        ],
        lessonsLearned: [
            "Complexities of 3D rendering in web applications",
            "Importance of accurate property valuation algorithms",
            "Security considerations in real estate transactions",
            "Challenges of integrating with legacy MLS systems"
        ],
        futureImprovements: [
            "Add AR property visualization",
            "Implement blockchain for transactions",
            "Add AI-powered renovation suggestions",
            "Develop neighborhood social features"
        ],
        metaDescription: "Smart real estate platform with virtual tours, AI property valuation, and secure transaction management.",
        seoTitle: "Real Estate Platform | Virtual Tours & AI Valuation",
        performance: {
            loadTime: 83,
            accessibility: 92,
            bestPractices: 90,
            seo: 94
        }
    },
    {
        id: "blockchain-marketplace",
        title: "NFT Marketplace Platform",
        description: "Decentralized NFT marketplace with advanced trading features and community governance.",
        fullDescription: "A cutting-edge NFT marketplace built on blockchain technology, enabling creators to mint, buy, sell, and trade digital assets securely. Features include community governance, royalty management, advanced trading tools, and seamless wallet integration. The platform empowers digital artists and collectors with transparent, decentralized ownership and trading capabilities.",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "Solidity",
            "React",
            "Web3.js",
            "IPFS",
            "Node.js",
            "MongoDB",
            "Hardhat",
            "Ethers.js",
            "TypeScript",
            "Tailwind CSS",
            "OpenZeppelin",
            "The Graph"
        ],
        features: [
            "NFT Minting & Trading",
            "Community Governance",
            "Royalty Management",
            "Auction System",
            "Wallet Integration",
            "Gas Optimization",
            "Marketplace Analytics",
            "Creator Dashboard",
            "Collection Management",
            "Bulk Listing Tools",
            "Rarity Scoring",
            "Social Features",
            "Multi-chain Support",
            "Mobile Responsive"
        ],
        githubUrl: "https://github.com/sorujmahmud/nft-marketplace",
        liveUrl: "https://nft-marketplace-soruj.vercel.app",
        category: "Blockchain",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1639762681057-40897d1b5d6e?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1639762681057-40897d1b5d6e?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Optimizing gas costs for transactions",
            "Ensuring secure smart contract operations",
            "Managing decentralized file storage",
            "Handling high network congestion",
            "Implementing proper royalty distribution",
            "Building intuitive Web3 user experience"
        ],
        solutions: [
            "Used gas optimization techniques and batch transactions",
            "Implemented comprehensive smart contract testing and audits",
            "Integrated IPFS for decentralized file storage",
            "Built layer-2 scaling solutions and gas price prediction",
            "Created automated royalty distribution system",
            "Designed Web2-like UX with clear transaction states"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "6 months",
        teamSize: "4 developers",
        completionDate: "2024-04-10",
        createdAt: "2023-10-01",
        updatedAt: "2024-05-01",
        tags: ["blockchain", "nft", "web3", "solidity", "crypto"],
        emoji: "🖼️",
        stats: {
            completionTime: "6 months",
            teamSize: "4 developers",
            complexity: "Very High",
            views: 1680,
            likes: 156
        },
        architecture: "React frontend with Web3 integration, Solidity smart contracts, IPFS for storage, Node.js backend, The Graph for indexing, Multi-chain support",
        developmentHighlights: [
            {
                title: "Smart Contract Security",
                description: "Built secure, audited smart contracts with comprehensive safety features"
            },
            {
                title: "Gas Optimization",
                description: "Reduced gas costs by 40% through optimization techniques"
            },
            {
                title: "User Experience",
                description: "Created intuitive Web3 experience with clear transaction flows"
            }
        ],
        lessonsLearned: [
            "Importance of comprehensive smart contract testing",
            "Challenges of gas optimization in Ethereum",
            "User experience considerations in Web3 applications",
            "Security best practices in blockchain development"
        ],
        futureImprovements: [
            "Add cross-chain NFT bridging",
            "Implement fractional NFT ownership",
            "Add DAO governance features",
            "Develop mobile dApp version"
        ],
        metaDescription: "Decentralized NFT marketplace with advanced trading, community governance, and secure smart contracts.",
        seoTitle: "NFT Marketplace Platform | Blockchain & Web3",
        performance: {
            loadTime: 82,
            accessibility: 90,
            bestPractices: 89,
            seo: 88
        }
    },
    {
        id: "travel-platform",
        title: "AI Travel Planning Platform",
        description: "Intelligent travel planning with personalized itineraries and real-time recommendations.",
        fullDescription: "An AI-powered travel platform that creates personalized travel experiences based on user preferences, budget, and interests. Features include smart itinerary planning, real-time travel recommendations, booking integration, and social travel features. The platform helps travelers discover unique experiences and optimize their travel plans with intelligent suggestions.",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "Next.js 14",
            "Python",
            "FastAPI",
            "MongoDB",
            "Redis",
            "OpenAI API",
            "Google Maps API",
            "Stripe",
            "AWS",
            "TypeScript",
            "Tailwind CSS",
            "Docker"
        ],
        features: [
            "AI-Powered Itinerary Planning",
            "Personalized Travel Recommendations",
            "Real-time Booking Integration",
            "Budget Optimization",
            "Travel Community",
            "Offline Access",
            "Multi-destination Planning",
            "Weather Integration",
            "Local Experience Discovery",
            "Travel Insurance",
            "Group Travel Planning",
            "Expense Tracking",
            "Photo Sharing",
            "Mobile App"
        ],
        githubUrl: "https://github.com/sorujmahmud/travel-platform",
        liveUrl: "https://travel-soruj.vercel.app",
        category: "AI",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Creating accurate travel recommendations",
            "Integrating multiple booking APIs",
            "Handling real-time travel data",
            "Optimizing itinerary planning algorithms",
            "Managing user preferences and constraints",
            "Ensuring reliable offline functionality"
        ],
        solutions: [
            "Used collaborative filtering and content-based recommendation systems",
            "Built unified API layer for multiple booking providers",
            "Implemented real-time data synchronization",
            "Developed constraint-based optimization algorithms",
            "Created comprehensive user preference modeling",
            "Built robust offline storage and sync system"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "7 months",
        teamSize: "5 developers",
        completionDate: "2024-05-25",
        createdAt: "2023-10-15",
        updatedAt: "2024-06-10",
        tags: ["travel", "ai", "recommendation", "planning", "mobile"],
        emoji: "✈️",
        stats: {
            completionTime: "7 months",
            teamSize: "5 developers",
            complexity: "High",
            views: 1820,
            likes: 167
        },
        architecture: "Next.js frontend, Python FastAPI backend, MongoDB for data, Redis for caching, AI models for recommendations, Multi-service architecture",
        developmentHighlights: [
            {
                title: "AI Planning",
                description: "Built intelligent itinerary planning system with personalized recommendations"
            },
            {
                title: "Real-time Integration",
                description: "Integrated multiple booking APIs with real-time availability"
            },
            {
                title: "Offline Functionality",
                description: "Implemented robust offline access with seamless synchronization"
            }
        ],
        lessonsLearned: [
            "Complexities of travel data integration",
            "Importance of personalized recommendations",
            "Challenges of real-time booking systems",
            "User experience in travel planning applications"
        ],
        futureImprovements: [
            "Add AR navigation features",
            "Implement group travel coordination",
            "Add sustainable travel options",
            "Develop AI travel assistant"
        ],
        metaDescription: "AI-powered travel platform with personalized itineraries, real-time recommendations, and booking integration.",
        seoTitle: "Travel Planning Platform | AI-Powered Itineraries",
        performance: {
            loadTime: 87,
            accessibility: 95,
            bestPractices: 92,
            seo: 93
        }
    },
    {
        id: "fitness-ai-coach",
        title: "AI Personal Fitness Coach",
        description: "Intelligent fitness coaching with real-time form analysis and personalized training plans.",
        fullDescription: "An advanced AI-powered fitness coaching platform that provides personalized workout plans, real-time exercise form analysis, and comprehensive progress tracking. Using computer vision and machine learning, the platform offers professional-level coaching guidance to users at home, making personalized fitness accessible to everyone.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "React Native",
            "Python",
            "TensorFlow",
            "OpenCV",
            "Node.js",
            "MongoDB",
            "Redis",
            "AWS",
            "WebRTC",
            "TypeScript",
            "Firebase",
            "Docker"
        ],
        features: [
            "Real-time Form Analysis",
            "Personalized Workout Plans",
            "Progress Tracking",
            "Nutrition Guidance",
            "Video Coaching",
            "Community Challenges",
            "Wearable Integration",
            "AI Personal Trainer",
            "Exercise Library",
            "Recovery Tracking",
            "Goal Setting",
            "Social Features",
            "Premium Coaching",
            "Offline Workouts"
        ],
        githubUrl: "https://github.com/sorujmahmud/fitness-ai-coach",
        liveUrl: "https://fitness-ai-soruj.vercel.app",
        category: "AI",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1571019614245-c6e2c8b1d0b7?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1571019614245-c6e2c8b1d0b7?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Real-time pose estimation accuracy",
            "Personalized plan generation",
            "Mobile performance optimization",
            "Exercise form validation",
            "User motivation and engagement",
            "Integration with health devices"
        ],
        solutions: [
            "Used MediaPipe with custom model fine-tuning",
            "Implemented reinforcement learning for plan optimization",
            "Optimized mobile inference with model quantization",
            "Built comprehensive form analysis algorithms",
            "Created gamification and social features",
            "Developed unified health data integration"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "8 months",
        teamSize: "6 developers",
        completionDate: "2024-06-20",
        createdAt: "2023-10-20",
        updatedAt: "2024-07-05",
        tags: ["fitness", "ai", "computer-vision", "mobile", "health"],
        emoji: "💪",
        stats: {
            completionTime: "8 months",
            teamSize: "6 developers",
            complexity: "Very High",
            views: 1950,
            likes: 189
        },
        architecture: "React Native mobile app, Python AI services, Node.js backend, MongoDB for user data, Redis for real-time processing, Computer vision for form analysis",
        developmentHighlights: [
            {
                title: "Computer Vision",
                description: "Built accurate real-time pose estimation and form analysis system"
            },
            {
                title: "Personalized Training",
                description: "Developed AI-powered personalized workout plan generation"
            },
            {
                title: "Mobile Optimization",
                description: "Optimized AI models for mobile performance and battery efficiency"
            }
        ],
        lessonsLearned: [
            "Challenges of real-time computer vision on mobile",
            "Importance of accurate form analysis for safety",
            "User engagement strategies in fitness apps",
            "Performance optimization for mobile AI applications"
        ],
        futureImprovements: [
            "Add AR workout guidance",
            "Implement voice coaching",
            "Add mental wellness features",
            "Develop advanced recovery analytics"
        ],
        metaDescription: "AI personal fitness coach with real-time form analysis, personalized training plans, and progress tracking.",
        seoTitle: "AI Fitness Coach | Real-time Form Analysis",
        performance: {
            loadTime: 83,
            accessibility: 96,
            bestPractices: 91,
            seo: 90
        }
    },
    {
        id: "smart-home",
        title: "Smart Home Automation System",
        description: "Comprehensive IoT home automation with AI optimization and voice control.",
        fullDescription: "A complete smart home automation system that integrates IoT devices, AI-powered energy optimization, voice control, and comprehensive home management. The platform enables users to control lighting, security, climate, and entertainment systems through a unified interface with intelligent automation and energy efficiency features.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "React",
            "Node.js",
            "MQTT",
            "MongoDB",
            "Redis",
            "AWS IoT",
            "Python",
            "TensorFlow",
            "WebSocket",
            "TypeScript",
            "Docker",
            "Raspberry Pi"
        ],
        features: [
            "Device Integration & Control",
            "AI Energy Optimization",
            "Voice Control",
            "Security Monitoring",
            "Climate Control",
            "Lighting Automation",
            "Entertainment Systems",
            "Energy Usage Analytics",
            "Remote Access",
            "Scene Creation",
            "Automation Rules",
            "Mobile App",
            "Voice Assistant Integration",
            "Real-time Notifications"
        ],
        githubUrl: "https://github.com/sorujmahmud/smart-home",
        liveUrl: "https://smart-home-soruj.vercel.app",
        category: "IOT",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Integrating diverse IoT protocols",
            "Ensuring system reliability",
            "Real-time device coordination",
            "Energy optimization algorithms",
            "Security and privacy",
            "Voice control accuracy"
        ],
        solutions: [
            "Built multi-protocol gateway with MQTT bridge",
            "Implemented redundancy and failover systems",
            "Used real-time event processing with Redis",
            "Developed ML models for energy optimization",
            "Implemented end-to-end encryption",
            "Integrated multiple voice recognition services"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "9 months",
        teamSize: "7 developers",
        completionDate: "2024-07-15",
        createdAt: "2023-10-25",
        updatedAt: "2024-08-01",
        tags: ["iot", "smart-home", "automation", "ai", "energy"],
        emoji: "🏠",
        stats: {
            completionTime: "9 months",
            teamSize: "7 developers",
            complexity: "Very High",
            views: 1720,
            likes: 154
        },
        architecture: "React frontend, Node.js backend with MQTT, MongoDB for device state, Redis for real-time events, AWS IoT for device management, AI services for optimization",
        developmentHighlights: [
            {
                title: "IoT Integration",
                description: "Built comprehensive IoT device integration supporting multiple protocols"
            },
            {
                title: "Energy Optimization",
                description: "Developed AI-powered energy optimization reducing consumption by 25%"
            },
            {
                title: "Voice Control",
                description: "Implemented reliable voice control with multi-assistant support"
            }
        ],
        lessonsLearned: [
            "Complexities of IoT device integration",
            "Importance of system reliability in home automation",
            "Energy optimization challenges in smart homes",
            "Security considerations in connected devices"
        ],
        futureImprovements: [
            "Add predictive maintenance",
            "Implement blockchain for security",
            "Add social energy sharing",
            "Develop emergency response features"
        ],
        metaDescription: "Smart home automation system with IoT integration, AI energy optimization, and voice control.",
        seoTitle: "Smart Home Automation | IoT & AI Optimization",
        performance: {
            loadTime: 85,
            accessibility: 93,
            bestPractices: 92,
            seo: 91
        }
    },
    {
        id: "education-platform",
        title: "Interactive Education Platform",
        description: "Modern education platform with gamified learning and AI tutoring.",
        fullDescription: "A comprehensive education platform that transforms learning through gamification, AI-powered tutoring, and interactive content. The platform serves students of all ages with personalized learning paths, real-time progress tracking, and engaging educational games that make learning fun and effective.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "Next.js 14",
            "Node.js",
            "MongoDB",
            "Redis",
            "OpenAI API",
            "WebRTC",
            "Phaser.js",
            "TypeScript",
            "Tailwind CSS",
            "Stripe",
            "AWS",
            "Docker"
        ],
        features: [
            "Gamified Learning",
            "AI Tutoring",
            "Interactive Lessons",
            "Progress Tracking",
            "Skill Assessment",
            "Parent Dashboard",
            "Teacher Portal",
            "Multi-subject Support",
            "Real-time Collaboration",
            "Achievement System",
            "Adaptive Learning",
            "Mobile App",
            "Offline Access",
            "Community Features"
        ],
        githubUrl: "https://github.com/sorujmahmud/education-platform",
        liveUrl: "https://education-soruj.vercel.app",
        category: "Fullstack",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Creating engaging educational games",
            "Personalizing learning paths",
            "Real-time progress tracking",
            "Multi-age content adaptation",
            "Teacher-student coordination",
            "Maintaining educational quality"
        ],
        solutions: [
            "Used Phaser.js for interactive educational games",
            "Implemented adaptive learning algorithms",
            "Built real-time analytics and reporting",
            "Created age-appropriate content scaling",
            "Developed comprehensive teacher tools",
            "Partnered with educational experts for content"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "10 months",
        teamSize: "8 developers",
        completionDate: "2024-08-10",
        createdAt: "2023-10-30",
        updatedAt: "2024-08-20",
        tags: ["education", "gamification", "ai", "learning", "interactive"],
        emoji: "🎓",
        stats: {
            completionTime: "10 months",
            teamSize: "8 developers",
            complexity: "Very High",
            views: 1880,
            likes: 176
        },
        architecture: "Next.js frontend, Node.js backend, MongoDB for user data, Redis for caching, Phaser.js for games, AI services for tutoring, Multi-tenant architecture",
        developmentHighlights: [
            {
                title: "Gamified Learning",
                description: "Built engaging educational games that increased learning retention by 40%"
            },
            {
                title: "AI Tutoring",
                description: "Developed personalized AI tutoring system adapting to individual learning styles"
            },
            {
                title: "Progress Analytics",
                description: "Created comprehensive progress tracking and analytics for students and parents"
            }
        ],
        lessonsLearned: [
            "Importance of engagement in educational technology",
            "Challenges of personalized learning at scale",
            "Balancing entertainment and education",
            "Teacher adoption of new educational tools"
        ],
        futureImprovements: [
            "Add VR learning experiences",
            "Implement peer-to-peer tutoring",
            "Add career path guidance",
            "Develop advanced parent analytics"
        ],
        metaDescription: "Interactive education platform with gamified learning, AI tutoring, and personalized learning paths.",
        seoTitle: "Education Platform | Gamified Learning & AI Tutoring",
        performance: {
            loadTime: 86,
            accessibility: 97,
            bestPractices: 93,
            seo: 95
        }
    },
    {
        id: "finance-tracker",
        title: "AI Personal Finance Tracker",
        description: "Intelligent personal finance management with AI insights and investment guidance.",
        fullDescription: "A comprehensive personal finance platform that uses AI to provide intelligent financial insights, investment guidance, and automated expense tracking. The platform helps users manage their finances, optimize savings, and make informed investment decisions with personalized recommendations and predictive analytics.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "React Native",
            "Node.js",
            "MongoDB",
            "Redis",
            "Python",
            "TensorFlow",
            "Plaid API",
            "Stripe",
            "TypeScript",
            "AWS",
            "Docker",
            "Chart.js"
        ],
        features: [
            "AI Financial Insights",
            "Expense Tracking",
            "Investment Guidance",
            "Budget Planning",
            "Bill Reminders",
            "Credit Score Monitoring",
            "Tax Optimization",
            "Goal Setting",
            "Portfolio Management",
            "Multi-currency Support",
            "Bank Integration",
            "Security Alerts",
            "Mobile App",
            "Offline Access"
        ],
        githubUrl: "https://github.com/sorujmahmud/finance-tracker",
        liveUrl: "https://finance-soruj.vercel.app",
        category: "AI",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Secure financial data handling",
            "Accurate expense categorization",
            "Investment recommendation accuracy",
            "Real-time market data integration",
            "Multi-bank account synchronization",
            "Financial regulatory compliance"
        ],
        solutions: [
            "Implemented bank-level encryption and security",
            "Used ML models for automatic expense categorization",
            "Developed risk-adjusted investment algorithms",
            "Built real-time market data pipelines",
            "Created unified banking API integration",
            "Ensured compliance with financial regulations"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "8 months",
        teamSize: "6 developers",
        completionDate: "2024-06-30",
        createdAt: "2023-10-25",
        updatedAt: "2024-07-15",
        tags: ["finance", "ai", "investment", "mobile", "security"],
        emoji: "💰",
        stats: {
            completionTime: "8 months",
            teamSize: "6 developers",
            complexity: "Very High",
            views: 1920,
            likes: 168
        },
        architecture: "React Native mobile app, Node.js backend, MongoDB for financial data, Redis for caching, Python AI services, Plaid for bank integration, Secure architecture",
        developmentHighlights: [
            {
                title: "AI Financial Insights",
                description: "Built intelligent financial insights and personalized recommendations"
            },
            {
                title: "Bank Integration",
                description: "Securely integrated with multiple banking institutions"
            },
            {
                title: "Investment Guidance",
                description: "Developed risk-aware investment recommendation system"
            }
        ],
        lessonsLearned: [
            "Critical importance of security in financial applications",
            "Challenges of accurate financial data categorization",
            "Regulatory considerations in fintech",
            "User trust in financial applications"
        ],
        futureImprovements: [
            "Add cryptocurrency tracking",
            "Implement retirement planning",
            "Add insurance comparison",
            "Develop family finance features"
        ],
        metaDescription: "AI personal finance tracker with intelligent insights, investment guidance, and automated expense management.",
        seoTitle: "Personal Finance Tracker | AI Financial Insights",
        performance: {
            loadTime: 84,
            accessibility: 94,
            bestPractices: 91,
            seo: 89
        }
    },
    {
        id: "blockchain-supply-chain",
        title: "Blockchain Supply Chain Platform",
        description: "Transparent supply chain solution using blockchain for product traceability and authenticity.",
        fullDescription: "A comprehensive blockchain-based supply chain platform that provides end-to-end product traceability, authenticity verification, and transparent logistics. The system enables businesses to track products from raw materials to end consumers, ensuring quality control, reducing fraud, and building consumer trust through immutable blockchain records.",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "Solidity",
            "React",
            "Web3.js",
            "IPFS",
            "Node.js",
            "MongoDB",
            "Hardhat",
            "Ethers.js",
            "TypeScript",
            "Tailwind CSS",
            "The Graph",
            "Docker"
        ],
        features: [
            "Product Traceability",
            "Smart Contract Verification",
            "Quality Assurance",
            "Transparent Logistics",
            "Supplier Management",
            "Batch Tracking",
            "Quality Certification",
            "Real-time Monitoring",
            "Automated Compliance",
            "Fraud Detection",
            "Sustainability Tracking",
            "Multi-party Access",
            "Mobile App",
            "Analytics Dashboard"
        ],
        githubUrl: "https://github.com/sorujmahmud/blockchain-supply-chain",
        liveUrl: "https://supply-chain-soruj.vercel.app",
        category: "Blockchain",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1639762681057-40897d1b5d6e?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1639762681057-40897d1b5d6e?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Integrating with existing supply chain systems",
            "Ensuring data privacy while maintaining transparency",
            "Handling high transaction volumes",
            "Managing multi-party access control",
            "Ensuring real-time data synchronization",
            "Building intuitive user interfaces for non-technical users"
        ],
        solutions: [
            "Built flexible API integration layer for legacy systems",
            "Implemented zero-knowledge proofs for sensitive data",
            "Used layer-2 scaling solutions for high throughput",
            "Developed sophisticated access control mechanisms",
            "Created real-time event streaming architecture",
            "Designed user-friendly interfaces with clear data visualization"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "8 months",
        teamSize: "7 developers",
        completionDate: "2024-07-20",
        createdAt: "2023-11-15",
        updatedAt: "2024-08-05",
        tags: ["blockchain", "supply-chain", "traceability", "transparency", "enterprise"],
        emoji: "⛓️",
        stats: {
            completionTime: "8 months",
            teamSize: "7 developers",
            complexity: "Very High",
            views: 1650,
            likes: 142
        },
        architecture: "React frontend with Web3 integration, Solidity smart contracts, IPFS for document storage, Node.js backend, The Graph for indexing, Multi-chain support",
        developmentHighlights: [
            {
                title: "End-to-End Traceability",
                description: "Built complete product journey tracking from raw materials to end consumer"
            },
            {
                title: "Smart Contract Automation",
                description: "Automated quality verification and compliance through smart contracts"
            },
            {
                title: "Multi-party Coordination",
                description: "Enabled seamless coordination between multiple supply chain participants"
            }
        ],
        lessonsLearned: [
            "Complexities of integrating blockchain with legacy systems",
            "Importance of user experience in enterprise blockchain applications",
            "Challenges of data privacy in transparent systems",
            "Scalability considerations in supply chain applications"
        ],
        futureImprovements: [
            "Add IoT sensor integration",
            "Implement AI-powered risk prediction",
            "Add sustainability scoring",
            "Develop cross-border compliance features"
        ],
        metaDescription: "Blockchain supply chain platform providing end-to-end product traceability and transparent logistics.",
        seoTitle: "Blockchain Supply Chain | Product Traceability Platform",
        performance: {
            loadTime: 83,
            accessibility: 91,
            bestPractices: 90,
            seo: 89
        }
    },
    {
        id: "ai-content-creator",
        title: "AI Content Creation Platform",
        description: "Comprehensive content creation tool with AI writing assistance and SEO optimization.",
        fullDescription: "An advanced AI-powered content creation platform that assists writers, marketers, and businesses in creating high-quality content. Features include AI writing assistance, SEO optimization, content planning, multi-format export, and performance analytics. The platform leverages cutting-edge language models to enhance creativity and productivity.",
        image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "Next.js 14",
            "TypeScript",
            "OpenAI API",
            "Node.js",
            "MongoDB",
            "Redis",
            "Tailwind CSS",
            "Stripe",
            "AWS",
            "Elasticsearch",
            "Docker",
            "Chart.js"
        ],
        features: [
            "AI Writing Assistant",
            "SEO Optimization",
            "Content Planning",
            "Multi-format Export",
            "Performance Analytics",
            "Plagiarism Checker",
            "Tone Adjustment",
            "Content Templates",
            "Collaborative Editing",
            "Brand Voice Training",
            "Social Media Integration",
            "Content Calendar",
            "Multi-language Support",
            "Mobile App"
        ],
        githubUrl: "https://github.com/sorujmahmud/ai-content-creator",
        liveUrl: "https://content-creator-soruj.vercel.app",
        category: "AI",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Maintaining content quality with AI generation",
            "Ensuring SEO recommendations are actionable",
            "Handling large content libraries",
            "Real-time collaborative editing",
            "Multi-language content generation",
            "Brand voice consistency"
        ],
        solutions: [
            "Implemented quality control algorithms and human review workflows",
            "Built comprehensive SEO analysis with actionable insights",
            "Used Elasticsearch for efficient content search and management",
            "Implemented operational transform for real-time collaboration",
            "Developed multi-language models with cultural context",
            "Created brand voice training and consistency checking"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "7 months",
        teamSize: "5 developers",
        completionDate: "2024-05-30",
        createdAt: "2023-10-25",
        updatedAt: "2024-06-20",
        tags: ["ai", "content-creation", "seo", "writing", "collaboration"],
        emoji: "✍️",
        stats: {
            completionTime: "7 months",
            teamSize: "5 developers",
            complexity: "High",
            views: 1780,
            likes: 154
        },
        architecture: "Next.js frontend, Node.js backend, MongoDB for content, Redis for caching, OpenAI integration, Elasticsearch for search, Real-time collaboration",
        developmentHighlights: [
            {
                title: "AI Writing Assistance",
                description: "Built sophisticated AI writing assistant with context-aware suggestions"
            },
            {
                title: "SEO Optimization",
                description: "Developed comprehensive SEO analysis and optimization tools"
            },
            {
                title: "Collaborative Features",
                description: "Implemented real-time collaborative editing with version control"
            }
        ],
        lessonsLearned: [
            "Balancing AI assistance with human creativity",
            "Importance of actionable SEO recommendations",
            "Challenges of real-time content collaboration",
            "Maintaining brand voice across AI-generated content"
        ],
        futureImprovements: [
            "Add video content creation",
            "Implement voice-to-content features",
            "Add advanced analytics",
            "Develop content distribution automation"
        ],
        metaDescription: "AI content creation platform with writing assistance, SEO optimization, and collaborative editing features.",
        seoTitle: "AI Content Creator | Writing Assistant & SEO Optimization",
        performance: {
            loadTime: 87,
            accessibility: 95,
            bestPractices: 92,
            seo: 96
        }
    },
    {
        id: "smart-farming",
        title: "IoT Smart Farming System",
        description: "Comprehensive IoT solution for precision agriculture with automated monitoring.",
        fullDescription: "An advanced IoT-based smart farming system that enables precision agriculture through automated monitoring, data analytics, and intelligent automation. The platform helps farmers optimize crop yields, reduce resource consumption, and make data-driven decisions through real-time sensor data, predictive analytics, and automated control systems.",
        image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "React Native",
            "Node.js",
            "MQTT",
            "MongoDB",
            "Redis",
            "AWS IoT",
            "Python",
            "TensorFlow",
            "Docker",
            "TypeScript",
            "Chart.js",
            "Mapbox"
        ],
        features: [
            "Crop Monitoring",
            "Automated Irrigation",
            "Soil Analysis",
            "Yield Prediction",
            "Weather Integration",
            "Pest Detection",
            "Equipment Monitoring",
            "Resource Optimization",
            "Mobile Alerts",
            "Historical Analytics",
            "Multi-farm Management",
            "Supply Chain Integration",
            "Mobile App",
            "Offline Operation"
        ],
        githubUrl: "https://github.com/sorujmahmud/smart-farming",
        liveUrl: "https://smart-farming-soruj.vercel.app",
        category: "IOT",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Operating in remote areas with limited connectivity",
            "Handling diverse environmental conditions",
            "Ensuring system reliability for critical farming operations",
            "Integrating with existing agricultural equipment",
            "Processing large volumes of sensor data",
            "Providing actionable insights to farmers"
        ],
        solutions: [
            "Built offline-first architecture with sync capabilities",
            "Designed robust hardware for harsh environments",
            "Implemented redundancy and failover systems",
            "Created universal equipment integration protocols",
            "Used edge computing for local data processing",
            "Developed intuitive dashboards with clear recommendations"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "9 months",
        teamSize: "8 developers",
        completionDate: "2024-08-15",
        createdAt: "2023-11-20",
        updatedAt: "2024-08-25",
        tags: ["iot", "agriculture", "smart-farming", "automation", "analytics"],
        emoji: "🌱",
        stats: {
            completionTime: "9 months",
            teamSize: "8 developers",
            complexity: "Very High",
            views: 1520,
            likes: 138
        },
        architecture: "React Native mobile app, Node.js backend with MQTT, MongoDB for farm data, Redis for real-time processing, AWS IoT for device management, Edge computing",
        developmentHighlights: [
            {
                title: "Precision Agriculture",
                description: "Enabled precision farming through detailed sensor data and analytics"
            },
            {
                title: "Resource Optimization",
                description: "Reduced water and fertilizer usage by 30% through intelligent automation"
            },
            {
                title: "Offline Operation",
                description: "Built robust offline functionality for remote farming operations"
            }
        ],
        lessonsLearned: [
            "Challenges of IoT in remote agricultural settings",
            "Importance of reliability in farming operations",
            "User interface design for non-technical farmers",
            "Integration complexities with agricultural equipment"
        ],
        futureImprovements: [
            "Add drone integration for aerial monitoring",
            "Implement blockchain for supply chain",
            "Add crop disease prediction",
            "Develop automated harvesting features"
        ],
        metaDescription: "IoT smart farming system for precision agriculture with automated monitoring and resource optimization.",
        seoTitle: "Smart Farming System | IoT Agriculture Platform",
        performance: {
            loadTime: 82,
            accessibility: 92,
            bestPractices: 89,
            seo: 88
        }
    },
    {
        id: "mental-health-app",
        title: "AI Mental Health Companion",
        description: "Intelligent mental health support app with mood tracking and personalized therapy.",
        fullDescription: "A comprehensive mental health application that provides AI-powered support, mood tracking, personalized therapy sessions, and community features. The platform offers evidence-based therapeutic techniques, crisis support, and progress tracking to help users manage their mental wellbeing with professional-grade tools and compassionate AI assistance.",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "React Native",
            "Node.js",
            "MongoDB",
            "Redis",
            "OpenAI API",
            "AWS",
            "TypeScript",
            "Stripe",
            "Twilio",
            "Docker",
            "Chart.js",
            "Firebase"
        ],
        features: [
            "Mood Tracking",
            "AI Therapy Sessions",
            "Crisis Support",
            "Progress Analytics",
            "Meditation Guides",
            "Sleep Tracking",
            "Community Support",
            "Professional Matching",
            "Journaling",
            "Goal Setting",
            "Emergency Contacts",
            "Multi-language Support",
            "Offline Access",
            "Privacy Focused"
        ],
        githubUrl: "https://github.com/sorujmahmud/mental-health-app",
        liveUrl: "https://mental-health-soruj.vercel.app",
        category: "Mobile",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Ensuring user privacy and data security",
            "Providing accurate mental health support",
            "Creating empathetic AI interactions",
            "Handling crisis situations appropriately",
            "Maintaining clinical accuracy",
            "Building trust with users"
        ],
        solutions: [
            "Implemented end-to-end encryption and anonymous usage",
            "Trained AI on clinical therapeutic techniques",
            "Developed empathetic response generation algorithms",
            "Built comprehensive crisis detection and escalation protocols",
            "Partnered with mental health professionals for validation",
            "Created transparent privacy policies and user controls"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "8 months",
        teamSize: "6 developers",
        completionDate: "2024-06-25",
        createdAt: "2023-10-30",
        updatedAt: "2024-07-10",
        tags: ["mental-health", "ai", "mobile", "therapy", "privacy"],
        emoji: "🧠",
        stats: {
            completionTime: "8 months",
            teamSize: "6 developers",
            complexity: "Very High",
            views: 1680,
            likes: 145
        },
        architecture: "React Native mobile app, Node.js backend, MongoDB for user data, Redis for sessions, AI services for therapy, Secure encrypted architecture",
        developmentHighlights: [
            {
                title: "AI Therapy",
                description: "Built evidence-based AI therapy sessions with empathetic responses"
            },
            {
                title: "Crisis Support",
                description: "Implemented comprehensive crisis detection and support escalation"
            },
            {
                title: "Privacy Protection",
                description: "Designed privacy-first architecture with end-to-end encryption"
            }
        ],
        lessonsLearned: [
            "Critical importance of privacy in mental health applications",
            "Challenges of creating empathetic AI interactions",
            "Ethical considerations in mental health technology",
            "Importance of professional validation in therapeutic tools"
        ],
        futureImprovements: [
            "Add group therapy sessions",
            "Implement wearable integration",
            "Add family support features",
            "Develop advanced analytics for therapists"
        ],
        metaDescription: "AI mental health companion with mood tracking, therapy sessions, and crisis support features.",
        seoTitle: "Mental Health App | AI Therapy & Support",
        performance: {
            loadTime: 85,
            accessibility: 98,
            bestPractices: 93,
            seo: 90
        }
    },
    {
        id: "blockchain-voting",
        title: "Blockchain Voting System",
        description: "Secure and transparent voting platform using blockchain technology.",
        fullDescription: "A secure and transparent blockchain-based voting system that ensures election integrity, voter privacy, and verifiable results. The platform enables organizations, governments, and communities to conduct elections with unprecedented security, transparency, and accessibility while maintaining voter anonymity and preventing fraud.",
        image: "https://images.unsplash.com/photo-1540910419892-4a36d2c326da?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "Solidity",
            "React",
            "Web3.js",
            "Node.js",
            "MongoDB",
            "IPFS",
            "Hardhat",
            "TypeScript",
            "Tailwind CSS",
            "Zero-Knowledge Proofs",
            "Docker",
            "The Graph"
        ],
        features: [
            "Secure Voting",
            "Transparent Results",
            "Voter Authentication",
            "Real-time Tallying",
            "Audit Trail",
            "Multi-election Support",
            "Voter Privacy",
            "Result Verification",
            "Admin Dashboard",
            "Mobile Voting",
            "Accessibility Features",
            "Multi-language Support",
            "Offline Voting",
            "Result Analytics"
        ],
        githubUrl: "https://github.com/sorujmahmud/blockchain-voting",
        liveUrl: "https://voting-soruj.vercel.app",
        category: "Blockchain",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1540910419892-4a36d2c326da?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1540910419892-4a36d2c326da?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1540910419892-4a36d2c326da?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1540910419892-4a36d2c326da?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1540910419892-4a36d2c326da?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Ensuring voter privacy while maintaining transparency",
            "Preventing double voting and fraud",
            "Handling large-scale elections",
            "Building accessible voting interfaces",
            "Ensuring system reliability during elections",
            "Complying with election regulations"
        ],
        solutions: [
            "Implemented zero-knowledge proofs for voter privacy",
            "Used unique voter identification with blockchain verification",
            "Built scalable architecture with layer-2 solutions",
            "Designed accessible UI with multiple voting methods",
            "Created redundant systems and failover mechanisms",
            "Partnered with election law experts for compliance"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "7 months",
        teamSize: "5 developers",
        completionDate: "2024-05-20",
        createdAt: "2023-10-15",
        updatedAt: "2024-06-05",
        tags: ["blockchain", "voting", "security", "transparency", "elections"],
        emoji: "🗳️",
        stats: {
            completionTime: "7 months",
            teamSize: "5 developers",
            complexity: "Very High",
            views: 1420,
            likes: 128
        },
        architecture: "React frontend, Solidity smart contracts, Node.js backend, IPFS for document storage, Zero-knowledge proofs for privacy, Multi-chain deployment",
        developmentHighlights: [
            {
                title: "Voter Privacy",
                description: "Implemented zero-knowledge proofs to ensure voter anonymity"
            },
            {
                title: "Election Integrity",
                description: "Built tamper-proof voting system with verifiable results"
            },
            {
                title: "Accessibility",
                description: "Created accessible voting interfaces for all users"
            }
        ],
        lessonsLearned: [
            "Complexities of balancing privacy and transparency in voting",
            "Importance of accessibility in democratic processes",
            "Security considerations in election systems",
            "Regulatory challenges in digital voting"
        ],
        futureImprovements: [
            "Add biometric verification",
            "Implement cross-border voting",
            "Add advanced result analytics",
            "Develop mobile voting apps"
        ],
        metaDescription: "Blockchain voting system ensuring secure, transparent, and verifiable elections with voter privacy.",
        seoTitle: "Blockchain Voting System | Secure Election Platform",
        performance: {
            loadTime: 84,
            accessibility: 97,
            bestPractices: 91,
            seo: 89
        }
    },
    {
        id: "ai-recruitment",
        title: "AI Recruitment Platform",
        description: "Intelligent recruitment system with automated screening and candidate matching.",
        fullDescription: "An advanced AI-powered recruitment platform that automates candidate screening, job matching, and interview scheduling. The system uses machine learning to analyze resumes, assess candidate fit, and predict hiring success, helping companies find the right talent efficiently while reducing bias and improving hiring outcomes.",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "Next.js 14",
            "Python",
            "FastAPI",
            "MongoDB",
            "Redis",
            "OpenAI API",
            "TensorFlow",
            "TypeScript",
            "Tailwind CSS",
            "Stripe",
            "AWS",
            "Docker"
        ],
        features: [
            "AI Candidate Screening",
            "Job Matching Algorithm",
            "Automated Interview Scheduling",
            "Bias Detection",
            "Skill Assessment",
            "Candidate Analytics",
            "Employer Dashboard",
            "Candidate Portal",
            "Video Interview Integration",
            "Reference Checking",
            "Offer Management",
            "Multi-language Support",
            "Mobile App",
            "Analytics Dashboard"
        ],
        githubUrl: "https://github.com/sorujmahmud/ai-recruitment",
        liveUrl: "https://recruitment-soruj.vercel.app",
        category: "AI",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Reducing bias in candidate screening",
            "Handling diverse resume formats",
            "Ensuring data privacy compliance",
            "Accurate job-candidate matching",
            "Integration with existing HR systems",
            "Maintaining human oversight in AI decisions"
        ],
        solutions: [
            "Implemented bias detection and mitigation algorithms",
            "Built robust resume parsing with format agnostic processing",
            "Ensured GDPR and privacy regulation compliance",
            "Developed multi-factor matching algorithms",
            "Created flexible API integration framework",
            "Built human-in-the-loop review systems"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "8 months",
        teamSize: "6 developers",
        completionDate: "2024-07-10",
        createdAt: "2023-11-10",
        updatedAt: "2024-07-25",
        tags: ["ai", "recruitment", "hr", "automation", "matching"],
        emoji: "💼",
        stats: {
            completionTime: "8 months",
            teamSize: "6 developers",
            complexity: "High",
            views: 1750,
            likes: 152
        },
        architecture: "Next.js frontend, Python FastAPI backend, MongoDB for candidate data, Redis for caching, AI models for screening, Multi-tenant architecture",
        developmentHighlights: [
            {
                title: "AI Screening",
                description: "Built intelligent candidate screening with bias detection"
            },
            {
                title: "Job Matching",
                description: "Developed accurate job-candidate matching algorithms"
            },
            {
                title: "Automation",
                description: "Automated recruitment workflows reducing hiring time by 60%"
            }
        ],
        lessonsLearned: [
            "Importance of bias mitigation in AI recruitment",
            "Challenges of resume format diversity",
            "Data privacy considerations in recruitment",
            "Balancing automation with human judgment"
        ],
        futureImprovements: [
            "Add video interview analysis",
            "Implement predictive hiring success",
            "Add diversity analytics",
            "Develop candidate experience features"
        ],
        metaDescription: "AI recruitment platform with automated screening, job matching, and bias detection features.",
        seoTitle: "AI Recruitment Platform | Automated Hiring System",
        performance: {
            loadTime: 86,
            accessibility: 94,
            bestPractices: 92,
            seo: 91
        }
    },
    {
        id: "smart-energy",
        title: "Smart Energy Management System",
        description: "AI-powered energy management with optimization and real-time monitoring.",
        fullDescription: "A comprehensive smart energy management system that uses AI to optimize energy consumption, integrate renewable sources, and provide real-time monitoring. The platform helps businesses and homeowners reduce energy costs, improve sustainability, and make data-driven decisions about energy usage and generation.",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "React",
            "Node.js",
            "MongoDB",
            "Redis",
            "Python",
            "TensorFlow",
            "MQTT",
            "AWS IoT",
            "TypeScript",
            "Docker",
            "Chart.js",
            "Mapbox"
        ],
        features: [
            "Energy Consumption Monitoring",
            "AI Optimization",
            "Renewable Integration",
            "Cost Analytics",
            "Real-time Alerts",
            "Predictive Maintenance",
            "Carbon Footprint Tracking",
            "Multi-site Management",
            "Mobile App",
            "Automated Control",
            "Weather Integration",
            "Energy Trading",
            "Reporting Dashboard",
            "Offline Operation"
        ],
        githubUrl: "https://github.com/sorujmahmud/smart-energy",
        liveUrl: "https://smart-energy-soruj.vercel.app",
        category: "IOT",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Integrating diverse energy systems",
            "Real-time data processing from multiple sources",
            "Energy optimization algorithms",
            "Predictive maintenance accuracy",
            "Handling energy grid constraints",
            "User-friendly energy analytics"
        ],
        solutions: [
            "Built universal energy system integration framework",
            "Used real-time stream processing with complex event processing",
            "Developed ML models for energy consumption optimization",
            "Implemented predictive maintenance with sensor fusion",
            "Created grid-aware energy management algorithms",
            "Designed intuitive dashboards with actionable insights"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "9 months",
        teamSize: "7 developers",
        completionDate: "2024-08-20",
        createdAt: "2023-11-25",
        updatedAt: "2024-08-30",
        tags: ["energy", "iot", "ai", "sustainability", "automation"],
        emoji: "⚡",
        stats: {
            completionTime: "9 months",
            teamSize: "7 developers",
            complexity: "Very High",
            views: 1480,
            likes: 134
        },
        architecture: "React frontend, Node.js backend with MQTT, MongoDB for energy data, Redis for real-time processing, Python AI services, AWS IoT for device management",
        developmentHighlights: [
            {
                title: "Energy Optimization",
                description: "Reduced energy costs by 25% through AI-powered optimization"
            },
            {
                title: "Renewable Integration",
                description: "Seamlessly integrated renewable energy sources with grid management"
            },
            {
                title: "Predictive Analytics",
                description: "Built accurate predictive maintenance and consumption forecasting"
            }
        ],
        lessonsLearned: [
            "Complexities of energy system integration",
            "Importance of real-time data in energy management",
            "Challenges of energy optimization algorithms",
            "User interface design for complex energy data"
        ],
        futureImprovements: [
            "Add blockchain for energy trading",
            "Implement microgrid management",
            "Add electric vehicle integration",
            "Develop community energy sharing"
        ],
        metaDescription: "Smart energy management system with AI optimization, renewable integration, and real-time monitoring.",
        seoTitle: "Smart Energy Management | AI Optimization Platform",
        performance: {
            loadTime: 83,
            accessibility: 93,
            bestPractices: 90,
            seo: 89
        }
    },
    {
        id: "ar-shopping",
        title: "AR Shopping Experience Platform",
        description: "Augmented reality shopping with virtual try-ons and product visualization.",
        fullDescription: "An innovative augmented reality shopping platform that enables customers to virtually try products, visualize items in their space, and make informed purchasing decisions. The platform uses advanced computer vision and AR technology to create immersive shopping experiences that bridge the gap between online and physical retail.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "React Native",
            "ARKit",
            "ARCore",
            "Three.js",
            "Node.js",
            "MongoDB",
            "Redis",
            "AWS",
            "TypeScript",
            "WebGL",
            "TensorFlow",
            "Docker"
        ],
        features: [
            "Virtual Try-On",
            "Product Visualization",
            "AR Fitting Room",
            "Size Recommendation",
            "Style Matching",
            "Social Sharing",
            "Wishlist Management",
            "Real-time Inventory",
            "Multi-brand Support",
            "Mobile App",
            "Offline AR",
            "3D Product Models",
            "Personalized Recommendations",
            "Purchase Integration"
        ],
        githubUrl: "https://github.com/sorujmahmud/ar-shopping",
        liveUrl: "https://ar-shopping-soruj.vercel.app",
        category: "Mobile",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Accurate virtual try-on technology",
            "3D model optimization for mobile",
            "Realistic product visualization",
            "Cross-platform AR compatibility",
            "Size and fit accuracy",
            "Performance optimization for AR"
        ],
        solutions: [
            "Used advanced computer vision for body tracking",
            "Optimized 3D models with LOD and compression",
            "Implemented realistic lighting and material rendering",
            "Built cross-platform AR with fallback options",
            "Developed accurate size prediction algorithms",
            "Optimized AR performance with efficient rendering"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "10 months",
        teamSize: "8 developers",
        completionDate: "2024-09-05",
        createdAt: "2023-11-30",
        updatedAt: "2024-09-15",
        tags: ["ar", "shopping", "mobile", "computer-vision", "3d"],
        emoji: "🛍️",
        stats: {
            completionTime: "10 months",
            teamSize: "8 developers",
            complexity: "Very High",
            views: 1920,
            likes: 178
        },
        architecture: "React Native with AR capabilities, Node.js backend, MongoDB for product data, Redis for caching, 3D model processing pipeline, Multi-platform AR support",
        developmentHighlights: [
            {
                title: "Virtual Try-On",
                description: "Built accurate virtual try-on technology with realistic rendering"
            },
            {
                title: "AR Visualization",
                description: "Created immersive AR product visualization in user environment"
            },
            {
                title: "Cross-platform AR",
                description: "Developed consistent AR experience across iOS and Android"
            }
        ],
        lessonsLearned: [
            "Challenges of mobile AR performance optimization",
            "Importance of accurate 3D modeling",
            "User experience considerations in AR applications",
            "Cross-platform compatibility in AR development"
        ],
        futureImprovements: [
            "Add social AR shopping features",
            "Implement AI style recommendations",
            "Add virtual fashion shows",
            "Develop AR shopping games"
        ],
        metaDescription: "AR shopping platform with virtual try-ons, product visualization, and immersive shopping experiences.",
        seoTitle: "AR Shopping Platform | Virtual Try-On & Visualization",
        performance: {
            loadTime: 81,
            accessibility: 91,
            bestPractices: 88,
            seo: 87
        }
    },
    {
        id: "blockchain-identity",
        title: "Blockchain Digital Identity System",
        description: "Self-sovereign digital identity using blockchain for secure identity management.",
        fullDescription: "A revolutionary blockchain-based digital identity system that gives users complete control over their personal data and digital identity. The platform enables secure, verifiable, and portable digital identities that can be used across multiple services while maintaining user privacy and data sovereignty through decentralized identity management.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "Solidity",
            "React",
            "Web3.js",
            "Node.js",
            "MongoDB",
            "IPFS",
            "Zero-Knowledge Proofs",
            "TypeScript",
            "Tailwind CSS",
            "DID",
            "Verifiable Credentials",
            "Docker"
        ],
        features: [
            "Self-Sovereign Identity",
            "Digital Credentials",
            "Privacy Protection",
            "Cross-platform Verification",
            "Biometric Integration",
            "Multi-factor Authentication",
            "Identity Recovery",
            "Consent Management",
            "Audit Trail",
            "Mobile Wallet",
            "Enterprise Integration",
            "Regulatory Compliance",
            "Multi-language Support",
            "Accessibility Features"
        ],
        githubUrl: "https://github.com/sorujmahmud/blockchain-identity",
        liveUrl: "https://identity-soruj.vercel.app",
        category: "Blockchain",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Balancing privacy with regulatory requirements",
            "Ensuring user-friendly experience",
            "Managing key recovery securely",
            "Cross-platform interoperability",
            "Building trust in self-sovereign identity",
            "Integration with existing identity systems"
        ],
        solutions: [
            "Implemented selective disclosure with zero-knowledge proofs",
            "Designed intuitive user interfaces with clear privacy controls",
            "Built secure key recovery with social and hardware options",
            "Adopted W3C DID and verifiable credentials standards",
            "Created transparent trust frameworks and verification",
            "Developed flexible integration APIs for legacy systems"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "9 months",
        teamSize: "6 developers",
        completionDate: "2024-08-25",
        createdAt: "2023-11-20",
        updatedAt: "2024-09-05",
        tags: ["blockchain", "identity", "privacy", "security", "decentralized"],
        emoji: "🆔",
        stats: {
            completionTime: "9 months",
            teamSize: "6 developers",
            complexity: "Very High",
            views: 1380,
            likes: 126
        },
        architecture: "React frontend, Solidity smart contracts, Node.js backend, IPFS for document storage, Zero-knowledge proofs for privacy, DID standards compliance",
        developmentHighlights: [
            {
                title: "Self-Sovereign Identity",
                description: "Enabled users to control their digital identity and personal data"
            },
            {
                title: "Privacy Protection",
                description: "Implemented advanced privacy features with selective disclosure"
            },
            {
                title: "Interoperability",
                description: "Built cross-platform identity system with standard compliance"
            }
        ],
        lessonsLearned: [
            "Complexities of balancing privacy and regulation",
            "Importance of user experience in identity systems",
            "Security considerations in key management",
            "Challenges of interoperability in digital identity"
        ],
        futureImprovements: [
            "Add quantum-resistant cryptography",
            "Implement AI identity verification",
            "Add cross-border identity features",
            "Develop enterprise identity management"
        ],
        metaDescription: "Blockchain digital identity system providing self-sovereign identity with privacy and security.",
        seoTitle: "Blockchain Identity System | Self-Sovereign Identity",
        performance: {
            loadTime: 85,
            accessibility: 94,
            bestPractices: 91,
            seo: 90
        }
    },
    {
        id: "ai-medical-diagnosis",
        title: "AI Medical Diagnosis Assistant",
        description: "Advanced medical diagnosis system using AI to assist healthcare professionals.",
        fullDescription: "A sophisticated AI-powered medical diagnosis assistant that helps healthcare professionals with accurate diagnosis, treatment recommendations, and patient management. The system uses advanced machine learning models trained on medical data to provide evidence-based insights, reduce diagnostic errors, and improve patient outcomes through intelligent assistance.",
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "React",
            "Python",
            "TensorFlow",
            "FastAPI",
            "MongoDB",
            "Redis",
            "AWS",
            "TypeScript",
            "Docker",
            "OpenCV",
            "Medical Imaging APIs",
            "Chart.js"
        ],
        features: [
            "Symptom Analysis",
            "Disease Prediction",
            "Treatment Recommendations",
            "Medical Imaging Analysis",
            "Drug Interaction Checking",
            "Patient History Analysis",
            "Clinical Decision Support",
            "Multi-specialty Support",
            "Real-time Alerts",
            "Medical Literature Integration",
            "Progress Tracking",
            "Mobile App",
            "HIPAA Compliance",
            "Multi-language Support"
        ],
        githubUrl: "https://github.com/sorujmahmud/ai-medical-diagnosis",
        liveUrl: "https://medical-ai-soruj.vercel.app",
        category: "AI",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Ensuring medical accuracy and safety",
            "Handling sensitive health data",
            "Integrating with medical systems",
            "Building trust with healthcare professionals",
            "Regulatory compliance and validation",
            "Multi-specialty medical knowledge"
        ],
        solutions: [
            "Trained models on validated medical datasets with clinical oversight",
            "Implemented HIPAA-compliant data handling with encryption",
            "Built flexible integration with EMR and hospital systems",
            "Created transparent AI explanations and confidence scores",
            "Ensured FDA and regulatory compliance with clinical validation",
            "Developed specialized models for different medical specialties"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "11 months",
        teamSize: "9 developers",
        completionDate: "2024-09-15",
        createdAt: "2023-10-20",
        updatedAt: "2024-09-25",
        tags: ["ai", "healthcare", "medical", "diagnosis", "clinical"],
        emoji: "🩺",
        stats: {
            completionTime: "11 months",
            teamSize: "9 developers",
            complexity: "Very High",
            views: 1620,
            likes: 148
        },
        architecture: "React frontend, Python FastAPI backend, MongoDB for medical data, Redis for caching, TensorFlow for AI models, HIPAA-compliant infrastructure",
        developmentHighlights: [
            {
                title: "Medical Accuracy",
                description: "Achieved 92% diagnosis accuracy through advanced AI models"
            },
            {
                title: "Clinical Integration",
                description: "Seamlessly integrated with existing clinical workflows and systems"
            },
            {
                title: "Safety Features",
                description: "Built comprehensive safety features and validation mechanisms"
            }
        ],
        lessonsLearned: [
            "Critical importance of accuracy in medical AI",
            "Complexities of healthcare data privacy",
            "Challenges of clinical integration and adoption",
            "Regulatory requirements in medical technology"
        ],
        futureImprovements: [
            "Add genomic data integration",
            "Implement predictive health analytics",
            "Add telemedicine integration",
            "Develop personalized treatment plans"
        ],
        metaDescription: "AI medical diagnosis assistant providing accurate diagnosis support and treatment recommendations.",
        seoTitle: "AI Medical Diagnosis Assistant | Clinical Decision Support",
        performance: {
            loadTime: 86,
            accessibility: 97,
            bestPractices: 93,
            seo: 92
        }
    },
    {
        id: "smart-transportation",
        title: "AI Smart Transportation System",
        description: "Intelligent transportation platform with route optimization and real-time tracking.",
        fullDescription: "A comprehensive smart transportation system that uses AI to optimize routes, manage fleet operations, and provide real-time tracking and analytics. The platform helps transportation companies improve efficiency, reduce costs, and enhance customer experience through intelligent scheduling, predictive maintenance, and data-driven decision making.",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "React Native",
            "Node.js",
            "MongoDB",
            "Redis",
            "Python",
            "TensorFlow",
            "Google Maps API",
            "AWS",
            "TypeScript",
            "Docker",
            "MQTT",
            "Chart.js"
        ],
        features: [
            "Route Optimization",
            "Real-time Tracking",
            "Fleet Management",
            "Predictive Maintenance",
            "Fuel Optimization",
            "Driver Performance Analytics",
            "Passenger App",
            "Dispatch System",
            "Multi-modal Transport",
            "Mobile Ticketing",
            "Traffic Integration",
            "Safety Monitoring",
            "Carbon Emission Tracking",
            "Analytics Dashboard"
        ],
        githubUrl: "https://github.com/sorujmahmud/smart-transportation",
        liveUrl: "https://transportation-soruj.vercel.app",
        category: "AI",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Real-time route optimization under changing conditions",
            "Integrating multiple transportation modes",
            "Handling large-scale fleet operations",
            "Predictive maintenance accuracy",
            "Ensuring passenger safety and security",
            "Multi-lingual and accessibility requirements"
        ],
        solutions: [
            "Implemented dynamic routing algorithms with real-time updates",
            "Built unified API for multi-modal transport integration",
            "Used distributed computing for large-scale operations",
            "Developed ML models for maintenance prediction",
            "Implemented comprehensive safety monitoring and alerts",
            "Designed inclusive interfaces with multi-language support"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "10 months",
        teamSize: "8 developers",
        completionDate: "2024-09-20",
        createdAt: "2023-11-25",
        updatedAt: "2024-09-30",
        tags: ["transportation", "ai", "iot", "optimization", "mobility"],
        emoji: "🚌",
        stats: {
            completionTime: "10 months",
            teamSize: "8 developers",
            complexity: "Very High",
            views: 1580,
            likes: 142
        },
        architecture: "React Native mobile apps, Node.js backend, MongoDB for operations, Redis for real-time data, Python AI services, MQTT for IoT devices, Multi-service architecture",
        developmentHighlights: [
            {
                title: "Route Optimization",
                description: "Reduced travel time by 25% through intelligent route optimization"
            },
            {
                title: "Predictive Maintenance",
                description: "Decreased vehicle downtime by 40% with accurate maintenance prediction"
            },
            {
                title: "Multi-modal Integration",
                description: "Seamlessly integrated multiple transportation modes in single platform"
            }
        ],
        lessonsLearned: [
            "Complexities of real-time transportation optimization",
            "Importance of reliability in transportation systems",
            "Challenges of multi-modal integration",
            "User experience in transportation applications"
        ],
        futureImprovements: [
            "Add autonomous vehicle integration",
            "Implement blockchain for payments",
            "Add smart city integration",
            "Develop advanced passenger analytics"
        ],
        metaDescription: "AI smart transportation system with route optimization, fleet management, and real-time tracking.",
        seoTitle: "Smart Transportation System | AI Route Optimization",
        performance: {
            loadTime: 84,
            accessibility: 94,
            bestPractices: 91,
            seo: 90
        }
    },
    {
        id: "blockchain-payments",
        title: "Blockchain Payment Gateway",
        description: "Decentralized payment gateway with cryptocurrency and cross-border transactions.",
        fullDescription: "A revolutionary blockchain-based payment gateway that enables fast, secure, and low-cost transactions using cryptocurrency and traditional payment methods. The platform supports cross-border payments, smart contract escrow, and decentralized finance features while maintaining regulatory compliance and user-friendly experience.",
        image: "https://images.unsplash.com/photo-1639762681057-40897d1b5d6e?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "Solidity",
            "React",
            "Web3.js",
            "Node.js",
            "MongoDB",
            "Redis",
            "Stripe",
            "TypeScript",
            "Tailwind CSS",
            "Hardhat",
            "IPFS",
            "Docker"
        ],
        features: [
            "Cryptocurrency Payments",
            "Cross-border Transactions",
            "Smart Contract Escrow",
            "Multi-currency Support",
            "Low Transaction Fees",
            "Real-time Settlement",
            "Merchant Dashboard",
            "Payment Analytics",
            "Recurring Payments",
            "Mobile Payments",
            "Fraud Detection",
            "Regulatory Compliance",
            "API Integration",
            "Mobile App"
        ],
        githubUrl: "https://github.com/sorujmahmud/blockchain-payments",
        liveUrl: "https://payments-soruj.vercel.app",
        category: "Blockchain",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1639762681057-40897d1b5d6e?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1639762681057-40897d1b5d6e?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1639762681057-40897d1b5d6e?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1639762681057-40897d1b5d6e?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1639762681057-40897d1b5d6e?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Ensuring transaction security and fraud prevention",
            "Regulatory compliance across jurisdictions",
            "Handling cryptocurrency volatility",
            "Building user-friendly Web3 payment experience",
            "Cross-border payment regulations",
            "Integration with traditional payment systems"
        ],
        solutions: [
            "Implemented multi-layer security and real-time fraud detection",
            "Built compliance engine with jurisdiction-specific rules",
            "Created volatility protection mechanisms and stablecoin integration",
            "Designed intuitive payment flows with clear transaction states",
            "Developed cross-border compliance automation",
            "Built hybrid payment system with traditional and crypto options"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "8 months",
        teamSize: "6 developers",
        completionDate: "2024-07-30",
        createdAt: "2023-11-28",
        updatedAt: "2024-08-10",
        tags: ["blockchain", "payments", "crypto", "fintech", "security"],
        emoji: "💳",
        stats: {
            completionTime: "8 months",
            teamSize: "6 developers",
            complexity: "Very High",
            views: 1720,
            likes: 156
        },
        architecture: "React frontend, Solidity smart contracts, Node.js backend, MongoDB for transactions, Redis for caching, Multi-chain support, Hybrid payment system",
        developmentHighlights: [
            {
                title: "Payment Security",
                description: "Built secure payment system with comprehensive fraud protection"
            },
            {
                title: "Cross-border Payments",
                description: "Enabled fast cross-border transactions with 80% lower fees"
            },
            {
                title: "Regulatory Compliance",
                description: "Implemented automated compliance across multiple jurisdictions"
            }
        ],
        lessonsLearned: [
            "Complexities of payment security and fraud prevention",
            "Regulatory challenges in cross-border payments",
            "User experience considerations in crypto payments",
            "Integration challenges between traditional and blockchain systems"
        ],
        futureImprovements: [
            "Add DeFi integration",
            "Implement AI fraud detection",
            "Add more cryptocurrency support",
            "Develop merchant analytics"
        ],
        metaDescription: "Blockchain payment gateway with cryptocurrency support, cross-border transactions, and smart contract escrow.",
        seoTitle: "Blockchain Payment Gateway | Crypto & Cross-border Payments",
        performance: {
            loadTime: 83,
            accessibility: 92,
            bestPractices: 90,
            seo: 89
        }
    },
    {
        id: "ai-language-tutor",
        title: "AI Language Learning Tutor",
        description: "Intelligent language learning platform with personalized tutoring and speech recognition.",
        fullDescription: "An advanced AI-powered language learning platform that provides personalized tutoring, real-time speech recognition, and immersive learning experiences. The system adapts to individual learning styles, provides instant feedback on pronunciation, and creates customized learning paths to help users achieve language fluency efficiently.",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "React Native",
            "Python",
            "TensorFlow",
            "Node.js",
            "MongoDB",
            "Redis",
            "OpenAI API",
            "AWS",
            "TypeScript",
            "Speech Recognition API",
            "Docker",
            "Chart.js"
        ],
        features: [
            "Personalized Learning Paths",
            "Real-time Speech Recognition",
            "Pronunciation Feedback",
            "Interactive Lessons",
            "Cultural Context",
            "Progress Tracking",
            "Conversation Practice",
            "Vocabulary Builder",
            "Grammar Correction",
            "Multi-language Support",
            "Offline Learning",
            "Community Features",
            "Teacher Dashboard",
            "Mobile App"
        ],
        githubUrl: "https://github.com/sorujmahmud/ai-language-tutor",
        liveUrl: "https://language-tutor-soruj.vercel.app",
        category: "AI",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Accurate speech recognition for language learners",
            "Personalized learning path generation",
            "Real-time pronunciation feedback",
            "Cultural context integration",
            "Multi-language content creation",
            "Engaging learning experience design"
        ],
        solutions: [
            "Trained custom speech models on learner pronunciation data",
            "Implemented adaptive learning algorithms with reinforcement learning",
            "Built real-time feedback system with visual pronunciation guides",
            "Integrated cultural context and real-world scenarios",
            "Created scalable content management for multiple languages",
            "Designed gamified learning experiences with progress rewards"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "9 months",
        teamSize: "7 developers",
        completionDate: "2024-08-25",
        createdAt: "2023-11-30",
        updatedAt: "2024-09-05",
        tags: ["ai", "education", "language", "speech", "mobile"],
        emoji: "🗣️",
        stats: {
            completionTime: "9 months",
            teamSize: "7 developers",
            complexity: "High",
            views: 1850,
            likes: 168
        },
        architecture: "React Native mobile app, Node.js backend, MongoDB for user data, Redis for sessions, Python AI services, Speech recognition integration, Adaptive learning system",
        developmentHighlights: [
            {
                title: "Speech Recognition",
                description: "Built accurate speech recognition specifically for language learners"
            },
            {
                title: "Personalized Learning",
                description: "Created adaptive learning paths based on individual progress and style"
            },
            {
                title: "Real-time Feedback",
                description: "Provided instant pronunciation feedback with visual guidance"
            }
        ],
        lessonsLearned: [
            "Challenges of speech recognition for non-native speakers",
            "Importance of cultural context in language learning",
            "User engagement strategies in educational apps",
            "Performance optimization for real-time audio processing"
        ],
        futureImprovements: [
            "Add AR language practice",
            "Implement voice conversation AI",
            "Add writing correction features",
            "Develop advanced progress analytics"
        ],
        metaDescription: "AI language learning tutor with personalized paths, speech recognition, and real-time pronunciation feedback.",
        seoTitle: "AI Language Tutor | Personalized Language Learning",
        performance: {
            loadTime: 85,
            accessibility: 96,
            bestPractices: 92,
            seo: 91
        }
    },
    {
        id: "smart-retail",
        title: "AI Smart Retail Platform",
        description: "Intelligent retail platform with inventory optimization and customer analytics.",
        fullDescription: "A comprehensive smart retail platform that uses AI to optimize inventory management, personalize customer experiences, and provide data-driven insights for retail operations. The system helps retailers increase sales, reduce costs, and enhance customer satisfaction through intelligent recommendations, demand forecasting, and automated operations.",
        image: "https://images.unsplash.com/photo-1563013546-77f54cc048c4?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "Next.js 14",
            "Node.js",
            "MongoDB",
            "Redis",
            "Python",
            "TensorFlow",
            "AWS",
            "TypeScript",
            "Tailwind CSS",
            "Stripe",
            "Docker",
            "Chart.js"
        ],
        features: [
            "Inventory Optimization",
            "Customer Analytics",
            "Personalized Recommendations",
            "Demand Forecasting",
            "Sales Analytics",
            "Multi-store Management",
            "Mobile POS",
            "Customer Loyalty Program",
            "Supplier Management",
            "Real-time Analytics",
            "Automated Reordering",
            "Multi-channel Sales",
            "Mobile App",
            "Dashboard Analytics"
        ],
        githubUrl: "https://github.com/sorujmahmud/smart-retail",
        liveUrl: "https://retail-soruj.vercel.app",
        category: "AI",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1563013546-77f54cc048c4?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1563013546-77f54cc048c4?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1563013546-77f54cc048c4?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1563013546-77f54cc048c4?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1563013546-77f54cc048c4?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Accurate demand forecasting",
            "Real-time inventory synchronization",
            "Personalized recommendation accuracy",
            "Multi-store operations management",
            "Integration with existing retail systems",
            "Handling seasonal variations and trends"
        ],
        solutions: [
            "Implemented advanced time series forecasting models",
            "Built real-time sync with conflict resolution",
            "Developed collaborative filtering and content-based recommendations",
            "Created centralized management with store-level autonomy",
            "Built flexible integration APIs for legacy systems",
            "Used ensemble models for seasonal pattern detection"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "8 months",
        teamSize: "6 developers",
        completionDate: "2024-07-15",
        createdAt: "2023-11-20",
        updatedAt: "2024-07-30",
        tags: ["retail", "ai", "inventory", "analytics", "optimization"],
        emoji: "🏪",
        stats: {
            completionTime: "8 months",
            teamSize: "6 developers",
            complexity: "High",
            views: 1680,
            likes: 152
        },
        architecture: "Next.js frontend, Node.js backend, MongoDB for retail data, Redis for caching, Python AI services, Multi-tenant architecture, Real-time analytics",
        developmentHighlights: [
            {
                title: "Inventory Optimization",
                description: "Reduced inventory costs by 30% through intelligent optimization"
            },
            {
                title: "Customer Personalization",
                description: "Increased sales by 25% with personalized recommendations"
            },
            {
                title: "Demand Forecasting",
                description: "Improved forecast accuracy to 92% with advanced AI models"
            }
        ],
        lessonsLearned: [
            "Complexities of retail inventory management",
            "Importance of real-time data in retail operations",
            "Challenges of multi-store coordination",
            "User experience in retail management systems"
        ],
        futureImprovements: [
            "Add computer vision for shelf monitoring",
            "Implement IoT for inventory tracking",
            "Add social commerce features",
            "Develop advanced customer segmentation"
        ],
        metaDescription: "AI smart retail platform with inventory optimization, customer analytics, and personalized recommendations.",
        seoTitle: "Smart Retail Platform | AI Inventory Optimization",
        performance: {
            loadTime: 87,
            accessibility: 95,
            bestPractices: 93,
            seo: 92
        }
    },
    {
        id: "blockchain-gaming",
        title: "Blockchain Gaming Platform",
        description: "Decentralized gaming platform with NFT assets and play-to-earn mechanics.",
        fullDescription: "An innovative blockchain gaming platform that combines immersive gameplay with decentralized ownership through NFTs and play-to-earn mechanics. The platform enables true digital asset ownership, player-driven economies, and transparent gaming experiences while maintaining engaging gameplay and community features.",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "Unity",
            "Solidity",
            "React",
            "Web3.js",
            "Node.js",
            "MongoDB",
            "Redis",
            "AWS",
            "TypeScript",
            "IPFS",
            "Hardhat",
            "Docker"
        ],
        features: [
            "NFT Game Assets",
            "Play-to-Earn Mechanics",
            "Decentralized Ownership",
            "Player-driven Economy",
            "Multi-game Platform",
            "Marketplace Integration",
            "Community Features",
            "Tournament System",
            "Mobile Gaming",
            "Cross-platform Play",
            "Governance System",
            "Staking Rewards",
            "Mobile App",
            "Analytics Dashboard"
        ],
        githubUrl: "https://github.com/sorujmahmud/blockchain-gaming",
        liveUrl: "https://gaming-soruj.vercel.app",
        category: "Blockchain",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Balancing gameplay with blockchain integration",
            "Gas optimization for in-game transactions",
            "Creating sustainable play-to-earn economies",
            "Cross-platform blockchain integration",
            "Player onboarding and Web3 education",
            "Game asset interoperability"
        ],
        solutions: [
            "Designed seamless blockchain integration without compromising gameplay",
            "Implemented layer-2 solutions and batch transactions",
            "Built economic models with sustainable reward mechanisms",
            "Created unified blockchain layer for multiple platforms",
            "Developed intuitive onboarding with Web2-like experience",
            "Established standards for cross-game asset interoperability"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "10 months",
        teamSize: "8 developers",
        completionDate: "2024-09-10",
        createdAt: "2023-11-25",
        updatedAt: "2024-09-20",
        tags: ["blockchain", "gaming", "nft", "web3", "entertainment"],
        emoji: "🎮",
        stats: {
            completionTime: "10 months",
            teamSize: "8 developers",
            complexity: "Very High",
            views: 1920,
            likes: 178
        },
        architecture: "Unity game engine, React web platform, Solidity smart contracts, Node.js backend, MongoDB for game data, Redis for real-time, Multi-chain gaming infrastructure",
        developmentHighlights: [
            {
                title: "NFT Integration",
                description: "Seamlessly integrated NFT assets into engaging gameplay experiences"
            },
            {
                title: "Play-to-Earn Economy",
                description: "Built sustainable play-to-earn economy with balanced reward systems"
            },
            {
                title: "Cross-platform Gaming",
                description: "Enabled cross-platform play with consistent blockchain integration"
            }
        ],
        lessonsLearned: [
            "Balancing blockchain features with gameplay quality",
            "Economic design challenges in play-to-earn games",
            "User experience in Web3 gaming",
            "Technical challenges of real-time blockchain integration"
        ],
        futureImprovements: [
            "Add VR gaming integration",
            "Implement AI-powered game content",
            "Add social gaming features",
            "Develop advanced tournament systems"
        ],
        metaDescription: "Blockchain gaming platform with NFT assets, play-to-earn mechanics, and decentralized ownership.",
        seoTitle: "Blockchain Gaming Platform | NFT Games & Play-to-Earn",
        performance: {
            loadTime: 82,
            accessibility: 91,
            bestPractices: 89,
            seo: 88
        }
    },
    {
        id: "ai-legal-assistant",
        title: "AI Legal Document Assistant",
        description: "Intelligent legal document analysis and contract review platform.",
        fullDescription: "A sophisticated AI-powered legal assistant that helps lawyers and businesses analyze documents, review contracts, and conduct legal research efficiently. The platform uses natural language processing and machine learning to identify risks, suggest improvements, and provide comprehensive legal insights while maintaining accuracy and confidentiality.",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "Next.js 14",
            "Python",
            "FastAPI",
            "MongoDB",
            "Redis",
            "OpenAI API",
            "AWS",
            "TypeScript",
            "Tailwind CSS",
            "Docker",
            "Elasticsearch",
            "Chart.js"
        ],
        features: [
            "Document Analysis",
            "Contract Review",
            "Risk Identification",
            "Legal Research",
            "Compliance Checking",
            "Document Comparison",
            "Template Generation",
            "Collaborative Review",
            "Version Control",
            "Multi-language Support",
            "Mobile App",
            "Security & Encryption",
            "Audit Trail",
            "Analytics Dashboard"
        ],
        githubUrl: "https://github.com/sorujmahmud/ai-legal-assistant",
        liveUrl: "https://legal-ai-soruj.vercel.app",
        category: "AI",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Ensuring legal accuracy and reliability",
            "Handling sensitive legal documents",
            "Multi-jurisdiction legal compliance",
            "Complex legal language understanding",
            "Maintaining attorney-client privilege",
            "Integration with legal practice management systems"
        ],
        solutions: [
            "Trained models on verified legal datasets with expert validation",
            "Implemented end-to-end encryption and secure data handling",
            "Built jurisdiction-specific compliance engines",
            "Developed specialized NLP for legal terminology",
            "Created secure collaboration with privilege protection",
            "Built flexible APIs for legal system integration"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "9 months",
        teamSize: "7 developers",
        completionDate: "2024-08-30",
        createdAt: "2023-11-28",
        updatedAt: "2024-09-10",
        tags: ["ai", "legal", "document", "compliance", "security"],
        emoji: "⚖️",
        stats: {
            completionTime: "9 months",
            teamSize: "7 developers",
            complexity: "Very High",
            views: 1480,
            likes: 132
        },
        architecture: "Next.js frontend, Python FastAPI backend, MongoDB for documents, Redis for caching, AI services for analysis, Secure encrypted architecture, Multi-tenant system",
        developmentHighlights: [
            {
                title: "Document Analysis",
                description: "Built accurate legal document analysis with 95% precision"
            },
            {
                title: "Risk Identification",
                description: "Automated risk identification in contracts and legal documents"
            },
            {
                title: "Security & Compliance",
                description: "Ensured complete security and regulatory compliance"
            }
        ],
        lessonsLearned: [
            "Critical importance of accuracy in legal AI",
            "Security considerations in legal document handling",
            "Complexities of multi-jurisdiction compliance",
            "User adoption challenges in legal technology"
        ],
        futureImprovements: [
            "Add predictive litigation analytics",
            "Implement blockchain for document verification",
            "Add voice legal assistance",
            "Develop advanced compliance monitoring"
        ],
        metaDescription: "AI legal assistant for document analysis, contract review, and legal research with security and compliance.",
        seoTitle: "AI Legal Assistant | Document Analysis & Contract Review",
        performance: {
            loadTime: 86,
            accessibility: 96,
            bestPractices: 94,
            seo: 93
        }
    },
    {
        id: "smart-waste-management",
        title: "IoT Smart Waste Management",
        description: "Intelligent waste management system with optimization and recycling tracking.",
        fullDescription: "A comprehensive IoT-based smart waste management system that optimizes collection routes, tracks recycling rates, and provides real-time monitoring of waste levels. The platform helps municipalities and waste management companies reduce costs, improve efficiency, and enhance sustainability through data-driven operations and intelligent automation.",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "React",
            "Node.js",
            "MongoDB",
            "Redis",
            "Python",
            "TensorFlow",
            "AWS IoT",
            "TypeScript",
            "Docker",
            "MQTT",
            "Mapbox",
            "Chart.js"
        ],
        features: [
            "Route Optimization",
            "Fill-level Monitoring",
            "Recycling Analytics",
            "Cost Management",
            "Real-time Tracking",
            "Predictive Collection",
            "Multi-site Management",
            "Mobile App",
            "Sustainability Reporting",
            "Maintenance Alerts",
            "Customer Portal",
            "Billing Integration",
            "Mobile Workforce",
            "Analytics Dashboard"
        ],
        githubUrl: "https://github.com/sorujmahmud/smart-waste-management",
        liveUrl: "https://waste-management-soruj.vercel.app",
        category: "IOT",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Accurate fill-level detection in various conditions",
            "Optimizing complex collection routes",
            "Integrating with municipal waste systems",
            "Handling diverse waste types and regulations",
            "Real-time data processing from multiple sensors",
            "Predictive maintenance for waste equipment"
        ],
        solutions: [
            "Used multi-sensor fusion for accurate fill-level detection",
            "Implemented advanced routing algorithms with real-time adjustments",
            "Built flexible integration with municipal management systems",
            "Created waste classification and regulation compliance systems",
            "Used edge computing and real-time stream processing",
            "Developed predictive maintenance with IoT sensor data"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "8 months",
        teamSize: "6 developers",
        completionDate: "2024-07-25",
        createdAt: "2023-11-22",
        updatedAt: "2024-08-05",
        tags: ["iot", "waste-management", "sustainability", "optimization", "smart-city"],
        emoji: "🗑️",
        stats: {
            completionTime: "8 months",
            teamSize: "6 developers",
            complexity: "High",
            views: 1350,
            likes: 124
        },
        architecture: "React frontend, Node.js backend with MQTT, MongoDB for operations, Redis for real-time data, Python AI services, AWS IoT for device management, Mobile workforce apps",
        developmentHighlights: [
            {
                title: "Route Optimization",
                description: "Reduced collection costs by 35% through intelligent route optimization"
            },
            {
                title: "Fill-level Monitoring",
                description: "Enabled efficient collection scheduling with real-time monitoring"
            },
            {
                title: "Sustainability Analytics",
                description: "Provided comprehensive sustainability reporting and analytics"
            }
        ],
        lessonsLearned: [
            "Challenges of IoT in waste management environments",
            "Importance of route optimization in operational efficiency",
            "Integration complexities with municipal systems",
            "User interface design for field workforce"
        ],
        futureImprovements: [
            "Add AI waste sorting",
            "Implement blockchain for recycling credits",
            "Add citizen engagement features",
            "Develop advanced predictive analytics"
        ],
        metaDescription: "IoT smart waste management system with route optimization, recycling tracking, and real-time monitoring.",
        seoTitle: "Smart Waste Management | IoT Optimization Platform",
        performance: {
            loadTime: 84,
            accessibility: 93,
            bestPractices: 90,
            seo: 89
        }
    },
    {
        id: "blockchain-real-estate",
        title: "Blockchain Real Estate Platform",
        description: "Decentralized real estate platform with property tokenization and automated transactions.",
        fullDescription: "A revolutionary blockchain-based real estate platform that enables property tokenization, automated transactions, and transparent ownership records. The system transforms real estate investment and transactions through fractional ownership, smart contract automation, and immutable property records while maintaining regulatory compliance and user-friendly experience.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "Solidity",
            "React",
            "Web3.js",
            "Node.js",
            "MongoDB",
            "Redis",
            "IPFS",
            "TypeScript",
            "Tailwind CSS",
            "Hardhat",
            "The Graph",
            "Docker"
        ],
        features: [
            "Property Tokenization",
            "Smart Contract Transactions",
            "Automated Title Management",
            "Fractional Ownership",
            "Investment Platform",
            "Property Valuation",
            "Legal Compliance",
            "Multi-party Escrow",
            "Mobile App",
            "Marketplace Integration",
            "Rental Management",
            "Property Analytics",
            "Document Management",
            "Investment Analytics"
        ],
        githubUrl: "https://github.com/sorujmahmud/blockchain-real-estate",
        liveUrl: "https://blockchain-real-estate-soruj.vercel.app",
        category: "Blockchain",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Ensuring legal compliance for property transactions",
            "Handling large-value transactions securely",
            "Integrating with traditional real estate systems",
            "Fractional ownership regulatory compliance",
            "Building trust in blockchain real estate",
            "User-friendly property tokenization"
        ],
        solutions: [
            "Built compliance engine with jurisdiction-specific regulations",
            "Implemented multi-signature wallets and secure escrow",
            "Created flexible APIs for traditional system integration",
            "Developed regulatory-compliant fractional ownership structures",
            "Established transparent trust frameworks and verification",
            "Designed intuitive tokenization workflows with clear benefits"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "10 months",
        teamSize: "7 developers",
        completionDate: "2024-09-05",
        createdAt: "2023-11-15",
        updatedAt: "2024-09-15",
        tags: ["blockchain", "real-estate", "tokenization", "investment", "property"],
        emoji: "🏘️",
        stats: {
            completionTime: "10 months",
            teamSize: "7 developers",
            complexity: "Very High",
            views: 1680,
            likes: 154
        },
        architecture: "React frontend, Solidity smart contracts, Node.js backend, MongoDB for property data, Redis for caching, IPFS for documents, Multi-chain real estate platform",
        developmentHighlights: [
            {
                title: "Property Tokenization",
                description: "Enabled fractional property ownership through secure tokenization"
            },
            {
                title: "Automated Transactions",
                description: "Automated real estate transactions with smart contract execution"
            },
            {
                title: "Legal Compliance",
                description: "Ensured complete regulatory compliance across jurisdictions"
            }
        ],
        lessonsLearned: [
            "Complexities of real estate regulation and compliance",
            "Security considerations in high-value transactions",
            "Integration challenges with traditional real estate systems",
            "User adoption in blockchain real estate"
        ],
        futureImprovements: [
            "Add mortgage tokenization",
            "Implement AI property valuation",
            "Add international property trading",
            "Develop advanced investment analytics"
        ],
        metaDescription: "Blockchain real estate platform with property tokenization, automated transactions, and fractional ownership.",
        seoTitle: "Blockchain Real Estate | Property Tokenization Platform",
        performance: {
            loadTime: 83,
            accessibility: 92,
            bestPractices: 90,
            seo: 89
        }
    },
    {
        id: "ai-personal-assistant",
        title: "AI Personal Assistant Platform",
        description: "Intelligent personal assistant with multi-modal interaction and task automation.",
        fullDescription: "A comprehensive AI-powered personal assistant that helps users manage tasks, schedule appointments, and automate daily activities through natural language interaction. The platform combines voice recognition, computer vision, and machine learning to provide contextual assistance, proactive suggestions, and seamless task automation across multiple devices and platforms.",
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "React Native",
            "Python",
            "TensorFlow",
            "Node.js",
            "MongoDB",
            "Redis",
            "OpenAI API",
            "AWS",
            "TypeScript",
            "Speech Recognition",
            "Docker",
            "WebRTC"
        ],
        features: [
            "Voice Commands",
            "Task Automation",
            "Calendar Management",
            "Email Processing",
            "Smart Reminders",
            "Multi-modal Interaction",
            "Contextual Understanding",
            "Proactive Suggestions",
            "Cross-device Sync",
            "Privacy Focused",
            "Custom Skills",
            "Mobile App",
            "Web Dashboard",
            "API Integration"
        ],
        githubUrl: "https://github.com/sorujmahmud/ai-personal-assistant",
        liveUrl: "https://assistant-soruj.vercel.app",
        category: "AI",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Accurate natural language understanding",
            "Contextual conversation management",
            "Multi-modal interaction coordination",
            "Privacy and data security",
            "Cross-platform compatibility",
            "Proactive suggestion accuracy"
        ],
        solutions: [
            "Trained custom NLP models with contextual understanding",
            "Implemented conversation memory and context tracking",
            "Built unified interaction layer for multiple modalities",
            "Designed privacy-first architecture with local processing",
            "Created cross-platform framework with consistent experience",
            "Developed proactive suggestion engine with user preference learning"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "9 months",
        teamSize: "6 developers",
        completionDate: "2024-08-20",
        createdAt: "2023-11-25",
        updatedAt: "2024-08-30",
        tags: ["ai", "assistant", "automation", "voice", "mobile"],
        emoji: "🤖",
        stats: {
            completionTime: "9 months",
            teamSize: "6 developers",
            complexity: "High",
            views: 1820,
            likes: 168
        },
        architecture: "React Native mobile app, Node.js backend, MongoDB for user data, Redis for sessions, Python AI services, Multi-modal interaction system, Privacy-focused design",
        developmentHighlights: [
            {
                title: "Natural Language Understanding",
                description: "Built accurate natural language understanding with contextual awareness"
            },
            {
                title: "Task Automation",
                description: "Automated complex tasks through intelligent workflow creation"
            },
            {
                title: "Multi-modal Interaction",
                description: "Enabled seamless interaction across voice, text, and visual interfaces"
            }
        ],
        lessonsLearned: [
            "Challenges of contextual conversation management",
            "Importance of privacy in personal assistant applications",
            "User experience in multi-modal interfaces",
            "Performance optimization for real-time AI processing"
        ],
        futureImprovements: [
            "Add emotion recognition",
            "Implement predictive task automation",
            "Add social integration features",
            "Develop advanced personalization"
        ],
        metaDescription: "AI personal assistant with voice commands, task automation, and multi-modal interaction capabilities.",
        seoTitle: "AI Personal Assistant | Voice Commands & Task Automation",
        performance: {
            loadTime: 85,
            accessibility: 97,
            bestPractices: 93,
            seo: 92
        }
    },
    {
        id: "smart-education",
        title: "Smart Education Analytics Platform",
        description: "AI-powered education analytics with personalized learning insights.",
        fullDescription: "A comprehensive smart education platform that uses AI to analyze student performance, provide personalized learning insights, and help educators make data-driven decisions. The system combines learning analytics, predictive modeling, and adaptive learning to improve educational outcomes and optimize teaching strategies.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        technologies: [
            "Next.js 14",
            "Python",
            "FastAPI",
            "MongoDB",
            "Redis",
            "TensorFlow",
            "AWS",
            "TypeScript",
            "Tailwind CSS",
            "Docker",
            "Chart.js",
            "Elasticsearch"
        ],
        features: [
            "Student Performance Analytics",
            "Personalized Learning Paths",
            "Predictive Modeling",
            "Teacher Dashboard",
            "Parent Portal",
            "Curriculum Analytics",
            "Intervention Recommendations",
            "Multi-school Management",
            "Mobile App",
            "Real-time Reporting",
            "Assessment Analytics",
            "Learning Gap Analysis",
            "Progress Tracking",
            "Analytics Dashboard"
        ],
        githubUrl: "https://github.com/sorujmahmud/smart-education",
        liveUrl: "https://education-analytics-soruj.vercel.app",
        category: "AI",
        status: "completed",
        screenshots: [
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
        ],
        challenges: [
            "Accurate student performance prediction",
            "Personalized learning path generation",
            "Data privacy and security compliance",
            "Integration with existing education systems",
            "Multi-stakeholder reporting needs",
            "Real-time analytics processing"
        ],
        solutions: [
            "Implemented ensemble models for accurate performance prediction",
            "Built adaptive learning algorithms with continuous optimization",
            "Ensured FERPA and data privacy compliance",
            "Created flexible integration with SIS and LMS systems",
            "Developed role-based dashboards for different stakeholders",
            "Used real-time stream processing for immediate insights"
        ],
        featured: true,
        difficulty: "advanced",
        duration: "8 months",
        teamSize: "7 developers",
        completionDate: "2024-07-30",
        createdAt: "2023-11-20",
        updatedAt: "2024-08-10",
        tags: ["education", "ai", "analytics", "learning", "predictive"],
        emoji: "📚",
        stats: {
            completionTime: "8 months",
            teamSize: "7 developers",
            complexity: "High",
            views: 1580,
            likes: 142
        },
        architecture: "Next.js frontend, Python FastAPI backend, MongoDB for education data, Redis for caching, TensorFlow for AI models, Multi-tenant architecture, Real-time analytics",
        developmentHighlights: [
            {
                title: "Predictive Analytics",
                description: "Built accurate student performance prediction with 90% accuracy"
            },
            {
                title: "Personalized Learning",
                description: "Created adaptive learning paths based on individual student needs"
            },
            {
                title: "Multi-stakeholder Insights",
                description: "Provided comprehensive insights for students, teachers, and parents"
            }
        ],
        lessonsLearned: [
            "Importance of data privacy in education technology",
            "Challenges of personalized learning at scale",
            "Integration complexities in education systems",
            "User experience for diverse educational stakeholders"
        ],
        futureImprovements: [
            "Add social-emotional learning analytics",
            "Implement career path prediction",
            "Add gamification features",
            "Develop advanced teacher tools"
        ],
        metaDescription: "Smart education analytics platform with AI-powered insights, personalized learning, and predictive modeling.",
        seoTitle: "Smart Education Analytics | AI Learning Insights",
        performance: {
            loadTime: 86,
            accessibility: 96,
            bestPractices: 93,
            seo: 94
        }
    }
];




