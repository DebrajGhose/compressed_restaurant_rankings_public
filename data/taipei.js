/* taipei restaurants - value ranking (0-100).

   GENERATED FILE - do not edit by hand. Built from private raw data by
   _build/build.ps1. Public and source-anonymous: only the finished value score plus
   display fields. No raw star ratings, no review counts, no formula. Scores are
   computed within each type (quick bites vs proper meals).

   Two finished rankings per restaurant, so the page can toggle between them:
     score / rank     - the default, where being overpriced for the quality costs you
     scoreNP / rankNP - the same ranking with that price penalty switched off
   Regenerate: _build/build.ps1 */

window.CITIES = window.CITIES || {};

window.CITIES.taipei = {
  id: "taipei",
  name: "Taipei",
  asOf: "September 2026",
  description:
    "I wanted a recommendation system for tasty, but cheap, food. The popular review " +
    "sites are overly polite, where most restaurants are rated over 4 on a 0 to 5 " +
    "scale. This page pulls those ratings back apart into a 0-to-100 value score " +
    "(100 is the best value, 0 the worst), takes into account how robust each rating " +
    "is to additional reviews, and punishes restaurants that are too expensive " +
    "relative to their rating. Toggle between proper meals and quick bites; the map " +
    "shows each list's top 10.",
  restaurants: [
    { id: "xiaoxiangzi-beef-noodles-neihu", name: "Xiaoxiangzi Beef Noodles Neihu (小巷子清燉牛肉麵)", cuisine: "Beef noodles", neighborhood: "Neihu", type: "meal", price: 1, lat: 25.07184, lng: 121.6194, score: 100, rank: 1, scoreNP: 90.5, rankNP: 5 },
    { id: "kaoshi-zhuhe-nangang", name: "Kaoshi Zhuhe Nangang (烤食煮盒)", cuisine: "Taiwanese", neighborhood: "Nangang", type: "meal", price: 1, lat: 25.05613, lng: 121.61325, score: 97.6, rank: 2, scoreNP: 83.3, rankNP: 8 },
    { id: "ruandanjiang-omurice-donghu", name: "Ruandanjiang Omurice Donghu (軟蛋醬)", cuisine: "Omurice", neighborhood: "Neihu - Donghu", type: "meal", price: 1, lat: 25.06964, lng: 121.61708, score: 95.2, rank: 3, scoreNP: 76.2, rankNP: 11 },
    { id: "uu-chinchilla-cafe", name: "UU Chinchilla Cafe", cuisine: "Cafe", neighborhood: "Nangang", type: "meal", price: 1, lat: 25.05373, lng: 121.61659, score: 92.9, rank: 4, scoreNP: 100, rankNP: 1 },
    { id: "luosifu-xinyi", name: "Luosifu Xinyi (螺螄福)", cuisine: "Luosifen noodles", neighborhood: "Xinyi", type: "meal", price: 1, lat: 25.04122, lng: 121.56891, score: 90.5, rank: 5, scoreNP: 97.6, rankNP: 2 },
    { id: "changsheng-yanren-ramen-donghu", name: "Changsheng Yanren Ramen Donghu (長生塩人)", cuisine: "Ramen", neighborhood: "Neihu - Donghu", type: "meal", price: 1, lat: 25.06853, lng: 121.61229, score: 88.1, rank: 6, scoreNP: 92.9, rankNP: 4 },
    { id: "zaodian-fei", name: "Zaodian Fei (早點。肥)", cuisine: "Breakfast", neighborhood: "Xizhi (New Taipei)", type: "meal", price: 1, lat: 25.09021, lng: 121.64494, score: 85.7, rank: 7, scoreNP: 71.4, rankNP: 13 },
    { id: "shandingshun", name: "Shandingshun (山頂舜)", cuisine: "Braised pork rice", neighborhood: "Xizhi (New Taipei)", type: "meal", price: 1, lat: 25.08535, lng: 121.64808, score: 83.3, rank: 8, scoreNP: 69, rankNP: 14 },
    { id: "yadulan-kitchen", name: "Yadulan Kitchen (亞杜蘭廚房)", cuisine: "Hong Kong style", neighborhood: "Xizhi (New Taipei)", type: "meal", price: 1, lat: 25.06775, lng: 121.66024, score: 81, rank: 9, scoreNP: 52.4, rankNP: 21 },
    { id: "master-zhuang-pasta", name: "Master Zhuang Pasta (莊師傅義大利麵)", cuisine: "Pasta", neighborhood: "Xizhi (New Taipei)", type: "meal", price: 1, lat: 25.06574, lng: 121.65733, score: 78.6, rank: 10, scoreNP: 45.2, rankNP: 24 },
    { id: "ono-poke-xizhi", name: "ONO POKE Xizhi", cuisine: "Poke", neighborhood: "Xizhi (New Taipei)", type: "meal", price: 1, lat: 25.06737, lng: 121.66271, score: 76.2, rank: 11, scoreNP: 40.5, rankNP: 26 },
    { id: "aishang-vegetarian", name: "Aishang Vegetarian (愛上素食)", cuisine: "Vegetarian", neighborhood: "Xizhi (New Taipei)", type: "meal", price: 1, lat: 25.06574, lng: 121.65733, score: 73.8, rank: 12, scoreNP: 38.1, rankNP: 27 },
    { id: "feng-ge-beef-noodle", name: "Feng Ge Beef Noodle", cuisine: "Beef noodles", neighborhood: "Xizhi (New Taipei)", type: "meal", price: 1, lat: 25.07147, lng: 121.68162, score: 71.4, rank: 13, scoreNP: 35.7, rankNP: 28 },
    { id: "wudui-canteen", name: "Wudui Canteen (伍堆食堂)", cuisine: "Taiwanese", neighborhood: "Xizhi (New Taipei)", type: "meal", price: 1, lat: 25.08906, lng: 121.6461, score: 69, rank: 14, scoreNP: 23.8, rankNP: 33 },
    { id: "hi-lai-shanghainese-dumpling-lalaport", name: "Hi-Lai Shanghainese Dumpling LaLaport Nangang", cuisine: "Shanghainese", neighborhood: "Nangang", type: "meal", price: 1, lat: 25.05933, lng: 121.61796, score: 66.7, rank: 15, scoreNP: 95.2, rankNP: 3 },
    { id: "yake-breakfast", name: "Yake Breakfast (雅客早餐店)", cuisine: "Breakfast", neighborhood: "Xizhi (New Taipei)", type: "meal", price: 1, lat: 25.08922, lng: 121.64598, score: 64.3, rank: 16, scoreNP: 21.4, rankNP: 34 },
    { id: "zhang-ji-xiaochi", name: "Zhang Ji Xiaochi (張記小吃)", cuisine: "Taiwanese", neighborhood: "Neihu - Donghu", type: "meal", price: 1, lat: 25.06996, lng: 121.615, score: 61.9, rank: 17, scoreNP: 19, rankNP: 35 },
    { id: "gyuu-niku", name: "GYUU NIKU", cuisine: "Japanese steak", neighborhood: "Xinyi", type: "meal", price: 1, lat: 25.04071, lng: 121.57517, score: 59.5, rank: 18, scoreNP: 78.6, rankNP: 10 },
    { id: "bogart-s-smokehouse", name: "Bogart's Smokehouse", cuisine: "Barbecue", neighborhood: "Nangang", type: "meal", price: 1, lat: 25.0547, lng: 121.61009, score: 57.1, rank: 19, scoreNP: 88.1, rankNP: 6 },
    { id: "ease-cafe", name: "EASE CAFE", cuisine: "Cafe", neighborhood: "Neihu", type: "meal", price: 1, lat: 25.07849, lng: 121.61967, score: 54.8, rank: 20, scoreNP: 85.7, rankNP: 7 },
    { id: "duoduo-roujiamo", name: "Duoduo Roujiamo (多多肉肉夾饃)", cuisine: "Chinese", neighborhood: "Songshan", type: "meal", price: 1, lat: 25.05064, lng: 121.57662, score: 52.4, rank: 21, scoreNP: 14.3, rankNP: 37 },
    { id: "cafe-yun-gimbap", name: "Cafe Yun Gimbap (芸飯捲)", cuisine: "Korean", neighborhood: "Xizhi (New Taipei)", type: "meal", price: 1, lat: 25.05847, lng: 121.63445, score: 50, rank: 22, scoreNP: 73.8, rankNP: 12 },
    { id: "tony-s-food", name: "Tony's Food", cuisine: "Tonkatsu", neighborhood: "Neihu", type: "meal", price: 1, lat: 25.08103, lng: 121.57721, score: 47.6, rank: 23, scoreNP: 81, rankNP: 9 },
    { id: "dongcun-fish-soup", name: "Dongcun Fish Soup (鯟村鮮魚湯)", cuisine: "Taiwanese", neighborhood: "Xizhi (New Taipei)", type: "meal", price: 1, lat: 25.06665, lng: 121.63625, score: 45.2, rank: 24, scoreNP: 66.7, rankNP: 15 },
    { id: "fanxi-yifang", name: "Fanxi Yifang (帆希義坊)", cuisine: "Italian", neighborhood: "Xizhi (New Taipei)", type: "meal", price: 1, lat: 25.06812, lng: 121.6641, score: 42.9, rank: 25, scoreNP: 57.1, rankNP: 19 },
    { id: "moon-moon-food-nangang", name: "Moon Moon Food Nangang", cuisine: "Chicken soup", neighborhood: "Nangang", type: "meal", price: 1, lat: 25.05662, lng: 121.60079, score: 40.5, rank: 26, scoreNP: 54.8, rankNP: 20 },
    { id: "zhe-wan-rice-noodles", name: "Zhe Wan Rice Noodles (這碗小鍋米線)", cuisine: "Yunnan rice noodles", neighborhood: "Neihu - Donghu", type: "meal", price: 1, lat: 25.06968, lng: 121.61392, score: 38.1, rank: 27, scoreNP: 50, rankNP: 22 },
    { id: "pho-tay-o", name: "Phở Tây Đô (金悅牛肉河粉)", cuisine: "Vietnamese", neighborhood: "Xizhi (New Taipei)", type: "meal", price: 1, lat: 25.06774, lng: 121.62867, score: 35.7, rank: 28, scoreNP: 47.6, rankNP: 23 },
    { id: "a-da-stir-fry", name: "A-Da Stir-Fry (福正宮廟口阿達熱炒)", cuisine: "Taiwanese stir-fry", neighborhood: "Xizhi (New Taipei)", type: "meal", price: 1, lat: 25.07813, lng: 121.67516, score: 33.3, rank: 29, scoreNP: 42.9, rankNP: 25 },
    { id: "spring-food", name: "Spring Food", cuisine: "Pasta", neighborhood: "Neihu", type: "meal", price: 1, lat: 25.0806, lng: 121.59237, score: 31, rank: 30, scoreNP: 33.3, rankNP: 29 },
    { id: "lao-dong-beef-noodles", name: "Lao Dong Beef Noodles", cuisine: "Beef noodles", neighborhood: "Nangang", type: "meal", price: 1, lat: 25.05883, lng: 121.61466, score: 28.6, rank: 31, scoreNP: 31, rankNP: 30 },
    { id: "bar-igloo-raohe", name: "Bar Igloo Raohe", cuisine: "Bistro", neighborhood: "Songshan", type: "meal", price: 1, lat: 25.05088, lng: 121.57647, score: 26.2, rank: 32, scoreNP: 64.3, rankNP: 16 },
    { id: "1001-nights-kitchen", name: "1001 Nights Kitchen", cuisine: "Middle Eastern", neighborhood: "Songshan", type: "meal", price: 2, lat: 25.04978, lng: 121.57366, score: 23.8, rank: 33, scoreNP: 61.9, rankNP: 17 },
    { id: "very-thai-restaurant", name: "Very Thai Restaurant", cuisine: "Thai", neighborhood: "Nangang", type: "meal", price: 2, lat: 25.05873, lng: 121.61497, score: 21.4, rank: 34, scoreNP: 59.5, rankNP: 18 },
    { id: "neverland-noodle-bar", name: "Neverland Noodle Bar", cuisine: "Beef noodles", neighborhood: "Nangang", type: "meal", price: 1, lat: 25.05457, lng: 121.60875, score: 19, rank: 35, scoreNP: 28.6, rankNP: 31 },
    { id: "haloa-poke-lalaport-nangang", name: "HALOA POKE LaLaport Nangang", cuisine: "Poke", neighborhood: "Nangang", type: "meal", price: 1, lat: 25.05933, lng: 121.61796, score: 16.7, rank: 36, scoreNP: 9.5, rankNP: 39 },
    { id: "cheogajip-xizhi", name: "Cheogajip Xizhi (起家雞)", cuisine: "Korean fried chicken", neighborhood: "Xizhi (New Taipei)", type: "meal", price: 1, lat: 25.06426, lng: 121.63265, score: 14.3, rank: 37, scoreNP: 7.1, rankNP: 40 },
    { id: "like-food", name: "LIKE FOOD (饗來美食)", cuisine: "Restaurant", neighborhood: "Neihu", type: "meal", price: 1, lat: 25.0756, lng: 121.60879, score: 11.9, rank: 38, scoreNP: 4.8, rankNP: 41 },
    { id: "xiaoxiang-shiyi", name: "Xiaoxiang Shiyi (小巷拾壹)", cuisine: "Italian", neighborhood: "Xizhi (New Taipei)", type: "meal", price: 1, lat: 25.06545, lng: 121.64171, score: 9.5, rank: 39, scoreNP: 2.4, rankNP: 42 },
    { id: "sinchao-rice-shoppe", name: "Sinchao Rice Shoppe", cuisine: "Taiwanese", neighborhood: "Xinyi", type: "meal", price: 3, lat: 25.04041, lng: 121.56684, score: 7.1, rank: 40, scoreNP: 16.7, rankNP: 36 },
    { id: "four-food-depot-xinyi", name: "Four Food Depot Xinyi", cuisine: "Restaurant", neighborhood: "Xinyi", type: "meal", price: 2, lat: 25.03967, lng: 121.56773, score: 4.8, rank: 41, scoreNP: 11.9, rankNP: 38 },
    { id: "xiangxiang-curry", name: "Xiangxiang Curry (想想咖哩)", cuisine: "Japanese curry", neighborhood: "Xinyi", type: "meal", price: 1, lat: 25.03659, lng: 121.56724, score: 2.4, rank: 42, scoreNP: 0, rankNP: 43 },
    { id: "saffron-46", name: "Saffron 46", cuisine: "Modern Indian", neighborhood: "Xinyi", type: "meal", price: 4, lat: 25.03441, lng: 121.56629, score: 0, rank: 43, scoreNP: 26.2, rankNP: 32 }
  ]
};