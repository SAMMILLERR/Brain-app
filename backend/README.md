# Brain App Backend

A RESTful API backend for the Brain App - a personal knowledge management system.

## Features

- User authentication with JWT
- Content management (CRUD operations)
- Tag system with reuse functionality
- Brain sharing capabilities
- Rate limiting
- CORS support
- MongoDB integration

## Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```bash
   npm install
   ```

4. Create environment file:
   ```bash
   cp .env.example .env
   ```

5. Update the `.env` file with your configuration:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   PORT=3000
   NODE_ENV=development
   CORS_ORIGINS=http://localhost:5173,http://localhost:5174
   ```

### Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/v1/signup` - User registration
- `POST /api/v1/signin` - User login

### Content Management
- `GET /api/v1/content` - Get user's content
- `POST /api/v1/content` - Create new content
- `PATCH /api/v1/content/:id` - Update content
- `DELETE /api/v1/content/:id` - Delete content

### Brain Sharing
- `POST /api/v1/brain/share` - Generate share link
- `GET /api/v1/brain/:shareLink` - Access shared brain

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `PORT` | Server port (default: 3000) | No |
| `NODE_ENV` | Environment (development/production) | No |
| `CORS_ORIGINS` | Allowed CORS origins (comma-separated) | No |

## Content Types

The API supports the following content types:
- `tweet` - Twitter posts
- `reddit` - Reddit posts
- `youtube` - YouTube videos
- `document` - Documents
- `link` - General links
- `article` - Articles

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting on signin endpoint
- CORS protection
- Input validation with Zod

## Database Schema

### User
- `username` - Unique username
- `password` - Hashed password

### Post
- `title` - Content title
- `link` - Content URL
- `type` - Content type
- `tags` - Array of tag references
- `userId` - User reference

### Tags
- `title` - Tag name (reusable across users)

### Link
- `hash` - Unique share identifier
- `userId` - User reference

## Development

The project uses TypeScript and includes:
- Express.js for the web framework
- Mongoose for MongoDB integration
- Zod for input validation
- bcrypt for password hashing
- jsonwebtoken for authentication
- cors for cross-origin requests

## License

MIT
