# College Admin Portal - Angular Application

A complete Angular application with user registration, login, and profile management using localStorage and TypeScript.

## Features

✅ **User Registration** - Sign up with name, email, phone, and password
✅ **User Login** - Authenticate with email and password  
✅ **User Profile** - View and edit user profile information
✅ **Dashboard** - Welcome dashboard with admin statistics
✅ **Authentication Guard** - Protected routes requiring login
✅ **LocalStorage Persistence** - User data persisted across sessions
✅ **Bootstrap 5 UI** - Modern and responsive design

## Project Structure

```
college-admin/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/          # Login component
│   │   │   ├── register/       # Registration component
│   │   │   ├── profile/        # User profile component
│   │   │   └── dashboard/      # Main dashboard
│   │   ├── services/
│   │   │   └── user.ts         # User service with auth logic
│   │   ├── guards/
│   │   │   └── auth.guard.ts   # Route protection guard
│   │   └── app.routes.ts       # Application routing
│   └── index.html              # Main HTML
├── package.json
└── angular.json
```

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm installed
- Angular CLI: `npm install -g @angular/cli@latest`

### Steps

1. Navigate to project directory
```bash
cd /Users/sumedhjaltare/Desktop/wad/college-admin
```

2. Install dependencies (if not already done)
```bash
npm install
```

3. Start development server
```bash
npm start
# or
ng serve
```

4. Open in browser
Navigate to `http://localhost:4200`

## Usage Flow

### 1. Register a New User
- Click "Sign up here" link on the login page
- Fill in full name, email, phone, and password
- Click "Sign Up" button
- Auto-redirects to dashboard after successful registration

### 2. Login
- Enter registered email and password
- Click "Login" button
- Redirects to dashboard on success

### 3. View Dashboard
- Shows welcome message with user name
- Displays admin statistics (students, courses, faculty, placements)
- Quick actions to view profile or logout

### 4. Edit Profile
- Click on username in navbar or "View Profile" button
- Click "Edit Profile" to modify name and phone
- Changes saved to localStorage
- View mode shows registration date

### 5. Logout
- Click "Logout" button in navbar
- Clears user session and redirects to login

## Technologies Used

- **Angular 19+** - Framework
- **TypeScript** - Programming language
- **Bootstrap 5** - CSS framework
- **RxJS** - Reactive programming
- **localStorage** - Client-side persistence

## Build for Production

```bash
npm run build
# Output: /dist/college-admin/
```

## Support

For issues or questions, check the Angular documentation: https://angular.dev
