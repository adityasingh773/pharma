import React, { useState } from "react";
import { Comment } from "../hooks/use-processes";
import { ItemType } from "../hooks/use-data-reducer";

type CommentsProps = {
  itemType: ItemType;
  itemId: string;
  comments?: Comment[];
  onAddComment: (itemType: ItemType, id: string, text: string) => void;
};

export function Comments({
  itemType,
  itemId,
  comments,
  onAddComment,
}: CommentsProps) {
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    if (!commentText) return;
    onAddComment(itemType, itemId, commentText);
    setCommentText("");
  };

  return (
    <>
      <br />
      <div>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
        />
        &nbsp;
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
      {comments && comments.length > 0 && (
        <div>
          <p>Comments:</p>
          {comments.map((comment, idx) => (
            <React.Fragment key={idx}>
              <div style={{ marginBottom: "4px" }}>
                <b>{comment.user}</b> (
                {new Date(comment.timestamp).toLocaleString()}): {comment.text}
              </div>
              <hr />
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
}
