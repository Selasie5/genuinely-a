"use client";
import { useForm } from "react-hook-form";
import { Send , Loader} from 'lucide-react';

interface Props {
  postId: string;
  refetchComments: () => void; // Add this prop
}

interface CommentFormData {
  name: string;
  email: string;
  comment: string;
}

const AddComment = ({ postId, refetchComments }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>();

  const onSubmit = async (data: CommentFormData) => {
    const { name, email, comment } = data;

    const res = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, comment, postId }),
    });

    if (!res.ok) {
      console.error("Failed to add comment");
      return;
    }

    // Reset the form
    reset();

    // Refetch comments after adding a new comment
    refetchComments();
  };

  return (
    <div className="mt-14">
      <p>
        Leave a comment <span role="img" aria-label="speech bubble">💬</span>
      </p>
      <form
        className="flex flex-col border dark:border-purple-950 shadow-sm rounded px-8 pt-6 pb-6 mb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          className="mb-4 py-1 bg-amber-100 dark:bg-slate-900"
        />
        {errors.name && (
          <p className="text-red-600 text-xs">{errors.name.message}</p>
        )}

        <label>
          Email{" "}
          <span className="text-xs">(Your email will not be published!)</span>
        </label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Please enter a valid email address",
            },
          })}
          className="mb-4 py-1 bg-amber-100 dark:bg-slate-900"
        />
        {errors.email && (
          <p className="text-red-600 text-xs">{errors.email.message}</p>
        )}

        <label>Comment</label>
        <textarea
          {...register("comment", {
            required: "Comment is required",
            minLength: {
              value: 2,
              message: "Minimum 2 characters",
            },
          })}
          className="mb-4 py-1 bg-amber-100 dark:bg-slate-900"
        />
        {errors.comment && (
          <p className="text-red-600 text-xs">{errors.comment.message}</p>
        )}

        <button
          className={`cursor-pointer bg-purple-500 text-white rounded py-2 hover:bg-purple-600 ${
            isSubmitting ? "opacity-50" : ""
          }`}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
 <Loader className="animate-spin text-sm mx-4" />
            </span>
           
          ):(
              
               <span className="flex items-center justify-center gap-2">
                <Send size={16}/>
                Comment
                </span>

          )}
          </button>
      </form>
    </div>
  );
};

export default AddComment;
