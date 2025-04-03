
import { useState } from "react";
import { Book } from "@/lib/types";
import { deleteBook } from "@/lib/bookService";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book;
  onBookDeleted: (bookId: string) => void;
}

const DeleteConfirmation = ({ isOpen, onClose, book, onBookDeleted }: DeleteConfirmationProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const success = await deleteBook(book.id);
      if (success) {
        toast({
          title: "Book Deleted",
          description: `"${book.title}" has been removed from your collection.`,
        });
        onBookDeleted(book.id);
      } else {
        throw new Error("Failed to delete book");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete book. Please try again.",
        variant: "destructive",
      });
      console.error("Error deleting book:", error);
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this book?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove "{book.title}" by {book.author} from your collection.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmation;
