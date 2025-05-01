
# Blogii

A blog application monoripo.

## Getting Started

### Clone Repository

```bash
git clone https://github.com/arghyadutta080/Blogi.git
cd Blogii
```

### Server Setup

1. Navigate to server directory
```bash
cd server
```

2. Create and activate virtual environment
```bash
python -m venv .venv
source .venv/bin/activate  # For Linux/Mac
# OR
.venv\Scripts\activate.ps1     # For Windows
```

3. Create .env file with the following content
```bash
DATABASE_URL=<your-database-url>
SECRET_KEY=<your-secret-key>
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
CLOUDINARY_URL=<your-cloudinary-url>
```

4. Install dependencies and run server
```bash
pip install -r requirements.txt
fastapi dev app/main.py
```

5. The server will run on http://127.0.0.1:8000 and API docs will be available at http://127.0.0.1:8000/docs



### Client Setup

1. Navigate to client directory from repository root
```bash
cd client
```

2. Create .env.local file with the following content
```bash
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1
```

3. Install dependencies and run client
```bash
npm install
npm run dev
```

4. The server will run on http://localhost:3000 and client on localhost:3000 by default.