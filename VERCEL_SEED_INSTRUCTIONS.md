# How to Seed Your Vercel Deployment

## The Issue

The seed endpoint is a **POST** request, not GET. You can't just visit it in your browser.

## Solution: Use This HTML Page

I'll create a simple HTML page you can use to seed your database.

### Step 1: Create a Test Page

Save this as `test-seed.html` on your computer:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Seed Database</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-sizing: border-box;
        }
        button {
            width: 100%;
            padding: 12px;
            background: #0070f3;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background: #0051cc;
        }
        button:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
        .result {
            margin-top: 20px;
            padding: 15px;
            border-radius: 5px;
            display: none;
        }
        .success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        pre {
            background: #f5f5f5;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌱 Seed Your Database</h1>
        <p>Enter your Vercel deployment URL below:</p>
        
        <input 
            type="text" 
            id="apiUrl" 
            placeholder="https://your-project.vercel.app"
            value="https://your-project.vercel.app"
        />
        
        <button onclick="seedDatabase()" id="seedBtn">
            Seed Database
        </button>
        
        <div id="result" class="result"></div>
    </div>

    <script>
        async function seedDatabase() {
            const apiUrl = document.getElementById('apiUrl').value.trim();
            const resultDiv = document.getElementById('result');
            const seedBtn = document.getElementById('seedBtn');
            
            // Validate URL
            if (!apiUrl) {
                showResult('Please enter your Vercel URL', 'error');
                return;
            }
            
            // Remove trailing slash if present
            const baseUrl = apiUrl.replace(/\/$/, '');
            const seedUrl = `${baseUrl}/api/seed`;
            
            // Disable button and show loading
            seedBtn.disabled = true;
            seedBtn.textContent = 'Seeding... Please wait...';
            resultDiv.style.display = 'none';
            
            try {
                const response = await fetch(seedUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    showResult(`
                        <strong>✅ Success!</strong><br><br>
                        ${data.message}<br><br>
                        <strong>Test Accounts:</strong><br>
                        <strong>Student:</strong> ${data.testAccounts.student.email} / ${data.testAccounts.student.password}<br>
                        <strong>Instructor:</strong> ${data.testAccounts.instructor.email} / ${data.testAccounts.instructor.password}<br><br>
                        <strong>Data Created:</strong><br>
                        <pre>${JSON.stringify(data.data, null, 2)}</pre>
                    `, 'success');
                } else {
                    showResult(`
                        <strong>❌ Error</strong><br><br>
                        ${data.message || 'Failed to seed database'}<br><br>
                        ${data.error ? `<pre>${data.error}</pre>` : ''}
                    `, 'error');
                }
            } catch (error) {
                showResult(`
                    <strong>❌ Network Error</strong><br><br>
                    Could not connect to: ${seedUrl}<br><br>
                    Error: ${error.message}<br><br>
                    <strong>Possible issues:</strong><br>
                    • Wrong URL<br>
                    • Backend not deployed<br>
                    • CORS issue<br>
                    • Network problem
                `, 'error');
            } finally {
                seedBtn.disabled = false;
                seedBtn.textContent = 'Seed Database';
            }
        }
        
        function showResult(message, type) {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = message;
            resultDiv.className = `result ${type}`;
            resultDiv.style.display = 'block';
        }
    </script>
</body>
</html>
```

### Step 2: Use the HTML Page

1. Save the HTML code above as `test-seed.html`
2. Open it in your browser
3. Enter your Vercel URL (e.g., `https://your-project.vercel.app`)
4. Click "Seed Database"
5. Wait for the success message

### Step 3: Login

After seeding, use these credentials:

**Student:**
- Email: `student@example.com`
- Password: `password123`

**Instructor:**
- Email: `instructor@example.com`
- Password: `password123`

---

## Alternative: Use curl (Command Line)

If you prefer command line:

```bash
curl -X POST https://your-project.vercel.app/api/seed \
  -H "Content-Type: application/json"
```

---

## Alternative: Use Postman

1. Open Postman
2. Create new request
3. Method: **POST**
4. URL: `https://your-project.vercel.app/api/seed`
5. Click "Send"

---

## Troubleshooting

### If you get "Not Found":
- Make sure you're using the correct Vercel URL
- Check that your backend is deployed
- Verify the URL doesn't have extra slashes

### If you get "Database connection failed":
- Go to Vercel Dashboard → Settings → Environment Variables
- Make sure these are set:
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `HUGGINGFACE_API_KEY`
  - `NODE_ENV=production`

### If you get CORS error:
- This shouldn't happen with POST from HTML file
- If it does, the backend CORS is already configured

---

## What Gets Created

After seeding:
- ✅ 2 users (student + instructor)
- ✅ 7 courses
- ✅ 21 sections
- ✅ 72 lessons
- ✅ 7 quizzes

---

## Important Notes

1. **Seeding clears existing data** - It deletes all users, courses, lessons, etc.
2. **Run seed only once** - Unless you want to reset everything
3. **Production warning** - Only seed in development/testing, not in production with real users

---

## Quick Check

After seeding, verify it worked:

1. Go to your frontend URL
2. Click "Student Demo" or "Instructor Demo"
3. You should be logged in automatically
4. You should see courses on the dashboard

If you see courses, it worked! 🎉
