# Installation & Setup Instructions

## ✅ System Requirements

- **Node.js**: v18 or higher
- **npm**: v8 or higher
- **Angular CLI**: Latest version (pre-installed)
- **Modern Web Browser**: Chrome, Firefox, Safari, Edge

## 📍 Project Location

```
/Users/sumedhjaltare/Desktop/wad/college-admin/
```

## 🚀 Quick Setup (3 Steps)

### Step 1: Navigate to Project Directory
```bash
cd /Users/sumedhjaltare/Desktop/wad/college-admin
```

### Step 2: Install Dependencies (if needed)
```bash
npm install
```
This installs all required packages listed in `package.json`.

### Step 3: Start Development Server
```bash
npm start
```
Or use:
```bash
ng serve
```

The application will open at: **http://localhost:4200**

---

## 📦 What Gets Installed

### Production Dependencies
- **@angular/core** - Angular framework
- **@angular/common** - Common Angular utilities
- **@angular/router** - Routing library
- **@angular/forms** - Form handling
- **rxjs** - Reactive programming library

### Development Dependencies
- **@angular/cli** - Development tools
- **typescript** - TypeScript compiler
- **zone.js** - Zone management

### Total Size
- `node_modules/`: ~265 MB
- Production bundle: ~70 KB (gzipped)

---

## 🛠️ Development Commands

### Start Development Server
```bash
npm start
# or
ng serve
```
- Opens at: http://localhost:4200
- Auto-reloads on file changes
- Watch mode enabled

### Build for Production
```bash
npm run build
# or
ng build
```
- Output: `dist/college-admin/`
- Optimized & minified code
- Ready for deployment

### Run Tests
```bash
npm test
# or
ng test
```
(Note: Tests can be added for this project)

---

## 🌐 Browser Access

### Development
```
http://localhost:4200
```

### Test Credentials (after signup)
```
Email: your-registered-email@example.com
Password: your-registered-password
```

---

## 🔧 Configuration Files

### `.angular.json`
Main Angular configuration
- Build options
- Development server settings
- Project structure

### `tsconfig.json`
TypeScript configuration
- Compiler options
- Module resolution
- Target ES version

### `package.json`
Project metadata
- Dependencies
- Scripts
- Version info

---

## �� Project Structure

```
college-admin/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── profile/
│   │   │   └── dashboard/
│   │   ├── services/
│   │   │   └── user.ts
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── app.routes.ts
│   │   ├── app.ts
│   │   └── app.html
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── dist/              (after build)
├── node_modules/      (after npm install)
├── package.json
├── angular.json
├── tsconfig.json
└── README.md
```

---

## 🔄 First Run Checklist

- [ ] Node.js installed? (`node --version`)
- [ ] npm updated? (`npm --version`)
- [ ] Angular CLI available? (`ng --version`)
- [ ] Navigated to project folder?
- [ ] Dependencies installed? (`npm install`)
- [ ] Development server running? (`npm start`)
- [ ] Browser opened at http://localhost:4200?
- [ ] Login/Register page visible?

---

## 🆘 Troubleshooting

### Issue: "npm: command not found"
**Solution**: Install Node.js from https://nodejs.org

### Issue: "ng: command not found"
**Solution**: 
```bash
npm install -g @angular/cli@latest
```

### Issue: "Port 4200 already in use"
**Solution**: 
```bash
ng serve --port 4300
# Then open http://localhost:4300
```

### Issue: "dependencies not installed"
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Module not found" errors
**Solution**:
```bash
npm install --legacy-peer-deps
```

### Issue: "localStorage not working"
**Solution**:
- Check browser privacy settings
- Ensure localhost is allowed
- Clear browser cache and cookies

---

## 🌍 Environment Variables

No environment variables needed for development.

For production deployment, create `src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'your-api-url-here'
};
```

---

## 📋 Initial Setup Complete

After running `npm start`, you should see:
```
✔ Building...
Initial chunk files | Names         |  Raw size | Estimated transfer size
main-XXXXX.js       | main          | 268.89 kB |                70.65 kB

Application bundle generation complete. [2.441 seconds]

✔ Compiled successfully.

Open http://localhost:4200/
```

---

## 🎯 Next Steps

1. **Register**: Create a test account
2. **Verify**: Check localStorage in DevTools
3. **Test**: Try all features (login, profile edit, etc.)
4. **Build**: Run `npm run build` for production
5. **Deploy**: Use the `dist/` folder contents

---

## 📞 Support & Resources

- **Angular Docs**: https://angular.dev
- **Bootstrap Docs**: https://getbootstrap.com
- **Node.js Docs**: https://nodejs.org/docs
- **npm Docs**: https://docs.npmjs.com

---

## ✅ Installation Complete!

Your Angular College Admin Portal is ready to use.

Run: `npm start` and open http://localhost:4200
