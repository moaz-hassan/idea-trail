"use client";
import { useState } from "react";
import Link from "next/link";
import { updateUserStatus } from "@/lib/db_functions/updateUserStatus";
import deleteUserById from "@/lib/db_functions/deleteUserById";

export default function UsersTable({ users }) {
  const [selectedUser, setSelectedUser] = useState(null);
  if (users) {
    users = JSON.parse(users);
  }

  const statusColors = {
    active: "bg-green-100 text-green-800",
    blocked: "bg-red-100 text-red-800",
  };

  const formatDate = (dateInput) => {
    let date;
    if (dateInput?.toDate) {
      date = dateInput.toDate();
    } else if (typeof dateInput === "string" || typeof dateInput === "number") {
      date = new Date(dateInput);
    } else {
      return "Invalid date";
    }

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    }).format(date);
  };

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link
                    href={`/authors/${user.id}`}
                    className="hover:text-blue-600"
                  >
                    {user.name}
                  </Link>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                  {user.role}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      statusColors[user.status]
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(user.createdAt)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 relative">
                  <button
                    className="p-1 rounded-md hover:bg-gray-100"
                    onClick={() =>
                      setSelectedUser(selectedUser === user.id ? null : user.id)
                    }
                    aria-label="User actions"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      />
                    </svg>
                  </button>

                  {selectedUser === user.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        <Link
                          href={`/authors/${user.id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          View Profile
                        </Link>

                        {user.status === "active" ? (
                          <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => updateUserStatus(user.id, "blocked")}
                          >
                            Block User
                          </button>
                        ) : (
                          <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => updateUserStatus(user.id, "active")}
                          >
                            Unblock User
                          </button>
                        )}
                        <button
                          className="block px-4 py-2 text-sm text-red-700 hover:bg-red-100 w-full text-left"
                          onClick={() => deleteUserById(user.id)}
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {users?.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <Link href={`/authors/${user.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                  {user.name}
                </Link>
                <p className="text-xs text-gray-500 mt-1">{user.email}</p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                  className="p-1 rounded-md hover:bg-gray-100"
                  aria-label="User actions"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
                {selectedUser === user.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div className="py-1">
                      <Link
                        href={`/authors/${user.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        View Profile
                      </Link>
                      {user.status === "active" ? (
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={() => updateUserStatus(user.id, "blocked")}
                        >
                          Block User
                        </button>
                      ) : (
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={() => updateUserStatus(user.id, "active")}
                        >
                          Unblock User
                        </button>
                      )}
                      <button
                        className="block px-4 py-2 text-sm text-red-700 hover:bg-red-100 w-full text-left"
                        onClick={() => deleteUserById(user.id)}
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
              <div>
                <span className="text-xs text-gray-500">Role</span>
                <p className="text-sm capitalize">{user.role}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Status</span>
                <span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[user.status]}`}>
                  {user.status}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-xs text-gray-500">Joined</span>
                <p className="text-sm">{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}