# ElderMindApp-FE

ElderMind is a user-friendly Angular web application designed to collect cognitive, behavioral, and medical inputs from users to assist in the early detection of Alzheimer's disease. The interface is structured around an interactive chatbot that guides users through a series of questions, with results powered by a backend LLM.

## Features

- Chat-style questionnaire flow
- Covers demographics, cognitive functions, psychological symptoms, motor issues, and more
- Dynamic rendering of questions with dropdowns, yes/no, and numeric inputs
- Final AI-powered analysis based on user inputs
- Integration-ready with Flask-based LLM backend

## etting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v16 or later recommended)
- [Angular CLI](https://angular.io/cli)

### Installation

```bash
git clone https://github.com/aditi-pithva/ElderMindApp-FE.git
cd ElderMindApp-FE
npm install
```

### Run the App

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser.

## Project Structure

- `src/app/components` – UI components (chat interface, question cards, etc.)
- `src/app/services` – Communication layer for backend integration
- `src/app/constants/questions.ts` – Full list of categorized medical questions
- `src/assets` – Static assets and styles

## Backend

Make sure the Flask backend is running (e.g., `/generate` endpoint) and update the API URL in the Angular service if needed.

## License

This project is under the MIT License. See [LICENSE](LICENSE) for details.

---

>  **Disclaimer:** This application is not a diagnostic tool. It is intended for preliminary guidance and awareness only. Please consult a medical professional for official evaluation.
