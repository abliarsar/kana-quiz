import {KanaType, SymbolGroupType, SymbolInfo, SymbolType} from 'features/quiz/types'

type Group = Array<[romaji: string, hiragana: string, katakana: string]>


const voicedSoundMark = '゙';
const semiVoicedSoundMark = '゚';

const voiced = (character: string)  => character + voicedSoundMark;
const semiVoiced = (character: string) => character + semiVoicedSoundMark;


const voicedRomajiMap = {
  ch: 'j',
  ts: 'z',
  sh: 'j',
  k: 'g',
  s: 'z',
  t: 'd',
  h: 'b',
  f: 'b',
}
const semiVoicedRomajiMap = {
  h: 'p',
  f: 'p',
}

const changeConsonant = (romaji: string, map: Record<string, string>) => Object.entries(map).reduce((result, [prev, next]) => {
  return result.replace(prev, next)
}, romaji);


const makeVoicedGroupFrom = (group: Group): Group => group.map(([ro, h, k]) => [changeConsonant(ro, voicedRomajiMap), voiced(h), voiced(k)])
const makeSemiVoicedGroupFrom = (group: Group): Group => group.map(([ro, h, k]) => [changeConsonant(ro, semiVoicedRomajiMap), semiVoiced(h), semiVoiced(k)])


// const smallVowels: Group = [
//   ["a","ぁ", "ァ"],
//   ["i","ぃ", "ィ"],
//   ["u","ぅ", "ゥ"],
//   ["e","ぇ", "ェ"],
//   ["o","ぉ", "ォ"]
// ];

const smallYGroup: Group = [
  ["ya","ゃ", "ャ"],
  ["yu","ゅ", "ュ"],
  ["yo","ょ", "ョ"]
];

const vowels: Group = [
  ["a","あ", "ア"],
  ["i","い", "イ"],
  ["u","う", "ウ"],
  ["e","え", "エ"],
  ["o","お", "オ"]
];

const kGroup: Group = [
  ["ka","か", "カ"],
  ["ki","き", "キ"],
  ["ku","く", "ク"],
  ["ke","け", "ケ"],
  ["ko","こ", "コ"]
];

const gGroup = makeVoicedGroupFrom(kGroup)

const sGroup: Group = [
  ["sa","さ","サ"],
  ["shi","し","シ"],
  ["su","す","ス"],
  ["se","せ","セ"],
  ["so","そ","ソ"]
];

const zGroup = makeVoicedGroupFrom(sGroup)

const tGroup: Group = [
  ["ta","た","タ"],
  ["chi","ち","チ"],
  ["tsu","つ","ツ"],
  ["te","て","テ"],
  ["to","と","ト"]
]
const dGroup = makeVoicedGroupFrom(tGroup);

const nGroup: Group = [
  ["na","な","ナ"],
  ["ni","に","ニ"],
  ["nu","ぬ","ヌ"],
  ["ne","ね","ネ"],
  ["no","の","ノ"]
];

const hGroup: Group = [
  ["ha","は","ハ"],
  ["hi","ひ","ヒ"],
  ["fu","ふ","フ"],
  ["he","へ","ヘ"],
  ["ho","ほ","ホ"]
];
const bGroup = makeVoicedGroupFrom(hGroup)

const pGroup = makeSemiVoicedGroupFrom(hGroup);

const mGroup: Group = [
  ["ma","ま","マ"],
  ["mi","み","ミ"],
  ["mu","む","ム"],
  ["me","め","メ"],
  ["mo","も","モ"]
]
const yGroup: Group = [
  ["ya","や", "ヤ"],
  ["yu","ゆ", "ユ"],
  ["yo","よ", "ヨ"]
];

const rGroup: Group = [
  ["ra","ら", "ラ"],
  ["ri","り", "リ"],
  ["ru","る", "ル"],
  ["re","れ", "レ"],
  ["ro","ろ", "ロ"]
]
const wGroup: Group = [
  ["wa","わ", "ワ"],
  ["wo","を", "ヲ"],
];

const additional: Group = [
  ["n","ん", "ン"]
]

export const MONOGRAPHS: Group = [
  ...vowels,
  ...kGroup,
  ...sGroup,
  ...tGroup,
  ...nGroup,
  ...hGroup,
  ...mGroup,
  ...yGroup,
  ...rGroup,
  ...wGroup,
  ...additional,
];

export const MONOGRAPHS_DIACRITICS = [
  ...gGroup,
  ...zGroup,
  ...dGroup,
  ...bGroup,
  ...pGroup,
];

const makeDigraphGroupFrom = (group: Group): Group => {
  const [romaji, hiraganaConsonant, katakanaConsonant] = group.find(i => i[0].endsWith('i'))!;
  const consonant = romaji.slice(0, -1);
  return smallYGroup.map(([vowel, h, k]) => ([
    consonant + vowel,
    hiraganaConsonant + h,
    katakanaConsonant + k
  ]))
};

export const DIGRAPHS = [
  kGroup,
  nGroup,
  hGroup,
  mGroup,
  rGroup
].map(makeDigraphGroupFrom).flat(1);

export const DIGRAPHS_DIACRITICS = [
  gGroup,
  pGroup,
  bGroup
].map(makeDigraphGroupFrom).flat(1)

export const SYMBOL_GROUPS: Array<SymbolGroupType> = [
  {
    type: [KanaType.hiragana, SymbolType.monograph],
    data: MONOGRAPHS.map(([romaji, hiragana, _]) => [romaji, hiragana])
  },
  {
    type: [KanaType.hiragana, SymbolType.monograph_diacritics],
    data: MONOGRAPHS_DIACRITICS.map(([romaji, hiragana, _]) => [romaji, hiragana])
  },
  {
    type: [KanaType.hiragana, SymbolType.digraph],
    data: DIGRAPHS.map(([romaji, hiragana, _]) => [romaji, hiragana])
  },
  {
    type: [KanaType.hiragana, SymbolType.digraph_diacritics],
    data: DIGRAPHS_DIACRITICS.map(([romaji, hiragana, _]) => [romaji, hiragana])
  },
  {
    type: [KanaType.katakana, SymbolType.monograph],
    data: MONOGRAPHS.map(([romaji, _, katakana]) => [romaji, katakana])
  },
  {
    type: [KanaType.katakana, SymbolType.monograph_diacritics],
    data: MONOGRAPHS_DIACRITICS.map(([romaji, _, katakana]) => [romaji, katakana])
  },
  {
    type: [KanaType.katakana, SymbolType.digraph],
    data: DIGRAPHS.map(([romaji, _, katakana]) => [romaji, katakana])
  },
  {
    type: [KanaType.katakana, SymbolType.digraph_diacritics],
    data: DIGRAPHS_DIACRITICS.map(([romaji, _, katakana]) => [romaji, katakana])
  },

]



export const QUESTIONS_LIST = SYMBOL_GROUPS.reduce<SymbolInfo[]>((acc, group) => {
  const glyphs = group.data.map<SymbolInfo>(data => ({
    data,
    name: `${data[1]} (${data[0]})`,
    group: group.type,
  }))
  return acc.concat(glyphs)
}, [])
