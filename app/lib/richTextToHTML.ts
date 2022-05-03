import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import type { Document, Block, Inline } from '@contentful/rich-text-types';
import { BLOCKS } from '@contentful/rich-text-types';

function richTextToHTML(document: Document, links: any = {}) {
  const assets = links?.assets?.block.reduce((acc: any, item: any) => ({ ...acc, [item.sys.id]: item }), {}) ?? {};

  return documentToHtmlString(document, {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
        const { id } = node.data.target.sys;
        const asset = assets[id];

        if (!asset) {
          return '';
        }

        const { contentType, description, title, url } = asset;
        const mimeGroup = contentType.split('/')[0];

        switch (mimeGroup) {
          case 'application':
            return `<a href="${url}" title="${title}">${title}</a>`;

          case 'image':
            const caption = description ? `<figcaption>${description}</figcaption>` : '';

            return `<figure><img src="${url}" alt="${title}" />${caption}</figure>`;

          case 'video':
            return `<video controls><source src="${url}" type="${contentType}" /></video>`;

          default:
            return `<span>${title}</span>`;
        }
      },
    },
  });
}

export default richTextToHTML;
