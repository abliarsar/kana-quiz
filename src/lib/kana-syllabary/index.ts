import {KanaType, SymbolGroupType, SymbolInfo, SymbolType} from '../../features/quiz/types'

type Group = Array<[string, string, string]>


const vowels = [
  ["a","あ", "ア"],
  ["i","い", "イ"],
  ["u","う", "ウ"],
  ["e","え", "エ"],
  ["o","お", "オ"]
]
const kGroup = [
  ["ka","か", "カ"],
  ["ki","き", "キ"],
  ["ku","く", "ク"],
  ["ke","け", "ケ"],
  ["ko","こ", "コ"]
]
const gGroup = [
  ["ga","が","ガ"],
  ["gi","ぎ","ギ"],
  ["gu","ぐ","グ"],
  ["ge","げ","ゲ"],
  ["go","ご","ゴ"]
]
const sGroup = [
  ["sa","さ","サ"],
  ["shi","し","シ"],
  ["su","す","ス"],
  ["se","せ","セ"],
  ["so","そ","ソ"]
]
const zGroup = [
  ["za","ざ","ザ"],
  ["ji","じ","ジ"],
  ["zu","ず","ズ"],
  ["ze","ぜ","ゼ"],
  ["zo","ぞ","ゾ"]
]
const tGroup = [
  ["ta","た","タ"],
  ["chi","ち","チ"],
  ["tsu","つ","ツ"],
  ["te","て","テ"],
  ["to","と","ト"]
]
const dGroup = [
  ["da","だ","ダ"],
  ["ji","ぢ","ヂ"],
  ["zu","づ","ヅ"],
  ["de","で","デ"],
  ["do","ど","ド"]
]
const nGroup = [
  ["na","な","ナ"],
  ["ni","に","ニ"],
  ["nu","ぬ","ヌ"],
  ["ne","ね","ネ"],
  ["no","の","ノ"]
]
const hGroup = [
  ["ha","は","ハ"],
  ["hi","ひ","ヒ"],
  ["fu","ふ","フ"],
  ["he","へ","ヘ"],
  ["ho","ほ","ホ"]
]
const bGroup = [
  ["ba","ば","バ"],
  ["bi","び","ビ"],
  ["bu","ぶ","ブ"],
  ["be","べ","ベ"],
  ["bo","ぼ","ボ"]
]
const pGroup = [
  ["pa","ぱ","パ"],
  ["pi","ぴ","ピ"],
  ["pu","ぷ","プ"],
  ["pe","ぺ","ペ"],
  ["po","ぽ","ポ"]
]
const mGroup = [
  ["ma","ま","マ"],
  ["mi","み","ミ"],
  ["mu","む","ム"],
  ["me","め","メ"],
  ["mo","も","モ"]
]
const yGroup = [
  ["ya","や", "ヤ"],
  ["yu","ゆ", "ユ"],
  ["yo","よ", "ヨ"]
]
const rGroup = [
  ["ra","ら", "ラ"],
  ["ri","り", "リ"],
  ["ru","る", "ル"],
  ["re","れ", "レ"],
  ["ro","ろ", "ロ"]
]
const wGroup = [
  ["wa","わ", "ワ"],
  ["wi","ゐ", "ヰ"],
  ["we","ゑ", "ヱ"],
  ["wo","を", "ヲ"],
]
const additional = [
  ["n","ん", "ン"]
]

export const MONOGRAPHS = [
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
]
export const MONOGRAPHS_DIACRITICS = [
  ...gGroup,
  ...zGroup,
  ...dGroup,
  ...bGroup,
  ...pGroup,
]
export const DIGRAPHS = []
export const DIGRAPHS_DIACRITICS = []

export const SYMBOL_GROUPS: Array<SymbolGroupType> = [
  {
    type: [KanaType.hiragana, SymbolType.monograph],
    data: MONOGRAPHS.map(([romaji, hiragana]) => [romaji, hiragana])
  },
  {
    type: [KanaType.hiragana, SymbolType.monograph_diacritics],
    data: MONOGRAPHS_DIACRITICS.map(([romaji, hiragana]) => [romaji, hiragana])
  },
  {
    type: [KanaType.katakana, SymbolType.monograph],
    data: MONOGRAPHS.map(([romaji, _, katakana]) => [romaji, katakana])
  },
  {
    type: [KanaType.katakana, SymbolType.monograph_diacritics],
    data: MONOGRAPHS_DIACRITICS.map(([romaji, _, katakana]) => [romaji, katakana])
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

