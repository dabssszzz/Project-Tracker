# Getting Started Checklist

Follow this checklist to get your template up and running!

## ✅ Initial Setup

### 1. Navigate to Template Directory
```bash
cd C:\Users\Timothy.Diego\Documents\CAS.OpsPortal.Web\TEMPLATE.WEB.CLIENT
```

### 2. Install Dependencies
```bash
npm install
```
⏱️ This may take 2-3 minutes

### 3. Create Environment File
```bash
copy .env.example .env
```

### 4. Configure Environment Variables
Open `.env` and update:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Your App Name
```

### 5. Start Development Server
```bash
npm run dev
```

✅ Open http://localhost:5173 in your browser

---

## 🎨 Customization Checklist

### Branding
- [ ] Update app name in `package.json`
- [ ] Update title in `index.html`
- [ ] Replace favicon in `public/`
- [ ] Update header title in `src/app/layouts/Header.jsx`

### Theme
- [ ] Customize colors in `tailwind.config.js`
- [ ] Update CSS variables in `src/index.css`
- [ ] Test light and dark modes

### Navigation
- [ ] Update menu items in `src/app/layouts/Sidebar.jsx`
- [ ] Add your routes in `src/app/routes/index.jsx`

---

## 🔐 Backend Integration

### API Configuration
- [ ] Set `VITE_API_BASE_URL` in `.env`
- [ ] Update auth endpoints in `src/shared/services/auth.service.js`
- [ ] Test login/logout flow

### Authentication
- [ ] Verify JWT token format matches your backend
- [ ] Update token storage strategy if needed
- [ ] Configure token expiration handling

---

## 📝 Development Tasks

### Create Your First Feature
- [ ] Create directory: `src/features/my-feature/`
- [ ] Add page component: `MyFeaturePage.jsx`
- [ ] Add route in `src/app/routes/index.jsx`
- [ ] Add navigation link in Sidebar

### Add Your First API Call
- [ ] Create service in `src/shared/services/`
- [ ] Use httpClient for requests
- [ ] Implement with TanStack Query
- [ ] Add error handling

### Create Custom Components
- [ ] Add components to `src/shared/components/ui/`
- [ ] Export from `src/shared/components/index.js`
- [ ] Document usage

---

## 🧪 Testing

### Manual Testing
- [ ] Test login flow
- [ ] Test protected routes
- [ ] Test theme switching
- [ ] Test responsive design
- [ ] Test in different browsers

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels present
- [ ] Color contrast sufficient

---

## 📦 Pre-Deployment

### Code Quality
- [ ] Run `npm run lint` - No errors
- [ ] Remove console.logs
- [ ] Remove unused imports
- [ ] Update README with your info

### Build & Test
- [ ] Run `npm run build` - Successful
- [ ] Check bundle size (dist folder)
- [ ] Test production build: `npm run preview`

### Environment
- [ ] Create production `.env` file
- [ ] Set production API URL
- [ ] Remove development flags

### Documentation
- [ ] Update README.md with project details
- [ ] Document custom features
- [ ] Add deployment instructions

---

## 🚀 Deployment

### Pre-Deploy
- [ ] Commit all changes to git
- [ ] Tag release version
- [ ] Update version in package.json

### Deploy
- [ ] Build production: `npm run build`
- [ ] Upload `dist/` folder to hosting
- [ ] Configure environment variables
- [ ] Test deployed application

### Post-Deploy
- [ ] Verify all pages load
- [ ] Test authentication
- [ ] Check API connections
- [ ] Monitor for errors

---

## 📚 Documentation to Read

Priority order:
1. ✅ **README.md** - Start here for overview and setup
2. ✅ **TEMPLATE_SUMMARY.md** - What's included and quick start
3. ✅ **DEVELOPMENT.md** - Development patterns and examples
4. ✅ **ARCHITECTURE.md** - Deep dive into architecture

---

## 🆘 Troubleshooting

### Port Already in Use
```bash
npx kill-port 5173
```

### Dependencies Issue
```bash
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Build Errors
```bash
npm run lint
# Fix any errors reported
npm run build
```

### Styling Not Working
- Clear browser cache
- Restart dev server
- Check Tailwind config

---

## 💡 Pro Tips

1. **Use Path Aliases**: Import with `@shared/`, `@app/`, `@features/`
2. **React DevTools**: Install browser extension for debugging
3. **VS Code Extensions**: ESLint, Tailwind CSS IntelliSense
4. **Git Commits**: Make small, meaningful commits
5. **Component First**: Build reusable components in `shared/`

---

## 🎯 Next Steps After Setup

1. **Explore the codebase**: Open files and read comments
2. **Try the examples**: Run dev server and navigate pages
3. **Create a test feature**: Follow DEVELOPMENT.md guide
4. **Customize styling**: Update Tailwind config
5. **Connect your API**: Update environment variables

---

## ✅ You're Ready When...

- [ ] Dev server starts without errors
- [ ] Can navigate between pages
- [ ] Login/logout flow works (even with mock data)
- [ ] Theme toggle works
- [ ] Built your first custom feature
- [ ] Successfully built for production

---

**🎉 Congratulations! Your template is ready for development!**

For questions, refer to:
- README.md - General usage
- DEVELOPMENT.md - Code examples
- ARCHITECTURE.md - Design decisions

Happy coding! 🚀
