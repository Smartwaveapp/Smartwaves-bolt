import { db } from '@/lib/firebase';
import { 
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';

export interface Reward {
  id: string;
  userId: string;
  type: 'daily' | 'task' | 'achievement';
  points: number;
  xp: number;
  claimed: boolean;
  expiresAt: Date;
  createdAt: Date;
  claimedAt?: Date;
}

export async function createReward(rewardData: Partial<Reward>) {
  const rewardsRef = collection(db, 'rewards');
  const rewardDoc = doc(rewardsRef);
  const now = new Date();
  
  const reward: Reward = {
    id: rewardDoc.id,
    userId: '',
    type: 'daily',
    points: 0,
    xp: 0,
    claimed: false,
    expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000), // 24 hours from now
    createdAt: now,
    ...rewardData
  };

  await setDoc(rewardDoc, reward);
  return reward;
}

export async function getReward(rewardId: string) {
  const rewardRef = doc(db, 'rewards', rewardId);
  const rewardSnap = await getDoc(rewardRef);
  
  if (rewardSnap.exists()) {
    return rewardSnap.data() as Reward;
  }
  return null;
}

export async function getUserRewards(userId: string, type?: 'daily' | 'task' | 'achievement') {
  const rewardsRef = collection(db, 'rewards');
  let rewardQuery = query(
    rewardsRef,
    where('userId', '==', userId),
    where('claimed', '==', false),
    where('expiresAt', '>', new Date()),
    orderBy('expiresAt', 'asc')
  );
  
  if (type) {
    rewardQuery = query(rewardQuery, where('type', '==', type));
  }
  
  const querySnapshot = await getDocs(rewardQuery);
  return querySnapshot.docs.map(doc => doc.data() as Reward);
}

export async function claimReward(rewardId: string, userId: string) {
  const rewardRef = doc(db, 'rewards', rewardId);
  const rewardSnap = await getDoc(rewardRef);
  
  if (!rewardSnap.exists()) {
    throw new Error('Reward not found');
  }
  
  const reward = rewardSnap.data() as Reward;
  if (reward.userId !== userId) {
    throw new Error('Reward belongs to another user');
  }
  
  if (reward.claimed) {
    throw new Error('Reward already claimed');
  }
  
  if (reward.expiresAt.getTime() < Date.now()) {
    throw new Error('Reward has expired');
  }
  
  await setDoc(rewardRef, {
    ...reward,
    claimed: true,
    claimedAt: new Date()
  });
  
  return reward;
}