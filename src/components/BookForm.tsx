
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Book } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const bookFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  description: z.string().optional(),
  coverUrl: z.string().url({ message: "Must be a valid URL" }).optional().or(z.string().length(0)),
  genre: z.string().optional(),
  publishYear: z.coerce.number().int().positive().max(new Date().getFullYear()).optional(),
  pagesCount: z.coerce.number().int().positive().optional(),
  isRead: z.boolean().default(false),
});

type BookFormValues = z.infer<typeof bookFormSchema>;

const genres = [
  "Fiction", "Non-Fiction", "Science Fiction", "Fantasy",
  "Mystery", "Thriller", "Romance", "Historical", 
  "Biography", "Self-Help", "Business", "Other"
];

interface BookFormProps {
  initialData?: Book;
  onSubmit: (data: BookFormValues) => void;
  isSubmitting: boolean;
}

const BookForm = ({ initialData, onSubmit, isSubmitting }: BookFormProps) => {
  const [coverPreview, setCoverPreview] = useState(initialData?.coverUrl || '');

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      author: initialData?.author || "",
      description: initialData?.description || "",
      coverUrl: initialData?.coverUrl || "",
      genre: initialData?.genre || "",
      publishYear: initialData?.publishYear,
      pagesCount: initialData?.pagesCount,
      isRead: initialData?.isRead || false,
    }
  });

  const handleSubmit = (values: BookFormValues) => {
    onSubmit(values);
  };

  const updateCoverPreview = (url: string) => {
    setCoverPreview(url);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Book title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author *</FormLabel>
                  <FormControl>
                    <Input placeholder="Author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genres.map(genre => (
                        <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="publishYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year Published</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Year"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="pagesCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Count</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Pages"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="isRead"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>I have read this book</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="coverUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://..." 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        updateCoverPreview(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Book description..."
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="mt-4">
              <Label>Cover Preview</Label>
              <div className="mt-2 border rounded-md h-[200px] flex items-center justify-center overflow-hidden bg-muted/30">
                {coverPreview ? (
                  <img 
                    src={coverPreview}
                    alt="Book cover preview"
                    className="max-h-full max-w-full object-contain"
                    onError={() => setCoverPreview('')}
                  />
                ) : (
                  <p className="text-muted-foreground">No cover image</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : (initialData ? "Update Book" : "Add Book")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BookForm;
