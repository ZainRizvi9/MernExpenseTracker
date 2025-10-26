import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react"; // 👈 you need to install this
import { LuSmile } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="relative inline-block mb-4">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full text-2xl"
      >
        {icon ? (
          <span className="text-2xl">{icon}</span>
        ) : (
          <LuSmile className="text-gray-500" />
        )}
      </button>

      {/* Emoji Picker Dropdown */}
      {showPicker && (
        <div className="absolute z-50 mt-2">
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              onSelect(emojiData.emoji);
              setShowPicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
