export class ShuffleArray {
  answerList<T>(array: T[], count: number): T[] {
    return array.length > 0
      ? array.filter((_value, index) => index >= count && index < count + 8)
      : [];
  }
  shuffleArray<T>(array: T[]): T[] {
    if (array.length > 0)
      return [...array].slice().sort(() => Math.random() - Math.random());
    return [];
  }

  GetRandomArray<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  GetRandomSelection<T>(array: T[], count: number, limit: number) {
    const shuffled: T[] = [];
    const rnd = Math.floor(Math.random() * limit);

    while (true) {
      const remainingArray = this.GetRandomArray(array, limit);
      if (!remainingArray.includes(array[count])) {
        remainingArray.forEach((v, i) => {
          i == rnd ? shuffled.push(array[count]) : shuffled.push(v);
        });
        break;
      }
    }

    return array.length > 0 ? shuffled : [];
  }
}
