import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';

@Injectable({
  providedIn: 'root'
})
export class ConfettiService {

  constructor() { }

  launchConfetti(emoji: string, event: MouseEvent) {
    const origin = {
      x: event.clientX / window.innerWidth,
      y: event.clientY / window.innerHeight
    };
    var scalar = 10;
    var emojis = confetti.shapeFromText({ text: emoji, scalar });
    confetti({
      shapes: [emojis],
      particleCount: 50,
      scalar: 2.5,
      origin: origin
    });
  }
}

