
export default class Social {
  constructor() {

  }

  sortByDate(data) {
    const dataCopy = [...data];

    return dataCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  findHashtags(string) {
    let array = string.split(' ');

    for (let i = 1; i < array.length; i++) {
      if (!array[i].startsWith('#') && !array[i - 1].startsWith('#')) {
        array[i - 1] += ' ' + array[i];
        array.splice(i, 1);
        i--;
      }
    };

    return array;
  }

  findMentions(data) {

  }

}