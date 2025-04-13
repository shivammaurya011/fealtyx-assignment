# FeltyX Tracker

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
   cd fealtyx-assignment - Task Management System
FealtyX is a modern task management application designed for efficient team collaboration. It features role-based workflows, a sleek UI with Tailwind CSS, dark mode support, real-time task trends, and responsive design.

🚀 Live Demo
URL:[ View Live ](https://fealtyx-one.vercel.app)

Manager =>	manager1	password123  || Developer =>	shivam1	password123  or shivam2

Use only for testing.

[
  {
    "id": "1",
    "title": "Sample Task",
    "description": "Sample description",
    "priority": "Medium",
    "status": "Pending Approval",
    "assignee": "shivam1",
    "startDate": "2025-04-01",
    "dueDate": "2025-04-10",
    "tags": ["sample"],
    "timeLogged": 0
  }
]
