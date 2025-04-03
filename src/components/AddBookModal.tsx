
import { useState } from "react";
import { Book } from "@/lib/types";
import BookForm from "./BookForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { addBook } from "@/lib/bookService";
import { useToast } from "@/hooks/use-toast";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAdded: (book: Book) => void;
}

const AddBookModal = ({ isOpen, onClose, onBookAdded }: AddBookModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: Omit<Book, "id" | "dateAdded">) => {
    setIsSubmitting(true);
    try {
      const newBook = await addBook(data);
      toast({
        title: "Success!",
        description: "Book has been added to your collection.",
      });
      onBookAdded(newBook);
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add book. Please try again.",
        variant: "destructive",
      });
      console.error("Error adding book:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Add New Book</DialogTitle>
        </DialogHeader>
        <BookForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </DialogContent>
    </Dialog>
  );
};

export default AddBookModal;
