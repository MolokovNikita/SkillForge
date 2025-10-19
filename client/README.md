# SkillForge - Learning Management System

A modern, full-stack learning management system built with React, TypeScript, and Node.js. SkillForge provides comprehensive tools for managing companies, employees, courses, and learning progress.

## 🚀 Features

### Core Functionality
- **Multi-role Authentication** - Support for Root Admins, Company Admins, and Employees
- **Company Management** - Complete CRUD operations for company management
- **Employee Dashboard** - Track learning progress and course completion
- **Course Management** - Create and manage educational content
- **Analytics & Reporting** - Comprehensive learning analytics and progress tracking
- **Multi-language Support** - English and Russian language support

### Technical Features
- **Modern UI/UX** - Clean, responsive design with CSS Modules
- **Real-time Notifications** - Toast notifications for user feedback
- **Form Validation** - Client-side validation with error highlighting
- **Search & Filtering** - Advanced search capabilities across all modules
- **Responsive Design** - Mobile-first approach with adaptive layouts

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **CSS Modules** - Scoped styling for better maintainability
- **Axios** - HTTP client for API communication
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Prisma** - Modern database ORM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### Database
- **PostgreSQL** - Primary database (configurable)

## 📁 Project Structure

```
client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components
│   │   ├── Dashboard.tsx   # Main dashboard component
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   ├── Header.tsx      # Application header
│   │   └── *.module.css    # CSS Modules for styling
│   ├── pages/              # Page components
│   │   ├── LoginPage.tsx   # Authentication page
│   │   ├── CompaniesPage.tsx # Company management
│   │   └── *.module.css    # Page-specific styles
│   ├── contexts/           # React Context providers
│   │   ├── AuthContext.tsx # Authentication state
│   │   ├── LanguageContext.tsx # Internationalization
│   │   └── ToastContext.tsx # Notifications
│   ├── services/           # API service layer
│   │   ├── auth.ts         # Authentication API
│   │   └── companies.ts    # Company management API
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── public/                 # Static assets
└── package.json           # Dependencies and scripts

server/
├── src/
│   ├── controllers/        # Request handlers
│   ├── routes/            # API routes
│   ├── middlewares/       # Custom middleware
│   ├── db/               # Database configuration
│   └── models/           # Data models
├── prisma/               # Database schema and migrations
└── package.json         # Server dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL (or your preferred database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SkillForge
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Server environment
   cd server
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # Seed the database (optional)
   node scripts/create-test-user.js
   ```

5. **Start Development Servers**
   ```bash
   # Terminal 1 - Start server
   cd server
   npm run dev

   # Terminal 2 - Start client
   cd client
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001

## 🔐 Default Credentials

### Root Administrator
- **Email:** admin@skillforge.com
- **Password:** admin123

### Test Data
The application includes mock data for testing purposes when the API is unavailable.

## 🌐 Internationalization

SkillForge supports multiple languages:
- **English** (en) - Default
- **Russian** (ru) - Full translation

Language can be switched using the language selector in the header.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** - Full feature set with sidebar navigation
- **Tablet** - Adaptive layout with collapsible sidebar
- **Mobile** - Mobile-first design with touch-friendly interfaces

## 🎨 Styling

The project uses **CSS Modules** for component-scoped styling:
- No global CSS conflicts
- Better maintainability
- Improved performance
- Type-safe class names

## 🔧 Development

### Available Scripts

#### Client
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

#### Server
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript
npm start            # Start production server
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes to database
```

### Code Style
- **ESLint** - Code linting and formatting
- **TypeScript** - Type checking
- **Prettier** - Code formatting (if configured)

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Heroku/DigitalOcean)
```bash
cd server
npm run build
# Deploy with environment variables
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
- **v1.1.0** - Added internationalization support
- **v1.2.0** - Migrated from Tailwind CSS to CSS Modules
- **v1.3.0** - Enhanced company management features

---

Built with ❤️ by the SkillForge Team