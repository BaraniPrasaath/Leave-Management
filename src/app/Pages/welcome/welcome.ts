import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [RouterLink],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome implements OnInit, OnDestroy {
  phrases = [
    'Still managing leave in spreadsheets?',
    'Welcome to LeaveTracker 🚀',
    'Track and manage employee leave easily.',
    'Approve requests faster and smarter.',
    'All your leave data in one place.',
  ];

  displayedText = signal('');
  currentPhraseIndex = 0;
  currentCharIndex = 0;
  isDeleting = false;
  intervalId: any;

  ngOnInit() {
    this.startTypingEffect();
  }

  startTypingEffect() {
    this.intervalId = setInterval(
      () => {
        const currentPhrase = this.phrases[this.currentPhraseIndex];

        if (!this.isDeleting) {
          this.currentCharIndex++;
          this.displayedText.set(currentPhrase.slice(0, this.currentCharIndex));

          if (this.currentCharIndex === currentPhrase.length) {
            this.isDeleting = true;
          }
        } else {
          this.currentCharIndex--;
          this.displayedText.set(currentPhrase.slice(0, this.currentCharIndex));

          if (this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
          }
        }
      },
      this.isDeleting ? 40 : 80,
    );
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
