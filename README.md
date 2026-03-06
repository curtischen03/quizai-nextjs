# QuizAI

**QuizAI** is an intelligent, full-stack web application that harnesses the power of **Google’s Gemini AI** to generate personalized quizzes in real time. Whether you're testing your fandom knowledge or learning a new subject, QuizAI creates a seamless and interactive quiz experience tailored to your interests. Rate limiting by IP of 1 request/5 minutes is applied on project to prevent overusage of Gemini API.

![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/lY8MTFlNfO0/0.jpg)

## Key Features

- **AI-Powered Quiz Generation**: Uses Google Gemini to generate unique, context-aware questions based on any topic.
- **Detailed Results Analysis**: Visual breakdown of scores and correct/incorrect answers.
- **Fully Responsive Design**: Built with Bootstrap for optimal performance across devices.
- **Share with Others**: Take quizzes created by other people
- **End to End App**: React Frontend and Supabase Backend

## Tech Stack

Typescript, React, Nextjs, Supabase, Postgres, Zustand <br><br>
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

### Setup

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory with:

```env
GOOGLE_API_KEY=your_google_api_key
IP_SALT=your_ip_salt
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_key
```

Make sure your key has access to the Gemini API.

## Sample Topics to Try

- Lakers Trivia
- Harry Potter
- Dune (Book 1)
- Game of Thrones
- UCLA
