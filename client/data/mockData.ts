import { Task, User } from '@/types';

// export const mockTasks: Task[] = [
//   {
//     id: '1',
//     title: 'Visiting Rio Janerio',
//     description: 'Trip to explore Rio Janerio and surrounding areas',
//     status: 'completed',
//     dueDate: '2024-04-12',
//     rating: 4.5,
//   },
//   {
//     id: '2',
//     title: 'Complete Project Proposal',
//     description: 'Finish the quarterly project proposal for management review',
//     status: 'in_progress',
//     date: '2024-04-20',
//     rating:4.5
//   },
//   {
//     id: '3',
//     title: 'Schedule Dentist Appointment',
//     description: 'Call dentist office to schedule annual cleaning',
//     status: 'pending',
//     rating:4.6,
//     date: '2024-04-25',
//   },
//   {
//     id: '4',
//     title: 'Grocery Shopping',
//     description: 'Buy groceries for the week',
//     status: 'completed',
//     date: '2024-04-10',
//     rating: 5,
//   },
// ];

export const mockQuotes = [
  {
    quote: 'Success is not what you do occasionally but what you do constantly',
    author: 'Anonymous',
  },
  {
    quote: 'The only way to do great work is to love what you do',
    author: 'Steve Jobs',
  },
  {
    quote: 'It does not matter how slowly you go as long as you do not stop',
    author: 'Confucius',
  },
  {
    quote: 'It does not matter how slowly you go as long as you do not stop',
    author: 'Confucius',
  }
];

export const mockUser: User = {
  id: 'user_001',
  firstName: 'Angele',
  lastName:'Marie',
  email: 'angele@example.com',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Johan',
  createdAt: '2024-04-01T10:00:00Z',
  updatedAt: '2024-04-05T12:00:00Z',
};


export function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * mockQuotes.length);
  return mockQuotes[randomIndex];
}