import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'sonner'
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import ChildSetup from "@/pages/ChildSetup";
import Books from "@/pages/Books";
import BookDetail from "@/pages/BookDetail";
import Activities from "@/pages/Activities";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/child-setup" element={<ChildSetup />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
      </Routes>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'white',
            color: '#44403c',
            border: '1px solid #e7e5e4',
            borderRadius: '12px',
          },
          success: {
            style: {
              background: '#f0fdf4',
              color: '#166534',
              border: '1px solid #bbf7d0',
            },
          },
          error: {
            style: {
              background: '#fef2f2',
              color: '#dc2626',
              border: '1px solid #fecaca',
            },
          },
        }}
      />
    </Router>
  );
}
