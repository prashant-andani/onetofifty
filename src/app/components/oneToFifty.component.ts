import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'one-to-fifty',
  templateUrl: 'oneToFifty.component.html',
})

export class OneToFiftyComponent  {
    public clickCount: number = 1;
    public numArray: {value: number, isSelected: boolean, hasAppeared: boolean}[][] = new Array(5);
    public shuffledArray: number[] = new Array(25);
    public nextShuffledArray: number[] = new Array(25);
    public showAlert: boolean = false;

    constructor() {
      this.populateShuffledArray(this.shuffledArray, 0);
      this.shuffle(this.shuffledArray);
      this.populateShuffledArray(this.nextShuffledArray, 25);
      this.shuffle(this.nextShuffledArray);
      this.populateNumArray();
    }

    populateShuffledArray(arr: number[], start: number) {
      for (let i = 0; i < 25; i++) {
        arr[i] = start + i + 1;
      }
    }

    shuffle(arr: number[]) {
    let tmp: number, current: number, top: number = arr.length;
      if (top) {
        while (--top) {
          current = Math.floor(Math.random() * (top + 1));
          tmp = arr[current];
          arr[current] = arr[top];
          arr[top] = tmp;
        }
      }
    }

    populateNumArray() {
      let count = 0;
      for (let i = 0; i < 5; i++) {
        this.numArray[i] = new Array(5);
        for (let j = 0; j < 5; j++) {
          this.numArray[i][j] = {value: this.shuffledArray[count], isSelected: false, hasAppeared: true};
          count++;
        }
      }
    }

    clickBlock(block: {value: number, isSelected: boolean, hasAppeared: boolean}, i: number, j: number) {
      if (this.clickCount === block.value) {
        this.numArray[i][j].isSelected = true;
        this.numArray[i][j] = {value: this.nextShuffledArray[this.clickCount - 1], isSelected: false, hasAppeared: true};
        this.clickCount++;
      }
      if (this.clickCount === 51) {
        this.showAlert = true;
      }
    }

    resetGame() {
      this.clickCount = 1;
      this.numArray = new Array(5);
      this.shuffledArray = new Array(25);
      this.nextShuffledArray = new Array(25);
      this.showAlert = false;

      this.populateShuffledArray(this.shuffledArray, 0);
      this.shuffle(this.shuffledArray);
      this.populateShuffledArray(this.nextShuffledArray, 25);
      this.shuffle(this.nextShuffledArray);
      this.populateNumArray();
    }
}