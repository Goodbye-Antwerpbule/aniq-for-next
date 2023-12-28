class ShuffleArray<T> {
  array: T[];

  constructor(array: T[]) {
    this.array = array;
  }

  answerList<T>(array: T[], count: number): T[] {
    return array.length > 0
      ? array.filter((_value, index) => index >= count && index < count + 8)
      : [];
  }
  shuffleArray<T>(array: T[]): T[] {
    return array.slice().sort(() => Math.random() - Math.random());
  }
}
