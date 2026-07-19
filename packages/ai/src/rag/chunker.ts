export interface Chunk {
  id: string;
  content: string;
  metadata: {
    source: string;
    sourceReference: string;
    article?: string;
    tags: string[];
    chunkIndex: number;
    totalChunks: number;
  };
}

const DEFAULT_CHUNK_SIZE = 1000;
const DEFAULT_OVERLAP = 200;

function generateChunkId(
  sourceReference: string,
  index: number
): string {
  const normalized = sourceReference
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${normalized}-chunk-${index}`;
}

function findParagraphBoundary(text: string, startIndex: number, direction: 'forward' | 'backward' = 'backward'): number {
  if (direction === 'backward') {
    const candidate = text.lastIndexOf('\n\n', startIndex);
    if (candidate !== -1 && candidate > startIndex - 300) return candidate;
    const singleNewline = text.lastIndexOf('\n', startIndex);
    if (singleNewline !== -1 && singleNewline > startIndex - 300) return singleNewline;
    return startIndex;
  }

  const candidate = text.indexOf('\n\n', startIndex);
  if (candidate !== -1) return candidate;
  const singleNewline = text.indexOf('\n', startIndex);
  if (singleNewline !== -1) return singleNewline;
  return startIndex;
}

export function chunkDocument(
  content: string,
  metadata: Omit<Chunk['metadata'], 'chunkIndex' | 'totalChunks'>,
  options?: { chunkSize?: number; overlap?: number }
): Chunk[] {
  const chunkSize = options?.chunkSize ?? DEFAULT_CHUNK_SIZE;
  const overlap = options?.overlap ?? DEFAULT_OVERLAP;

  if (chunkSize <= 0) throw new Error('chunkSize deve essere maggiore di 0');
  if (overlap < 0) throw new Error('overlap non può essere negativo');
  if (overlap >= chunkSize) throw new Error('overlap deve essere minore di chunkSize');
  if (!content) return [];

  const paragraphs = content.split(/\n\n+/).filter(Boolean);

  const chunks: Chunk[] = [];
  let currentIndex = 0;

  while (currentIndex < paragraphs.length) {
    const mergedChunks: string[] = [];
    let totalLength = 0;

    const startOffset = currentIndex;

    while (currentIndex < paragraphs.length) {
      const paragraph = paragraphs[currentIndex];
      const trimmedParagraph = paragraph.trim();
      if (!trimmedParagraph) {
        currentIndex++;
        continue;
      }

      const paragraphLength = trimmedParagraph.length + 2;
      if (totalLength + paragraphLength > chunkSize && mergedChunks.length > 0) {
        break;
      }

      mergedChunks.push(trimmedParagraph);
      totalLength += paragraphLength;
      currentIndex++;
    }

    const chunkContent = mergedChunks.join('\n\n');

    if (chunkContent.trim()) {
      chunks.push({
        id: generateChunkId(metadata.sourceReference, chunks.length),
        content: chunkContent,
        metadata: {
          ...metadata,
          chunkIndex: chunks.length,
          totalChunks: 0,
        },
      });
    }

    if (overlap > 0 && currentIndex < paragraphs.length) {
      let overlapIndex = currentIndex;
      let overlapChars = 0;

      while (overlapIndex > startOffset) {
        overlapIndex--;
        const paraLen = paragraphs[overlapIndex].trim().length + 2;
        if (overlapChars + paraLen > overlap) break;
        overlapChars += paraLen;
      }

      currentIndex = overlapIndex;
    }
  }

  const total = chunks.length;
  for (const chunk of chunks) {
    chunk.metadata.totalChunks = total;
  }

  return chunks;
}
