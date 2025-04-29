import React, { useState } from "react";
import { useUserStore } from "../store/user";
import { Friendship } from "@shared/types";

interface DeleteFriendButtonProps {
  friendship: Friendship;
  onSuccess?: () => void;
}

const DeleteFriendButton: React.FC<DeleteFriendButtonProps> = ({
  friendship,
  onSuccess,
}) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const { deleteFriend, isLoading, error } = useUserStore();

  const handleDelete = async () => {
    if (isConfirming) {
      await deleteFriend(friendship.id);
      setIsConfirming(false);
      if (onSuccess) {
        onSuccess();
      }
    } else {
      setIsConfirming(true);
    }
  };

  const handleCancel = () => {
    setIsConfirming(false);
  };

  return (
    <div className="delete-friend-button">
      {!isConfirming ? (
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
          disabled={isLoading}
        >
          删除好友
        </button>
      ) : (
        <div className="flex space-x-2">
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
            disabled={isLoading}
          >
            确认删除
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm"
            disabled={isLoading}
          >
            取消
          </button>
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default DeleteFriendButton;
