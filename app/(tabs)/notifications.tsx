import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Loader from '@/components/Loader'
import { COLORS } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import { styles } from '@/styles/notifications.styles'
import { Link } from 'expo-router'
import { Image } from 'expo-image'
import { formatDistanceToNow } from 'date-fns'

export default function notifications() {
  const notifications = useQuery(api.notifications.getNotifications)
  
  if(notifications === undefined) return <Loader/>
  if (notifications.length === 0) return <NoNotificationsFound/>

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.HeaderTitle} >Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={({item}) => <NotificationItem notifications ={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator = {false}
        contentContainerStyle = {styles.listContainer}

      />
    </View>
  )
}

function NotificationItem({notifications}: any){
  return(
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Link href={"/notifications"}>
          <TouchableOpacity style = {styles.avatarContainer}>
            <Image
              source={notifications.sender.image}
              style = {styles.avatar}
              contentFit = "cover"
              transition = {200}
            />
            <View style={styles.iconBadge}>
              {notifications.type === "like" ? (
                  <Ionicons name="heart" size={14} color={COLORS.primary} />
              ): notifications.type === "follow" ?     
              (
                  <Ionicons name="person-add" size={14} color={COLORS.primary} />
              ):(
                  <Ionicons name="chatbubble" size={14} color={COLORS.primary} />

              )
            
            }
            </View>
                  </TouchableOpacity>
            </Link>



        <View style = {styles.notificationInfo}>
          <Link href={"/notifications"} asChild>
              <TouchableOpacity>
                <Text style = {styles.username}>{notifications.sender.userName}</Text>
              </TouchableOpacity>
          </Link>
           
           <Text style = {styles.action}>
            {notifications.type === "follow" 
              ? "started following you"
              :notifications.type === "like" 
                ?"liked your post"
                : `commented: "${notifications.comment}"`
            }

           </Text>
           <Text style={styles.timeAgo}>
            {formatDistanceToNow(notifications._creationTime,{addSuffix : true})}
           </Text>

        </View>

      </View>
            {notifications.post && (
              <Image
                source={notifications.post.imageUrl}
                style = {styles.postImage}
                contentFit="cover"
                transition={200}
              />
            )}
    </View>
  )
}


function NoNotificationsFound(){
    return(
      <View
       style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: COLORS.background
  
       }}
      >
        <Ionicons name="notifications-outline" size={48} color={COLORS.primary} />
        <Text style={{ color: COLORS.primary, fontSize:22}}>No Notifications yet</Text>
  
      </View>
    )
}

