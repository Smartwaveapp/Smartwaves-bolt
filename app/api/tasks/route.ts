import { NextResponse } from 'next/server';

export async function GET() {
  // Simulated tasks data - replace with database fetch
  const tasks = [
    {
      id: 1,
      platform: 'Twitter',
      task: 'Follow @socialrewards',
      points: 100,
    },
    {
      id: 2,
      platform: 'Twitter',
      task: 'Retweet our latest post',
      points: 150,
    },
    {
      id: 3,
      platform: 'Twitter',
      task: 'Comment on our announcement',
      points: 200,
    },
  ];

  return NextResponse.json({ tasks });
}

export async function POST(request: Request) {
  const data = await request.json();
  
  // Validate task completion and update user points
  // Replace with actual database operations
  
  return NextResponse.json({
    success: true,
    message: 'Task completed successfully',
    points: data.points,
  });
}