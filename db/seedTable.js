import { db } from "./db.js";

async function seedTable(){


    db.query(`    
INSERT INTO Tasks (title, description, email, date, status) VALUES

-- EMPLOYEE 1 (Frontend focused)
('Fix login screen validation', 'Ensure proper error handling for invalid inputs', 'emp1@gmail.com', '2026-04-01', 'pending'),
('Implement signup API integration', 'Connect frontend signup with backend API', 'emp1@gmail.com', '2026-04-02', 'in-progress'),
('Improve button responsiveness', 'Fix touch delay issues in mobile UI', 'emp1@gmail.com', '2026-04-03', 'completed'),
('Add loading spinner on login', 'Show spinner while API call is in progress', 'emp1@gmail.com', '2026-04-04', 'pending'),
('Refactor form state management', 'Clean up useState handling for inputs', 'emp1@gmail.com', '2026-04-05', 'completed'),

-- EMPLOYEE 2 (Backend focused)
('Create JWT authentication middleware', 'Validate token and attach user to request', 'emp2@gmail.com', '2026-04-01', 'pending'),
('Fix password hashing issue', 'Ensure bcrypt hashing works correctly', 'emp2@gmail.com', '2026-04-02', 'in-progress'),
('Optimize tasks query performance', 'Improve query efficiency using indexes', 'emp2@gmail.com', '2026-04-03', 'completed'),
('Handle duplicate user signup', 'Prevent users from registering same email twice', 'emp2@gmail.com', '2026-04-04', 'pending'),
('Add error handling to API routes', 'Wrap all routes in try-catch blocks', 'emp2@gmail.com', '2026-04-05', 'completed'),

-- EMPLOYEE 3 (Full-stack / DevOps)
('Setup environment variables', 'Move secrets like JWT key to .env file', 'emp3@gmail.com', '2026-04-01', 'pending'),
('Fix unauthorized API access bug', 'Ensure protected routes require valid token', 'emp3@gmail.com', '2026-04-02', 'in-progress'),
('Write API documentation', 'Document all endpoints and request formats', 'emp3@gmail.com', '2026-04-03', 'completed'),
('Implement task filtering by status', 'Allow filtering tasks by pending/in-progress/completed', 'emp3@gmail.com', '2026-04-04', 'pending'),
('Setup CI/CD pipeline', 'Automate build and deployment process', 'emp3@gmail.com', '2026-04-05', 'completed');

`
)}


seedTable()

console.log("seeded successfully")