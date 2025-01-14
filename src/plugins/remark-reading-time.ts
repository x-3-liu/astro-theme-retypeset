import type { Root } from 'mdast'
import type { VFile } from 'vfile'
import { toString } from 'mdast-util-to-string'
import getReadingTime from 'reading-time'

export function remarkReadingTime() {
  return function (tree: Root, file: VFile) {
    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage)
    const frontmatter = (file.data.astro ??= {}).frontmatter ??= {}
    frontmatter.minutes = Math.max(1, Math.round(readingTime.minutes))
    frontmatter.words = readingTime.words
  }
}
