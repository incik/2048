const logic = require('./logic');

const invalidMatrix = [
  [1, 4, 7, 3],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [13, 5, 7, 2],
];
const validMatrix = [
  [2, 4, 0, 0],
  [0, 2, 4, 0],
  [0, 0, 2, 0],
  [0, 0, 0, 0],
];

const testMatrix1_1 = [
  [0, 0, 0, 0],
  [0, 2, 0, 0],
  [0, 0, 0, 0],
  [2, 0, 0, 0],
];
const testMatrix1_right = [
  [0, 0, 0, 0],
  [0, 0, 0, 2],
  [0, 0, 0, 0],
  [0, 0, 0, 2],
];
const testMatrix1_left = [
  [0, 0, 0, 0],
  [2, 0, 0, 0],
  [0, 0, 0, 0],
  [2, 0, 0, 0],
];
const testMatrix1_up = [
  [2, 2, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
const testMatrix1_down = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [2, 2, 0, 0],
];

const mergeTest = [
  [8, 32, 32, 64],
  [4, 4, 0, 4],
  [2, 0, 2, 0],
  [0, 0, 0, 0],
];

describe('2048 Logic', () => {
  it('should generate initial matrix', () => {
    const newMatrix = logic.generate();
    expect(newMatrix).toEqual(validMatrix);
  });

  describe('matrix validation', () => {
    it('should validate matrix', () => {
      expect(logic.validate(validMatrix)).toEqual(true);
    });

    it('should scream about invalid matrix', () => {
      expect(logic.validate(invalidMatrix)).toEqual(false);
    });
  });

  // it('should check value of numbers');

  describe('cell movement', () => {
    it('should move left', () => {
      expect(logic.move(testMatrix1_1, logic.MOVES.LEFT)).toEqual(testMatrix1_left);
    });
    it('should move right', () => {
      expect(logic.move(testMatrix1_1, logic.MOVES.RIGHT)).toEqual(testMatrix1_right);
    });
    it('should move up', () => {
      expect(logic.move(testMatrix1_1, logic.MOVES.UP)).toEqual(testMatrix1_up);
    });
    it('should move down', () => {
      expect(logic.move(testMatrix1_1, logic.MOVES.DOWN)).toEqual(testMatrix1_down);
    });
  });

  describe('cell merging', () => {
    it('should merge left');
    it('should merge up');
    it('should merge right');
    it('should merge down');

    it('should generate new cell after merge');
  });
});
