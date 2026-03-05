# AutoSocial AI

AutoSocial AI is a professional-grade, AI-powered social media automation platform designed to streamline content creation, scheduling, and analytics across multiple social networks.

![Landing Page](https://raw.githubusercontent.com/NinadPanchal/Social-media-automation/main/screenshots/landing.png)

## 🚀 Features

- **AI Content Generation**: Leverage Google Gemini AI to generate platform-optimized posts for Instagram, Twitter, and LinkedIn from a single prompt.
- **Smart Scheduling**: Choose the perfect date and time for your posts with a beautiful, interactive scheduling interface.
- **Real-time Analytics**: Monitor your performance with a live dashboard showing impressions, engagement rates, and growth.
- **Unified Dashboard**: Manage all your social media activity from a centralized, premium glassmorphism-styled dashboard.
- **Draft Management**: Save your creative ideas to refine them later.
- **Multi-Platform Support**: Tailored content formatting for Instagram, Twitter, and LinkedIn.

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Vanilla CSS with Design System, Lucide React Icons
- **Animations**: GSAP, Framer Motion
- **State Management**: React Context API

### Backend
- **Framework**: FastAPI (Python)
- **Database**: SQLite with SQLAlchemy ORM
- **AI Integration**: Google Generative AI (Gemini)
- **Authentication**: JWT-based secure authentication

## 🏁 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

### Quick Start (Local Development)

The project includes a unified startup script to launch both servers simultaneously:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/NinadPanchal/Social-media-automation.git
   cd Social-media-automation
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   # Create a .env file with your GEMINI_API_KEY
   ```

3. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

4. **Run the application**:
   Return to the root directory and run:
   ```bash
   ./start.sh
   ```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001
- **API Documentation**: http://localhost:8001/docs

## 📄 Configuration

Create a `.env` file in the `backend/` directory with the following variables:

```env
GEMINI_API_KEY=your_api_key_here
JWT_SECRET=your_jwt_secret_here
DATABASE_URL=sqlite:///./autosocial.db
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.
