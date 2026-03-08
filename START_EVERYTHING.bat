@echo off
echo ========================================
echo  STARTING LMS PLATFORM
echo ========================================
echo.

echo Step 1: Killing any existing Node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo.
echo Step 2: Starting Backend...
start "LMS Backend" cmd /k "cd backend && npm start"
timeout /t 8 /nobreak >nul

echo.
echo Step 3: Seeding Database...
curl http://localhost:5000/api/seed
timeout /t 2 /nobreak >nul

echo.
echo Step 4: Starting Frontend...
start "LMS Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo  ALL DONE!
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Login: student@example.com / password123
echo.
pause
