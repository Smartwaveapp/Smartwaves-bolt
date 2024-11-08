import { db } from '@/lib/firebase';
import { 
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  Timestamp
} from 'firebase/firestore';

export interface Task {
  id: string;
  platform: string;
  task: string;
  points: number;
  xp: number;
  completedBy: string[];
  createdAt: Date;
  updatedAt: Date;
}

export async function createTask(taskData: Partial<Task>) {
  const tasksRef = collection(db, 'tasks');
  const taskDoc = doc(tasksRef);
  const now = new Date();
  
  const task: Task = {
    id: taskDoc.id,
    platform: '',
    task: '',
    points: 0,
    xp: 0,
    completedBy: [],
    createdAt: now,
    updatedAt: now,
    ...taskData
  };

  await setDoc(taskDoc, task);
  return task;
}

export async function getTask(taskId: string) {
  const taskRef = doc(db, 'tasks', taskId);
  const taskSnap = await getDoc(taskRef);
  
  if (taskSnap.exists()) {
    return taskSnap.data() as Task;
  }
  return null;
}

export async function getDailyTasks() {
  const tasksRef = collection(db, 'tasks');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const taskQuery = query(
    tasksRef,
    where('createdAt', '>=', today)
  );
  
  const querySnapshot = await getDocs(taskQuery);
  return querySnapshot.docs.map(doc => doc.data() as Task);
}

export async function completeTask(taskId: string, userId: string) {
  const taskRef = doc(db, 'tasks', taskId);
  const taskSnap = await getDoc(taskRef);
  
  if (!taskSnap.exists()) {
    throw new Error('Task not found');
  }
  
  const task = taskSnap.data() as Task;
  if (task.completedBy.includes(userId)) {
    throw new Error('Task already completed by user');
  }
  
  await updateDoc(taskRef, {
    completedBy: [...task.completedBy, userId],
    updatedAt: new Date()
  });
  
  return task;
}