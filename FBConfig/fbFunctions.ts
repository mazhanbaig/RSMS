import api from "./api"

interface PaymentData {
  pp_Version: string;
  pp_TxnType: string;
  pp_Language: string;
  pp_MerchantID: string;
  pp_Password: string;
  pp_TxnRefNo: string;
  pp_Amount: string;
  pp_TxnCurrency: string;
  pp_TxnDateTime: string;
  pp_BillReference: string;
  pp_Description: string;
  pp_ReturnURL: string;
  pp_SecureHash: string;
}

import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { app } from "./config";
export const auth = getAuth(app);

const FIREBASE_DB_URL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

// export const loginWithGoogle = async () => {
//   try {
//     // 1. Sign in with Google
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;
    
//     // 3. Send user data to your backend API
//      await api.post("/api/auth", {
//       uid: user.uid,
//       name: user.displayName,
//       email: user.email,
//       picture: user.photoURL,
//      });
    
//     return {
//       user: {
//       uid: user.uid,
//       name: user.displayName,
//       email: user.email,
//       picture: user.photoURL,
//       }
//     };
    
//   } catch (error) {
//     throw error;
//   }
// };

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Send to your backend
    await api.post("/api/auth", {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      picture: user.photoURL,
    });
    
    return {
      user: {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        picture: user.photoURL,
      }
    };
  } catch (error) {
    throw error;
  }
};


// ---------------- LOGOUT ----------------
export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('userInfo');
  } catch (error) {
    throw error;
  }
};

// ---------------- CHECK SESSION ----------------
export const checkUserSession = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        const userInfo = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        };
        resolve(userInfo);
      } else {
        // User is logged out
        resolve(null);
      }
    });
  });
};




// Get public data - NO LOGIN REQUIRED
export const getPublicData = async (path: string) => {
  try {
    const response = await fetch(`${FIREBASE_DB_URL}/${path}.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching public data:", error);
    return null;
  }
};

// Update public data - NO LOGIN REQUIRED
export const updatePublicData = async (path: string, data: any) => {
  try {
    const response = await fetch(`${FIREBASE_DB_URL}/${path}.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error updating public data:", error);
    return null;
  }
};

// ---------------- GET DATA ----------------
export const getData = async (path: string) => {
  try {
    const res = await api.get(`/api/data?path=${path}`);
    return res.data.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// ---------------- SAVE DATA ----------------
export const saveData = async (path: string, data: any) => {
  try {
    const res = await api.post(`/api/data/`, { path, data });
    console.log(res);
    return res.data.data;
    
  } catch (err) {
    console.error(err);
    return null;
  }
};

// ---------------- UPDATE DATA ----------------
export const updateData = async (path: string, data: any) => {
  try {
     await api.put(`/api/data/`, { path, data });
  } catch (err) {
    console.error(err);
    return null;
  }
};

// ---------------- DELETE DATA ----------------
export const deleleData = async (path: string) => {
  try {
     await api.delete(`/api/data/`, { data: { path } });
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const uploadImages = async (files:any) => {
  try {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    const res = await api.post(`/api/images/addimages`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteImageFromCloudinary = async (public_id: string) => {
  try {
    const res = await api.delete(`/api/images/deleteimage/${public_id}`);
    return res.data;
  } catch (err) {
    console.error("Failed to delete image from Cloudinary:", err);
    return null;
  }
};


// ---------------- CREATE PAYMENT ----------------
export const createJazzCashPayment = async (amount: string, email: string, selectedPayment:string): Promise<PaymentData> => {
  try {
    const res = await api.post("/api/payment/create-payment", { amount, email,selectedPayment });
    
    if (res.data.success) {
      return res.data.data; // contains all JazzCash payment fields + pp_SecureHash
    } else {
      throw new Error(res.data.message || "Payment creation failed");
    }
  } catch (err) {
    console.error("Failed to create JazzCash payment:", err);
    throw err;
  }
};



// Add these to your existing fbFunctions.ts file

// ==================== CHAT FUNCTIONS ====================

export interface ChatMessage {
  id?: string;
  chatId: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export interface ChatSession {
  id?: string;
  propertyId: string;
  propertyTitle: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  agentId: string;
  agentName: string;
  lastMessage: string;
  lastMessageTime: number;
  unreadCount: number;
  status: 'active' | 'resolved' | 'archived';
  createdAt: number;
}

// Create a new chat session
export const createChatSession = async (data: any) => {
  try {
    const chatData = {
      ...data,
      lastMessage: 'Chat started',
      lastMessageTime: Date.now(),
      unreadCount: 0,
      status: 'active',
      createdAt: Date.now()
    };
    
    const result = await saveData('chatSessions', chatData);
    return result.id;
  } catch (error) {
    console.error('Error creating chat session:', error);
    throw error;
  }
};

// Send a message
export const sendMessage = async (messageData: Omit<ChatMessage, 'id' | 'timestamp'>) => {
  try {
    const messageWithTimestamp = {
      ...messageData,
      timestamp: Date.now()
    };
    
    const result = await saveData('chatMessages', messageWithTimestamp);
    
    // Update chat session last message
    const chatRef = await getData(`chatSessions/${messageData.chatId}`);
    if (chatRef) {
      await updateData(`chatSessions/${messageData.chatId}`, {
        lastMessage: messageData.message,
        lastMessageTime: Date.now(),
        unreadCount: messageData.senderId === 'client' ? (chatRef.unreadCount || 0) + 1 : 0
      });
    }
    
    return result.id;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Get chat sessions for an agent
export const getAgentChatSessions = async (agentId: string) => {
  try {
    const allSessions = await getData('chatSessions');
    if (!allSessions) return [];
    
    const sessions = Object.entries(allSessions)
      .map(([id, data]: [string, any]) => ({ id, ...data }))
      .filter(session => session.agentId === agentId)
      .sort((a, b) => b.lastMessageTime - a.lastMessageTime);
    
    return sessions;
  } catch (error) {
    console.error('Error fetching agent chats:', error);
    return [];
  }
};

// Get chat sessions for a client
export const getClientChatSessions = async (clientId: string) => {
  try {
    const allSessions = await getData('chatSessions');
    if (!allSessions) return [];
    
    const sessions = Object.entries(allSessions)
      .map(([id, data]: [string, any]) => ({ id, ...data }))
      .filter(session => session.clientId === clientId)
      .sort((a, b) => b.lastMessageTime - a.lastMessageTime);
    
    return sessions;
  } catch (error) {
    console.error('Error fetching client chats:', error);
    return [];
  }
};

// Get messages for a chat
export const getChatMessages = async (chatId: string) => {
  try {
    const allMessages = await getData('chatMessages');
    if (!allMessages) return [];
    
    const messages = Object.entries(allMessages)
      .map(([id, data]: [string, any]) => ({ id, ...data }))
      .filter(message => message.chatId === chatId)
      .sort((a, b) => a.timestamp - b.timestamp);
    
    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

// Subscribe to messages (polling for real-time updates)
export const subscribeToMessages = (chatId: string, callback: (messages: ChatMessage[]) => void, interval = 2000) => {
  let lastFetch = 0;
  
  const fetchMessages = async () => {
    try {
      const messages = await getChatMessages(chatId);
      callback(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  
  // Initial fetch
  fetchMessages();
  
  // Set up polling
  const intervalId = setInterval(fetchMessages, interval);
  
  // Return unsubscribe function
  return () => clearInterval(intervalId);
};
// Mark messages as read
export const markMessagesAsRead = async (threadId: string, messageIds: string[], agentUid: string) => {
  const updates: any = {};
  messageIds.forEach(messageId => {
    updates[`chats/threads/${threadId}/messages/${messageId}/read`] = true;
  });
  updates[`chats/agent/${agentUid}/threads/${threadId}/unreadCount`] = 0;
  
  await updateData('', updates); // You'll need a multi-path update function
  return true;
};

// Get all chat threads for an agent
export const getChatThreads = async (agentUid: string) => {
  const data = await getData(`chats/agent/${agentUid}/threads`);
  return data ? Object.entries(data).map(([id, value]: any) => ({ id, ...value })) : [];
};