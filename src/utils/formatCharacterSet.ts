export function formatCharacterSet(phrase: string, characters: string[], changedTo: string) {
  
  characters.map((characterLooked) => {

    phrase = phrase.replace(characterLooked, changedTo)
  })
  return phrase;
}

