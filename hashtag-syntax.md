# Синтаксис хэш-тегов

Хэш-тег начинается с символа `#`, за которым следует собственно тег. Тег состоит из одного или более слов, разделённых символами `-` и `_`. 
Символ-разделитель между двумя словами может быть только один.

Слово не может содержать:

  * Управляющих символов и пробелов: U+0000…U+0020 U+007F U+0080…U+00A0
  * ASCII-пунктуации и символов: U+0021…U+002F U+003A…U+0040 U+005B…U+0060 U+007B…U+007E  
  * Latin-1-пунктуации и символов: U+00A1…U+00BF U+00D7 U+00F7
  * General Punctuation: U+2000…U+206F