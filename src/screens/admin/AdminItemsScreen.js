import { useCallback, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { itemsService } from "../../services/items.service"
import { getPrimaryImageUri } from "../../utils/itemImages"
import styles from "../../styles/adminItems.styles"
import COLORS from "../../constants/colors"

export default function AdminItemsScreen() {
  const { user } = useSelector((state) => state.auth) || {}
  const isAdmin = user?.role === "admin"
  const [pendingItems, setPendingItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [processingId, setProcessingId] = useState(null)
  const [error, setError] = useState("")

  const fetchPending = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true)
      else setLoading(true)
      setError("")
      const response = await itemsService.getPendingItemsForAdmin()
      setPendingItems(response?.items || [])
    } catch (err) {
      setError(err.message || "Failed to load pending items")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (!isAdmin) {
        setLoading(false)
        return
      }
      fetchPending()
    }, [isAdmin]),
  )

  const handleApprove = async (itemId) => {
    try {
      setProcessingId(itemId)
      await itemsService.approveItemByAdmin(itemId)
      setPendingItems((prev) => prev.filter((item) => item._id !== itemId))
    } catch (err) {
      Alert.alert("Error", err.message || "Failed to approve item")
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (itemId) => {
    try {
      setProcessingId(itemId)
      await itemsService.rejectItemByAdmin(itemId, "Rejected by admin")
      setPendingItems((prev) => prev.filter((item) => item._id !== itemId))
    } catch (err) {
      Alert.alert("Error", err.message || "Failed to reject item")
    } finally {
      setProcessingId(null)
    }
  }

  const renderItem = ({ item }) => {
    const imageUri = getPrimaryImageUri(item)
    const busy = processingId === item._id

    return (
      <View style={styles.card}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.cover} />
        ) : (
          <View style={styles.coverFallback}>
            <Ionicons name="image-outline" size={26} color={COLORS.textSecondary} />
          </View>
        )}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.meta}>Owner: {item.ownerId}</Text>
          <Text style={styles.meta}>City: {item.location?.city || "-"}</Text>
          <Text style={styles.price}>{item.pricePerDay} DH/day</Text>
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.btn, styles.rejectBtn]}
              onPress={() => handleReject(item._id)}
              disabled={busy}
            >
              <Text style={styles.btnText}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.approveBtn]}
              onPress={() => handleApprove(item._id)}
              disabled={busy}
            >
              <Text style={styles.btnText}>Approve</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => fetchPending()}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (!isAdmin) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>This page is only for admin accounts.</Text>
        <Text style={styles.emptyText}>Your role: {user?.role || "unknown"}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pending Items ({pendingItems.length})</Text>
      <FlatList
        data={pendingItems}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>No items waiting for approval.</Text>}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchPending(true)}
            colors={[COLORS.primary]}
          />
        }
      />
    </View>
  )
}
