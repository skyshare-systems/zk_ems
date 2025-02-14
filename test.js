  function twoSum(nums, target) {
    const h = new Map();

    for (let i = 0; i < nums.length; i++) {
      h.set(nums[i], i);
    }

    for (let i = 0; i < nums.length; i++) {
      const desired = target - nums[i];
      if (h.has(desired) && h.get(desired) !== i) {
        return [i, h.get(desired)];
      }
    }

    return [];
  }

// Example usage:
console.log(twoSum([2, 7, 11, 15], 22)); // Output: [0, 1]
