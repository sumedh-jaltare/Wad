# Angular College Admin Portal - Quick Start Guide

## Project Location
```
/Users/sumedhjaltare/Desktop/wad/college-admin
```

## ✅ What's Been Created

### Components
- **Login Component** (`src/app/components/login/`) - User authentication
- **Register Component** (`src/app/components/register/`) - New user signup
- **Profile Component** (`src/app/components/profile/`) - View & edit user data
- **Dashboard Component** (`src/app/components/dashboard/`) - Admin dashboard with stats

### Services & Guards
- **UserService** (`src/app/services/user.ts`) - User management & localStorage
- **AuthGuard** (`src/app/guards/auth.guard.ts`) - Route protection

### Key Files
- `src/app/app.routes.ts` - Application routing configuration
- `src/index.html` - Main HTML with Bootstrap 5
- `package.json` - Dependencies and scripts

## 🚀 How to Run

### Option 1: Development Server
```bash
cd /Users/sumedhjaltare/Desktop/wad/college-admin
npm start
```
Then open: http://localhost:4200

### Option 2: Build for Production
```bash
cd /Users/sumedhjaltare/Desktop/wad/college-admin
npm run build
```
Output: `/dist/college-admin/`

## 📋 Test Workflow

### 1. Register New User
- URL: http://localhost:4200/register
- Fill form: Name, Email, Phone, Password (min 6 chars)
- Click "Sign Up"
- Auto-redirects to dashboard

### 2. Login
- URL: http://localhost:4200/login
- Use credentials from registration
- Dashboard appears after login

### 3. View Profile
- Click username in navbar or "View Profile" button
- Shows all user information + registration date

### 4. Edit Profile
- Click "Edit Profile" button
- Update name and phone
- Click "Save Changes"

### 5. Logout
- Click "Logout" button
- Returns to login page

## 🔐 Features Implemented

✅ User registration with validation
✅ Secure login with password verification
✅ Protected routes (AuthGuard)
✅ Profile viewing and editing
✅ Dashboard with statistics
✅ LocalStorage persistence
✅ BehaviorSubject for reactive state
✅ Bootstrap 5 responsive UI
✅ Error handling and success messages
✅ Auto-login after registration

## 📦 Requirements Met

### a. Register User ✅
- Name, email, phone, password inputs
- Duplicate email prevention
- Password validation (min 6 characters)
- Data saved to localStorage

### b. Login User ✅
- Email and password authentication
- Error messages for invalid credentials
- Session persistence
- Redirect to dashboard on success

### c. Show User Data on Profile Component ✅
- View mode: displays all user information
- Edit mode: update name and phone
- Shows registration date
- Real-time updates to localStorage

## 🛠️ Technologies

- Angular 19+
- TypeScript
- Bootstrap 5
- RxJS (Observables)
- localStorage API
- Standalone components & routing

## 📂 File Structure

```
src/app/
├── components/
│   ├── login/
│   │   ├── login.ts
│   │   ├── login.html
│   │   └── login.css
│   ├── register/
│   │   ├── register.ts
│   │   ├── register.html
│   │   └── register.css
│   ├── profile/
│   │   ├── profile.ts
│   │   ├── profile.html
│   │   └── profile.css
│   └── dashboard/
│       ├── dashboard.ts
│       ├── dashboard.html
│       └── dashboard.css
├── services/
│   └── user.ts (UserService)
├── guards/
│   └── auth.guard.ts (AuthGuard)
├── app.routes.ts (Routing)
├── app.ts (Root component)
├── app.html
├── app.config.ts
└── app.css
```

## 🔌 Service Methods

### UserService

```typescript
// Register new user
register(name: string, email: string, password: string, phone: string): boolean

// Login
login(email: string, password: string): boolean

// Logout
logout(): void

// Get current user
getCurrentUser(): UserData | null

// Check authentication
isAuthenticated(): boolean

// Update profile
updateProfile(name: string, phone: string): boolean
```

## 💾 LocalStorage Schema

```javascript
{
  "college_users": [
    {
      "id": 1710000000000,
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123",
      "phone": "1234567890",
      "registeredAt": "2026-03-24T10:30:00.000Z"
    }
  ],
  "currentUser": {
    // Currently logged-in user object
  }
}
```

## 🔗 Routing

| Route | Protected | Component | Purpose |
|-------|-----------|-----------|---------|
| `/` | - | Dashboard | Root (redirects to dashboard) |
| `/login` | No | Login | User authentication |
| `/register` | No | Register | New user signup |
| `/dashboard` | Yes | Dashboard | Main dashboard |
| `/profile` | Yes | Profile | User profile |

## ❌ Known Limitations (Development)

- Passwords stored in plain text (use backend encryption in production)
- No email verification
- No password reset
- localStorage limited to single device
- No backend integration
- No database

## ✨ Next Steps for Production

1. Add backend server (Node.js/Express, Django, etc.)
2. Implement proper authentication (JWT tokens)
3. Use encrypted password storage
4. Add email verification
5. Add password reset functionality
6. Implement proper error handling
7. Add unit & e2e tests
8. Add form validation libraries (Reactive Forms)
9. Add state management (NgRx)
10. Deploy to production hosting

## 📞 Troubleshooting

### Port 4200 already in use?
```bash
ng serve --port 4300
```

### Clear localStorage?
Open DevTools → Application → LocalStorage → Delete entries

### Lost registration?
Check browser's localStorage in DevTools

### Route not found?
Ensure you're running the app at http://localhost:4200

## 📚 Resources

- Angular Docs: https://angular.dev
- Bootstrap Docs: https://getbootstrap.com
- TypeScript Docs: https://www.typescriptlang.org
- RxJS Docs: https://rxjs.dev
