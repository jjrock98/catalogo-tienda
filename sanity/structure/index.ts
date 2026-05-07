import { StructureBuilder } from 'sanity/structure';

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Productos')
        .schemaType('product')
        .child(
          S.documentList()
            .title('Productos')
            .schemaType('product')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),
      S.listItem()
        .title('Categorías')
        .schemaType('category')
        .child(
          S.documentList()
            .title('Categorías')
            .schemaType('category')
        ),
      S.divider(),
      S.listItem()
        .title('Destacados')
        .child(
          S.documentList()
            .title('Productos Destacados')
            .schemaType('product')
            .filter('featured == true')
        ),
    ]);
