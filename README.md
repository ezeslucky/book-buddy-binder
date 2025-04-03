
# Book Buddy

A personal book collection management web application that helps users organize and track their reading journey.

## Live Demo

Visit the live application: [Book Buddy](https://book-buddy-binder.vercel.app/)

## Features

- **User Authentication**: Secure login and sign up functionality
- **Book Management**:
  - Add new books to your collection
  - Edit existing book details
  - Delete books from your collection
  - Mark books as read or unread
- **Book Organization**:
  - View all books in a responsive grid layout
  - Filter books by genre
  - Search books by title or author

## Technology Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query
- **Routing**: React Router
- **Authentication**: Custom authentication system (with Google sign-in option)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd book-buddy
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Sign Up/Login**: Create a new account or login with existing credentials
2. **Dashboard**: View your entire book collection
3. **Add Books**: Click the "Add Book" button to add new books to your collection
4. **Manage Books**: Edit or delete books using the options on each book card
5. **Filter Books**: Use the genre dropdown to filter your book collection

## Project Structure

```
book-buddy/
├── src/
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and services
│   ├── pages/          # Main page components
│   └── App.tsx         # Application entry point
├── public/             # Static assets
└── README.md           # Project documentation
```

## Future Enhancements

- Reading progress tracking
- Book recommendations
- Reading statistics and insights
- Social sharing features
- Integration with book APIs for auto-filling book details

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons
