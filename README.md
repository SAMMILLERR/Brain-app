# Brain App 🧠

A modern, neural-inspired personal knowledge management system that helps you organize, store, and share your thoughts, links, and ideas in a beautiful, intuitive interface.

## ✨ Features

### 🎨 Beautiful Neural-Themed Interface
Experience a stunning dark/light mode interface with neural network-inspired design elements, glassmorphism effects, and smooth animations.

**Screenshot:**
<!-- Add screenshot of the main interface here -->

### 🔐 Secure Authentication
Clean, brain-themed login and signup experience with JWT-based authentication for secure access to your personal knowledge vault.

**Screenshot:**
<!-- Add screenshot of login page here -->
<img width="1915" height="903" alt="image" src="https://github.com/user-attachments/assets/e1d058fc-bd97-4e41-a370-0a28c26a6b37" />


### 📝 Content Management
Easily add, edit, and organize different types of content:
- 🌐 Website links
- 🎥 Video content  
- 📄 Documents
- And more...

**Screenshot:**
<!-- Add screenshot of content creation form here -->
<img width="1919" height="907" alt="image" src="https://github.com/user-attachments/assets/fc0e64dc-0584-430c-a0e2-e053c6b2df0a" />


### 🏷️ Smart Tagging System
Organize your brain drops with an intelligent tagging system that suggests existing tags and helps you categorize your knowledge.

**Screenshot:**
<!-- Add screenshot of tagging interface here -->
![Tagging System](screenshots/tagging-system.png)

### 🔄 Content Types & Filtering
Filter and browse your content by type with beautiful category icons and intuitive navigation.

**Screenshot:**
<!-- Add screenshot of content filtering here -->
<img width="1558" height="187" alt="image" src="https://github.com/user-attachments/assets/65f76ede-f9c6-47a6-8836-26aae26df334" />


### 🌐 Brain Sharing
Share your knowledge with others through secure shareable links. Let others explore your curated thoughts and discoveries.

**Screenshot:**
<!-- Add screenshot of brain sharing feature here -->
<img width="1513" height="256" alt="image" src="https://github.com/user-attachments/assets/c41b3897-5a45-46fa-8153-3175dd522d09" />


### 🌓 Theme Toggle
Seamlessly switch between light and dark modes with your preference automatically saved.

**Screenshot:**
<!-- Add screenshot showing light/dark mode comparison here -->
<img width="1919" height="907" alt="image" src="https://github.com/user-attachments/assets/e58af14b-2311-436f-9441-d646c201791b" />




**Screenshot:**
<!-- Add screenshot of mobile interface here -->
<img width="1918" height="923" alt="image" src="https://github.com/user-attachments/assets/72fec630-6aad-4f45-9dc7-e26c36e25dd5" />


## 🎥 Walkthrough Video

Get a complete overview of all features and how to use the Brain App:

<!-- Brain App Walkthrough Video -->
[Brain App Walkthrough](https://www.loom.com/share/ab81d25c932140789d2c9c764b5260e1)



*Click the image above to watch the full walkthrough video*

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/brain-app.git
   cd brain-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create environment file
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   
   # Build and start the backend
   npm run build
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd ../brainly-main-frontend
   npm install
   
   # Start the development server
   npm run dev
   ```

4. **Access the App**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Neural Theme** - Beautiful glassmorphism and neural-inspired design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe backend development
- **MongoDB** - NoSQL database
- **JWT** - JSON Web Token authentication
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
brain-app/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── index.ts        # Main server file
│   │   └── Auth.ts         # Authentication middleware
│   ├── .env.example        # Environment variables template
│   └── package.json
├── brainly-main-frontend/   # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── App.tsx         # Main application component
│   │   └── theme.css       # Neural theme styles
│   └── package.json
└── screenshots/            # Documentation screenshots
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/brain-app
JWT_SECRET=your-super-secure-jwt-secret-key
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
PORT=3000
```

## 🎨 Theme Customization

The Brain App features a custom neural-inspired theme with:
- **CSS Variables** for easy customization
- **Dark/Light mode** support
- **Glassmorphism effects** for modern UI
- **Neural network patterns** as background elements
- **Smooth animations** and transitions

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Neural network design inspiration
- Modern glassmorphism UI trends
- React and TypeScript communities
- MongoDB and Express.js ecosystems

## 📧 Contact

For questions, suggestions, or support:
- **Email**: your-email@example.com
- **GitHub**: [@yourusername](https://github.com/yourusername)

---

**Made with ❤️ and 🧠 by the Brain App Team**
