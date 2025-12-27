/*Given an array arr of positive integers sorted in a strictly increasing order, and an integer k.

Return the kth positive integer that is missing from this array.

 

Example 1:

Input: arr = [2,3,4,7,11], k = 5
Output: 9
Explanation: The missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing positive integer is 9.*/

const getMissingNumber = function (arr, k) {
  let counter = 1;
  let missingCount = 0;
  let i = 0;

  while (true) {
    if (i < arr.length && counter === arr[i]) {
      i++;
    } else {
      missingCount++;
      if (missingCount === k) {
        return counter;
      }
    }
    counter++;
  }
};

console.log(getMissingNumber([1, 2, 3, 4], 2));
