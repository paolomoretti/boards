import * as React from 'react';
import { BoardTile, HighlightArticleKey, HighlightFileKey } from '../../types/boards.types';
import { HighlightText } from '../../components/shared/Highlight';

export function parseTileHighlights(tile: BoardTile): BoardTile {
  if (!tile.highlights) {
    return tile;
  } else {
    const h: any = tile.highlights;

    switch (tile.tile_type) {
      case 'file':
        // @ts-ignore
        Object.keys(h as Record<HighlightFileKey, string | Array<string>>).map((subject: HighlightFileKey) => {
          const hVal: string = typeof h[subject] === 'string' ? h[subject] as string : (h[subject] as Array<string>).join('');
          switch (subject) {
            case 'name':
              tile.file!.title = <HighlightText text={hVal} />;
              break;
            // @ts-ignore
            default: tile.file![subject] = <HighlightText text={hVal} />;
          }
        });
        break;

      case 'link':
        // @ts-ignore
        Object.keys(h as Record<HighlightArticleKey, string | Array<string>>).map((subject: HighlightArticleKey) => {
          if (subject === 'content') {
            tile.link!.link.description = <HighlightText text={typeof h[subject] === 'string' ? h[subject] as string : (h[subject] as Array<string>).join('')} />;
          } else {
            // @ts-ignore
            tile.link!.link[subject] = <HighlightText text={typeof h[subject] === 'string' ? h[subject] as string : (h[subject] as Array<string>).join('')} />;
          }
        });
        break;

      case 'note':
        // @ts-ignore
        tile.note!.note = <HighlightText text={h.content} />
        break;
    }

    return tile;
  }
}
