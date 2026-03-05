# QuizAI

**QuizAI** is an intelligent, full-stack web application that harnesses the power of **Google’s Gemini AI** to generate personalized quizzes in real time. Whether you're testing your fandom knowledge or learning a new subject, QuizAI creates a seamless and interactive quiz experience tailored to your interests. Rate limiting by IP of 1 request/5 minutes is applied on project to prevent overusage of Gemini API.

![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/lY8MTFlNfO0/0.jpg)

## Key Features

- **AI-Powered Quiz Generation**: Uses Google Gemini to generate unique, context-aware questions based on any topic.
- **Detailed Results Analysis**: Visual breakdown of scores and correct/incorrect answers.
- **Fully Responsive Design**: Built with Bootstrap for optimal performance across devices.

## Tech Stack

Typescript, React, Nextjs, Zustand

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
```

Make sure your key has access to the Gemini API.

## Sample Topics to Try

- Lakers Trivia
- Harry Potter
- Dune (Book 1)
- Game of Thrones
- UCLA
