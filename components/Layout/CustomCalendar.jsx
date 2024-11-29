import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import dayjs from "dayjs"; // For date manipulation
import {
  ChevronRightIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/outline";

export default function CustomCalendar({ setSelectedConfirmDate }) {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfMonth = currentMonth.startOf("month").day(); // 0 = Sunday, 1 = Monday, etc.

  // Navigate to previous or next month
  const handlePrevMonth = () =>
    setCurrentMonth(currentMonth.subtract(1, "month"));
  const handleNextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

  return (
    <View style={styles.container}>
      {/* Header: Month Navigation */}
      <View style={styles.header}>
        <Text style={styles.headerText} className=" font-psemibold">
          {currentMonth.format("MMMM YYYY")}
        </Text>
        <View className=" flex-row items-center justify-end gap-x-8">
          <TouchableOpacity onPress={handlePrevMonth}>
            <View style={styles.navText}>
              <ChevronLeftIcon size={20} color={"#FF601B"} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextMonth}>
            <View style={styles.navText}>
              <ChevronRightIcon size={20} color={"#FF601B"} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Weekday Labels */}
      <View style={styles.weekdayContainer}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Text key={day} style={styles.weekday} className=" font-psemibold">
            {day}
          </Text>
        ))}
      </View>

      {/* Days */}
      <View style={styles.daysContainer}>
        {/* Empty slots for days before the first of the month */}
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, index) => (
            <View key={`empty-${index}`} style={styles.day} />
          ))}

        {/* Render actual days */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isSelected = selectedDate?.isSame(
            currentMonth.date(day),
            "day"
          );

          return (
            <TouchableOpacity
              key={day}
              style={[
                styles.day,
                isSelected && styles.selectedDay,
                !currentMonth.date(day).isAfter(dayjs(), "day") &&
                  styles.disabledDay,
              ]}
              onPress={() => {
                if (currentMonth.date(day).isAfter(dayjs(), "day")) {
                  // Only proceed if the date is today or earlier
                  const formattedDate = currentMonth
                    .date(day)
                    .format("YYYY-MM-DD");
                  setSelectedDate(currentMonth.date(day));
                  setSelectedConfirmDate(formattedDate);
                }
              }}
              disabled={!currentMonth.date(day).isAfter(dayjs(), "day")}
            >
              <Text
                className=" font-psemibold"
                style={isSelected ? styles.selectedDayText : styles.dayText}
              >
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: { fontSize: 20 },
  navText: { fontSize: 30, color: "#ff613c" },
  weekdayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  weekday: { flex: 1, textAlign: "center" },
  daysContainer: { flexDirection: "row", flexWrap: "wrap" },
  day: {
    width: "14.28%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: { fontSize: 16 },
  selectedDay: { backgroundColor: "#FF613c", borderRadius: 30 },
  selectedDayText: { color: "#FFF" },
  disabledDay: {
    opacity: 0.5, // Make it less prominent
  },
});
