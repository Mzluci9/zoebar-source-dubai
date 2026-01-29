# Zoebar Business Group Website

A modern, responsive website for Zoebar Business Group - a Dubai-based company specializing in premium Ethiopian coffee, organic produce, hospitality services, and AI-driven solutions.

## 🌟 Features

### Product Offerings
- **Premium Ethiopian Coffee** - Single-origin, farm-direct coffee beans from Ethiopian highlands
- **Organic Fruits & Vegetables** - Fresh produce harvested to order with 1-2 week delivery
- **Dubai Hospitality Services** - Quality apartments with modern amenities
- **AI-Driven Solutions** - Innovative AI-powered business optimization tools

### Website Highlights
- 🎠 **Interactive Hero Carousel** - Showcasing all four business areas with auto-play
- 📱 **Fully Responsive Design** - Optimized for mobile, tablet, and desktop
- 🎨 **Modern UI/UX** - Built with React, TypeScript, and Tailwind CSS
- 🤖 **AI Support Assistant** - Powered by OpenAI GPT-4, context-aware chatbot
- 🧭 **Dedicated Products Page** - Detailed information with sticky navigation tabs
- ✨ **Smooth Animations** - Professional transitions and hover effects
- 🎯 **SEO Optimized** - Clean structure and semantic HTML

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS with custom animations
- **UI Components:** Radix UI primitives with shadcn/ui
- **Routing:** React Router v6
- **State Management:** React Hooks
- **AI Integration:** OpenAI GPT-4o-mini
- **Icons:** Lucide React
- **Carousel:** Embla Carousel

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Git**

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

Use the provided startup script to install dependencies and run the application:

```bash
# Make the script executable
chmod +x start.sh

# Run the script (starts on port 3000)
./start.sh
```

The script will:
1. Install all required dependencies
2. Set up the environment
3. Start the development server on port 3000

### Option 2: Manual Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd zoebar-source-dubai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

4. **Start the development server**
```bash
# Default port (8080)
npm run dev

# Or specify a custom port
npm run dev -- --port 3000
```

5. **Open your browser**
Navigate to `http://localhost:3000` (or the port you specified)

## 📁 Project Structure

```
zoebar-source-dubai/
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── assets/            # Images and media files
│   │   ├── hero-coffee.jpg
│   │   ├── hero-produce.jpg
│   │   ├── hero-hospitality.jpg
│   │   ├── hero-ai.jpg
│   │   └── logo.png
│   ├── components/        # Reusable React components
│   │   ├── ui/           # Shadcn UI components
│   │   ├── About.tsx
│   │   ├── ChatInterface.tsx  # AI Assistant
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx      # Homepage carousel
│   │   ├── Navbar.tsx
│   │   └── Products.tsx
│   ├── pages/            # Route pages
│   │   ├── Index.tsx     # Homepage
│   │   ├── Products.tsx  # Products showcase
│   │   ├── Contact.tsx
│   │   ├── Support.tsx   # AI Assistant page
│   │   └── NotFound.tsx
│   ├── lib/              # Utility functions
│   ├── hooks/            # Custom React hooks
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── .env.local            # Environment variables (not in git)
├── package.json
├── tailwind.config.ts
├── vite.config.ts
├── start.sh              # Automated startup script
└── README.md
```

## 🎯 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Build for development
npm run build:dev

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🤖 AI Support Assistant

The website includes an intelligent AI assistant that can answer questions about:
- Product specifications and availability
- Pricing and bulk ordering
- Hospitality services and bookings
- AI solutions and implementation
- General company information

**Features:**
- Real-time streaming responses
- Context-aware of all website content
- Conversations clear on page reload
- Powered by OpenAI GPT-4o-mini

**Access:** Navigate to `/support` or click "Get Support" in the navigation menu.

## 📧 Contact Form - READY TO USE!

The contact form sends emails to **natnaelargaw@gmail.com** using **Resend**. It's **already configured** and ready to use!

**Quick Start (30 seconds):**

Open two terminals:
```bash
# Terminal 1: Start email server
npm run server

# Terminal 2: Start website
npm run dev -- --port 3333
```

**OR use the one-command startup:**
```bash
./start-with-email.sh
```

Then visit: http://localhost:3333/contact and test it!

**Complete Guide:** See [CONTACT_FORM_READY.md](CONTACT_FORM_READY.md)

**Features:**
- ✅ Already configured with Resend API key
- ✅ Beautiful HTML emails with professional formatting
- ✅ 3,000 free emails/month
- ✅ Reply-to automatically set to sender
- ✅ Works immediately - no additional setup needed
- ✅ Fast delivery (<1 second)
- ✅ Production-ready code

## 🎨 Key Pages

### Homepage (`/`)
- Interactive 3-slide hero carousel
- About section
- Products overview
- Footer with contact information

### Products Page (`/products`)
- Sticky navigation tabs
- Four detailed product sections
- Feature highlights and benefits
- Direct contact CTAs for each product

### Support Page (`/support`)
- AI-powered chat interface
- Instant answers to customer questions
- Context-aware responses

### Contact Page (`/contact`)
- Contact information
- Business inquiry forms
- Location details

## 🎨 Design Features

- **Color Scheme:** Emerald green primary color with dark accents
- **Typography:** System fonts with carefully selected hierarchy
- **Animations:** Smooth transitions and hover effects
- **Responsive:** Mobile-first approach with breakpoints for all devices
- **Accessibility:** ARIA labels and keyboard navigation support

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENAI_API_KEY` | OpenAI API key for AI assistant | Yes |

**Example `.env.local` file:**
```env
# OpenAI for AI Assistant
VITE_OPENAI_API_KEY=sk-proj-your-key-here
```

**Note:** 
- Resend API key for contact form is stored in `server.js` (already configured)
- No additional environment variables needed for contact form
- Contact form works out of the box!

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📦 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory. Deploy this directory to your hosting service.

### Recommended Hosting Platforms
- Vercel (recommended for React apps)
- Netlify
- AWS S3 + CloudFront
- DigitalOcean App Platform

### Environment Variables for Production

Make sure to set the `VITE_OPENAI_API_KEY` environment variable in your hosting platform's settings.

## 🔧 Configuration

### Vite Configuration
Edit `vite.config.ts` to modify:
- Server port (default: 8080)
- Build options
- Plugin configuration

### Tailwind Configuration
Edit `tailwind.config.ts` to customize:
- Color palette
- Fonts
- Spacing
- Breakpoints

## 🐛 Troubleshooting

### Common Issues

**1. Port already in use**
```bash
# Use a different port
npm run dev -- --port 3001
```

**2. Dependencies not installed**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**3. AI Assistant not working**
- Check that `.env.local` exists with valid OpenAI API key
- Restart the dev server after adding environment variables
- Check browser console for error messages

**4. Build errors**
```bash
# Clear cache and rebuild
rm -rf dist node_modules/.vite
npm run build
```

## 📝 Development Guidelines

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/Navbar.tsx`

### Adding New Components
1. Create component in `src/components/`
2. Use TypeScript for type safety
3. Follow existing naming conventions
4. Add proper prop types

### Styling Guidelines
- Use Tailwind utility classes
- Follow mobile-first approach
- Maintain consistent spacing
- Use design tokens from config

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved by Zoebar Business Group.

## 📞 Contact

**Zoebar Business Group**
- Location: Dubai, UAE
- Website: [Coming Soon]
- Email: [Contact through website]

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- UI Components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Powered by [OpenAI](https://openai.com/)

---

**Last Updated:** October 2025
**Version:** 1.0.0
