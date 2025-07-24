import { Injectable } from '@angular/core';
import { QUESTIONS } from '../data/questions';

@Injectable({ providedIn: 'root' })
export class ConversationService {
   private sectionIndex = 0;
  private questionIndex = 0;
  private answers: { [key: string]: string } = {};

  getCurrentQuestion() {
    return QUESTIONS[this.sectionIndex].questions[this.questionIndex];
  }

  getCurrentSection() {
    return QUESTIONS[this.sectionIndex].section;
  }

  getCurrentIndex(): number {
    let count = 0;
    for (let i = 0; i < this.sectionIndex; i++) {
      count += QUESTIONS[i].questions.length;
    }
    count += this.questionIndex + 1;
    return count;
  }

  getTotalQuestions(): number {
    return QUESTIONS.reduce((acc, sec) => acc + sec.questions.length, 0);
  }

  saveAnswer(questionId: string, answer: string) {
    this.answers[questionId] = answer;
  }

  goToNextQuestion(): boolean {
    if (this.questionIndex < QUESTIONS[this.sectionIndex].questions.length - 1) {
      this.questionIndex++;
      return true;
    } else if (this.sectionIndex < QUESTIONS.length - 1) {
      this.sectionIndex++;
      this.questionIndex = 0;
      return true;
    }
    return false;
  }

  getAnswers() {
    return this.answers;
  }
}
