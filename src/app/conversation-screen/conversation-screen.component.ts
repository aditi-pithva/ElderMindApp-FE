import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { SpeechService } from '../services/speech.service';
import { ConversationService } from '../services/conversation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QUESTIONS } from '../data/questions';

interface MessagePair {
  questionId: string | number;
  question: string;
  answer?: string;
  timestamp: Date;
}

@Component({
  selector: 'app-conversation-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conversation-screen.component.html',
  styleUrl: './conversation-screen.component.scss'
})
export class ConversationScreenComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  
  currentQuestion: any;
  currentAnswer: any = '';
  currentSection: string = '';
  totalQuestions: number = 0;
  currentIndex: number = 0;
  isListening: boolean = false;
  invalidOption: boolean = false;
  answerSubmitted: boolean = false;
  
  // Conversation history stored as question-answer pairs
  conversationPairs: MessagePair[] = [];

  // Object to store answers by question id
  answersById: { [key: string]: any } = {};

  QUESTIONS = QUESTIONS;

  constructor(
    public convo: ConversationService,
    public speech: SpeechService
  ) {
    this.speech.listening$.subscribe((val) => {
      this.isListening = val;
    });
  }

  ngOnInit() {
    this.totalQuestions = this.convo.getTotalQuestions();
    this.loadQuestion();
  }

  loadQuestion() {
    this.speech.stopListening();
    this.currentQuestion = this.convo.getCurrentQuestion();
    this.currentSection = this.convo.getCurrentSection();
    this.currentIndex = this.convo.getCurrentIndex();
    this.currentAnswer = '';
    this.answerSubmitted = false;
  }

  selectAnswer(answer: string) {
    let displayValue = answer;
    let backendValue = answer;
    this.invalidOption = false;
    // For dropdown-type questions, store index for backend, but display text in UI
    if (this.currentQuestion && this.currentQuestion.options) {
      const idx = this.currentQuestion.options.findIndex((opt: string) => opt === answer);
      if (idx !== -1) {
        displayValue = this.currentQuestion.options[idx];
        backendValue = idx;
      }
    }
    this.currentAnswer = displayValue;
    this.submitAnswer(backendValue);
  }

  submitAnswer(backendValue?: any) {
    if (!this.isAnswerValid()) return;
    this.answerSubmitted = true;
    // Save the answer (index for dropdowns, value for others)
    const valueToSave = backendValue !== undefined ? backendValue : this.currentAnswer;
    this.convo.saveAnswer(this.currentQuestion.id, valueToSave);
    this.answersById[this.currentQuestion.id] = valueToSave;
    // Add to conversation history (always display text)
    this.conversationPairs.push({
      questionId: this.currentQuestion.id,
      question: this.currentQuestion.text,
      answer: this.currentAnswer,
      timestamp: new Date()
    });
    
    // Move to next question with slight delay for UX
    setTimeout(() => {
      if (this.convo.goToNextQuestion()) {
        this.loadQuestion();
        this.scrollToBottom();
      } else {
        console.log('answersById::', this.answersById);
        // All questions completed
        this.conversationPairs.push({
        questionId: 'analyzing',
        question: "Analyzing...",
        timestamp: new Date()
      });

      setTimeout(() => {

       this.conversationPairs = this.conversationPairs.filter(pair => pair.questionId !== 'analyzing');

        const answers = this.answersById;

        // Define Alzheimer’s risk based on responses
        const memoryIssues = answers['COGMEM'] === 'Yes';
        const disorientation = answers['COGORI'] === 'Yes';
        const judgmentProblems = answers['COGJUDG'] === 'Yes';
        const speechIssues = answers['COGLANG'] === 'Yes';
        const visualProcessing = answers['COGVIS'] === 'Yes';
        const attentionDeficit = answers['COGATTN'] === 'Yes';
        const familyHistory = answers['NACCFAM'] === 'Yes' || answers['NACCADMU'] === 'Yes';
        const age = parseInt(answers['NACCAGE']) || 0;

        const atRisk =
          (memoryIssues || disorientation || judgmentProblems || speechIssues || visualProcessing || attentionDeficit) &&
          familyHistory &&
          age > 60;

        const resultText = atRisk
          ? "Based on your responses, certain patterns may indicate an elevated risk for cognitive concerns, including early signs associated with Alzheimer's disease. This is not a diagnosis, but a recommendation to consult with a healthcare professional for proper evaluation. Early detection can significantly improve management and treatment outcomes."
          : "Your responses do not show common patterns typically associated with early cognitive concerns. However, if you or your family notice ongoing changes, please consult a medical professional. Regular checkups are the best way to monitor health.";

        this.conversationPairs.push({
          questionId: 'completion',
          question: resultText,
          timestamp: new Date()
        });
      }, 2000); // 2000 milliseconds = 2 seconds
      }
    }, 300);
  }

  listen() {
    this.invalidOption = false;
    this.speech.listen((text: string) => {
      let normalizedText = text.trim().toLowerCase();
      if (this.currentQuestion.options) {
        const matchIdx = this.currentQuestion.options.findIndex((opt: string) => opt.trim().toLowerCase() === normalizedText);
        if (matchIdx !== -1) {
          this.currentAnswer = this.currentQuestion.options[matchIdx];
          this.submitAnswer(matchIdx);
          this.invalidOption = false;
        } else if (normalizedText) {
          this.currentAnswer = '';
          this.invalidOption = true;
          this.speech.speak('Please select a valid option.');
        }
      } else {
        this.currentAnswer = text;
        this.submitAnswer();
        this.invalidOption = false;
      }
    });
  }

  onManualAnswerChange() {
    this.invalidOption = false;
    if (this.currentQuestion.options) {
      const match = this.currentQuestion.options.find((opt: string) => opt === this.currentAnswer);
      this.invalidOption = !match && !!this.currentAnswer;
    }
  }

  // Calculate progress percentage
  get progress(): number {
    return (this.currentIndex / this.totalQuestions) * 100;
  }

  isAnswerValid(): boolean {
    if (this.currentQuestion.options) {
      return !!this.currentAnswer && !this.invalidOption;
    }
    if (this.currentQuestion.type === 'number') {
      // Special case for BMI
      if (this.currentQuestion.id === 'NACCBMI') {
        const bmi = Number(this.currentAnswer);
        return bmi >= 9.9 && bmi <= 64.9;
      }
      // Systolic Blood Pressure
      if (this.currentQuestion.id === 'BPSYS') {
        const sys = Number(this.currentAnswer);
        return sys >= 60 && sys <= 232;
      }
      // Diastolic Blood Pressure
      if (this.currentQuestion.id === 'BPDIAS') {
        const dias = Number(this.currentAnswer);
        return dias >= 30 && dias <= 140;
      }
      // Heart Rate
      if (this.currentQuestion.id === 'HRATE') {
        const hr = Number(this.currentAnswer);
        return hr >= 33 && hr <= 138;
      }
      // Years of Education
      if (this.currentQuestion.id === 'EDUC') {
        const educ = Number(this.currentAnswer);
        return educ >= 0 && educ <= 31;
      }
      return Number(this.currentAnswer) > 0;
    }
    if (this.currentQuestion.type === 'text') {
      return !!this.currentAnswer && this.currentAnswer.trim().length > 0;
    }
    return !!this.currentAnswer;
  }
  
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  
  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  speakQuestion(text?: string) {
    const toSpeak = text || (this.currentQuestion && this.currentQuestion.text);
    if (toSpeak) {
      this.speech.speak(toSpeak);
    }
  }

  // Optionally, a method to get the answer object
  getAnswerObject() {
    return { ...this.answersById };
  }

  editAnswer(questionId: string | number) {
    // Ensure questionId is string for lookup
    const qId = String(questionId);
    // Find the index of the message pair for this question
    const idx = this.conversationPairs.findIndex(pair => String(pair.questionId) === qId);
    if (idx !== -1) {
      // Set the current question to the one being edited
      // Find the section and question index in QUESTIONS
      let found = false;
      for (let s = 0; s < this.QUESTIONS.length; s++) {
        const qIdx = this.QUESTIONS[s].questions.findIndex((q: any) => q.id === qId);
        if (qIdx !== -1) {
          this.convo['sectionIndex'] = s;
          this.convo['questionIndex'] = qIdx;
          found = true;
          break;
        }
      }
      if (!found) return;
      // Set the answer to the previous value
      this.currentQuestion = this.convo.getCurrentQuestion();
      this.currentSection = this.convo.getCurrentSection();
      this.currentIndex = this.convo.getCurrentIndex();
      this.currentAnswer = this.answersById[qId];
      this.answerSubmitted = false;
      // Remove the answer from conversationPairs and answersById
      this.conversationPairs = this.conversationPairs.filter((_, i) => i <= idx ? i !== idx : true);
      delete this.answersById[qId];
    }
  }

  startOver() {
    this.convo['sectionIndex'] = 0;
    this.convo['questionIndex'] = 0;
    this.currentQuestion = this.convo.getCurrentQuestion();
    this.currentSection = this.convo.getCurrentSection();
    this.currentIndex = this.convo.getCurrentIndex();
    this.currentAnswer = '';
    this.answerSubmitted = false;
    this.conversationPairs = [];
    this.answersById = {};
  }
}