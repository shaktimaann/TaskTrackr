import React from "react";

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const tasks = [
  {
    id: "TASK-001",
    title: "Fix Plumbing in the Nagala Park Area",
    team: "Operations",
    status: "Pending",
    dueDate: "Jul 28, 2025",
  },
  {
    id: "TASK-002",
    title: "New WiFi Connection in Shahupuri",
    team: "Finance",
    status: "In Progress",
    dueDate: "Jul 30, 2025",
  },
  {
    id: "TASK-003",
    title: "Electricity down in Rajarampuri",
    team: "HR",
    status: "Completed",
    dueDate: "Jul 25, 2025",
  },
  {
    id: "TASK-004",
    title: "Update Finance Records",
    team: "Procurement",
    status: "In Progress",
    dueDate: "Aug 05, 2025",
  },
  {
    id: "TASK-005",
    title: "Collect Payment from Last week",
    team: "Operations",
    status: "Pending",
    dueDate: "Aug 10, 2025",
  },
  {
    id: "TASK-006",
    title: "Doing good",
    team: "Legal",
    status: "Completed",
    dueDate: "Jul 20, 2025",
  },
];

function getStatusStyle(status) {
  switch (status) {
    case "Pending":
      return styles.pendingBadge;
    case "In Progress":
      return styles.inProgressBadge;
    case "Completed":
      return styles.completedBadge;
    default:
      return styles.pendingBadge;
  }
}

export default function Index() {
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const renderTaskItem = ({ item }) => (
    <View style={styles.taskRow}>
      <View style={styles.taskTopRow}>
        <Text style={styles.taskId}>{item.id}</Text>
        <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <Text style={styles.taskTitle}>{item.title}</Text>


      <View style={styles.taskBottomRow}>
        <Text style={styles.dueDate}>Due: {item.dueDate}</Text>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <Text style={styles.pageTitle}>Work Record</Text>


            <View style={styles.taskHeaderCards}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Total Tasks</Text>
                <Text style={styles.cardNumber}>{totalTasks}</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Pending</Text>
                <Text style={styles.cardNumber}>{pendingTasks}</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>In Progress</Text>
                <Text style={styles.cardNumber}>{inProgressTasks}</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Completed</Text>
                <Text style={styles.cardNumber}>{completedTasks}</Text>
              </View>
            </View>

            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>Task List</Text>

              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Add Task</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={renderTaskItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  listContent: {
    padding: 16,
    paddingBottom: 24,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f2937",
    marginTop: 8,
  },

  pageSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 6,
    marginBottom: 18,
  },

  taskHeaderCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 12,
    marginBottom: 24,
  },

  card: {
    width: "47%",
    minHeight: 100,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 14,
    justifyContent: "center",
  },

  cardTitle: {
    fontSize: 15,
    color: "#6b7280",
    marginBottom: 10,
  },

  cardNumber: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
  },

  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  listTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  addButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  addButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },

  taskRow: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  taskTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  taskId: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "600",
  },

  taskTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginTop: 10,
  },

  taskTeam: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 4,
  },

  taskBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },

  dueDate: {
    fontSize: 13,
    color: "#4b5563",
  },

  editButton: {
    backgroundColor: "#eff6ff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  editButtonText: {
    color: "#2563eb",
    fontSize: 13,
    fontWeight: "600",
  },

  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
  },

  pendingBadge: {
    backgroundColor: "#fef3c7",
  },

  inProgressBadge: {
    backgroundColor: "#dbeafe",
  },

  completedBadge: {
    backgroundColor: "#dcfce7",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },
});