# React Project

A modern React application built with Vite, featuring an organized folder structure and React Router for navigation.

## 🚀 Features

- ⚛️ **React 18** - Latest React features
- ⚡ **Vite** - Fast build tool and dev server
- 🧭 **React Router** - Client-side routing
- 📁 **Organized Structure** - Scalable folder organization
- 🎨 **Modern CSS** - Clean styling with CSS variables
- 🔧 **Service Layer** - Abstracted API calls
- 📱 **Responsive Design** - Mobile-friendly layout

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components
│   │   ├── Layout.jsx
│   │   ├── Navigation.jsx
│   │   └── Footer.jsx
│   └── ui/             # Common UI elements
│       ├── Button.jsx
│       └── Card.jsx
├── pages/              # Route-specific components
│   ├── HomePage.jsx
│   ├── AboutPage.jsx
│   ├── ContactPage.jsx
│   └── NotFoundPage.jsx
├── services/           # API calls and business logic
│   ├── apiService.js
│   ├── userService.js
│   └── postService.js
├── App.jsx            # Main app component with routing
├── main.jsx           # App entry point
├── App.css            # Main styles
└── index.css          # Global styles
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🧭 Routing

The application uses React Router for navigation with the following routes:

- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- `*` - 404 Not Found page

## 🔧 Services

The project includes a service layer for API calls:

- **apiService** - Base HTTP client with common methods
- **userService** - User-related API operations
- **postService** - Post-related API operations

Services use JSONPlaceholder API for demonstration purposes.

## 🎨 Styling

- CSS variables for consistent theming
- Responsive design principles
- Modern CSS features
- Component-scoped styling ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🚀 Deployment to Vercel

Follow these steps to deploy the React app to [Vercel](https://vercel.com/):

### Prerequisites

- A [Vercel account](https://vercel.com/signup)
- The Vercel CLI installed globally (optional, for CLI deployment):
  ```bash
  npm install -g vercel
  ```

### Deployment Steps

1. **Push Your Code to GitHub**  
   Ensure your project is pushed to a GitHub repository. Vercel integrates seamlessly with GitHub.

2. **Connect Your Repository to Vercel**  
   - Log in to your Vercel account.
   - Click on **New Project**.
   - Select your GitHub repository.
   - Configure the project settings (you can leave most settings as default).

3. **Set Build and Output Settings**  
   - **Framework Preset**: Select `Vite` (or `Create React App` if applicable).
   - **Build Command**: Use the default `npm run build`.
   - **Output Directory**: Use the default `dist`.

4. **Set Environment Variables (Optional)**  
   If your app requires environment variables:
   - Go to the **Settings** tab of your Vercel project.
   - Navigate to the **Environment Variables** section.
   - Add your variables (e.g., `REACT_APP_API_URL`) and their values.
   - Click **Save**.

   Example:
   ```
   REACT_APP_API_URL=https://api.example.com
   ```

5. **Deploy the App**  
   - Click **Deploy** to start the deployment process.
   - Vercel will build and deploy your app. Once completed, you’ll get a live URL (e.g., `https://your-app.vercel.app`).

### CLI Deployment (Optional)

If you prefer using the Vercel CLI:

1. **Login to Vercel**  
   Run the following command to log in:
   ```bash
   vercel login
   ```

2. **Deploy the App**  
   Navigate to your project directory and run:
   ```bash
   vercel
   ```

3. **Set Environment Variables**  
   Use the following command to add environment variables:
   ```bash
   vercel env add <key> <value>
   ```
   Example:
   ```bash
   vercel env add REACT_APP_API_URL https://api.example.com
   ```

4. **Redeploy**  
   After setting environment variables, redeploy the app:
   ```bash
   vercel --prod
   ```

### Post-Deployment

- Your app will be live at the URL provided by Vercel (e.g., `https://your-app.vercel.app`).
- Any changes pushed to the connected GitHub repository will trigger automatic redeployments.

### Troubleshooting

- **Build Errors**: Check the build logs in the Vercel dashboard for details.
- **Environment Variables Not Working**: Ensure they are prefixed with `REACT_APP_` (for React apps).
- **Custom Domain**: Add a custom domain in the Vercel dashboard under the **Domains** section.

For more details, refer to the [Vercel Documentation](https://vercel.com/docs).
