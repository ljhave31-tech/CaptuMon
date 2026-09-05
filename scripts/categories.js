const CATEGORY_RULES = [
  { keywords: ['dog', 'cat', 'bird', 'fish', 'horse', 'rabbit', 'hamster', 'turtle', 'snake', 'lizard', 'spider', 'insect', 'butterfly', 'bee', 'ant', 'cockroach', 'ladybug', 'dragonfly', 'cricket', 'mantis'], category: 'Fauna' },
  { keywords: ['tree', 'flower', 'plant', 'mushroom', 'fungus', 'cactus', 'fern', 'bamboo', 'palm', 'rose', 'sunflower', 'daisy', 'tulip', 'orchid', 'leaf', 'fruit', 'vegetable', 'apple', 'banana', 'orange', 'strawberry', 'grape', 'pineapple', 'mango', 'carrot', 'corn', 'broccoli', 'tomato', 'potato'], category: 'Flora' },
  { keywords: ['car', 'truck', 'bus', 'bicycle', 'motorcycle', 'train', 'airplane', 'boat', 'ship', 'helicopter', 'tank', 'ambulance', 'fire engine', 'taxi', 'van', 'bike'], category: 'Vehicles' },
  { keywords: ['phone', 'laptop', 'computer', 'keyboard', 'mouse', 'monitor', 'television', 'tv', 'remote', 'camera', 'headphone', 'speaker', 'microphone', 'printer', 'router', 'charger', 'cable', 'watch', 'clock'], category: 'Tech' },
  { keywords: ['pizza', 'burger', 'sushi', 'cake', 'bread', 'cheese', 'chocolate', 'coffee', 'tea', 'wine', 'beer', 'soda', 'juice', 'water', 'milk', 'egg', 'meat', 'chicken', 'steak', 'soup', 'salad', 'sandwich', 'hot dog', 'fries', 'donut', 'cookie', 'ice cream'], category: 'Food' },
  { keywords: ['shirt', 'pants', 'dress', 'shoe', 'hat', 'jacket', 'coat', 'sweater', 'jeans', 'skirt', 'socks', 'gloves', 'scarf', 'tie', 'belt', 'bag', 'backpack', 'wallet', 'purse', 'umbrella'], category: 'Fashion' },
  { keywords: ['book', 'pen', 'pencil', 'paper', 'notebook', 'envelope', 'stamp', 'card', 'ticket', 'passport', 'wallet', 'key', 'lock', 'scissors', 'tape', 'glue', 'ruler', 'calculator'], category: 'Stationery' },
  { keywords: ['chair', 'table', 'desk', 'sofa', 'bed', 'cabinet', 'shelf', 'lamp', 'mirror', 'clock', 'vase', 'pot', 'pan', 'bowl', 'cup', 'bottle', 'plate', 'fork', 'knife', 'spoon'], category: 'Home' },
  { keywords: ['ball', 'bat', 'racket', 'helmet', 'skateboard', 'snowboard', 'surfboard', 'golf', 'basketball', 'football', 'soccer', 'tennis', 'baseball', 'hockey', 'boxing', 'dumbbell', 'barbell'], category: 'Sports' },
  { keywords: ['guitar', 'piano', 'violin', 'drum', 'flute', 'trumpet', 'saxophone', 'microphone', 'radio', 'cd', 'vinyl', 'cassette', 'headphone', 'speaker'], category: 'Music' },
];

function suggestCategory(label) {
  const lower = label.toLowerCase();
  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((k) => lower.includes(k))) {
      return rule.category;
    }
  }
  return 'Other';
}
