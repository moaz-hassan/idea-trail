"use client";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState, useRef, useEffect } from "react";

export default function ScheduleButton({
  isScheduled,
  scheduledDate,
  onToggle,
  onDateSelect,
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          onToggle();
          setShowCalendar(!showCalendar);
        }}
        className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 h-12 w-48 ${
          isScheduled
            ? "bg-blue-50 text-blue-700 border-2 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
        }`}
      >
        <svg
          className={`w-4 h-4 mr-2 ${
            isScheduled
              ? "text-blue-500 dark:text-blue-400"
              : "text-gray-400 dark:text-gray-500"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {isScheduled
          ? scheduledDate
            ? `Scheduled: ${format(scheduledDate, "PPP")}`
            : "Scheduled"
          : "Schedule"}
      </button>

      {isScheduled && showCalendar && (
        <div
          ref={calendarRef}
          className="absolute z-50 mt-2 left-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
          style={{ top: "110%" }}
        >
          <div className="p-4">
            <Calendar
              mode="single"
              selected={scheduledDate}
              onSelect={(date) => {
                onDateSelect(date);
                setShowCalendar(false);
              }}
              disabled={{ before: new Date() }}
              initialFocus
            />
          </div>
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Your article will be automatically published at the selected date.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}