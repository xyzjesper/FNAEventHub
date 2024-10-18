"use client";
import { Image, Skeleton } from "@nextui-org/react";
import { getMemberList } from "../backend/database/action";
import { useState, useEffect } from "react";

interface Member {
  Username: string;
  Infos: string;
  Avatar: string;
}

export function MemberList({ postID }: { postID: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [memberlist, setMemberList] = useState<Member[]>([]);
  useEffect(() => {
    async function fetchMemberList() {
      if (!postID) {
        return;
      }

      const members = await getMemberList(postID);

      if (memberlist.length > 0) {
        return;
      }

      setMemberList(members);
    }
    fetchMemberList();
  });

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative w-full max-w-md mx-auto my-4">
      <button
        onClick={() => {
          memberlist.length > 0 && toggleDropdown();
        }}
        className="w-full p-4 bg-gray-700 text-white font-medium text-sm rounded-lg flex justify-between items-center"
      >
        {isOpen ? "Hide Members" : "Show Members"} ({memberlist.length})
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {memberlist.length > 0 && "▼"}
        </span>
      </button>

      {isOpen && (
        <div
          className={`transition-all duration-300 ease-in-out bg-gray-800 rounded-lg shadow-lg max-h-96 overflow-y-auto`}
        >
          {memberlist.map((member, index) => (
            <div
              key={index}
              className="transition-colors duration-1000 p-4 border-b border-gray-700 last:border-none"
            >
              <div className="flex items-center space-x-4 mb-2">
                <Image
                  className="rounded-full"
                  src={member?.Avatar ?? "/logo.png"}
                  height={40}
                  width={40}
                  alt={
                    member?.Avatar
                      ? member.Avatar.split("/").pop()
                      : "default-avatar"
                  }
                />
                <p className="font-bold text-lg text-white">
                  {member.Username}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
