import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Modal,
} from 'react-native';
import { Container } from '@/components/layout/Container';
import Colors from '@/constants/Colors';
import { User, History,  LogOut, ChevronRight,  CircleHelp as HelpCircle, Shield, Circle as XCircle, Bookmark } from 'lucide-react-native';
import { Button } from '@/components/Button';

export default function ProfileScreen() {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const user = {
    name: 'Johan Liebert',
    email: 'johan.liebert@gmail.com',
    profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: 'Batu, East Java',
  };

  const menuItems = [

    
    { 
      id: 'history', 
      title: 'History', 
      icon: <History size={20} color={Colors.primary[500]} />,
      screen: '/tickets',
    },

        { 
      id: 'saved', 
      title: 'Saved', 
      icon: <Bookmark size={20} color={Colors.primary[500]} />,
      screen: '/(root)/(tabs)/bookmarks',
    },
     
    { 
      id: 'logout', 
      title: 'Logout', 
      icon: <LogOut size={20} color={Colors.error[500]} />,
      textColor: Colors.error[500],
      onPress: () => setLogoutModalVisible(true),
    },
  ];

  const renderMenuItem = (item: any) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.menuItem}
      onPress={item.onPress ? item.onPress : () => {}}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.menuItemIcon}>
          {item.icon}
        </View>
        <Text 
          style={[
            styles.menuItemTitle, 
            item.textColor ? { color: item.textColor } : null
          ]}
        >
          {item.title}
        </Text>
      </View>
      <ChevronRight size={20} color={Colors.text.tertiary} />
    </TouchableOpacity>
  );

  return (
    <Container style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: user.profilePicture }}
                style={styles.avatar}
              />
            </View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <View style={styles.locationContainer}>
              <View style={styles.locationIcon}>
                <User size={16} color={Colors.primary[500]} />
              </View>
              <Text style={styles.location}>{user.location}</Text>
            </View>
            <Button
              title="Edit Account"
              variant="outline"
              size="small"
              onPress={() => {}}
              style={styles.editButton}
            />
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map(renderMenuItem)}
        </View>

        
      </ScrollView>

      {/* Logout Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.logoutModalContent}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setLogoutModalVisible(false)}
            >
              <XCircle size={24} color={Colors.neutral[500]} />
            </TouchableOpacity>
            
            <Text style={styles.logoutTitle}>Logout</Text>
            <Text style={styles.logoutMessage}>
              Are you sure to logout this account
            </Text>
            
            <View style={styles.logoutButtons}>
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => setLogoutModalVisible(false)}
                style={{ flex: 1, marginRight: 8 }}
              />
              <Button
                title="Logout"
                variant="primary"
                onPress={() => {
                  setLogoutModalVisible(false);
                }}
                style={{ flex: 1, marginLeft: 8 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    backgroundColor: Colors.primary[500],
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: Colors.neutral[50],
    overflow: 'hidden',
    marginBottom: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.neutral[50],
    marginBottom: 4,
  },
  email: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[100],
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.neutral[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  location: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[50],
  },
  editButton: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderColor: Colors.neutral[50],
  },
  menuContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 32,
  },
  appVersion: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.tertiary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutModalContent: {
    width: '90%',
    backgroundColor: Colors.background.primary,
    borderRadius: 24,
    padding: 24,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  logoutTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.text.primary,
    marginBottom: 12,
    textAlign: 'center',
    marginTop: 12,
  },
  logoutMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  logoutButtons: {
    flexDirection: 'row',
  },
});