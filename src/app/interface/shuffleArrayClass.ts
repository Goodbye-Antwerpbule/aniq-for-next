export class ShuffleArray {
  answerList<T>(array: T[], count: number): T[] {
    return array.length > 0
      ? array.filter((_value, index) => index >= count && index < count + 8)
      : [];
  }
  shuffleArray<T>(array: T[]): T[] {
    return array.slice().toSorted(() => Math.random() - Math.random());
  }

  GetRandomArray<T>(array: T[], count: number): T[] {
    const shuffled = array.toSorted(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  GetRandomSelection<T>(array: T[], count: number, limit: number) {
    const shuffled: T[] = [];
    shuffled.push(array[count]);

    while (true) {
      const remainingArray = this.GetRandomArray(array, limit - 1);
      if (!remainingArray.includes(shuffled[0])) {
        remainingArray.forEach((v) => {
          shuffled.push(v);
        });
        break;
      }
    }

    return array.length > 0 ? shuffled : [];
  }
}
