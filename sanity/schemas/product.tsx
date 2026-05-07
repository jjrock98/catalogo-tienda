import { defineField, defineType } from 'sanity';
import { Package } from 'lucide-react';

export default defineType({
  name: 'product',
  title: 'Producto',
  type: 'document',
  icon: () => <Package className="w-5 h-5" />,
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Producto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'number',
      description: 'Precio del producto en ARS',
    }),
    defineField({
      name: 'inStock',
      title: 'En Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'images',
      title: 'Imágenes',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Texto Alternativo',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'sizes',
      title: 'Talles Disponibles',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'XS', value: 'xs' },
          { title: 'S', value: 's' },
          { title: 'M', value: 'm' },
          { title: 'L', value: 'l' },
          { title: 'XL', value: 'xl' },
          { title: 'XXL', value: 'xxl' },
        ],
      },
    }),
    defineField({
      name: 'colors',
      title: 'Colores Disponibles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nombre del Color',
              type: 'string',
            },
            {
              name: 'hex',
              title: 'Código de Color',
              type: 'string',
              description: 'Ej: #000000 para negro',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'material',
      title: 'Material',
      type: 'string',
      description: 'Ej: Algodón 100%, Poliéster, Mezcla, etc.',
    }),
    defineField({
      name: 'origin',
      title: 'País de Origen',
      type: 'string',
    }),
    defineField({
      name: 'collection',
      title: 'Colección',
      type: 'string',
      description: 'Nombre de la colección a la que pertenece',
    }),
    defineField({
      name: 'rating',
      title: 'Calificación',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: 'tags',
      title: 'Etiquetas',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false,
      description: 'Mostrar en destacados del catálogo',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaDescription',
          title: 'Meta Descripción',
          type: 'string',
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'keywords',
          title: 'Palabras Clave',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images.0.asset',
      category: 'category.title',
      inStock: 'inStock',
    },
    prepare({ title, media, category, inStock }) {
      return {
        title: title,
        subtitle: `${category} ${inStock ? '✓ En stock' : '✗ Sin stock'}`,
        media: media,
      };
    },
  },
});
