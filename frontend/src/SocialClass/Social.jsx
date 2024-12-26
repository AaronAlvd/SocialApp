
export default class Social {
  constructor() {

  }

  sortByDate(data) {
    const dataCopy = [...data];
  
    return dataCopy.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
  
      // If dates are the same, return 0 (no change in order)
      if (dateA.getTime() === dateB.getTime()) {
        return 0;
      }
  
      // Sort by date, newest first
      return dateB - dateA;
    });
  }

  findHashtags(string) {
    let array = string.split(' ');

    for (let i = 1; i < array.length; i++) {
      if (!array[i].startsWith('#') && !array[i - 1].startsWith('#')) {
        array[i - 1] += ' ' + array[i];
        array.splice(i, 1);
        i--;
      } else {
        array[i] = <span className="Post-hashtag"> {array[i]}</span>
      }
    };

    return array;
  }

  findMentions(data) {

  }

  convertImageToBase64(data) {
    const byteArray = new Uint8Array(data.data);
    const binaryString = Array.from(byteArray)
      .map(byte => String.fromCharCode(byte))
      .join('');
    return `data:image/jpeg;base64,${btoa(binaryString)}`
  }

  profilePhoto(data) {
    if (data) {
      const byteArray = new Uint8Array(data.data);
      const binaryString = Array.from(byteArray)
        .map(byte => String.fromCharCode(byte))
        .join('');
      return `data:image/jpeg;base64,${btoa(binaryString)}` // Ensure you use the correct MIME type
    } 
  }

}