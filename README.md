# Bug Tracker

A Next.js-based Bug/Task Tracker application with role-based access for Developers and Managers.

## Features
- **User Authentication**: Mock login with Developer/Manager roles.
- **Developer Dashboard**: View assigned tasks, trend chart of concurrent tasks.
- **Manager Dashboard**: View all tasks (Open, Closed, Pending Approval).
- **Task Management**: Create, edit, delete tasks with fields (Title, Description, Priority, Status, Assignee, Dates).
- **Time Tracking**: Track time spent on tasks.
- **Responsive UI**: Built with TailwindCSS, mobile-friendly.
- **State Management**: Redux Toolkit with RTK Query.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd bug-trackerFealtyX - Task Management System
FealtyX is a modern task management application designed for efficient team collaboration. It features role-based workflows, a sleek UI with Tailwind CSS, dark mode support, real-time task trends, and responsive design.

🚀 Live Demo
URL: [Insert Live URL Here] 

Update this once deployed on Vercel, Netlify, AWS, etc.

✨ Features
🔐 Role-Based Access
Managers:

Approve (Open / In Progress → Closed)

Reject tasks (Pending Approval)

Reassign team members

View task trends and stats

Developers:

Create, edit, delete tasks

Submit tasks for approval (Pending Approval)

📋 Task Management
Approve, reject, or reassign tasks

Filter by priority, status, assignee

Sort by due date or title (Closed tasks always at the bottom)

⏰ Overdue Indicators
Visual "Overdue" badge on past-due tasks

Trend chart displays overdue vs. active tasks

💡 UI/UX
Tailwind CSS: rounded-lg/rounded-xl, gradients, shadows

Dark mode: dark:bg-slate-800

Tooltips for actions (Approve, Reject, Reassign)

Responsive task card grid

Status badges, priority dots

📊 Analytics
Active vs. Overdue trend chart

Task overview stats (total, completed, etc.)

🛠 Additional Features
Calendar view (placeholder)

Notifications & activity logs (coming soon)

Persistent login session

🧰 Tech Stack
Frontend: Next.js, React, Tailwind CSS

State Management: Redux Toolkit + RTK Query (taskApi)

Charts: Chart.js via react-chartjs-2

Icons: react-icons

Notifications: react-hot-toast

Mock API: public/data/tasks.json

⚙️ Setup
✅ Prerequisites
Node.js ≥ 18.x

npm ≥ 9.x

Git

📦 Installation
bash
Copy
Edit
git clone https://github.com/your-repo/fealtyx.git
cd fealtyx
npm install
No .env file needed – uses a mock API (public/data/tasks.json).

▶️ Start Development Server
bash
Copy
Edit
npm run dev
Visit http://localhost:3000

🚀 Build for Production
bash
Copy
Edit
npm run build
npm run start
🔐 Login Credentials (Testing)
Role	Username	Password
Manager	manager1	password123
Developer	dev1	password123
Use only for testing. Replace with Auth0/Firebase/etc. for production.

🧪 Usage Overview
🔑 Login
Visit /login

Role-based redirection:

Manager → /manager/dashboard

Developer → /developer/dashboard

📂 Manager Dashboard
View tasks: Pending Approval, Open, In Progress

Approve → Closed

Reject → Rejected

Reassign assignees

View overdue badges

Tooltips for actions

Trend Chart + Stats + Calendar (placeholder)

🧑‍💻 Developer Dashboard
View, filter, sort assigned tasks

Create, edit, delete tasks

Submit for approval (Pending Approval)

Closed tasks appear at the end

📁 Project Structure
bash
Copy
Edit
fealtyx/
├── components/
│   ├── charts/TrendChart.jsx
│   ├── common/ (Button, Calendar, Spinner)
│   └── tasks/ (TaskCard, TaskList, ManagerTaskApproval, etc.)
├── lib/constants.js
├── public/data/tasks.json
├── store/services/taskApi.js
├── utils/ (calculateTrend.js, formatDate.js)
├── app/
│   ├── login/page.jsx
│   ├── manager/dashboard/page.jsx
│   ├── developer/dashboard/page.jsx
│   └── developer/tasks/create, [id]/page.jsx
└── README.md
🧾 Sample tasks.json
json
Copy
Edit
[
  {
    "id": "1",
    "title": "Sample Task",
    "description": "Sample description",
    "priority": "Medium",
    "status": "Pending Approval",
    "assignee": "dev1",
    "startDate": "2025-04-01",
    "dueDate": "2025-04-10",
    "tags": ["sample"],
    "timeLogged": 0
  }
]
Ensure this file exists at public/data/tasks.json.